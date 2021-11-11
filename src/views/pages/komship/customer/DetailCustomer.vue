<template>
  <b-overlay
    opacity=".5"
    blur="0"
    spinner-variant="primary"
    rounded="sm"
    variant="light"
    :show="loading"
  >
    <b-card>
      <h4><strong>Detail Customer</strong></h4>
      <b-row class="d-flex align-items-center justify-content-between mt-2">
        <b-col>
          <h5 class="ml-2">
            <strong>Informasi Customer</strong>
          </h5>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button
            class="mr-2"
            variant="success"
            size="sm"
          >
            <b-img
              src="@core/assets/image/icon-wa.png"
              class="mr-50"
            />
            <a
              class="text-white"
              :href="`https://wa.me/${customerContact}`"
            >
              <span class="align-middle">Hubungi Customer</span>
            </a>
          </b-button>
        </b-col>
      </b-row>

      <b-row class="mt-2 border ml-2 mr-2 pt-1 pb-1">
        <b-col
          md="7"
          class="d-flex align-items-center"
        >
          <b-avatar
            class="ml-2 mr-50"
          />
          <div>
            <h5><strong>{{ customerName }}</strong></h5>
            <span>{{ customerContact }}</span>
          </div>
        </b-col>
        <b-col md="5">
          <span>{{ customerAddress }}</span>
        </b-col>
      </b-row>

      <b-col
        cols="12"
        class="mt-3"
      >
        <h5 class="ml-50">
          <strong>Laporan</strong>
        </h5>
      </b-col>

      <b-row class="border ml-2 mr-2 pt-1 pb-1">
        <b-col
          md="7"
        >
          <b-row>
            <b-col md="auto">
              <div class="mt-1">
                <strong>Terakhir Order</strong>
              </div>
              <div class="mt-1">
                <strong>Total Order</strong>
              </div>
              <div class="mt-1">
                <strong>Total Pcs</strong>
              </div>
            </b-col>
            <b-col>
              <div class="mt-1">
                {{ lastOrder }}
              </div>
              <div class="mt-1">
                {{ totalOrder }}
              </div>
              <div class="mt-1">
                {{ totalPcs }}
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="5">
          <b-row>
            <b-col md="auto">
              <div class="mt-1">
                <strong>Produk Favorit</strong>
              </div>
              <div class="mt-1">
                <strong>Uang Dihabiskan</strong>
              </div>
              <div class="mt-1">
                <strong>Rata - rata Belanja</strong>
              </div>
            </b-col>
            <b-col>
              <div class="mt-1">
                {{ productFavorit }}
              </div>
              <div class="mt-1">
                Rp. {{ totalSpent }}
              </div>
              <div class="mt-1">
                Rp. {{ averageSpent }}
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-col
        cols="12"
        class="mt-3"
      >
        <h5 class="ml-50">
          <strong>Riwayat Order</strong>
        </h5>
      </b-col>

      <b-row>
        <b-table
          responsive
          class="position-relative mt-2"
          empty-text="Tidak ada data untuk ditampilkan."
          :fields="fields"
          :items="itemsDetailCustomer"
        >

          <template #cell(order_date)="data">
            {{ data.item.order_date }}
          </template>

          <template #cell(all_order_detail)="data">
            <div
              v-for="(items, index) in data.item.all_order_detail"
              :key="index+1"
            >
              <div class="d-flex align-items-center mb-1">
                <b-avatar
                  square
                  size="50px"
                  variant="light-primary"
                  :src="items.product.product_image[0].images_path"
                />
                <div>
                  <p class="ml-1">
                    <strong> {{ items.product_name }} </strong>
                  </p>
                  <small class="text-danger ml-1">{{ items.product_variant_name }}</small>
                </div>
              </div>
            </div>
          </template>

          <template #cell(grand_total)="data">
            Rp. {{ data.item.grand_total }}
          </template>

          <template #cell(order_status)="data">
            {{ data.item.order_status }}
          </template>

          <template #cell(rincian)="data">
            <b-button
              size="sm"
              variant="flat-info"
              tag="router-link"
              :to="{ name: $route.meta.routeDetailOrder, params: { order_id: data.item.id } }"
            >
              Lihat Detail
            </b-button>
          </template>

        </b-table>
      </b-row>

    </b-card>
  </b-overlay>
</template>

<script>
import useJwt from '@/auth/jwt/useJwt'
import {
  BRow,
  BButton,
  BCol,
  BImg,
  BAvatar,
  BTable,
  BOverlay,
  BCard,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BButton,
    BCol,
    BImg,
    BAvatar,
    BTable,
    BOverlay,
  },
  data() {
    return {
      loading: false,
      customerId: this.$route.params.customer_id,

      // Information Customer
      customerName: '',
      customerContact: '',
      customerAddress: '',

      // Report
      lastOrder: '',
      totalOrder: null,
      totalPcs: '',
      productFavorit: '',
      totalSpent: '',
      averageSpent: '',

      fields: [
        {
          key: 'order_date',
          label: 'Tanggal Order',
        },
        {
          key: 'pelanggan',
          label: 'Pelanggan',
        },
        {
          key: 'all_order_detail',
          label: 'Produk',
        },
        {
          key: 'grand_total',
          label: 'Total Pembayaran',
        },
        {
          key: 'order_status',
          label: 'Status',
        },
        {
          key: 'rincian',
          label: 'Rincian',
        },
      ],

      itemsDetailCustomer: [],
    }
  },
  mounted() {
    console.log(this.customerId)
    this.getCustomerDetail()
  },
  methods: {
    getCustomerDetail() {
      this.loading = true
      this.$httpKomship.get(`/v1/customers/${this.customerId}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        // Information Customer
        this.customerName = data.customer_name
        this.customerContact = data.customer_phone
        this.customerAddress = data.customer_address
        this.itemsDetailCustomer = data.customer_orders

        // report
        this.lastOrder = data.customer_report.last_order
        this.totalOrder = data.customer_report.total_order
        this.totalPcs = data.customer_report.total_pcs
        this.productFavorit = data.customer_report.customer_product_favorit
        this.totalSpent = data.customer_report.total_spent
        this.averageSpent = data.customer_report.average_spent

        this.loading = false

        return this.itemsDetailCustomer
      })
    },
  },
}
</script>

<style>

</style>
