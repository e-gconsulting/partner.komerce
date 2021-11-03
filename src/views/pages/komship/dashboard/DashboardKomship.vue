<template>
  <div class="container p-0">
    <h1 class="mb-2 h-text-xl">
      Dashboard
    </h1>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Saldo
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
          </div>
          <div class="card-body h-text-xl pb-0 mb-0">
            {{ formatRupiah(saldo) }}
          </div>
          <div
            class="
              card-footer
              d-flex
              justify-content-around
              bg-orange
              text-white
              rounded-16
              py-9
            "
          >
            <a
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
              @click="alertFail()"
            >
              <img src="@/assets/images/icons/send-square.svg" alt="Top Up" />
              <p class="saldo-texts mb-0">
                Top Up
              </p>
            </a>
            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <img
                src="@/assets/images/icons/receive-square.svg"
                alt="Tarik Saldo"
              />
              <p class="saldo-texts mb-0">
                Tarik Saldo
              </p>
            </div>
            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
              "
            >
              <img src="@/assets/images/icons/document-text.svg" alt="Detail" />
              <p class="saldo-texts mb-0">
                Detail
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Saldo Pending
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
            <img
              src="@/assets/images/icons/arrow-square-right.svg"
              alt="Arrow Right"
            />
          </div>
          <div class="card-body h-text-xl pb-0 mb-0">
            {{ formatRupiah(saldoPending) }}
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Cashback
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
          </div>
          <div class="card-body pb-0 mb-0">
            <div class="h-text-xl pb-0 mb-0">
              {{ formatRupiah(cashback) }}
            </div>
            <p class="mb-0">
              Total cashback yang kamu dapatkan semenjak menggunakan Komship
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 mt-2">
        <div class="card h-100">
          <div class="card-header flex-nowrap">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Penghasilan
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
            <b-form-group class="flex-grow-1 pl-3 pr-1 mb-0">
              <v-select
                v-model="selectedPenghasilan"
                label="Square"
                dir="ltr"
                :options="optionsPenghasilan"
                :clearable="false"
              />
            </b-form-group>
            <img
              src="@/assets/images/icons/arrow-square-right.svg"
              alt="Arrow Right"
            />
          </div>
          <div class="position-relative card-body">
            <v-select
              v-model="selectedChart"
              label="Square"
              dir="ltr"
              class="select-chart position-absolute"
              :options="optionsChart"
              :clearable="false"
            />
            <ChartPenghasilan class="mt-1" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mt-2">
        <div class="card">
          <div class="row gap-1 my-24 mx-16">
            <div class="col-6">
              <div
                class="
                  border-gray
                  d-flex
                  flex-column
                  justify-content-between
                  rounded-16
                  p-12
                  h-100
                "
              >
                <p class="mb-0 order-head-text">
                  Orderan Perlu Dikirim
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mb-0 order-body-text">
                    {{ formatRibuan(orderanPerluDikirim) }}
                  </p>
                  <img
                    src="@/assets/images/icons/arrow-right-2.svg"
                    alt="Arrow Right"
                  />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div
                class="
                  border-gray
                  d-flex
                  flex-column
                  justify-content-between
                  rounded-16
                  p-12
                  h-100
                "
              >
                <p class="mb-0 order-head-text">
                  Orderan Retur
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="mb-0 order-body-text">
                    {{ formatRibuan(orderanRetur) }}
                  </p>
                  <img
                    src="@/assets/images/icons/arrow-right-2.svg"
                    alt="Arrow Right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card h-70 mb-0">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Top Admin Order
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                v-for="topAdminOrder in topAdminOrders"
                :key="topAdminOrders.indexOf(topAdminOrder)"
                class="list-group-item px-0"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img
                      src="@/assets/images/icons/profile-placehold.svg"
                      alt="Photo"
                    />
                    <p class="list-text-1 h-text-dark ml-2 mb-0">
                      {{ topAdminOrder.name }}
                    </p>
                  </div>
                  <div class="right">
                    <p class="list-text-2 text-green mb-0">
                      {{ formatRupiah(topAdminOrder.totalDana) }}
                    </p>
                    <p class="list-text-3 mb-0">
                      {{ topAdminOrder.totalProduk }}pcs
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 mt-2">
        <div class="card h-100 mb-0">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Produk Terlaris
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
            <img
              src="@/assets/images/icons/arrow-square-right.svg"
              alt="Arrow Right"
            />
          </div>
          <div class="card-body">
            <div class="w-25">
              <b-form-group class="mb-0">
                <v-select
                  v-model="selectedProdukTerlaris"
                  label="Bulan Ini"
                  dir="ltr"
                  id="select_produk_terlaris"
                  :options="optionsProdukTerlaris"
                  :clearable="false"
                  @input="handleChangeProdukTerlaris"
                />
              </b-form-group>
            </div>
            <ul class="list-group list-group-flush">
              <li
                v-for="produkTerlaris in produkTerlarises"
                :key="produkTerlarises.indexOf(produkTerlaris)"
                class="list-group-item px-0"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img
                      src="@/assets/images/icons/product-placehold.svg"
                      alt="Photo"
                    />
                    <div>
                      <p class="list-text-1 h-text-dark ml-2 mb-0">
                        {{ produkTerlaris.name }}
                      </p>
                      <p class="saldo-texts ml-2 mb-0">
                        {{ produkTerlaris.kodeBrg }}
                      </p>
                    </div>
                  </div>
                  <div class="right">
                    <p class="list-text-2 h-text-dark mb-0">
                      {{ produkTerlaris.penjualan }}
                    </p>
                    <div
                      :class="
                        `badge h-badge-${
                          produkTerlaris.persentase >= 0 ? 'success' : 'danger'
                        } rounded-pill font-weight-normal`
                      "
                    >
                      {{ produkTerlaris.persentase >= 0 ? '+' : ''
                      }}{{ produkTerlaris.persentase }}%
                    </div>
                    <img
                      v-if="produkTerlaris.persentase >= 0"
                      src="@/assets/images/icons/arrow-going-up-alt.svg"
                      alt="arrow-going-up-alt"
                    />
                    <img
                      v-else
                      src="@/assets/images/icons/arrow-going-down-alt.svg"
                      alt="arrow-going-down-alt"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mt-2">
        <div class="card h-100 mb-0">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Customer Loyal
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
            <img
              src="@/assets/images/icons/arrow-square-right.svg"
              alt="Arrow Right"
            />
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                v-for="customerLoyal in customerLoyals"
                :key="customerLoyals.indexOf(customerLoyal)"
                class="list-group-item px-0"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="list-text-1 h-text-dark mb-0">
                      {{ customerLoyal.name }}
                    </p>
                    <p class="saldo-texts mb-0">
                      {{ customerLoyal.location }}
                    </p>
                  </div>
                  <div class="right">
                    <p class="list-text-2 h-text-dark mb-0">
                      {{ customerLoyal.totalProduk }}
                    </p>
                    <p class="list-text-3 mb-0">
                      {{ formatRupiah(customerLoyal.totalDana) }},-
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div :class="'row' + (blurred ? ' position-relative' : '')">
      <div :class="'col-12 col-md-7 mt-2 pt-1' + (blurred ? ' blurry' : '')">
        <div class="card h-100 mb-0">
          <div class="card-header flex-nowrap">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Performa Customer Service
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
            <date-range-picker
              ref="picker"
              :locale-data="locale"
              v-model="dateRange"
              :ranges="ranges"
              class="w-25"
            >
              <template v-slot:input="picker" style="min-width: 350px;">
                <div class="d-flex justify-content-between align-items-center">
                  <span>{{ getRange(picker.startDate, picker.endDate) }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </template>
            </date-range-picker>
          </div>
          <div class="card-body">
            <ChartPerforma :seriesProp="series" :categoriesProp="categories" />
          </div>
        </div>
      </div>
      <div :class="'col-12 col-md-5 mt-2 pt-1' + (blurred ? ' blurry' : '')">
        <div class="card h-100 mb-0">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Top Customer Service
              </div>
              <img src="@/assets/images/icons/info-circle.svg" alt="Info" />
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                v-for="topCustomerService in topCustomerServices"
                :key="topCustomerServices.indexOf(topCustomerService)"
                class="list-group-item px-0"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img
                      src="@/assets/images/icons/profile-placehold.svg"
                      alt="Photo"
                    />
                    <p class="list-text-1 h-text-dark ml-2 mb-0">
                      {{ topCustomerService.name }}
                    </p>
                  </div>
                  <div class="right">
                    <p class="list-text-2 text-green mb-0">
                      {{ formatRupiah(topCustomerService.totalDana) }}
                    </p>
                    <p class="list-text-3 mb-0">
                      {{ topCustomerService.totalProduk }}pcs
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="blurred" class="position-absolute pos-center text-center">
        <p class="h3 font-weight-bolder mb-2">
          Yuk, Hiring Talent Komerce agar kamu<br />dapat menggunakan fitur ini!
        </p>
        <button class="btn btn-outline-primary">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { BFormGroup } from 'bootstrap-vue'
import vSelect from 'vue-select'
import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import ChartPenghasilan from '../../../components/chart/ChartPenghasilan.vue'
import ChartPerforma from '../../../components/chart/ChartPerforma.vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    BFormGroup,
    ChartPenghasilan,
    ChartPerforma,
    DateRangePicker,
    vSelect,
  },
  data() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const last7 = new Date()
    last7.setDate(today.getDate() - 7)
    last7.setHours(0, 0, 0, 0)

    const last30 = new Date()
    last30.setDate(today.getDate() - 30)
    last30.setHours(0, 0, 0, 0)

    const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return {
      topCustomerServices: [
        {
          photo: null,
          name: 'Afifah Mimo',
          totalDana: 25000000,
          totalProduk: 500,
        },
        {
          photo: null,
          name: 'Afifah Mimo',
          totalDana: 25000000,
          totalProduk: 500,
        },
        {
          photo: null,
          name: 'Afifah Mimo',
          totalDana: 25000000,
          totalProduk: 500,
        },
        {
          photo: null,
          name: 'Afifah Mimo',
          totalDana: 25000000,
          totalProduk: 500,
        },
        {
          photo: null,
          name: 'Afifah Mimo',
          totalDana: 25000000,
          totalProduk: 500,
        },
      ],
      selectedPenghasilan: 'Kompship',
      optionsPenghasilan: ['Kompship'],
      selectedChart: 'COD (Bayar di tempat)',
      optionsChart: ['COD (Bayar di tempat)', 'Transfer Bank'],
      // selectedProdukTerlaris: 'Bulan Ini',
      // optionsProdukTerlaris: ['Bulan Ini', '7 Hari Terakhir'],
      dropDownValues: ['Real Time', '7 Hari Terakhir', '30 Hari Terakhir', 'Custom Tanggal'],
      selectedCstDateBefore: null,
      selectedCstDate: 'Real Time',
      customDate: Date.now(),
      cstDateCfg: {
        mode: 'range',
        inline: true,
        altFormat: 'M j, Y',
        altInput: true,
        altInputClass: 'd-none',
      },
      err: false,
      blurred: false,
      dateRange: {
        startDate: today,
        endDate: today,
      },
      picker: {
        startDate: today,
        endDate: today,
      },
      locale: {
        format: 'dd/mm/yyyy',
      },
      ranges: {
        'Real Time': [today, today],
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, lastDateOfMonth],
        'Custom Tanggal': [null, null],
      },
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,
      series: [],
      categories: ['abc', 'def', 'ghi', 'jkl'],
    }
  },
  computed: {
    ...mapFields('dashboard', { selectedProdukTerlaris: 'selectedProdukTerlaris' }),
    ...mapState('dashboard', [
      'saldo',
      'saldoPending',
      'cashback',
      'orderanPerluDikirim',
      'orderanRetur',
      'topAdminOrders',
      'customerLoyals',
      'produkTerlarises',
      'optionsProdukTerlaris',
    ]),
  },
  methods: {
    formatRibuan(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatRupiah(x) {
      return `Rp ${this.formatRibuan(x)}`
    },
    alertFail() {
      this.$swal({
        title: '<span class="font-weight-bold h4">Maaf sedang ada gangguan,<br>coba lagi nanti</span>',
        imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'Oke',
        customClass: {
          confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
        },
        buttonsStyling: false,
      })
    },
    selectCstDate(val) {
      this.selectedCstDateBefore = this.selectedCstDate
      this.selectedCstDate = val
    },
    closeDropdown(batal) {
      this.err = false

      if (batal) {
        this.customDate = null
        this.selectedCstDate = this.selectedCstDateBefore
        this.$refs.dropdown.hide(true)
      } else if (this.customDate) {
        this.$refs.dropdown.hide(true)
      } else {
        this.err = true
      }
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    getRange(first, last) {
      if (moment(first).format('l') === moment(this.today).format('l') && moment(last).format('l') === moment(this.today).format('l')) {
        this.changeData(1)
        return 'Real Time'
      } else if (moment(first).format('l') === moment(this.last7).format('l') && moment(last).format('l') === moment(this.today).format('l')) { // eslint-disable-line
        this.changeData(2)
        return '7 Hari Terakhir'
      } else if (moment(first).format('l') === moment(this.last30).format('l') && moment(last).format('l') === moment(this.today).format('l')) {
        this.changeData(3)
        return '30 Hari Terakhir'
      } else if (moment(first).format('l') === moment(this.firstDateOfMonth).format('l') && moment(last).format('l') === moment(this.lastDateOfMonth).format('l')) {
        this.changeData(4)
        return 'Bulan Ini'
      } else {
        this.changeData(5)
        return 'Custom Tanggal'
      }
    },
    changeData(val) {
      const lcategories = []
      switch (val) {
        case 1:
          this.series = [
            {
              name: 'Leads',
              data: ['24', '23', '27', '20', '25', '28', '21'],
            },
            {
              name: 'Orders',
              data: ['14', '13', '17', '20', '15', '18', '11'],
            },
            {
              name: 'Pcs',
              data: ['4', '3', '7', '10', '5', '8', '1'],
            },
          ]
          this.categories = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
          break
        case 2:
          this.series = [
            {
              name: 'Leads',
              data: ['2400000', '2300000', '2700000', '2000000', '2500000', '2800000', '2100000'],
            },
            {
              name: 'Orders',
              data: ['1400000', '1300000', '1700000', '2000000', '1500000', '1800000', '1100000'],
            },
            {
              name: 'Pcs',
              data: ['400000', '300000', '700000', '1000000', '500000', '800000', '100000'],
            },
          ]
          this.categories = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
          break
        case 3:
        case 4:
        case 5:
          this.series = [
            {
              name: 'Leads',
              data: ['24', '23', '27', '20', '25', '28', '21', '24', '23', '27', '20', '25', '28', '21', '24'],
            },
            {
              name: 'Orders',
              data: ['14', '13', '17', '20', '15', '18', '11', '14', '13', '17', '20', '15', '18', '11', '14'],
            },
            {
              name: 'Pcs',
              data: ['4', '3', '7', '10', '5', '8', '1', '4', '3', '7', '10', '5', '8', '1', '4'],
            },
          ]
          for (let i = 0; i < 29; i++) { //eslint-disable-line
            if (i % 2 !== 0) {
              lcategories.push(`${i}`)
            }
          }
          lcategories.push('30')
          this.categories = lcategories
          break
        default:
          break
      }
    },
    handleChangeProdukTerlaris() {
      this.$store.dispatch('dashboard/getProdukTerlarises')
    },
  },
  beforeMount() {
    this.$store.dispatch('dashboard/init')
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.bg-orange {
  background-color: #ff6a3a !important;
}
.bg-orange2 {
  background-color: #f95031 !important;
}
.card,
.rounded-16 {
  border-radius: 16px !important;
}
.first-card-header-text {
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.5px;
  text-align: left;
}
.saldo-texts {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.5px;
  text-align: left;
}
.h-text-xl {
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #222222;
}
.order-head-text {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
}
.order-body-text {
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #222222;
}
.container {
  font-family: 'Poppins', sans-serif;
}
.ms-8 {
  margin-left: 8px;
}
.me-8 {
  margin-right: 8px;
}
.mb-8 {
  margin-bottom: 8px;
}
.py-9 {
  padding-top: 9px;
  padding-bottom: 9px;
}
.mx-16 {
  margin-left: 16px;
  margin-right: 16px;
}
.my-24 {
  margin-top: 24px;
  margin-bottom: 24px;
}
.p-12 {
  padding: 12px;
}
.h-text-dark {
  color: #222222;
}
.border-gray {
  border: 1px solid #e2e2e2;
}
.list-text-1 {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.5px;
  text-align: left;
}
.list-text-2 {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.5px;
  text-align: right;
}
.list-text-3 {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: 0.5px;
  text-align: right;
}
.text-green {
  color: #34a770;
}
.h-badge-success {
  background-color: #dcf3eb;
  color: #34a770;
}
.h-badge-danger {
  background-color: #ffeded;
  color: #e31a1a;
}
#select_produk_terlaris > div {
  border: none;
  padding-left: 0px;
}
#select_produk_terlaris > div > .vs__selected-options,
#select_produk_terlaris > div > .vs__selected-options > .vs__selected {
  padding-left: 0px;
  margin-left: 0;
}
.select-chart {
  right: 42px;
  width: 38%;
}
.h-70 {
  height: 70%;
}
.w-30 {
  width: 30%;
}
.blurry {
  filter: blur(7px);
  pointer-events: none;
  user-select: none;
}
.pos-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.dropdown-item {
  width: 100% !important;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
