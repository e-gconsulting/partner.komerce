<template>
  <b-card
    class="data-order-main-wrapper"
  >
    <data-order-header
      v-if="!isDetail"
      :current-view="currentView"
      @onUpdateView="updateCurrentView"
      @onSearchFilter="updateSearchFilterText"
    />

    <data-order-table
      v-if="!isDetail"
      ref="tableDataOrderOne"
      :fields="tableData.header"
      :items="tableData.items"
      :current-view="currentView"
      :search-text="searchFilterText"
      table-ref-name="tableDataOrder"
      @onOpenDetailView="openDetailView"
    />

    <data-order-detail
      v-if="isDetail"
      table-ref-name="tableDetailDataOrderOne"
      :detail-order="detailOrderData"
      @onExitDetailView="exitDetailView"
    />
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import DataOrderHeader from './DataOrderHeader.vue'
import DataOrderTable from './DataOrderTable.vue'
import DataOrderDetail from './DataOrderDetail.vue'

export default {
  components: {
    BCard,
    DataOrderHeader,
    DataOrderTable,
    DataOrderDetail,
  },
  data() {
    return {
      currentView: 'all',
      searchFilterText: '',
      isDetail: false,
      detailOrderData: {},
      tableData: {
        header: [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'status', label: 'Status' },
          { key: 'details', label: 'Rincian' },
        ],
        items: [
          {
            order_id: 1,
            customer_name: 'Putri Marani',
            status: 'Diterima',
            order_date: '22 Agustus 2021 16:30',
            order_no: 'RT1219868',
            district: 'Purbalingga',
            detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
            shipping_cost: 20000,
            grand_total: 980000,
            payment_methode: 'COD',
            is_komship: 1,
            bank: null,
            airway_bill: 120109299303930,
            product: [
              {
                product_id: 1,
                product_name: 'Jilbab Pasmia 1-SKU 332',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: 'M - Merah',
                weight: 1000,
                price: 380000,
                qty: 1,
              },
              {
                product_id: 2,
                product_name: 'Jilbab Pasmia 1-SKU 331',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: 'M - Merah',
                weight: 1000,
                price: 200000,
                qty: 1,
              },
              {
                product_id: 3,
                product_name: 'Jilbab Pasmia 1-SKU 330',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: 'M - Merah',
                price: 200000,
                qty: 1,
              },
              {
                product_id: 4,
                product_name: 'Jilbab Pasmia 1-SKU 339',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: 'M - Merah',
                weight: 1000,
                price: 200000,
                qty: 1,
              },
            ],
          },
          {
            order_id: 2,
            customer_name: 'Putri Marani',
            status: 'Diterima',
            order_date: '22 Agustus 2021. 16:30',
            order_no: 'RT1219868',
            district: 'Purbalingga',
            detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
            shipping_cost: 20000,
            is_komship: 0,
            grand_total: 980000,
            payment_methode: 'Non COD',
            airway_bill: null,
            bank: {
              bank_name: 'BCA',
              account_no: 33129898,
              account_name: 'Hj. Mabur',
            },
            product: [
              {
                product_id: 1,
                product_name: 'Jilbab Pasmia 1-SKU 332',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: '-',
                weight: 1000,
                price: 100000,
                qty: 5,
              },
              {
                product_id: 2,
                product_name: 'Jilbab Pasmia 1-SKU 331',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: '-',
                weight: 1000,
                price: 100000,
                qty: 1,
              },
              {
                product_id: 3,
                product_name: 'Jilbab Pasmia 1-SKU 330',
                product_image: 'images/product/product-980312037.jpg',
                product_variant: '-',
                weight: 1000,
                price: 140000,
                qty: 1,
              },
            ],
          },
        ],
      },
    }
  },
  async mounted() {
    this.getProfile()
  },
  methods: {
    updateCurrentView(val) {
      if (val) this.currentView = val
      if (this.currentView === 'all') {
        this.tableData.header = [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'status', label: 'Status' },
          { key: 'details', label: 'Rincian' },
        ]
      } else if (this.currentView === 'send') {
        this.tableData.header = [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'district', label: 'Alamat' },
          { key: 'details', label: 'Rincian' },
        ]
      } else if (this.currentView === 'sent') {
        this.tableData.header = [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'airway_bill', label: 'No Resi' },
          { key: 'details', label: 'Rincian' },
        ]
      } else if (this.currentView === 'received') {
        this.tableData.header = [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'acc_date', label: 'Tanggal Diterima' },
          { key: 'details', label: 'Rincian' },
        ]
      } else if (this.currentView === 'retur') {
        this.tableData.header = [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'acc_date', label: 'Tanggal Diterima' },
          { key: 'details', label: 'Rincian' },
        ]
      }
    },
    updateSearchFilterText(val) {
      if (val) this.searchFilterText = val
    },
    openDetailView(data) {
      if (data) {
        this.isDetail = true
        this.detailOrderData = data
      }
    },
    exitDetailView() {
      this.isDetail = false
      this.detailOrderData = {}
    },
    getProfile() {
      return this.$http
        .get('/v1/my-profile', {
          // params: {
          //   sort: 'name',
          //   direction: 'asc',
          // },
        })
        .then(async response => {
          const { data } = response.data
          console.log('berhasil data', data)
          // this.provinceItems = data
        })
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'data-order.scss';
</style>
