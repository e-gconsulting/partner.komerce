<template>
  <div>
    <b-row class="mb-1">
      <b-col md="7" />
      <b-col md="4">
        <b-form-input
          v-model="formSearch"
          type="search"
          class="form-search"
          placeholder="Masukkan Nama Pelanggan"
          @input="fetchData(formSearch)"
        />
        <b-icon-search class="icon-search" />
      </b-col>
      <b-col md="1">
        <b-button
          id="buttonFilter"
          variant="primary"
          size="sm"
          class="rounded-lg"
        >
          <img
            src="@/assets/images/icons/filter-icon-kompship.png"
          >
        </b-button>
        <b-popover
          target="buttonFilter"
          triggers="click"
          placement="bottomleft"
        >
          <label>Tanggal</label>
          <b-row>
            <b-col md="6">
              <b-form-input type="date" />
            </b-col>
            <b-col md="6">
              <b-form-input type="date" />
            </b-col>
          </b-row>
          <label class="mt-1">Produk</label>
          <v-select
            v-model="productFilter"
            :options="productList"
            label="product_name"
            @input="getProduct()"
          />
          <label class="mt-1">Metode Pembayaran</label>
          <v-select :options="['COD', 'Transfer']" />
          <b-row class="mx-auto mt-2">
            <b-button
              variant="outline-primary"
              class="mr-1"
            >
              Reset
            </b-button>
            <b-button variant="primary">
              Terapkan
            </b-button>
          </b-row>
        </b-popover>
      </b-col>
    </b-row>
    <b-table
      id="table-order"
      head-variant="light"
      responsive
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <template #cell(order_date)="data">
        {{ moment(data.item.order_date) }}
      </template>
      <template #cell(customer_name)="data">
        <span class="font-bold">{{ data.item.customer_name }}</span><br>
        <span
          v-if="data.item.is_komship"
          class="text-muted"
        >
          Komship
        </span>
        <span
          v-else
          class="text-muted"
        >
          Non-Komship
        </span>
      </template>
      <template #cell(product)="data">
        <div
          v-for="item in data.item.product"
          :key="item.detail_id"
          class="d-flex mb-1"
        >
          <div v-if="item.product_image === null">
            <img
              style="width:50px;height:50px;"
              :src="require('@/assets/images/avatars/image-null.png')"
            >
          </div>
          <div v-else>
            <img
              style="width:50px;height:50px;"
              :src="item.product_image"
              :alt="item.product_image"
            >
          </div>
          <div
            class="ml-1"
            style="width:70%;"
          >
            <span class="font-bold">{{ item.product_name }}</span><br>
            <span class="text-primary">{{ item.variant_name }}</span>
          </div>
          <div
            class="ml-1 font-bold"
            style="10%"
          >
            x{{ item.qty }}
          </div>
        </div>
      </template>
      <template #cell(grand_total)="data">
        Rp. {{ formatNumber(data.item.grand_total) }}<br>
        <span
          v-if="data.item.payment_method === 'COD'"
          class="text-primary"
        >
          COD
        </span>
        <div
          v-else-if="data.item.payment_method === 'BANK TRANSFER'"
          class="d-flex"
        >
          <span class="text-primary">Transfer</span>
          <img
            :id="`iconInfo` + data.item.order_id"
            src="@/assets/images/icons/info-circle.svg"
            class="icon-info"
          >
          <b-popover
            triggers="hover"
            :target="`iconInfo` + data.item.order_id"
            placement="bottomleft"
          >
            <label>Nama Bank:</label><br>
            <span class="font-bold">{{ data.item.bank }}</span><br>
            <label>No Rekening:</label><br>
            <span class="font-bold">{{ data.item.bank_account_no }}</span><br>
            <label>Pemilik Rekening:</label><br>
            <span class="font-bold">{{ data.item.bank_account_name }}</span><br>
          </b-popover>
        </div>
      </template>
      <template #cell(details)>
        <a class="button-detail">Lihat Detail</a>
      </template>
    </b-table>
    <b-row>
      <b-col
        cols="3"
      >
        <b-form-group>
          <label>Per page</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50 ml-1"
          />
        </b-form-group>
      </b-col>
      <b-col
        cols="9"
        class="d-flex justify-end"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          size="sm"
          aria-controls="table-order"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BTable, BRow, BCol, BFormGroup, BFormSelect, BPagination, BFormInput, BIconSearch, BButton, BPopover,
} from 'bootstrap-vue'
import moment from 'moment'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  components: {
    BTable, BRow, BCol, BFormGroup, BFormSelect, BPagination, BFormInput, BIconSearch, BButton, BPopover, vSelect,
  },
  data() {
    return {
      profile: {},
      items: [],
      fields: [
        { key: 'order_date', label: 'Tanggal Order', thClass: 'align-middle' },
        { key: 'customer_name', label: 'Pelanggan', thClass: 'align-middle' },
        { key: 'product', label: 'Produk', thClass: 'align-middle' },
        { key: 'grand_total', label: 'Total Pembayaran', thClass: 'align-middle' },
        { key: 'order_status', label: 'Status', thClass: 'align-middle' },
        { key: 'details', label: 'Rincian', thClass: 'align-middle' },
      ],
      formSearch: null,
      paymentMethod: [],
      productList: [],
      productFilter: null,
      sortBy: 'order_date',
      sortDesc: true,
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
    }
  },
  async created() {
    const profile = await this.$http_komship.post('v1/my-profile')
    const dataProfile = await profile.data.data
    this.profile = await dataProfile

    this.fetchData()
    this.getProduct()
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment() {
      return moment().format('DD-MM-YYYY hh:mm')
    },
    async fetchData(search) {
      const order = await this.$http_komship.get(`v1/order/${this.profile.partner_id}`, {
        params: { customer_name: search },
      })
      const { data } = await order.data.data
      this.items = await data
      this.totalRows = await data.length
    },
    async getProduct() {
      const product = await this.$http_komship.get(`v1/partner-product/${this.profile.partner_id}`)
      const { data } = await product.data
      this.productList = await data
    },
  },
}
</script>
<style>
.icon-search{
  position: absolute;
  height: 20px;
  width: 20px;
  top: 12px;
  left: 26px;
}
.form-search {
  padding-left: 40px;
  height: 45px;
  border-radius: 12px;
}
.button-detail {
  font-size: 14px;
  color: #08A0F7!important;
}
.button-detail:hover {
  color: #c3c3c3!important;
}
.icon-info {
  width: 20px;
  height: 20px;
  margin-left: 3px;
  cursor: pointer;
}
</style>
