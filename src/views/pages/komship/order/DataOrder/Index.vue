<template>
  <b-card>
    <div class="d-flex justify-between mb-2">
      <b-container>
        <b-row>
          <b-col>
            <h3 class="font-bold">
              Data Order
            </h3>
          </b-col>
          <b-col>
            <div class="d-flex justify-content-end">
              <b-button
                v-if="tabIndex === 1"
                variant="primary"
                size="md"
                class="mr-1"
                to="ajukan-pickup"
              >
                Ajukan Pickup
              </b-button>
              <b-button
                id="btn-export"
                v-b-modal.modalExport
                variant="outline-primary"
                size="md"
                right
              >
                Download
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-row>
      <b-modal
        id="modalExport"
        ref="modalExport"
        centered
        :size="'lg'"
        no-close-on-backdrop
        :header-bg-variant="'white'"
        :header-class="'no-border'"
        ok-title="Download"
        ok-variant="primary"
        cancel-title="Batalkan"
        cancel-variant="outline-primary"
        :footer-class="'no-border'"
        :content-class="'no-border'"
        hide-header
      >
        <template>
          <b-container
            class="text-center col"
            style="color: #222222;"
          >
            <b-row class="justify-content-end">
              <b-icon-x-circle
                style="width: 1.5rem; height: 1.5rem; cursor: pointer; "
                class="close-button-on-popup-pickup text-right"
                end
                @click="handleClosePopUp"
              />
            </b-row>
            <b-row class="mt-2 justify-content-center">
              <h3
                class="font-weight-bold"
                style="font-size: 24px;"
              >
                Download Data Order
              </h3>
            </b-row>
            <b-row
              class="justify-content-center"
              style="font-size: 18px; font-weight: 500;"
            >
              Kustomisasi data order yang ingin kamu download
            </b-row>
            <b-row class="mt-3">
              <b-col
                sm="12"
                md="3"
              >
                <b-row class="border-b-2 pb-1 font-weight-bold">
                  Tanggal Order
                </b-row>
                <b-row class="my-1 mr-0 mr-md-2">
                  <date-range-picker
                    ref="picker"
                    v-model="rangeDate"
                    :opens="'rtl'"
                    :locale-data="locale"
                    :ranges="ranges"
                  >
                    <template
                      v-slot:input="picker"
                      class="h-auto"
                    >
                      <div
                        class="d-flex h-auto justify-content-between align-items-center"
                      >
                        <span
                          class="mr-2"
                        >{{ formatDate(picker.startDate) }} -
                          {{ formatDate(picker.endDate) }}</span>
                        <img src="https://storage.googleapis.com/komerce/assets/icons/date-picker-icon.svg">
                      </div>
                    </template>
                  </date-range-picker>
                </b-row>
              </b-col>
              <b-col
                sm="12"
                md="3"
              >
                <b-row class="border-b-2 pb-1 mt-2 mt-md-0 font-weight-bold">
                  Metode Pembayaran
                </b-row>
                <b-row>
                  <div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="chcekedCod"
                        v-model="paymentMethod"
                        name="chcekedCod"
                        value="COD"
                        class="text-left"
                      >
                        COD
                      </b-form-checkbox>
                    </div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="chcekedBankTransfer"
                        v-model="paymentMethod"
                        name="chcekedBankTransfer"
                        class="text-left"
                        value="BANK TRANSFER"
                      >
                        Bank Transfer
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-row>
              </b-col>
              <b-col
                sm="12"
                md="3"
              >
                <b-row class="border-b-2 pb-1  mt-2 mt-md-0 font-weight-bold">
                  Status
                </b-row>
                <b-row>
                  <div class="my-1">
                    <b-form-checkbox
                      id="checkedOrderDiajukan"
                      v-model="orderStatus"
                      name="checkedOrderDiajukan"
                      class="text-left"
                      value="Diajukan"
                    >
                      Order Dibuat
                    </b-form-checkbox>
                    <div class="my-1">
                      <b-form-checkbox
                        id="checkedOrderPacked"
                        v-model="orderStatus"
                        class="text-left"
                        name="checkedOrderPacked"
                        value="Dipacking"
                      >
                        Dipacking
                      </b-form-checkbox>
                    </div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="checkedOrderSent"
                        v-model="orderStatus"
                        name="checkedOrderSent"
                        class="text-left"
                        value="Dikirim"
                      >
                        Dikirim
                      </b-form-checkbox>
                    </div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="checkedOrderDeliver"
                        v-model="orderStatus"
                        name="checkedOrderDeliver"
                        class="text-left"
                        value="Diterima"
                      >
                        Diterima
                      </b-form-checkbox>
                    </div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="checkedOrderRetur"
                        v-model="orderStatus"
                        name="checkedOrderRetur"
                        class="text-left"
                        value="Retur"
                      >
                        Retur
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-row>
              </b-col>
              <b-col
                sm="12"
                md="3"
              >
                <b-row class="border-b-2 pb-1  mt-2 mt-md-0 font-weight-bold">
                  Ekspedisi
                </b-row>
                <b-row>
                  <div class="my-1">
                    <b-form-checkbox
                      id="chcekedJNE"
                      v-model="shipping"
                      name="chcekedJNE"
                      class="text-left"
                      value="JNE"
                    >
                      JNE
                    </b-form-checkbox>
                    <div class="my-1">
                      <b-form-checkbox
                        id="chcekedSiCepat"
                        v-model="shipping"
                        class="text-left"
                        name="chcekedSiCepat"
                        value="SICEPAT"
                      >
                        SiCepat
                      </b-form-checkbox>
                    </div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="chcekedIDExpress"
                        v-model="shipping"
                        name="chcekedIDExpress"
                        class="text-left"
                        value="IDEXPRESS"
                      >
                        IDExpress
                      </b-form-checkbox>
                    </div>
                    <div class="my-1">
                      <b-form-checkbox
                        id="chcekedSAP"
                        v-model="shipping"
                        name="chcekedSAP"
                        class="text-left"
                        value="SAP"
                      >
                        SAP
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <template #modal-footer>
          <b-col>
            <div
              v-if="showProgress"
              class="d-flex flex-column"
            >
              <div>{{ Math.floor(progressValue) > 100 ? 'Download selesai' : message }}</div>
              <div class="row w-100 align-items-center">
                <div class="col">
                  <b-progress
                    v-if="Math.floor(progressValue) <= 0 "
                    :value="100"
                    :max="100"
                    variant="success"
                    :striped="Math.floor(progressValue) <= 0 ? true : false"
                    :animated="Math.floor(progressValue) <= 0 ? true : false"
                  />
                  <b-progress
                    v-else
                    :value="progressValue"
                    :max="100"
                    variant="success"
                  />
                </div>
                <div class="col-auto">
                  {{ Math.floor(progressValue) > 100 ? 100 :0 }}%
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="d-flex flex-row justify-content-end">
              <button
                class="btn btn-outline-primary m-1"
                @click="closeModalExport"
              >
                Batalkan
              </button>
              <button
                :disabled="showProgress"
                class="btn btn-primary m-1"
                @click="downloadCsv"
              >
                Download
                <span class="ml-1">
                  <b-spinner
                    v-if="loading"
                    small
                    label="Loading..."
                  />
                </span>
              </button>
            </div>
          </b-col>

        </template>
      </b-modal>
    </b-row>
    <b-tabs
      v-model="tabIndex"
      fill
      :nav-class="'mb-1 font-bold text-xl'"
      no-nav-style
    >
      <b-tab
        title="Semua"
        :title-link-class="linkClass(0)"
        lazy
      >
        <all :filter-item="filterProductWarehouse" />
      </b-tab>
      <b-tab
        :title-link-class="linkClass(1)"
        lazy
      >
        <template slot="title">
          <span>{{ totalAjukan }} | Order Dibuat</span>
        </template>
        <created :filter-item="filterProductWarehouse" />
      </b-tab>
      <b-tab
        :title-link-class="linkClass(2)"
        lazy
      >
        <template slot="title">
          {{ totalPacking }} | Dipacking
        </template>
        <packing :filter-item="filterProductWarehouse" />
      </b-tab>
      <b-tab
        :title-link-class="linkClass(3)"
        lazy
      >
        <template slot="title">
          <div
            class="d-flex justify-center"
            @click="tabIndex === 3 ? $router.go() : null"
          >
            {{ totalKirim }} | Dikirim
            <div
              v-if="totalProblem > 0"
              class="absolute my-auto bg-white rounded-lg"
              style="padding: 3px;margin-top: -18px!important;margin-left: 15%;"
            >
              <b-badge
                variant="danger"
                class="text-sm rounded-lg"
                style="padding: 2px 6px!important;font-size: 12px;"
              >
                <span class="d-flex text-sm">
                  {{ totalProblem }}
                  <img
                    class="w-4"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/danger.svg"
                    style="margin-left:3px"
                  >
                </span>
              </b-badge>
            </div>
          </div>
        </template>
        <send :filter-item="filterProductWarehouse" />
      </b-tab>
      <b-tab
        title="Diterima"
        :title-link-class="linkClass(4)"
        lazy
      >
        <received :filter-item="filterProductWarehouse" />
      </b-tab>
      <b-tab
        title="Retur"
        :title-link-class="linkClass(5)"
        lazy
      >
        <retur :filter-item="filterProductWarehouse" />
      </b-tab>
    </b-tabs>
  </b-card>
</template>
<script>
import {
  BCard, BSpinner, BProgressBar, BTabs, BTab, BButton, BBadge, BCol, BRow, BContainer, BIconXCircle,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import DateRangePicker from 'vue2-daterange-picker'
import moment from 'moment'
import axios from 'axios'
import All from './List/All.vue'
import Created from './List/Created.vue'
import Packing from './List/Packing.vue'
import Send from './List/Send.vue'
import Received from './List/Received.vue'
import Retur from './List/Retur.vue'
// import '../../../../../index.css'

export default {
  components: {
    BCard, BTabs, BTab, All, Created, Packing, Send, Received, Retur, BButton, BCol, BContainer, BRow, BIconXCircle, DateRangePicker,
  },
  filters: {
    dateCell(value) {
      const dt = new Date(value)

      return dt.getDate()
    },
    date(val) {
      return val ? val.toLocaleString() : ''
    },
  },
  data() {
    const today = new Date()
    today.setHours(23, 59, 59, 0)
    const startDate = new Date()
    const endDate = new Date()
    const checked = false
    endDate.setDate(endDate.getDate() + 6)
    const tabs = ['semua', 'order-dibuat', 'dipacking', 'dikirim', 'diterima', 'retur']
    return {
      tabIndex: tabs.indexOf(this.$route.query.tab),
      tabs,
      date: {
        end: this.$moment(today).startOf('day').format('YYYY-MM-DD'),
        start: this.$moment(today).startOf('day').format('YYYY-MM-DD'),
      },
      profile: JSON.parse(localStorage.userData),
      totalAjukan: null,
      totalPacking: null,
      showProgress: false,
      message: 'Sedang memuat file ...',
      progressValue: 0,
      totalKirim: null,
      controller: new AbortController(),
      totalProblem: null,
      dateRange: { startDate, endDate },
      orderDate: '',
      loading: false,
      paymentMethod: ['COD', 'BANK TRANSFER'],
      orderStatus: ['Diajukan', 'Dipacking', 'Dikirim', 'Diterima', 'Retur'],
      shipping: ['JNE', 'SICEPAT', 'IDEXPRESS', 'SAP'],
      chcekedJNE: false,
      chcekedSiCepat: false,
      chcekedIDExpress: false,
      locale: {
        applyLabel: 'Pilih',
        cancelLabel: 'Batal',
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        'Hari Ini': [this.$moment().subtract(0, 'days').startOf('day').toDate(), today],
        '7 Hari Terakhir': [this.$moment().subtract(6, 'days').startOf('day').toDate(), today],
        '30 Hari Terakhir': [this.$moment().subtract(29, 'days').startOf('day').toDate(), today],
        'Bulan Ini': [this.$moment().startOf('month').toDate(), today],
      },
      rangeDate: {
        startDate: this.$moment().startOf('month').toDate(),
        endDate: today,
      },
      filterProductWarehouse: {},
    }
  },
  watch: {
    tabIndex(newValue) {
      const tab = this.tabs[newValue]
      this.$router.replace({ query: { tab } }).catch(() => {})
    },
    rangeDate: {
      handler(val) {
        // calling api for table and update data table
        if (val) {
          const { startDate, endDate } = val
          this.date.start = this.$moment(startDate).startOf('day').format('YYYY-MM-DD')
          this.date.end = this.$moment(endDate).endOf('day').format('YYYY-MM-DD')
        } else {
          this.date.start = this.$moment(val.startDate).startOf('day').format('YYYY-MM-DD')
          this.date.end = this.$moment(val.endDate).endOf('day').format('YYYY-MM-DD')
        }
      },
      deep: true,
    },
  },
  async created() {
    await this.fetchData()
    await this.$http_komship.get('/v1/list/filter-product')
      .then(async response => {
        this.filterProductWarehouse = await response.data.data
      }).catch(err => {
        this.filterProductWarehouse = {
          warehouses: [],
          products: [],
        }
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
  methods: {
    linkClass(tabs) {
      if (this.tabIndex === tabs) {
        return ['bg-primary', 'text-white', 'rounded']
      }
      return ['bg-default', 'text-dark']
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    fetchData() {
      this.$http_komship.get(`v1/order/count/order-problem/${this.profile.partner_detail.id}`)
        .then(res => {
          const { data } = res.data
          this.totalAjukan = data.diajukan
          this.totalPacking = data.dipacking
          this.totalKirim = data.dikirim
          this.totalProblem = data.order_problem
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
    handleClosePopUp() {
      this.controller.abort()
      this.showProgress = false
      this.message = 'Sedang memuat file ...'
      this.$root.$emit('bv::hide::modal', 'modalExport')
    },
    downloadCsv() {
      const formData = {
        start_date: `${this.date.start.toString()}`,
        end_date: `${this.date.end.toString()}`,
        payment_method: this.paymentMethod.toString(),
        order_status: this.orderStatus.toString(),
        shipping: this.shipping.toString(),
      }
      this.loading = true
      this.showProgress = true
      this.progressValue = 0
      axios.get(`${process.env.VUE_APP_BASE_URL_KOMSHIP}/v1/export/order/${this.profile.partner_detail.id}`, {
        params: formData,
        onDownloadProgress: progressEvent => {
          this.message = 'Sedang mendownload file ...'
          // eslint-disable-next-line prefer-const
          let total = progressEvent?.srcElement?.getResponseHeader('content-length') || 0
          this.progressValue = (progressEvent.loaded / total) * 100
        },
        responseType: 'base64',
        signal: this.controller.signal,
      }).then(result => {
        setTimeout(() => {
          const binary = atob(result.data.replace(/\s/g, ''))
          const len = binary.length
          const buffer = new ArrayBuffer(len)
          const view = new Uint8Array(buffer)
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i)
          }
          const file = new Blob([view], { type: 'application/pdf' })
          const fileURL = URL.createObjectURL(file)
          const link = document.createElement('a')
          link.href = fileURL
          const fileName = `${+new Date()}.xlsx`// whatever your file name .
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          link.remove()
          this.loading = false
          this.showProgress = false
          this.message = 'Sedang memuat file ...'
        }, 1000)
      }).catch(err => {
        this.loading = false
      })
    },
    closeModalExport() {
      this.message = 'Sedang memuat file ...'
      this.controller.abort()
      this.showProgress = false
      this.$refs.modalExport.hide()
    },
  },
}
</script>
<style lang="scss" scoped>
.slot {
  background-color: #aaa;
  padding: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text-black {
  color: #000;
}

.daterangepicker td.active,.daterangepicker td.active:hover{
    background-color: #FF6A3A !important;
    color: white !important;
  }

  .daterangepicker td.in-range {
    background-color: #FFECE9 !important;
    border-color: transparent;
    color: #000;
    border-radius: 0;
}
 .daterangepicker td.active{
    border-color: transparent;
    color: #000;
    border-radius: 0;
    background-color: #FF6A3A !important;
}
.daterangepicker .ranges li.active{
    background-color: #FF6A3A !important;
}
.daterangepicker .btn-primary, .daterangepicker .btn-success {
    background-color: #FF6A3A !important;
    border-color: #FF6A3A !important;
}
    @media screen and (max-width: 767px) {
        .daterangepicker.show-calendar .drp-buttons, .daterangepicker.show-calendar .drp-calendar {
            display: flex !important;
        }
        .calendars {
            display: flex;
            width: 100% !important;
        }
    }
    .form-control, .reportrange-text{
        height: auto !important;
      }

.calendars{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap !important;
        flex-wrap: wrap !important;
    width: 100% !important;
    flex-wrap: nowrap !important;
}

</style>
