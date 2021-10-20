<template>
  <div>
    <b-card
      class="data-order-main-wrapper"
    >
      <data-order-header
        v-if="!isDetail"
        :current-view="currentView"
        :list-product="listProduct"
        :excel-data="excelData"
        @onUpdateView="updateCurrentView"
        @onSearchFilter="updateSearchFilterText"
        @onApplyFilter="handleApplyFilter"
        @onResetFilter="handleResetDataDisplayed"
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
        :profile="profile"
        @onExitDetailView="exitDetailView"
      />

    </b-card>
    <b-button
      class="org-button add-order-redirect-button"
      @click="handleRedirectToAddOrder"
    >
      <b-icon-plus aria-true="hidden" />
    </b-button>
  </div>
</template>

<script>
import {
  BCard,
  BButton,
  BIconPlus,
} from 'bootstrap-vue'
import DataOrderHeader from './DataOrderHeader.vue'
import DataOrderTable from './DataOrderTable.vue'
import DataOrderDetail from './DataOrderDetail.vue'

export default {
  components: {
    BCard,
    BButton,
    BIconPlus,
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
      profile: {},
      tableData: {
        header: [
          { key: 'order_date', label: 'Tanggal Order' },
          { key: 'customer_name', label: 'Pelanggan' },
          { key: 'product', label: 'Produk' },
          { key: 'grand_total', label: 'Total Pembayaran' },
          { key: 'order_status', label: 'Status' },
          { key: 'details', label: 'Rincian' },
        ],
        items: [
          // {
          //   order_id: 1,
          //   customer_name: 'Putri Marani',
          //   status: 'Diterima',
          //   order_date: '22 Agustus 2021 16:30',
          //   order_no: 'RT1219868',
          //   district: 'Purbalingga',
          //   detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
          //   shipping_cost: 20000,
          //   grand_total: 980000,
          //   payment_methode: 'COD',
          //   is_komship: 1,
          //   bank: null,
          //   airway_bill: 120109299303930,
          //   product: [
          //     {
          //       product_id: 1,
          //       product_name: 'Jilbab Pasmia 1-SKU 332',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: 'M - Merah',
          //       weight: 1000,
          //       price: 380000,
          //       qty: 1,
          //     },
          //     {
          //       product_id: 2,
          //       product_name: 'Jilbab Pasmia 1-SKU 331',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: 'M - Merah',
          //       weight: 1000,
          //       price: 200000,
          //       qty: 1,
          //     },
          //     {
          //       product_id: 3,
          //       product_name: 'Jilbab Pasmia 1-SKU 330',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: 'M - Merah',
          //       price: 200000,
          //       qty: 1,
          //     },
          //     {
          //       product_id: 4,
          //       product_name: 'Jilbab Pasmia 1-SKU 339',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: 'M - Merah',
          //       weight: 1000,
          //       price: 200000,
          //       qty: 1,
          //     },
          //   ],
          // },
          // {
          //   order_id: 2,
          //   customer_name: 'Putri Marani',
          //   status: 'Diterima',
          //   order_date: '22 Agustus 2021. 16:30',
          //   order_no: 'RT1219868',
          //   district: 'Purbalingga',
          //   detail_address: 'Jl. Raya Tamansari, Kompleks Karangwuni, Desa, Dusun I, Tamansari, Karangmoncol, Kabupaten Purbalingga, Jawa Tengah 53355',
          //   shipping_cost: 20000,
          //   is_komship: 0,
          //   grand_total: 980000,
          //   payment_methode: 'Non COD',
          //   airway_bill: null,
          //   bank: {
          //     bank_name: 'BCA',
          //     account_no: 33129898,
          //     account_name: 'Hj. Mabur',
          //   },
          //   product: [
          //     {
          //       product_id: 1,
          //       product_name: 'Jilbab Pasmia 1-SKU 332',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: '-',
          //       weight: 1000,
          //       price: 100000,
          //       qty: 5,
          //     },
          //     {
          //       product_id: 2,
          //       product_name: 'Jilbab Pasmia 1-SKU 331',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: '-',
          //       weight: 1000,
          //       price: 100000,
          //       qty: 1,
          //     },
          //     {
          //       product_id: 3,
          //       product_name: 'Jilbab Pasmia 1-SKU 330',
          //       product_image: 'images/product/product-980312037.jpg',
          //       product_variant: '-',
          //       weight: 1000,
          //       price: 140000,
          //       qty: 1,
          //     },
          //   ],
          // },
        ],
      },
      listProduct: [],
      excelData: {
        header: {
          'Tanggal Order': 'order_date',
          Pelanggan: 'customer_name',
          Produk: {
            field: 'product',
            callback: value => `${value[0].product_name}`,
          },
          'Produk Variant': {
            field: 'product',
            callback: value => `${value[0].variant_name}`,
          },
          'Produk Jumlah': {
            field: 'product',
            callback: value => `${value[0].qty}`,
          },
          'Total Harga Produk': 'grand_total',
          'Status Order': 'order_status',
        },
        items: [],
      },
    }
  },
  async mounted() {
    this.reload()
  },
  methods: {
    updateCurrentView(val) {
      if (val) this.currentView = val
      this.tableData.header = [
        { key: 'order_date', label: 'Tanggal Order' },
        { key: 'customer_name', label: 'Pelanggan' },
        { key: 'product', label: 'Produk' },
        { key: 'grand_total', label: 'Total Pembayaran' },
      ]

      this.excelData.header = {
        'Tanggal Order': 'order_date',
        Pelanggan: 'customer_name',
        Produk: {
          field: 'product',
          callback: value => `${value[0].product_name}`,
        },
        'Produk Variant': {
          field: 'product',
          callback: value => `${value[0].variant_name}`,
        },
        'Produk Jumlah': {
          field: 'product',
          callback: value => `${value[0].qty}`,
        },
        'Total Harga Produk': 'grand_total',
      }

      if (this.currentView === 'all') {
        this.tableData.header.push({ key: 'order_status', label: 'Status' })
        this.tableData.header.push({ key: 'details', label: 'Rincian' })
        Object.assign(this.excelData.header, { 'Status Order': 'order_status' })
      } else if (this.currentView === 'send') {
        this.tableData.header.push({ key: 'district', label: 'Alamat' })
        this.tableData.header.push({ key: 'details', label: 'Rincian' })
        Object.assign(this.excelData.header, { Alamat: 'district' })
      } else if (this.currentView === 'sent') {
        this.tableData.header.push({ key: 'airway_bill', label: 'No Resi' })
        this.tableData.header.push({ key: 'details', label: 'Rincian' })
        Object.assign(this.excelData.header, { 'No Resi': 'airway_bill' })
      } else if (this.currentView === 'received') {
        this.tableData.header.push({ key: 'acc_date', label: 'Tanggal Diterima' })
        this.tableData.header.push({ key: 'details', label: 'Rincian' })
        Object.assign(this.excelData.header, { 'Tanggal Diterima': 'order_date' })
      } else if (this.currentView === 'retur') {
        this.tableData.header.push({ key: 'acc_date', label: 'Tanggal Diterima' })
        this.tableData.header.push({ key: 'details', label: 'Rincian' })
        Object.assign(this.excelData.header, { 'Tanggal Diterima': 'order_date' })
      }
    },
    updateSearchFilterText(val) {
      if (val) this.searchFilterText = val
    },
    async openDetailView(data) {
      if (data) {
        await this.getOrderDetail(data.order_id)
      }
    },
    exitDetailView() {
      this.isDetail = false
      this.detailOrderData = {}
    },
    handleRedirectToAddOrder() {
      this.$router.push('add-order')
    },
    async handleApplyFilter(params) {
      this.loading = true
      await this.getOrderByFilter(params)
      this.loading = false
    },
    async handleResetDataDisplayed() {
      this.loading = true
      await this.getOrder()
      this.loading = false
    },
    async reload() {
      this.loading = true
      await this.getProfile()
      await this.getListProductByPartner()
      await this.getOrder()
      this.loading = false
    },
    getProfile() {
      return this.$http_komship.post('v1/my-profile').then(response => {
        const { data } = response.data
        console.log('this.profile', data)
        this.profile = data
      }).catch(() => {
        console.log('gagal2')
      })
    },
    getListProductByPartner() {
      const partnerId = this.profile.partner_id
      return this.$http_komship.get(`v1/partner-product/${partnerId}`).then(response => {
        const { data } = response.data
        console.log('this.product', data)
        this.listProduct = data
      }).catch(() => {
        console.log('gagal2')
      })
    },
    getOrder() {
      return this.$http_komship.get(`v1/order/${this.profile.partner_id}`).then(response => {
        const { data } = response.data.data
        console.log('listAllOrder', data)
        this.tableData.items = data
        this.excelData.items = data
        console.log('this.items', this.tableData.items)
      }).catch(() => {
        this.alertFail('Unable to get the list of the order. Please try again later or contact support.')
      })
    },
    getOrderDetail(orderId) {
      return this.$http_komship.get(`v1/order/${this.profile.partner_id}/detail/${orderId}`).then(response => {
        const { data } = response.data
        console.log('listOrderDetail', data)
        this.detailOrderData = data
        this.isDetail = true
        console.log('this.detailOrderData', this.detailOrderData)
      }).catch(() => {
        this.alertFail('Unable to get the order detail. Please try again later or contact support.')
      })
    },
    getOrderByFilter(values) {
      return this.$http_komship.get(`v1/order/${this.profile.partner_id}`, {
        params: { ...values },
      }).then(response => {
        const { data } = response.data.data
        console.log('listAllOrderFromFilter', data)
        this.tableData.items = data
        this.excelData.items = data
      }).catch(() => {
        this.alertFail('Unable to get the list of the order. Please try again later or contact support.')
      })
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'data-order.scss';
</style>
