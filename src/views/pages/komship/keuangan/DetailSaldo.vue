<template>
  <b-card>
    <h2 class="font-bold mb-2">
      Rincian Saldo
    </h2>
    <b-row class="mb-1">
      <b-col cols="6">
        <div
          style="border: 1px solid #E2E2E2; border-radius: 8px;"
          class="w-80 text-xl px-1 py-2"
        >
          Saldo: <span class="text-primary font-bold">Rp. {{ formatNumber(totalSaldo) }}</span>
        </div>
      </b-col>
      <b-col cols="6">
        <div class="w-48 ml-auto">
          <b-form-select
            v-model="selectedFilter"
            :options="optionsFilter"
            @change="fetchData"
          />
        </div>
      </b-col>
    </b-row>
    <b-overlay
      variant="light"
      :show="loadTable"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        responsive
        show-empty
        empty-text="Tidak ada data untuk ditampilkan."
        :items="items"
        :fields="fields"
      >
        <template #head(shipping_cost)="data">
          <span class="d-flex">{{ data.label }}
            <img
              id="ongkosKirim"
              src="@/assets/images/icons/info-circle-dark.svg"
              class="w-5 h-5"
              style="margin-left:5px;cursor:pointer;"
            >
          </span>
          <b-tooltip
            target="ongkosKirim"
            triggers="hover"
          >
            Ongkos kirim dari orderan.
          </b-tooltip>
        </template>
        <template #head(service_fee)="data">
          <span class="d-flex">{{ data.label }}
            <img
              id="biayaCOD"
              src="@/assets/images/icons/info-circle-dark.svg"
              class="w-5 h-5"
              style="margin-left:5px;cursor:pointer;"
            >
          </span>
          <b-tooltip
            target="biayaCOD"
            triggers="hover"
          >
            Biaya COD dari orderan yang menggunakan layanan COD.
          </b-tooltip>
        </template>
        <template #cell(order_date)="data">
          {{ moment(data.item.order_date) }}
        </template>
        <template #cell(payment_method)="data">
          {{ data.item.payment_method }}
          <span
            v-if="data.item.status === 'Retur'"
            class="text-muted"
          ><br>Retur</span>
        </template>
        <template #cell(grand_total)="data">
          Rp. {{ formatNumber(data.item.grand_total) }}
        </template>
        <template #cell(shipping_cost)="data">
          Rp. {{ formatNumber(data.item.shipping_cost) }}
        </template>
        <template #cell(service_fee)="data">
          <span v-if="data.item.service_fee !== '-'">Rp. {{ formatNumber(data.item.service_fee) }}</span>
          <span v-else>-</span>
        </template>
        <template #cell(amount)="data">
          <span
            v-if="data.item.payment_method === 'BANK TRANSFER'"
            class="text-primary"
          >
            -Rp.{{ formatNumber(data.item.amount) }}
          </span>
          <span
            v-else
            class="text-success"
          >
            +Rp.{{ formatNumber(data.item.amount) }}
          </span>
        </template>
      </b-table>
      <div class="d-flex justify-between align-middle">
        <div>
          <span class="mr-1">List per halaman</span>
          <b-button
            v-for="page in pageOptions"
            :key="page"
            :variant="page === perPage ? 'primary' : 'light'"
            size="sm"
            class="btnPage"
            @click="setPage(page)"
          >
            {{ page }}
          </b-button>
        </div>
        <b-pagination
          v-model="currentPage"
          size="md"
          class="float-right mr-2"
          :total-rows="totalItems"
          :per-page="perPage"
          first-number
          last-number
        />
      </div>
    </b-overlay>
  </b-card>
</template>
<script>
import {
  BCard, BRow, BCol, BFormSelect, BTable, BButton, BPagination, BOverlay, BTooltip,
} from 'bootstrap-vue'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  components: {
    BCard, BRow, BCol, BFormSelect, BTable, BButton, BPagination, BOverlay, BTooltip,
  },
  data() {
    return {
      selectedFilter: '7 Hari Terakhir',
      optionsFilter: ['7 Hari Terakhir', '1 Bulan Terakhir', '3 Bulan Terakhir'],
      items: [],
      fields: [
        {
          key: 'order_date', label: 'Tanggal', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'payment_method', label: 'Jenis Order', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'grand_total', label: 'Nilai Order', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'shipping_cost', label: 'Ongkos Kirim', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'service_fee', label: 'Biaya COD', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'amount', label: 'Jumlah', thClass: 'align-middle', tdClass: 'align-top',
        },
      ],
      loadTable: false,
      startDate: null,
      endDate: null,
      pageOptions: [20, 50],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
    }
  },
  watch: {
    currentPage: {
      handler(value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      },
    },
  },
  mounted() {
    this.fetchData().catch(error => {
      console.error(error)
    })
  },
  computed: {
    ...mapState('saldoDetail', ['totalSaldo']),
  },
  beforeMount() {
    this.$store.dispatch('saldoDetail/init')
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY')
      }
      return ''
    },
    getDate() {
      const today = new Date()
      this.endDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      if (this.selectedFilter === '7 Hari Terakhir') {
        const last = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))
        this.startDate = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '1 Bulan Terakhir') {
        const last = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000))
        this.startDate = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '3 Bulan Terakhir') {
        const last = new Date(today.getTime() - (90 * 24 * 60 * 60 * 1000))
        this.startDate = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
      }
    },
    async fetchData() {
      this.loadTable = true
      this.getDate()
      this.items = await this.$http_komship.get('v1/partner/order-transaction-balance', {
        params: {
          start_date: this.startDate,
          end_date: this.endDate,
          page: this.currentPage,
          total_per_page: this.perPage,
        },
      })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .catch(error => console.log(error))
    },
    setPage(totalPage) {
      this.perPage = totalPage
      this.fetchData()
    },
  },
}
</script>
