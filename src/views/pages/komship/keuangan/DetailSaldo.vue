<template>
  <b-card>
    <h2 class="font-bold mb-2">
      Rincian Saldo
    </h2>
    <b-row class="mb-1">
      <b-col
        cols="12"
        md="6"
        class="mb-1"
      >
        <div
          style="border: 1px solid #e2e2e2; border-radius: 8px"
          class="text-xl px-1 py-2 sm:w-80"
        >
          Saldo:
          <span
            class="text-primary font-bold"
          >{{ totalSaldo >= 0 ? '' : '-' }} Rp
            {{ formatNumber(totalSaldo) }}</span>
        </div>
      </b-col>
      <b-col
        cols="12"
        md="6"
      >
        <b-row class="justify-content-end mr-2">
          <div class="mr-1 mb-1">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="searchResi"
                placeholder="Copas resi kesini"
                @input="handleSearchResi"
              />
            </b-input-group>
          </div>
          <div>
            <date-range-picker
              ref="picker"
              v-model="dateRange"
              :locale-data="locale"
              :ranges="ranges"
              :opens="'left'"
              class="w-100"
              @start-selection="setCustomDate"
              @finish-selection="setCustomDate"
              @select="removeCustomDate"
            >
              <template
                v-slot:input="picker"
                style="min-width: 350px"
              >
                <div
                  class="d-flex justify-content-between align-items-center w-100 pt-50"
                >
                  <div
                    class="mr-1"
                  >
                    <span
                      v-if="formatDate(picker.startDate) === formatDate(last7)"
                      style="color: #828282!important"
                    >7 Hari Terakhir</span>
                    <span
                      v-else-if="formatDate(picker.startDate) === formatDate(last30)"
                      style="color: #828282!important"
                    >30 Hari Terakhir</span>
                    <span
                      v-else-if="formatDate(picker.startDate) === formatDate(firstDateOfMonth) && formatDate(picker.endDate) === formatDate(today)"
                      style="color: #828282!important"
                    >Bulan Ini</span>
                    <span
                      v-else-if="formatDate(picker.startDate) === formatDate(today) && formatDate(picker.endDate) === formatDate(today)"
                      style="color: #828282!important"
                    >Custom Tanggal</span>
                    <span
                      v-else
                      style="color: #828282!important"
                    >Custom Tanggal</span>
                  </div>
                  <div>
                    <feather-icon icon="ChevronDownIcon" />
                  </div>
                </div>
              </template>
            </date-range-picker>
          </div>
        </b-row>
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
        <template #cell(date_transaction)="data">
          <span>{{ moment(data.item.date_transaction) }}</span><br>
          <span class="text-muted">{{
            momentTime(data.item.date_transaction)
          }}</span>
        </template>
        <template #cell(transaction_type)="data">
          <span v-if="data.item.transaction_type === 'topup'">
            Top Up Saldo
          </span>
          <span v-if="data.item.transaction_type === 'shopping'">
            Belanja (<span class="text-muted">Keperluan Talent</span>)
          </span>
          <span v-if="data.item.transaction_type === 'withdrawal'">
            Penarikan Saldo
          </span>
          <span v-if="data.item.transaction_type === 'orderku_done'">
            Orderan COD (<span class="text-success">Diterima</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'orderku_cancel'">
            Orderan Non COD (<span class="text-muted">Cancel</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'orderku_ongkir'">
            Orderan Non COD (<span class="text-muted">Ongkir</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.transaction_type === 'orderku_retur' &&
                data.item.payment_method === 'COD'
            "
          >
            Orderan COD (<span class="text-danger">Retur</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.transaction_type === 'orderku_retur' &&
                data.item.payment_method === 'BANK TRANSFER'
            "
          >
            Orderan Non COD (<span class="text-danger">Retur</span>)<b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="@/assets/images/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="@/assets/images/icons/icons-copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
        </template>
        <template #cell(amount)="data">
          <span
            v-if="data.item.amount.charAt(0) === '+'"
            class="text-success"
          >
            +Rp {{ formatNumber(data.item.amount) }}
          </span>
          <span
            v-if="data.item.amount.charAt(0) === '-'"
            class="text-primary"
          >
            -Rp {{ formatNumber(data.item.amount) }}
          </span>
        </template>
        <template #cell(saldo)="data">
          {{ data.item.saldo >= 0 ? '' : '-' }}Rp
          {{ formatNumber(data.item.saldo) }}
        </template>
        <template #cell(action)="data">
          <b-button
            v-if="data.item.order_id !== 0"
            variant="none"
            class="button-detail d-flex text-info"
            :to="{
              name: 'detail-order',
              params: { order_id: data.item.order_id },
            }"
            target="_blank"
          >
            Lihat Detail
          </b-button>
          <span v-else>-</span> </template>>
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
  BCard,
  BRow,
  BCol,
  BFormSelect,
  BTable,
  BButton,
  BPagination,
  BOverlay,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import {
  today,
  last7,
  last30,
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    // BFormSelect,
    BTable,
    BButton,
    BPagination,
    BOverlay,
    DateRangePicker,
  },
  data() {
    return {
      selectedFilter: '7 Hari Terakhir',
      optionsFilter: [
        '7 Hari Terakhir',
        '1 Bulan Terakhir',
        '3 Bulan Terakhir',
        'Custom',
      ],
      items: [],
      fields: [
        {
          key: 'date_transaction',
          label: 'Tanggal',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'transaction_type',
          label: 'Jenis Transaksi',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'amount',
          label: 'Jumlah',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'saldo',
          label: 'Saldo',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      loadTable: false,
      startDate: null,
      endDate: null,
      pageOptions: [20, 50],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,

      searchResi: '',

      // Date range picker
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, today],
        'Custom Tanggal': [today, today],
      },
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,

      dateRange: {
        startDate: last7,
        endDate: today,
      },

      titleCustomDate: null,
    }
  },
  computed: {
    ...mapState('saldoDetail', ['totalSaldo']),
  },
  watch: {
    currentPage: {
      handler(value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      },
    },
    dateRange: {
      handler() {
        this.fetchData()
      },
    },
  },
  mounted() {
    this.fetchData().catch(error => {
      console.error(error)
    })
  },
  beforeMount() {
    this.$store.dispatch('saldoDetail/init')
  },
  methods: {
    formatNumber: value => `${value}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY')
      }
      return ''
    },
    momentTime(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('HH:MM')
      }
      return ''
    },
    getDate() {
      const todays = new Date()
      this.endDate = `${todays.getFullYear()}-${todays.getMonth()
        + 1}-${todays.getDate()}`
      if (this.selectedFilter === '7 Hari Terakhir') {
        const last = new Date(todays.getTime() - 7 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '1 Bulan Terakhir') {
        const last = new Date(todays.getTime() - 30 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '3 Bulan Terakhir') {
        const last = new Date(todays.getTime() - 90 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      }
    },
    async fetchData() {
      this.loadTable = true
      this.items = await this.$http_komship
        .get('v1/partner/order-transaction-balance', {
          params: {
            start_date: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
            end_date: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
            page: this.currentPage,
            limits: this.perPage,
            search: this.searchResi,
          },
        })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .catch(error => {
          // handle error
        })
    },
    setPage(totalPage) {
      this.perPage = totalPage
      this.fetchData()
    },
    handleSearchResi: _.debounce(async function () {
      this.loadTable = true
      this.items = await this.$http_komship
        .get('v1/partner/order-transaction-balance', {
          params: {
            search: this.searchResi,
          },
        })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .catch(error => {
          // handle error
        })
    }, 1000),
    copyResi(data) {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(data)

      /* Alert the copied text */
      this.$toast({
        component: ToastificationContent,
        props: {
          title: ` Resi ${data} berhasil dicopy`,
          icon: 'AlertCircleIcon',
          variant: 'warning',
        },
      }, 1000)
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    setCustomDate() {
      this.titleCustomDate = 'Custom Tanggal'
    },
    removeCustomDate() {
      this.titleCustomDate = null
    },
  },
}
</script>
<style>
.btnPage {
  padding: 4px 7px;
  margin-right: 5px;
}
</style>
