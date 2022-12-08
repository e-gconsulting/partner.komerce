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
      <b-table
        small
        class="text-center"
        :fields="fields"
        :items="items"
        responsive="sm"
        empty-text="Tidak ada data untuk ditampilkan."
        :show-empty="!loading"
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
          <div class="d-flex flex-column align-items-center">
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
            class=""
            style="color: #08A0F7;"
            @click="detail(data.item)"
          >
            <button class="outline-none">
              <u>Lihat Detail</u>
            </button>
          </div>
        </template>
      </b-table>
      <div class="hidden">
        <b-button
          variant="primary"
          class="rounded-pill p-1"
        >
          <feather-icon
            icon="PlusIcon"
            size="35"
          />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import {
  today, last7, last30, firstDateOfMonth, lastDateOfMonth,
} from '@/store/helpers'
import { BFormSelect } from 'bootstrap-vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'RiwayatInbound',
  components: { DateRangePicker, BFormSelect },
  data() {
    return {
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,

      // filter
      partnerList: '',
      date: '',
      dateRange: {
        startDate: today,
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
      },

      loading: false,

      // options: [
      //   {
      //     value: '',
      //     text: 'Semua Gudang',
      //   },
      // ],

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
  },

  methods: {
    fetchRiwayatInbound() {
      this.$store
        .dispatch('riwayatPengajuan/getListInbound', {
          start_date: this.formatDateFilter(this.dateRange.startDate),
          end_date: this.formatDateFilter(this.dateRange.endDate),
          warehouse_id: this.partnerList,
        })
        .then(() => {
          this.items = this.inbound
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
  },
}
</script>

<style scoped>
.padding-arrow {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
