<template>
  <div id="main">
    <b-row class="mb-1">
      <b-col
        lg="7"
        md="6"
      />
      <b-col
        md="4"
        class="align-items-center d-flex"
      >
        <b-form-input
          v-model="formSearch"
          type="search"
          class="form-search"
          placeholder="Cari Pelanggan atau Resi"
          @input="fetchData(formSearch)"
        />
        <b-icon-search class="icon-search" />
      </b-col>
      <b-col
        lg="1"
        sm="2"
      >
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
          id="popoverFilter"
          target="buttonFilter"
          triggers="click"
          placement="bottomleft"
        >
          <label>Tanggal</label>
          <b-row>
            <b-col md="6">
              <flat-pickr
                v-model="startDate"
                class="form-control"
                placeholder="Mulai Dari"
                :config="{ mode: 'single', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d',}"
              />
            </b-col>
            <b-col md="6">
              <flat-pickr
                v-model="endDate"
                class="form-control"
                placeholder="Sampai Dengan"
                :config="{ mode: 'single', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d', minDate: startDate}"
              />
            </b-col>
          </b-row>
          <label class="mt-1">Gudang</label>
          <v-select
            v-model="addressId"
            :options="addressList"
            :reduce="(option) => option.address_id"
            label="address_name"
          >
            <span
              slot="no-options"
              @click="$refs.select.open = false"
            />
          </v-select>
          <label class="mt-1">Produk</label>
          <v-select
            v-model="productFilter"
            :options="productList"
            label="product_name"
            @input="getProduct()"
          >
            <span
              slot="no-options"
              @click="$refs.select.open = false"
            />
          </v-select>
          <label class="mt-1">Metode Pembayaran</label>
          <v-select
            v-model="paymentMethod"
            :options="['COD', 'BANK TRANSFER']"
          />
          <b-row class="mx-auto mt-2">
            <b-button
              variant="outline-primary"
              class="mr-1"
              @click.prevent="resetFilter()"
            >
              Reset
            </b-button>
            <b-button
              variant="primary"
              @click.prevent="fetchData()"
            >
              Terapkan
            </b-button>
          </b-row>
        </b-popover>
      </b-col>
    </b-row>
    <b-table
      id="table-order"
      responsive
      show-empty
      empty-text="Tidak ada data untuk ditampilkan."
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      :busy="loadingTable"
    >
      <template #cell(order_date)="data">
        {{ moment(data.item.order_date) }}
      </template>
      <template #cell(customer_name)="data">
        <span class="font-bold">{{ data.item.customer_name }}</span><br>
        <div
          v-if="data.item.is_komship"
          class="d-flex"
        >
          <img
            :src="data.item.shipment_image_path"
            style="width:45px"
          ><span class="my-auto">{{ shippingTypeLabel(data.item.shipping_type) }}</span>
        </div>
        <span
          v-else
          class="text-muted"
        >
          Non-Komship
        </span>
      </template>
      <template #cell(product)="data">
        <div v-if="data.item.product[0]">
          <div
            v-for="(itemProduct, index) in data.item.product.slice(0, 1)"
            :key="index+1"
            class="d-flex"
            style="min-width:160px!important"
          >
            <img
              v-if="data.item.product[0].product_image === null || data.item.product[0].product_image === ''"
              class="image-product"
              :src="require('@/assets/images/avatars/image-null.png')"
            >
            <img
              v-else
              class="image-product"
              :src="data.item.product[0].product_image"
              :alt="data.item.product[0].product_image"
            >
            <div style="margin-left:5px;">
              <span class="d-flex font-bold">{{ data.item.product[0].product_name }}</span>
              <span
                v-if="itemProduct.variant_name !== '0'"
                class="text-primary"
              >{{ itemProduct.variant_name }}</span>
            </div>
            <div
              class="font-bold ml-auto"
            >
              x{{ itemProduct.qty }}
            </div>
          </div>
          <div v-if="data.item.product.length > 1">
            <b-collapse :id="'collapse-'+data.item.order_id">
              <div
                v-for="item in data.item.product.slice(1, data.item.product.length)"
                :key="item.order_id"
                class="d-flex mt-1"
                style="min-width:160px!important"
              >
                <img
                  v-if="data.item.product[0].product_image === null || data.item.product[0].product_image === ''"
                  class="image-product"
                  :src="require('@/assets/images/avatars/image-null.png')"
                >
                <img
                  v-else
                  class="image-product"
                  :src="data.item.product[0].product_image"
                  :alt="data.item.product[0].product_image"
                >
                <div style="margin-left:5px;">
                  <span class="d-flex font-bold">{{ data.item.product[0].product_name }}</span>
                  <span
                    v-if="item.variant_name !== '0'"
                    class="text-primary"
                  >{{ item.variant_name }}</span>
                </div>
                <div
                  class="font-bold ml-auto"
                >
                  x{{ item.qty }}
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </template>
      <template #cell(grand_total)="data">
        <span class="d-flex">
          Rp {{ formatNumber(data.item.grand_total) }}
          <img
            v-if="data.item.order_notes !== '0' && data.item.order_notes !== '' && data.item.order_notes !== null"
            :id="`infoNote` + data.item.order_id"
            src="@/assets/images/icons/info-order-notes.svg"
            class="ml-auto cursor-pointer"
            style="max-width:20px"
          >
          <b-popover
            triggers="hover"
            :target="`infoNote` + data.item.order_id"
            placement="bottomright"
          >
            {{ data.item.order_notes }}
          </b-popover>
        </span>
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
            v-if="data.item.bank !== '0'"
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
      <template #cell(updated_at)="data">
        {{ moment(data.item.updated_at) }}
      </template>
      <template #cell(details)="data">
        <b-button
          variant="none"
          class="button-detail d-flex"
          :to="{ name: $route.meta.routeDetail, params: { order_id: data.item.order_id } }"
        >
          Lihat Detail
        </b-button>
        <div
          v-if="data.item.product.length > 1"
        >
          <b-button
            v-b-toggle="'collapse-'+data.item.order_id"
            class="buttonCollapse px-0 text-right relative"
            variant="none"
            size="sm"
          >
            <span class="when-open">Tutup <b-icon-chevron-up /></span>
            <span class="when-closed">{{ data.item.product.length - 1 }} Produk lainnya <b-icon-chevron-down /></span>
          </b-button>
        </div>
      </template>
    </b-table>
    <div
      v-if="loadingTable"
      class="loading-data-order"
    >
      <lottie-animation
        path="animation/loading-data-order.json"
        :width="300"
        :height="300"
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import vSelect from 'vue-select'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'
import 'vue-select/dist/vue-select.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'
import '@/@core/scss/vue/libs/vue-flatpicker.scss'

export default {
  components: {
    vSelect, flatPickr, LottieAnimation,
  },
  data() {
    return {
      profile: JSON.parse(localStorage.userData),
      items: [],
      fields: [
        {
          key: 'order_date', label: 'Tanggal Order', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'customer_name', label: 'Pelanggan', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'product', label: 'Produk', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'grand_total', label: 'Total Pembayaran', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'updated_at', label: 'Tanggal Diterima', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'details', label: 'Rincian', thClass: 'align-middle', tdClass: 'align-top',
        },
      ],
      loadingTable: false,
      formSearch: null,
      paymentMethod: [],
      productList: [],
      productFilter: null,
      customerName: null,
      startDate: '',
      endDate: '',
      limit: 50,
      offset: 0,
      totalItems: 0,
      addressId: null,
      addressList: [],
    }
  },
  mounted() {
    this.fetchData()
    this.getProduct()
    this.getAddress()
  },
  created() {
    window.addEventListener('click', async e => {
      if (document.getElementById('popoverFilter') !== null) {
        if (!document.getElementById('popoverFilter').contains(e.target)) {
          this.$root.$emit('bv::hide::popover')
        } else {
          e.stopPropagation()
        }
      }
    })
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.getElementById('main').offsetHeight && !this.loadingTable) {
        this.getNextData()
      }
    }
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY HH:mm')
      }
      return date
    },
    async fetchData(search) {
      this.loadingTable = true
      await this.$http_komship.get(`v2/order/${this.profile.partner_detail.id}`, {
        params: {
          order_status: 'Diterima',
          search,
          payment_method: this.paymentMethod,
          start_date: this.startDate,
          end_date: this.endDate,
          partner_address_id: this.addressId,
          limit: this.limit,
          offset: this.offset,
        },
      })
        .then(result => {
          const { data } = result.data
          this.items = data
          this.loadingTable = false
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          })
          this.loadingTable = false
        })
    },
    getNextData() {
      this.loadingTable = true
      this.$http_komship.get(`v2/order/${this.profile.partner_detail.id}`, {
        params: {
          search: this.formSearch,
          product_name: this.productName,
          payment_method: this.paymentMethod,
          start_date: this.startDate,
          end_date: this.endDate,
          partner_address_id: this.addressId,
          limit: this.limit,
          offset: this.offset,
        },
      })
        .then(result => {
          const { data } = result.data
          this.items.push(...data)
          this.offset += this.limit
          this.loadingTable = false
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          })
        })
    },
    resetFilter() {
      this.startDate = null
      this.endDate = null
      this.customerName = null
      this.paymentMethod = null
      return this.fetchData()
    },
    getProduct() {
      this.$http_komship.get(`v1/partner-product/${this.profile.partner_detail.id}`)
        .then(response => {
          const { data } = response.data
          this.productList = data
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          })
        })
    },
    async getAddress() {
      setTimeout(async () => {
        await this.$http_komship.get(`/v1/address?partner_id=${this.profile.partner_detail.id}`)
          .then(res => {
            const { data } = res.data
            this.addressList = data
          })
      }, 800)
    },
    shippingTypeLabel(value) {
      if (value === 'REG19' || value === 'SIUNT' || value === 'STD' || value === 'IDlite' || value === 'CTC19') {
        return 'Reguler'
      } if (value === 'GOKIL') {
        return 'Cargo'
      }
      return value
    },
  },
}
</script>
<style>
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
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
.buttonCollapse {
  margin-left: -50px;
  width:130px;
}
.btnPage {
  padding: 4px 7px;
  margin-right: 5px;
}
.image-product {
  object-fit: cover;
  object-position: center center;
  width: 50px!important;
  height: 50px!important;
}
.loading-data-order {
  position: fixed;
  left: 0px;
  top: 33%;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
