<template>
  <div class="-mt-4">
    <BOverlay
      :show="loading"
      spinner-variant="primary"
      variant="light"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        id="table"
        empty-text="Tidak ada data yang ditampilkan."
        responsive
        show-empty
        :fields="fields"
        :items="barang"
        class="mb-0"
      >
        <template #cell(outbound_date)="data">
          {{ formatDate(data.item.outbound_date) }}
        </template>
        <template #cell(status)="data">
          <div
            class="d-flex justify-content-center"
          >
            <div :class="handleStatus('class', data.item.status, data.item.reason)">
              {{ handleStatus('text', data.item.status, data.item.reason) }}
            </div>
          </div>
        </template>
        <template #cell(action)="data">
          <button
            v-if="data.item.reason === 'Barang Rusak'"
            class="text-[#4285F4] outline-none"
            @click="handlePopup(data.item.id)"
          >
            Lihat Detail
          </button>
          <button
            v-else
            class="text-[#4285F4] outline-none"
            @click="handleDetail(data.item.id)"
          >
            Lihat Detail
          </button>
        </template>
      </b-table>
    </BOverlay>
    <DetailBarangRusak :res="resRusak" />
  </div>
</template>

<script>
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DetailBarangRusak from './DetailBarangRusak.vue'

export default {
  components: { DetailBarangRusak },
  props: {
    gudang: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      default: '',
    },
    dateRange: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      fields: [
        {
          key: 'outbound_date',
          label: 'Tanggal',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'reason',
          label: 'Alasan',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'warehouse_name',
          label: 'Gudang',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'total_product',
          label: 'Jumlah Produk',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
        {
          key: 'status',
          label: 'Status',
          thClass: 'text-black py-1 text-center',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black text-sm',
        },
        {
          key: 'action',
          label: 'Action',
          thClass: 'text-black py-1',
          thStyle: {
            fontSize: '14px',
            color: 'black',
            textTransform: 'capitalize',
          },
          tdClass: 'text-black',
        },
      ],
      barang: [],
      limit: 50,
      offset: 0,
      lastData: false,

      resRusak: {},
    }
  },
  created() {
    this.fetchData()
    this.$emit('statusFilter', 'dataBarang')
    this.$router.replace({ query: { tab: 'data-barang-dikeluarkan' } })
  },
  mounted() {
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('table').offsetHeight && !this.loading) {
        this.fetchNextData()
      }
    }
  },
  methods: {
    async fetchDataNoParams() {
      this.loading = true
      await this.$http_komship.get('/v1/komship/outbound', {
        params: {
          limit: 50,
          offset: 0,
          warehouse_id: '',
          status: '',
          start_date: '',
          end_date: '',
        },
      })
        .then(res => {
          const { data } = res.data
          this.barang = data
          this.loading = false
          this.offset = data.length
          if (data.length < this.limit) {
            this.lastData = true
          } else {
            this.lastData = false
          }
        }).catch(() => {
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
    async fetchData() {
      this.offset = 0
      this.loading = true
      await this.$http_komship.get('/v1/komship/outbound', {
        params: {
          limit: this.limit,
          offset: this.offset,
          warehouse_id: this.gudang,
          status: this.status,
          start_date: this.formatDateFilter(this.dateRange.startDate),
          end_date: this.formatDateFilter(this.dateRange.endDate),
        },
      })
        .then(res => {
          const { data } = res.data
          this.barang = data
          this.loading = false
          this.offset = data.length
          if (data.length < this.limit) {
            this.lastData = true
          } else {
            this.lastData = false
          }
        }).catch(() => {
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
    async fetchNextData() {
      if (!this.lastData) {
        this.loading = true
        await this.$http_komship.get('/v1/komship/outbound', {
          params: {
            limit: this.limit,
            offset: this.offset,
          },
        })
          .then(res => {
            const { data } = res.data
            this.barang.push(...data)
            this.loading = false
            this.offset += data.length
            if (data.length < this.limit) {
              this.lastData = true
            }
          }).catch(() => {
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
    async handlePopup(id) {
      await this.$http_komship.get(`/v1/komship/outbound/${id}/detail`)
        .then(res => {
          const { data } = res.data
          this.resRusak = data
          this.$bvModal.show('modal-detail')
        }).catch(() => {
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
    handleDetail(id) {
      this.$router.push({
        path: `/penarikan-barang/detail/${id}`,
      })
    },
    handleStatus(part, status, reason) {
      if (part === 'class') {
        if (status === 'Diajukan') return 'status status-waiting'
        if (status === 'Selesai' && reason === 'Penarikan Barang') return 'status status-done'
        if (status === 'Ditolak') return 'status status-reject'
        if (status === 'Diproses') return 'status status-acc'
        if (status === 'Selesai' && reason === 'Barang Rusak') return 'status status-acc'
      }
      if (status === 'Diajukan') return 'Menunggu respon mitra'
      if (status === 'Diproses') return 'Disetujui'
      if (status === 'Selesai' && reason === 'Barang Rusak') return 'Disetujui'
      return status
    },
    formatDate(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    formatDateFilter(value) {
      return moment(value).format('YYYY-MM-DD')
    },
  },
}

</script>

<style lang="scss" scoped>
.status {
  padding: 2px 8px;
  border-radius: 100px;
  text-align: center;
  &-acc {
    color: #34A770;
    background: #DCF3EB;
  }
  &-waiting {
    color: #FBA63C;
    background: #FFF2E2;
  }
  &-done {
    color: #4285F4;
    background: #DFF3FF;
  }
  &-reject {
    color: #E31A1A;
    background: #FFEDED;  }
}
</style>
