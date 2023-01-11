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
            <div :class="handleStatus('class', data.item.status)">
              {{ handleStatus('text', data.item.status) }}
            </div>
          </div>
        </template>
        <template #cell(action)="data">
          <button
            class="text-[#4285F4] outline-none"
            @click="handleDetail(data.item.id)"
          >
            Lihat Detail
          </button>
        </template>
      </b-table>
    </BOverlay>
  </div>
</template>

<script>
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
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
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      await this.$http_komship.get('/v1/komship/outbound')
        .then(res => {
          const { data } = res.data
          this.barang = data
          this.loading = false
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
    handleDetail(id) {
      console.log(id)
    },
    handleStatus(part, status) {
      if (part === 'class') {
        if (status === 'Diajukan') return 'status status-waiting'
        if (status === 'Selesai') return 'status status-done'
        if (status === 'Ditolak') return 'status status-reject'
        if (status === 'Diproses') return 'status status-acc'
      }
      if (status === 'Diajukan') return 'Menunggu respon mitra'
      if (status === 'Diproses') return 'Disetujui'
      return status
    },
    formatDate(date) {
      return moment(date).format('DD MMMM YYYY')
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
