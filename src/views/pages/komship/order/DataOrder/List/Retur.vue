<template>
  <div>
    <b-row class="mb-1 justify-content-between align-items-center">
      <b-col cols="6">
        <div
          class="py-2 px-50"
          style="border: 1px solid #626262; border-radius: 9px;"
        >
          <b-row class="mb-2 align-items-center">
            <b-col cols="5">
              <span class="text-black">
                <strong>
                  Jumlah Retur
                </strong>
              </span>
            </b-col>
            <b-col cols="7">
              <div class="d-flex align-items-center">
                <span class="text-black">
                  <strong>
                    : {{ totalOrderRetur }}/{{ totalOrder }}({{ percentageRetur }}%)
                  </strong>
                </span>
                <b-dropdown
                  :text="filterMetricLabel"
                  variant="outline-dark"
                  class="mx-50"
                  size="sm"
                >
                  <b-dropdown-item @click="metricRetur('Bulan ini')">
                    Bulan ini
                  </b-dropdown-item>
                  <b-dropdown-item @click="metricRetur('Bulan lalu')">
                    Bulan lalu
                  </b-dropdown-item>
                </b-dropdown>
                <img
                  id="infoTrackingMonth"
                  src="@/assets/images/icons/info-circle.svg"
                >
                <b-popover
                  triggers="hover"
                  target="infoTrackingMonth"
                  placement="top"
                  variant="dark"
                >
                  Jumlah retur di bulan tersebut dibandingkan dengan total jumlah paket yang ordernya DIBUAT di bulan tersebut. Jika filter ke bulan lalu, bisa jadi returan masih bisa berubah, karena ada paket yang masih dalam perjalanan belum sampai ke customer s.d awal bulan ini
                </b-popover>
              </div>
            </b-col>
          </b-row>
          <b-row class="align-items-center">
            <b-col cols="5">
              <span class="text-black">
                <strong>
                  Paket dalam Perjalanan
                </strong>
              </span>
            </b-col>
            <b-col cols="7">
              <div class="d-flex align-items-center">
                <span class="text-black">
                  <strong>
                    : {{ returOnProcess }}
                  </strong>
                </span>
                <div
                  :style="isRetur ? 'background: #E31A1A; border-radius: 12px;' : 'border: 1px solid #E31A1A; border-radius: 12px;'"
                  :class="isRetur ? 'px-50 mx-50 cursor-pointer' : 'px-50 mx-50 cursor-pointer'"
                  @click="fetchIsRetur"
                >
                  <span :class="isRetur ? 'text-white' : 'text-primary'">
                    Masih dijalan
                  </span>
                </div>
                <img
                  id="infoTracking"
                  src="@/assets/images/icons/info-circle.svg"
                >
                <b-popover
                  triggers="hover"
                  target="infoTracking"
                  placement="top"
                  class="bg-dark"
                  variant="dark"
                >Perhatikan yaa, ketika retur sudah terdeteksi sampai di gudang, kamu punya waktu 10 hari jika barang tidak ditemukan, kamu bisa komplain ke ekspedisi untuk klaim</b-popover>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col
        md="5"
        class="d-flex"
      >
        <b-form-input
          v-model="formSearch"
          type="search"
          class="form-search mr-2"
          placeholder="Cari Pelanggan atau Resi"
          @input="fetchData(formSearch)"
        />
        <b-icon-search class="icon-search" />
        <div style="position: relative;">
          <img
            id="buttonFilter"
            src="https://storage.googleapis.com/komerce/assets/svg/filter-icon-orange.svg"
            class="cursor-pointer"
          >
          <b-badge
            variant="primary"
            style="position: absolute; border-radius: 1.358rem; top: -15%; right: 0%;"
          >
            {{ totalFilterDataOrder }}
          </b-badge>
        </div>
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
                @input="setFilterDate"
              />
            </b-col>
            <b-col md="6">
              <flat-pickr
                v-model="endDate"
                class="form-control"
                placeholder="Sampai Dengan"
                :config="{ mode: 'single', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d', minDate: startDate}"
                @input="setFilterDate"
              />
            </b-col>
          </b-row>
          <label class="mt-1">Gudang</label>
          <v-select
            v-model="addressId"
            :options="filterWarehouses"
            :reduce="(option) => option.id"
            label="name"
            @input="setFilterAddress"
          >
            <span
              slot="no-options"
              @click="$refs.select.open = false"
            />
          </v-select>
          <label class="mt-1">Produk</label>
          <v-select
            v-model="productName"
            :options="filterProducts"
            :reduce="(option) => option.product_name"
            label="product_name"
            @input="setFilterProduct"
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
            @input="setFilterPayment"
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
    <b-overlay
      variant="light"
      :show="loadTable"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        id="table-order"
        responsive
        show-empty
        empty-text="Tidak ada data untuk ditampilkan."
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0"
        :busy="loadTable"
      >
        <template #cell(order_date)="data">
          <div
            style="min-width:150px!important;"
          >
            {{ moment(data.item.order_date) }}
          </div>
        </template>
        <template #cell(customer_name)="data">
          <span class="font-bold">{{ data.item.customer_name }}</span><br>
          <div
            v-if="data.item.is_komship"
            class="d-flex"
          >
            <img
              :src="data.item.shipment_image_path"
              style="width:20%; height: 20%;"
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
                    v-if="item.product_image === null || item.product_image === ''"
                    class="image-product"
                    :src="require('@/assets/images/avatars/image-null.png')"
                  >
                  <img
                    v-else
                    class="image-product"
                    :src="item.product_image"
                    :alt="item.product_image"
                  >
                  <div style="margin-left:5px;">
                    <span class="d-flex font-bold">{{ item.product_name }}</span>
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
        <template #cell(order_status)="data">
          <b-badge
            v-if="data.item.is_retur === 1"
            class="text-danger"
            style="background-color:#FCBEBE"
            pill
          >
            Perjalanan Pulang
          </b-badge>
          <b-badge
            v-if="data.item.is_retur === 2"
            class="text-success"
            style="background-color:#BEFCDE"
            pill
          >
            Retur Diterima
          </b-badge>
          <span v-if="data.item.is_retur !== 1 && data.item.is_retur !== 2">-</span>
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
        <template #cell(retur_date)="data">
          <span v-if="data.item.is_retur === 2">{{ moment(data.item.updated_at) }}</span>
          <span v-else>-</span>
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
      <div class="d-flex justify-between align-middle flex-wrap">
        <div class="mb-2">
          <span class="mr-1">List per halaman</span>
          <b-button
            v-for="page in pageOptions"
            :key="page"
            :variant="page === perPage ? 'primary' : 'light'"
            size="sm"
            class="btnPage"
            @click="setPage(page)"
          >
            {{ page }}
          </b-button>
        </div>
        <b-pagination
          v-model="currentPage"
          size="md"
          class="float-right mr-2"
          :total-rows="totalItems"
          :per-page="perPage"
          first-number
          last-number
        />
      </div>
    </b-overlay>
  </div>
</template>
<script>
import {
  BTable, BRow, BCol, BPagination, BFormInput, BIconSearch, BButton, BPopover, BCollapse, VBToggle, BIconChevronUp, BIconChevronDown, BOverlay,
} from 'bootstrap-vue'
import moment from 'moment'
import vSelect from 'vue-select'
import {
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'
import 'vue-select/dist/vue-select.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'
import '@/@core/scss/vue/libs/vue-flatpicker.scss'

export default {
  components: {
    BTable, BRow, BCol, BPagination, BFormInput, BIconSearch, BButton, BPopover, vSelect, BCollapse, BIconChevronUp, BIconChevronDown, flatPickr, BOverlay,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    filterItem: {
      type: Object,
      default: () => {},
    },
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
          key: 'order_status', label: 'Status retur', thClass: 'align-middle text-center', tdClass: 'align-top text-center',
        },
        {
          key: 'retur_date', label: 'Tanggal Diterima', thClass: 'align-middle text-center', tdClass: 'align-top text-center',
        },
        {
          key: 'details', label: 'Rincian', thClass: 'align-middle', tdClass: 'align-top',
        },
      ],
      loadTable: false,
      formSearch: null,
      paymentMethod: [],
      productList: this.filterItem.products,
      productFilter: null,
      customerName: null,
      startDate: null,
      endDate: null,
      currentPage: 1,
      perPage: 50,
      pageOptions: [50, 100, 200],
      totalItems: 0,
      addressId: null,
      addressList: this.filterItem.warehouses,
      mountTrackingRetur: { name: 'Bulan ini' },
      startDateMetric: firstDateOfMonth,
      endDateMetric: lastDateOfMonth,

      productName: '',

      percentageRetur: 0,
      returOnProcess: 0,
      totalOrder: 0,
      totalOrderRetur: 0,
      filterMetricLabel: 'Bulan ini',
      totalFilterDataOrder: 0,
      filterDateDataOrder: false,
      isFilterProduct: false,
      isFilterAddress: false,
      isFilterPayment: false,

      isRetur: false,
    }
  },
  computed: {
    filterProducts() {
      return this.filterItem.products
    },
    filterWarehouses() {
      return this.filterItem.warehouses
    },
  },
  watch: {
    currentPage: {
      handler(value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      },
    },
  },
  mounted() {
    this.fetchData()
    this.metricRetur('Bulan ini')
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
      this.loadTable = true
      this.items = await this.$http_komship.get(`v1/order/${this.profile.partner_detail.id}`, {
        params: {
          order_status: 'Retur',
          search,
          payment_method: this.paymentMethod,
          start_date: this.startDate,
          product_name: this.productName,
          is_retur: this.isRetur ? 1 : null,
          end_date: this.endDate,
          page: this.currentPage,
          total_per_page: this.perPage,
          partner_address_id: this.addressId,
        },
      })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .then(items => items)
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
          this.loadTable = false
        })
      this.$http_komship.get(`/v1/order/retur-on-process/${this.profile.partner_detail.id}?start_date=${this.startDate === null ? '' : this.startDate}&end_date=${this.endDate === null ? '' : this.endDate}`)
        .then(response => {
          this.returOnProcess = response.data.data.retur_on_process
        })
    },
    resetFilter() {
      this.startDate = null
      this.endDate = null
      this.addressId = null
      this.customerName = null
      this.paymentMethod = null
      this.filterDateDataOrder = false
      this.isFilterProduct = false
      this.isFilterAddress = false
      this.isFilterPayment = false
      this.totalFilterDataOrder = 0
      return this.fetchData()
    },
    shippingTypeLabel(value) {
      if (value === 'REG19' || value === 'SIUNT' || value === 'STD' || value === 'IDlite' || value === 'CTC19' || value === 'UDRREG') {
        return 'Reguler'
      } if (value === 'GOKIL' || value === 'DRGREG') {
        return 'Cargo'
      }
      return value
    },
    async setPage(totalPage) {
      this.perPage = totalPage
      this.fetchData()
    },
    metricRetur(data) {
      this.filterMetricLabel = data
      let start = null
      let end = null
      if (data === 'Bulan ini') {
        start = moment(firstDateOfMonth).format('YYYY-MM-DD')
        end = moment().format('YYYY-MM-DD')
      } else {
        const now = new Date()
        const prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0)
        const prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1)
        start = moment(prevMonthFirstDate).format('YYYY-MM-DD')
        end = moment(prevMonthLastDate).format('YYYY-MM-DD')
      }
      this.$http_komship.get(`/v1/order/metric-retur/${this.profile.partner_detail.id}?start_date=${start}&end_date=${end}`)
        .then(response => {
          this.percentageRetur = response.data.data.percentage_retur
          this.totalOrder = response.data.data.total_order
          this.totalOrderRetur = response.data.data.total_order_retur
        })
    },
    setFilterDate() {
      if (this.startDate !== null) {
        if (this.endDate !== null && !this.filterDateDataOrder) {
          this.totalFilterDataOrder += 1
          this.filterDateDataOrder = true
        }
      }
      if (this.endDate === null) {
        if (this.startDate === null && this.filterDateDataOrder) {
          this.totalFilterDataOrder -= 1
          this.filterDateDataOrder = false
        }
      }
    },
    setFilterProduct() {
      if (this.productName !== null && !this.isFilterProduct) {
        this.isFilterProduct = true
        this.totalFilterDataOrder += 1
      }
      if (this.productName === null) {
        this.totalFilterDataOrder -= 1
        this.isFilterProduct = false
      }
    },
    setFilterAddress() {
      if (this.addressId !== null && !this.isFilterAddress) {
        this.isFilterAddress = true
        this.totalFilterDataOrder += 1
      }
      if (this.addressId === null) {
        this.isFilterAddress = false
        this.totalFilterDataOrder -= 1
      }
    },
    setFilterPayment() {
      if (this.paymentMethod !== null && !this.isFilterPayment) {
        this.isFilterPayment = true
        this.totalFilterDataOrder += 1
      }
      if (this.paymentMethod === null) {
        this.isFilterPayment = false
        this.totalFilterDataOrder -= 1
      }
    },
    fetchIsRetur() {
      this.isRetur = !this.isRetur
      this.fetchData()
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

.b-popover-dark .popover-body {
    background:#24292F;
    color: white;
}
</style>
