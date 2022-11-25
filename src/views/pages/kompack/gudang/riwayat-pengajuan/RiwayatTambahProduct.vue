<template>
  <div class="border pt-1 -mt-4">
    <div class="d-flex flex-row space-x-3 float-right mb-2 px-1">
      <BFormSelect
        v-model="partnerList"
        :options="options"
        style="width: 250%"
      />
      <BFormSelect
        v-model="date"
        :options="dateList"
        style="width: 250%"
      />
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
                {{ data.item.warehouses_name }}
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
            @click="detail(data.item)"
          >
            <u>Lihat Detail</u>
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
    ...mapState('riwayatPengajuan', ['addProduct']),
  },

  created() {
    this.fetchRiwayatAddProduct()
    console.log('list', this.addProduct)
  },

  methods: {

    fetchRiwayatAddProduct() {
      this.$store
        .dispatch('riwayatPengajuan/getListAddProduct')
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

    // detail(data) {
    //   const { id } = data

    //   this.$router.push({
    //     path: `/detail-inbound/${id}`,
    //   })
    //   localStorage.setItem('dataTes', JSON.stringify(data))
    // },

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
