<template>
  <div class="border pt-1 -mt-4">
    <div class="pt-5">
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'RiwayatInbound',
  data() {
    return {
      loading: false,

      // filter
      partnerList: '',
      date: '',

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
    ...mapState('riwayatPengajuan', ['berlangganan']),
  },

  created() {
    this.fetchRiwayatBerlangganan()
  },

  methods: {

    handleDetail(data) {
      const { id } = data
      this.$router.push({
        path: `/detail-riwayat-tambah-product/${id}`,
      })
    },

    fetchRiwayatBerlangganan() {
      this.$store
        .dispatch('riwayatPengajuan/getListBerlangganan')
        .then(() => {
          this.items = this.berlangganan
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

    // detail(data) {
    //   const { id } = data

    //   this.$router.push({
    //     path: `/detail-riwayat-inbound/${id}`,
    //   })
    //   localStorage.setItem('detailInbound', JSON.stringify(data))
    // },

    statusColor(status) {
      if (status === 'Sedang Diajukan') {
        return 'text-warning'
      } if (status === 'Disetujui') {
        return 'text-success'
      }
      return 'text-danger'
    },
    formatDate(value) {
      return moment(value).format('DD MMMM YYYY')
    },
  },
}
</script>
