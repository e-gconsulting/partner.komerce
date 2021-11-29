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
                Rp. {{ formatPrice(totalSpent) }}
              </div>
              <div class="mt-1">
                Rp. {{ formatPrice(averageSpent) }}
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

      <b-container fluid>
        <b-row class="mt-3">
          <b-col
            cols="2"
            class="pl-0 pr-0"
          >
            <h5 class="ml-2">
              <strong>
                Tanggal Order
              </strong>
            </h5>
          </b-col>
          <b-col
            cols="2"
            class="pl-0 pr-0"
          >
            <h5>
              <strong>
                Pelanggan
              </strong>
            </h5>
          </b-col>
          <b-col
            cols="3"
            class="pl-0 pr-0"
          >
            <h5>
              <strong>
                Produk
              </strong>
            </h5>
          </b-col>
          <b-col
            cols="2"
            class="pl-0 pr-0"
          >
            <h5>
              <strong>
                Total Pembayaran
              </strong>
            </h5>
          </b-col>
          <b-col
            cols="2"
            class="pl-0 pr-0"
          >
            <h5 class="text-center">
              <strong>
                Status
              </strong>
            </h5>
          </b-col>
          <b-col
            cols="1"
            class="pl-0 pr-0"
          >
            <h5>
              <strong>
                Rincian
              </strong>
            </h5>
          </b-col>
        </b-row>
        <b-col
          class="p-0 m-0"
          cols="12"
        >
          <hr style="height:1px; background-color:#828282; color: #828282; opacity: 0.5;">
        </b-col>

        <div
          v-for="(items, index) in itemsDetailCustomer"
          :key="index+1"
        >
          <b-row>
            <b-col
              cols="2"
            >
              {{ items.last_order }}
            </b-col>
            <b-col
              cols="2"
            >
              {{ items }}
            </b-col>
            <b-col
              cols="3"
            >
              {{ items }}
            </b-col>
            <b-col
              cols="2"
            >
              {{ items }}
            </b-col>
            <b-col
              cols="2"
            >
              {{ items }}
            </b-col>
            <b-col
              cols="1"
            >
              {{ items }}
            </b-col>
          </b-row>
        </div>
      </b-container>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BRow,
  BButton,
  BCol,
  BImg,
  BAvatar,
  BOverlay,
  BCard,
  BContainer,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import httpKomship from '../setting-kompship/http_komship'

export default {
  components: {
    BCard,
    BRow,
    BButton,
    BCol,
    BImg,
    BAvatar,
    BOverlay,
    BContainer,
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
    this.itemsDetailCustomer = [{
      customer_id: 4,
      customer_name: 'Pak Muh',
      customer_phone: '09182938398',
      customer_address: 'rt.10. Pulogadung, jakarta',
      customer_report: {
        last_order: '2021-10-18 09:14:33',
        total_order: 8,
        total_pcs: '62',
        total_spent: 3041952,
        average_spent: 380244,
        customer_product_favorit: 'Jilbab',
      },
      customer_orders: [
        {
          id: 4,
          customer_id: 4,
          grand_total: 128500,
          order_status: 2,
          payment_method: 'COD',
          order_date: '2021-10-18 09:14:33',
          all_order_detail: [
            {
              product_id: 22,
              detail_order_id: 4,
              product_name: 'Jilbab',
              product_variant_name: 'Merah - l',
              product: {
                id: 22,
                product_name: 'Jilbab',
                product_image: [],
              },
            },
          ],
        },
        {
          id: 32,
          customer_id: 4,
          grand_total: 61120,
          order_status: 1,
          payment_method: 'COD',
          order_date: '2021-10-18 09:14:33',
          all_order_detail: [
            {
              product_id: 26,
              detail_order_id: 32,
              product_name: 'Jilbab',
              product_variant_name: 'M',
              product: {
                id: 26,
                product_name: 'Jilbab',
                product_image: [
                  {
                    id: 24,
                    product_id: 26,
                    images_path: 'https://komshipdev.komerce.id/product_images/1637306043.jpg',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 37,
          customer_id: 4,
          grand_total: 80092,
          order_status: 1,
          payment_method: 'COD',
          order_date: '2021-10-29 20:23:43',
          all_order_detail: [
            {
              product_id: 26,
              detail_order_id: 37,
              product_name: 'Jilbab',
              product_variant_name: 'M',
              product: {
                id: 26,
                product_name: 'Jilbab',
                product_image: [
                  {
                    id: 24,
                    product_id: 26,
                    images_path: 'https://komshipdev.komerce.id/product_images/1637306043.jpg',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 46,
          customer_id: 4,
          grand_total: 81120,
          order_status: 1,
          payment_method: 'COD',
          order_date: '2021-11-08 14:30:05',
          all_order_detail: [
            {
              product_id: 26,
              detail_order_id: 46,
              product_name: 'Jilbab',
              product_variant_name: 'M',
              product: {
                id: 26,
                product_name: 'Jilbab',
                product_image: [
                  {
                    id: 24,
                    product_id: 26,
                    images_path: 'https://komshipdev.komerce.id/product_images/1637306043.jpg',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 47,
          customer_id: 4,
          grand_total: 61120,
          order_status: 1,
          payment_method: 'COD',
          order_date: '2021-11-08 14:38:34',
          all_order_detail: [
            {
              product_id: 26,
              detail_order_id: 47,
              product_name: 'Jilbab',
              product_variant_name: 'M',
              product: {
                id: 26,
                product_name: 'Jilbab',
                product_image: [
                  {
                    id: 24,
                    product_id: 26,
                    images_path: 'https://komshipdev.komerce.id/product_images/1637306043.jpg',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 73,
          customer_id: 4,
          grand_total: 90000,
          order_status: 1,
          payment_method: 'COD',
          order_date: '2021-11-23 23:06:58',
          all_order_detail: [
            {
              product_id: 26,
              detail_order_id: 73,
              product_name: 'Jilbab',
              product_variant_name: 'Merah - l',
              product: {
                id: 26,
                product_name: 'Jilbab',
                product_image: [
                  {
                    id: 24,
                    product_id: 26,
                    images_path: 'https://komshipdev.komerce.id/product_images/1637306043.jpg',
                  },
                ],
              },
            },
            {
              product_id: 27,
              detail_order_id: 73,
              product_name: 'Jilbab',
              product_variant_name: 'M',
              product: null,
            },
          ],
        },
        {
          id: 76,
          customer_id: 4,
          grand_total: 2450000,
          order_status: 1,
          payment_method: 'COD',
          order_date: '2021-11-23 23:38:59',
          all_order_detail: [
            {
              product_id: 74,
              detail_order_id: 76,
              product_name: 'Iphone 13',
              product_variant_name: 'PRO',
              product: {
                id: 74,
                product_name: 'Iphone 13',
                product_image: [],
              },
            },
          ],
        },
      ],
    }]
  },
  methods: {
    getCustomerDetail() {
      this.loading = true
      httpKomship.get(`/v1/customers/${this.customerId}`, {
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
    formatPrice(value) {
      const val = value
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>

<style>

</style>
