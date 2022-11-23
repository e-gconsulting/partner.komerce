<template>
  <b-card body>
    <div class="">
      <b-button
        variant="primary"
        size="sm"
        class="mr-1 rounded-lg p-0"
        @click="$router.go(-1)"
      >
        <feather-icon
          size="2x"
          icon="ChevronLeftIcon"
        />
      </b-button>
      <h4 class="font-bold text-black d-inline-flex mb-0">
        Detail Inbound
      </h4>
    </div>
    <div class="d-flex flex-row-reverse">
      <div class="space-x-3">
        <b-button
          variant="outline-primary"
          class="px-3"
        >Batalkan</b-button>
        <b-button
          variant="outline-primary"
          class="px-5"
        >Edit</b-button>
      </div>
    </div>
    <div class="d-flex border mt-1 mb-2 p-1 text-black">
      <div class="w-25 px-0">
        <b-list-group class="">
          <b-list-group-item class="border-0">
            Status Inbound
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Dikirim dari
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Dikirim ke
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Jasa Pengiriman
          </b-list-group-item>
          <b-list-group-item class="border-0">
            Ekspedisi
          </b-list-group-item>
          <b-list-group-item class="border-0">
            No Resi
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="w-75 px-0">
        <b-list-group class="">
          <b-list-group-item class="border-0">
            <strong>{{ dataInbound.status }}</strong>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <strong>{{ 'ssdd' }}</strong>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            <strong>{{ 'ssdd' }}</strong>
          </b-list-group-item>
          <b-list-group-item class="border-0">
            {{ 'Menggunakan Ekspedisi' }}
          </b-list-group-item>
          <b-list-group-item class="border-0">
            {{ courierName }}
          </b-list-group-item>
          <b-list-group-item class="border-0">
            {{ resiNumber }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div class="d-flex">
      <div
        class="border mr-2"
        style="width: 55%;"
      >
        <h5 class="text-black font-bold m-2">
          Data Product</h5>
        <BTable
          small
          class="text-center"
          :fields="fields"
          :items="items"
          responsive="sm"
        >
          <template #cell(nama_produk)="data">
            {{ data.item.products.product_name }}
          </template>
        </BTable>
      </div>
      <div
        class="border"
        style="width: 45%;"
      >
        dd
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import secureLocalStorage from '@/libs/secureLocalstorage'

export default {
  name: 'RiwayatInbound',
  data() {
    return {
      courierName: '',
      resiNumber: '',

      detailInbound: JSON.parse(localStorage.getItem('dataTes')),

      fields: [
        {
          key: 'nama_produk',
          label: 'Nama Produk',
        },
        {
          key: 'variasi',
          label: 'Variasi',
        },
        {
          key: 'jumlah',
          label: 'Jumlah',
        },
      ],

      items: [],
    }
  },

  computed: {
    ...mapState('riwayatPengajuan', ['inbound']),
  },

  created() {
    this.fetchDetailInbound()

    console.log('1', this.dataInbound)
  },

  methods: {
    fetchDetailInbound() {
      this.$store
        .dispatch('riwayatPengajuan/getDetailInbound', {
          inbound_id: this.$route.params.id,
        })
        .then(() => {
          console.log('success')
          // const params = this.$route.params.id

          // console.log(params)
          // console.log('ini inbound', this.inbound)

          // this.items = this.inbound.filter(item => item.id === params)

          // console.log('fix', this.inbound.filter(item => item.id === params))
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

    shippingMethods(part, shipping) {
      if (part === 'img') {
        if (shipping != null) {
          return 'https://storage.googleapis.com/komerce/assets/dikirimekpedisi.svg'
        }
        return 'https://storage.googleapis.com/komerce/assets/ekpedisidikirim-pribadi.svg'
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
  },
}
</script>
