<template>
  <div class="border pt-1 -mt-4">
    <div class="w-50 d-flex flex-row space-x-3 float-right mb-1 px-1">
      <BFormSelect
        v-model="partnerList"
        :options="warehouse"
      />
      <DateRangePicker
        ref="picker"
        v-model="dateRange"
        class="w-100"
        :locale-data="locale"
        :ranges="ranges"
        :opens="'left'"
      >
        <template
          v-slot:input="picker"
          style="min-width: 350px"
        >
          <div class="d-flex justify-content-between align-items-center w-100">
            <div class="mr-1">
              <span
                v-if="
                  formatDateFilter(picker.startDate) === formatDateFilter(today) && formatDateFilter(picker.endDate) === formatDateFilter(today)
                "
                style="color: #828282 !important"
              >
                Hari ini
              </span>
              <span
                v-else-if="
                  formatDateFilter(picker.startDate) === formatDateFilter(last7)
                "
                style="color: #828282 !important"
              >
                7 Hari Terakhir
              </span>
              <span
                v-else-if="
                  formatDateFilter(picker.startDate) === formatDateFilter(last30)
                "
                style="color: #828282 !important"
              >
                30 Hari Terakhir
              </span>
              <span
                v-else-if="
                  formatDateFilter(picker.startDate) === formatDateFilter(kompackDate) || formatDateFilter(picker.endDate) === formatDateFilter(today)
                "
                style="color: #828282 !important"
              >
                Semua Tanggal
              </span>
              <span
                v-else-if="
                  formatDateFilter(picker.startDate) === formatDateFilter(firstDateOfMonth) && formatDateFilter(picker.endDate) === formatDateFilter(lastDateOfMonth)
                "
                style="color: #828282 !important"
              >
                Bulan ini
              </span>
              <span
                v-else
                style="color: #828282 !important"
              > Custom </span>
            </div>
            <div class="padding-arrow">
              <b-img src="@/assets/images/icons/arrow-filter.svg" />
            </div>
          </div>
        </template>
      </DateRangePicker>
      <!-- <div class="">
        date
      </div> -->
    </div>
    <div class="">
      <b-overlay
        variant="light"
        :show="loading"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
        class="top-36"
      />
      <b-table
        id="table"
        small
        class="text-center"
        :fields="fields"
        :items="items"
        responsive="sm"
        empty-text="Tidak ada data untuk ditampilkan."
        show-empty
        :busy="loading"
      >
        <template #cell(tanggal_pengajuan)="data">
          {{ formatDate(data.item.inbound_date) }}
        </template>

        <template #cell(nama_gudang)="data">
          <div class="d-flex flex-row items-center">
            <div class="mr-1">
              <b-avatar
                :src="data.item.image_logo_url"
              />
            </div>
            <div class="d-flex flex-column items-start py-1">
              <div class="">
                {{ data.item.warehouses_name }}
              </div>
              <div class="">
                {{ data.item.city_name }}
              </div>
            </div>
          </div>
        </template>
        <template #cell(jenis_pengiriman)="data">
          <div
            v-if="data.item.is_retur === 1"
            class="d-flex flex-column align-items-center"
          >
            <b-img
              src="https://storage.googleapis.com/komerce/assets/komerce-icon/Orange/box-remove.svg"
            />
            <div class="mt-0.5">
              Retur
            </div>
          </div>
          <div
            v-else
            class="d-flex flex-column align-items-center"
          >
            <b-img
              :src="shippingMethods('img', data.item.shipping)"
            />
            <div class="mt-0.5">
              {{ shippingMethods('text', data.item.shipping) }}
            </div>
          </div>
        </template>
        <template #cell(status)="data">
          <div :class="statusColor(data.item.status)">
            {{ data.item.status }}
          </div>
        </template>
        <template #cell(tanggal_inbound)="data">
          <div>
            {{ data.item.arrived_date != '-' ? formatDate(data.item.arrived_date) : '-' }}
          </div>
        </template>
        <template #cell(action)="data">
          <div
            v-if="data.item.is_retur === 1"
            style="color: #08A0F7;"
            @click="detailRetur(data.item.order_id)"
          >
            <button class="outline-none">
              <u>Lihat Detail</u>
            </button>
          </div>
          <div
            v-else
            style="color: #08A0F7;"
            @click="detail(data.item)"
          >
            <button class="outline-none">
              <u>Lihat Detail</u>
            </button>
          </div>
        </template>
      </b-table>
      <b-img
        src="@/assets/images/icons/add-circle.svg"
        class="cursor-pointer button-add-inbound"
        @click="handleAddInbound()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import {
  today, last7, last30, firstDateOfMonth, lastDateOfMonth, kompackDate,
} from '@/store/helpers'
import { BFormSelect } from 'bootstrap-vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'RiwayatInbound',
  components: { DateRangePicker, BFormSelect },
  data() {
    return {
      kompackDate,
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,

      // filter
      partnerList: JSON.parse(localStorage.getItem('warehouse_id')) ? JSON.parse(localStorage.getItem('warehouse_id')) : '',
      date: '',
      dateRange: {
        startDate: kompackDate,
        endDate: today,
      },
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        'Hari ini': [today, today],
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan ini': [firstDateOfMonth, lastDateOfMonth],
        'Semua ': [kompackDate, today],
      },

      loading: false,

      limit: 50,
      offset: 0,
      lastData: false,

      warehouse: [
        {
          value: '',
          text: 'Semua Gudang',
        },
      ],

      dateList: [
        {
          value: '',
          text: 'Tanggal',
        },
      ],

      fields: [
        {
          key: 'tanggal_pengajuan',
          label: 'Tanggal Pengajuan',
        },
        {
          key: 'nama_gudang',
          label: 'Nama Gudang',
        },
        {
          key: 'jenis_pengiriman',
          label: 'Jenis Pengiriman',
        },
        {
          key: 'tanggal_inbound',
          label: 'Tanggal Inbound',
        },
        {
          key: 'status',
          label: 'Status',
        },
        {
          key: 'action',
          label: 'Action',
        },
      ],
      items: [],
    }
  },

  computed: {
    ...mapState('riwayatPengajuan', ['inbound', 'listWarehouses']),
  },

  watch: {
    dateRange: {
      handler() {
        this.fetchRiwayatInbound()
      },
    },
    partnerList: {
      handler() {
        this.fetchRiwayatInbound()
      },
    },
  },

  created() {
    this.fetchRiwayatInbound()
    this.fetchListWarehouses()
    localStorage.removeItem('warehouse_id')
  },

  mounted() {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('table').offsetHeight && !this.loading) {
        this.fetchNextRiwayatInbound()
      }
    }
    this.$router.replace({ query: { tab: 'riwayat-inbound' } })
  },

  methods: {
    fetchRiwayatInbound() {
      this.offset = 0
      this.loading = true
      this.$store
        .dispatch('riwayatPengajuan/getListInbound', {
          start_date: this.formatDateFilter(this.dateRange.startDate),
          end_date: this.formatDateFilter(this.dateRange.endDate),
          warehouse_id: this.partnerList,
          limit: this.limit,
          offset: this.offset,
        })
        .then(() => {
          this.items = this.inbound
          this.loading = false
          this.offset = this.inbound.length
          if (this.inbound.length < this.limit) {
            this.lastData = true
          } else {
            this.lastData = false
          }
        })
        .catch(() => {
          this.loading = false
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal load data, silahkan coba lagi',
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    fetchNextRiwayatInbound() {
      if (!this.lastData) {
        this.loading = true
        this.$store
          .dispatch('riwayatPengajuan/getListInbound', {
            start_date: this.formatDateFilter(this.dateRange.startDate),
            end_date: this.formatDateFilter(this.dateRange.endDate),
            warehouse_id: this.partnerList,
            limit: this.limit,
            offset: this.offset,
          })
          .then(() => {
            this.items.push(...this.inbound)
            this.offset += this.inbound.length
            if (this.inbound.length < this.limit) {
              this.lastData = true
            }
            this.loading = false
          })
          .catch(() => {
            this.loading = false
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: 'Gagal',
                  icon: 'AlertCircleIcon',
                  text: 'Gagal load data, silahkan coba lagi',
                  variant: 'danger',
                },
              },
              2000,
            )
          })
      }
    },

    fetchListWarehouses() {
      this.$store
        .dispatch('riwayatPengajuan/getListWarehouses')
        .then(() => {
          const warehouse = this.warehouse.concat(this.listWarehouses.map(data => ({
            value: data.warehouse_id,
            text: data.warehouse_name,
          })))

          this.warehouse = warehouse
        })
        .catch(() => {
          this.loading = false
        })
    },

    detailRetur(orderId) {
      this.$router.push({
        path: `/data-order/detail-order/${orderId}`,
      })
      // localStorage.setItem('detailInbound', JSON.stringify(data))
    },

    detail(data) {
      const { id } = data
      this.$router.push({
        path: `/detail-riwayat-inbound/${id}`,
      })
      localStorage.setItem('detailInbound', JSON.stringify(data))
    },

    shippingMethods(part, shipping) {
      if (part === 'img') {
        if (shipping != null) {
          return 'https://storage.googleapis.com/komerce/assets/menggunakan-ekspedisi-orange.svg'
        }
        return 'https://storage.googleapis.com/komerce/assets/dikirim-sendiri-orange.svg'
      }
      if (shipping != null) {
        return shipping
      }
      return 'Dikirim Sendiri'
    },
    statusColor(status) {
      if (status === 'Proses') {
        return 'text-warning'
      } if (status === 'Selesai') {
        return 'text-success'
      }
      return 'text-danger'
    },
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY')
    },
    formatDateFilter(value) {
      return moment(value).format('YYYY-MM-DD')
    },
    handleAddInbound() {
      this.$router.push({
        path: '/ajukan-inbound',
      })
    },
  },
}
</script>

<style scoped>
.padding-arrow {
  padding-top: 5px;
  padding-bottom: 5px;
}

.button-add-inbound {
  position: fixed;
  right: 85px;
  bottom: 60px;
  z-index: 99;
}
</style>
