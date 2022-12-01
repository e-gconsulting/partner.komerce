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
                  formatDateRange(picker.startDate) === formatDateRange(today) && formatDateRange(picker.endDate) === formatDateRange(today)
                "
                style="color: #828282 !important"
              >
                Hari ini
              </span>
              <span
                v-else-if="
                  formatDateRange(picker.startDate) === formatDateRange(last7)
                "
                style="color: #828282 !important"
              >
                7 Hari Terakhir
              </span>
              <span
                v-else-if="
                  formatDateRange(picker.startDate) === formatDateRange(last30)
                "
                style="color: #828282 !important"
              >
                30 Hari Terakhir
              </span>
              <span
                v-else-if="
                  formatDateRange(picker.startDate) === formatDateRange(firstDateOfMonth) && formatDateRange(picker.endDate) === formatDateRange(lastDateOfMonth)
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
          {{ formatDate(data.item.submission_date) }}
        </template>

        <template #cell(nama_gudang)="data">
          <div class="d-flex flex-row items-center">
            <div class="mr-1">
              <b-avatar
                :src="data.item.warehouse_logo_url"
              />
            </div>
            <div class="d-flex flex-column items-start py-1">
              <div class="">
                {{ data.item.warehouse_name }}
              </div>
              <div class="">
                {{ data.item.warehouse_city }}
              </div>
            </div>
          </div>
        </template>
        <template #cell(jumlah_produk)="data">
          <div class="">
            {{ data.item.total_product }}
          </div>
        </template>
        <template #cell(status)="data">
          <div :class="statusColor(data.item.status)">
            {{ data.item.status }}
          </div>
        </template>
        <template #cell(action)="data">
          <div
            class=""
            style="color: #08A0F7;"
            @click="handleDetail(data.item)"
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
import {
  today, last7, last30, firstDateOfMonth, lastDateOfMonth,
} from '@/store/helpers'
import DateRangePicker from 'vue2-daterange-picker'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'RiwayatInbound',
  components: { DateRangePicker },
  data() {
    return {

      // init state
      warehouse: [
        {
          value: '',
          text: 'Semua Gudang',
        },
      ],

      loading: false,

      // filter
      partnerList: '',
      dateRange: {
        startDate: today,
        endDate: today,
      },

      // for date range
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,
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

      options: [
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
          key: 'jumlah_produk',
          label: 'Jumlah Produk',
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
    ...mapState('riwayatPengajuan', ['addProduct', 'listWarehouses']),
  },

  watch: {
    dateRange: {
      handler() {
        this.fetchRiwayatAddProduct()
      },
    },
    partnerList: {
      handler() {
        this.fetchRiwayatAddProduct()
      },
    },
  },

  created() {
    this.fetchRiwayatAddProduct()
    this.fetchListWarehouses()
  },

  methods: {

    fetchRiwayatAddProduct() {
      this.$store
        .dispatch('riwayatPengajuan/getListAddProduct', {
          start_date: this.formatDateRange(this.dateRange.startDate),
          end_date: this.formatDateRange(this.dateRange.endDate),
          warehouse_id: this.partnerList,
        })
        .then(() => {
          this.items = this.addProduct
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

    // detail(data) {
    //   const { id } = data

    //   this.$router.push({
    //     path: `/detail-riwayat-inbound/${id}`,
    //   })
    //   localStorage.setItem('dataTes', JSON.stringify(data))
    // },

    handleDetail(data) {
      const { id } = data
      this.$router.push({
        path: `/detail-riwayat-tambah-product/${id}`,
      })
    },

    statusColor(status) {
      if (status === 'Sedang Diajukan') {
        return 'text-warning'
      } if (status === 'Selesai') {
        return 'text-success'
      }
      return 'text-danger'
    },
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY')
    },

    formatDateRange(value) {
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
