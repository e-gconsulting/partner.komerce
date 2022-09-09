/* eslint-disable no-alert */
/* eslint-disable global-require */
import CodeInput from 'vue-verification-code-input'
import { mapState, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import {
  BFormGroup,
  BModal,
  BFormInput,
  BFormSelect,
  BSpinner,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import vSelect from 'vue-select'
import moment from 'moment'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'
import ChartPenghasilan from '@/views/components/chart/ChartPerforma.vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import PopoverInfo from '@/views/components/popover/PopoverInfo.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import VueApexcharts from 'vue-apexcharts'
import flatPickr from 'vue-flatpickr-component'
import MonthMode from 'flatpickr/dist/plugins/monthSelect'
import '@/@core/scss/vue/libs/vue-flatpicker.scss'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import html2canvas from 'html2canvas'
import ModalOnBoarding from './ModalOnBoarding.vue'
import './ModalOnBoarding.scss'

export default {
  components: {
    LottieAnimation,
    BFormGroup,
    BModal,
    BFormInput,
    BFormSelect,
    ChartPenghasilan,
    vSelect,
    PopoverInfo,
    BSpinner,
    CodeInput,
    'modal-onboarding': ModalOnBoarding,
    VueApexcharts,
    flatPickr,
  },
  data() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const last7 = new Date()
    last7.setDate(today.getDate() - 6)
    last7.setHours(0, 0, 0, 0)

    const last30 = new Date()
    last30.setDate(today.getDate() - 29)
    last30.setHours(0, 0, 0, 0)

    const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDateOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    )

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
      selectedPenghasilan: 'Komship',
      optionsPenghasilan: ['Komship'],
      dropDownValues: [
        'Real Time',
        '7 Hari Terakhir',
        '30 Hari Terakhir',
        'Custom Tanggal',
      ],
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
      modalTitle: null,
      stepNow: 0,
      status: true,
      nominalState: null,
      rekTujuanState: null,
      obj: null,

      loadingSubmitTopUp: false,

      optionRekIsEmpty: [
        {
          value: 'Anda belum menambahkan rekening bank',
          text: 'Anda belum menambahkan rekening bank',
        },
      ],
      visibilityPin: 'password',
      loadingOnboarding: true,
      disabledOnboardingMulai: false,
      stepped: 1,
      maxStepOnboard: 5,
      dataProfile: true,

      perluTindakLanjut: 0,
      notification: null,

      loadingConfirmationPin: false,

      // New Chart
      options: {
        chart: {
          id: `vuechart-${Date.now()}`,
          toolbar: {
            show: false,
          },
          stacked: false,
        },
        fill: {
          colors: ['#47AEE4', '#FBA63C'],
        },
        colors: ['#47AEE4', '#FBA63C'],
        xaxis: {
          type: 'datetime',
          tickAmount: 14,
          categories: [],
          labels: {
            formatter: (val, timestamp) => this.$moment(new Date(timestamp)).format('DD'),
          },
        },
        yaxis: [
          {
            show: false,
            tickAmount: 14,
            opposite: true,
            seriesName: 'Jumlah Order',
          },
          {
            seriesName: 'Omset',
            tickAmount: 14,
            labels: {
              formatter: value => {
                let formatedVal = 0

                if (Math.abs(Number(value)) >= 1.0e9) {
                  formatedVal = `${Math.abs(Number(value)) / 1.0e9} Mn`
                } else if (Math.abs(Number(value)) >= 1.0e6) {
                  formatedVal = `${Math.abs(Number(value)) / 1.0e6} Jt`
                } else if (Math.abs(Number(value)) >= 1.0e3) {
                  formatedVal = `${Math.abs(Number(value)) / 1.0e3} Rb`
                } else {
                  formatedVal = Math.abs(Number(value))
                }
                return `${formatedVal}`
              },
            },
          },
        ],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        tooltip: {
          x: {
            show: true,
            format: 'DD MMMM YYYY',
            formatter: seriesName => this.$moment(new Date(seriesName)).format('DD MMMM YYYY'),
          },
          custom: ({
            series, seriesIndex, dataPointIndex, w,
          }) => {
            let htmlRender = ''
            const arrayData = [...w.globals.series]
            arrayData.forEach((x, idx) => {
              if (w.globals.collapsedSeriesIndices.indexOf(idx) !== -1) {
                htmlRender += ''
              } else {
                htmlRender += `
                <div class="d-flex align-items-center">
                  <div class="mr-1">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6.5" r="6" fill="${w.globals.seriesNames[idx] === 'Omset' ? '#FBBC05' : '#47AEE4'}"/>
                    </svg>
                  </div>

                <div>
                <span>
                ${
  w.globals.seriesNames[idx] === 'Omset'
    ? this.formatRupiah(x[dataPointIndex] || 0)
    : x[dataPointIndex]
}
                </span>
                <span>
                ${
  w.globals.seriesNames[idx] === 'Jumlah Order'
    ? 'Orderan'
    : ''
}
                </span>
                </div>
                </div>
                `
              }
            })

            return `
            <div
              class="d-grid p-1 rounded align-items-center"
            >
              ${htmlRender}
              <br/>
            </div>
            `
          },
        },
      },
      seriesRevenue: [],
      filterChartItems: 'Semua',
      viewDateTooltipDownload: '',
      filterChartOptions: [
        {
          text: 'Semua',
          value: 'semua',
        },
        {
          text: 'COD',
          value: 'cod',
        },
        {
          text: 'Non-COD',
          value: 'bank transfer',
        },
      ],
      filterDateChartItems: 'Agustus 2022',
      filterDateChartOptions: [
        {
          title: 'Agustus 2022',
        },
      ],

      totalRevenueChart: 0,
      totalOrderanChart: 0,

      configDateChart: {
        mode: 'single',
        altInput: true,
        altFormat: 'j/n/Y',
        dateFormat: 'Y-m-d',
        plugins: [
          new MonthMode({
            shorthand: true, // defaults to false
            dateFormat: 'Y-m-d', // defaults to "F Y"
            altFormat: 'F Y', // defaults to "F Y"
            theme: 'primary', // defaults to "light"
          }),
        ],
      },

      chartDateItem: null,
      startDateChart: '',
      endDateChart: '',
      chartDateToFilter: null,

      totalProfitTooltipDownload: 0,
      totalOrderTooltipDownload: 0,
      dateTooltipDownload: null,
      paymentMethodsChart: 'semua',

      downloadChartStatus: false,
    }
  },
  computed: {
    ...mapFields('dashboard', {
      selectedProdukTerlaris: 'selectedProdukTerlaris',
      selectedChart: 'selectedChart',
    }),
    ...mapState('dashboard', [
      'saldo',
      'saldoPending',
      'saldoPendingOnProblem',
      'cashback',
      'orderanPerluDikirim',
      'orderanRetur',
      'topAdminOrders',
      'customerLoyals',
      'produkTerlarises',
      'optionsChart',
    ]),
    ...mapGetters('dashboard', ['partnerIncomeGraph']),
    ...mapFields('saldo', [
      'nominalTopUp',
      'selectedRekTujuan',
      'nominal',
      'pin',
    ]),
    ...mapGetters('saldo', ['rekenings', 'rekening', 'rekTujuanOptions']),
  },
  async mounted() {
    await this.$http_komship
      .post('v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      })
      .then(response => {
        const { data } = response.data
        this.fetchTicketPartnerCount()
        if (data) {
          if (!data.is_onboarding) {
            this.$bvModal.show('ModalOnBoarding')
          } else {
            this.loadingOnboarding = false
          }
        }
      })
    if (localStorage.getItem('notifSession')) {
      try {
        this.notification = JSON.parse(localStorage.getItem('notifSession'))
      } catch (e) {
        localStorage.removeItem('notifSession')
        this.checkNotification()
      }
    } else {
      await this.checkNotification()
    }
    this.fetchDataChart()
  },
  beforeMount() {
    this.$store.dispatch('dashboard/init')
    this.$store.dispatch('saldo/getBankAccount')
  },
  methods: {
    fetchTicketPartnerCount() {
      this.$http_komship
        .get('/v1/ticket-partner/count')
        .then(response => {
          const { data } = response.data
          this.perluTindakLanjut = data.perlu_tindak_lanjut
        })
        .catch(err => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err,
                variant: 'danger',
              },
            },
            2000,
          )
        })
    },
    setDataProfile(data) {
      this.dataProfile = data
    },
    formatRibuan(x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return x
    },
    formatRupiah(x) {
      return `Rp ${this.formatRibuan(x)}`
    },
    showTopUpModal() {
      this.$bvModal.show('modalTopUp')
      this.changeAttr()
    },
    async topUpSaldo() {
      this.loadingSubmitTopUp = true
      try {
        const response = await this.$store.dispatch('saldo/topUpSaldo')
        this.closeModal()
        if (!response.data.status) throw response.data
        try {
          window.open(response.data.data.invoice_xendit_url, '_blank').focus()
        } catch (e) {
          alert(
            'Pop-up Blocker is enabled! Please add this site to your exception list.',
          )
        }
        this.$refs['modal-after-topup'].show()
        this.changeAttr()
        this.loadingSubmitTopUp = false
      } catch (e) {
        this.$swal({
          title: '<span class="font-weight-bold h4">Top Up Saldo Gagal</span>',
          text: e.message,
          imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
          showCloseButton: false,
          focusConfirm: true,
          confirmButtonText: 'Oke',
          customClass: {
            confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
            popup: 'mr-2 ml-1',
          },
          buttonsStyling: false,
        })
        this.loadingSubmitTopUp = false
      } finally {
        this.$store.commit('saldo/UPDATE_NOMINAL', '')
        this.loadingSubmitTopUp = false
      }
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    formatNumber(n) {
      return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    showModal() {
      this.resetModal()
      if (this.rekTujuanOptions.length === 0) {
        this.$bvModal.show('modal-notif-rekTujuanBlmAda')
        this.changeAttr()
      } else {
        this.$bvModal.show('modal-keuangan')
        this.changeAttr()
      }
    },
    closeModal() {
      this.$bvModal.hide('modalTopUp')
      this.$bvModal.hide('modal-keuangan')
    },
    checkFormValidity(step) {
      let valid = null

      switch (step) {
        case 1:
          valid = this.$refs.form1.checkValidity()
          this.nominalState = valid
          this.rekTujuanState = valid
          break
        case 2:
          valid = this.$refs.form2.checkValidity()
          break
        default:
          break
      }
      return valid
    },
    resetModal() {
      this.stepNow = 0
      this.modalTitle = 'Penarikan Saldo'
      this.nominal = ''
      this.nominalState = null
      this.pin = ''
      this.pinState = null
      this.selectedRekTujuan = null
    },
    modalBack() {
      const nominalBefore = this.nominal
      const rekTujuanBefore = this.selectedRekTujuan
      this.resetModal()
      this.nominal = nominalBefore
      this.selectedRekTujuan = rekTujuanBefore
    },
    async handleSubmit(step) {
      if (!this.checkFormValidity(step)) {
        return
      }

      switch (step) {
        case 1:
          this.$nextTick(() => {
            this.stepNow = 1
            this.modalTitle = 'Verifikasi PIN'
            this.status = true
          })
          break
        case 2:
          this.loadingConfirmationPin = true
          try {
            const response = await this.$store.dispatch('saldo/checkPin')
            if (!response.data.data.is_match) {
              this.loadingConfirmationPin = false
              this.$refs['modal-error-pin'].show()
              this.changeAttr()
            } else {
              const responseReq = this.$store.dispatch(
                'saldo/withdrawalRequest',
              )
              responseReq
                .then(val => {
                  const { data } = val
                  this.$nextTick(() => {
                    this.stepNow = 2
                    this.modalTitle = null
                    this.status = data.status
                  })
                  this.loadingConfirmationPin = false
                })
                .catch(e => {
                  if (e.response.status === 400) {
                    this.$swal({
                      title:
                        '<span class="font-weight-bold h4">Penarikan Saldo Gagal</span>',
                      text:
                        'Maaf, kamu tidak bisa melakukan penarikan saldo dikarenakan kamu masih memiliki antrian penarikan yang belum disetujui.',
                      imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
                      showCloseButton: false,
                      focusConfirm: true,
                      confirmButtonText: 'Oke',
                      customClass: {
                        confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
                        popup: 'mr-2 ml-1',
                      },
                      buttonsStyling: false,
                    })
                  }
                  this.loadingConfirmationPin = false
                })
            }

            this.visibilityPin = 'password'
          } catch (e) {
            if (e.response.data.code === 400) {
              this.$swal({
                title:
                  '<span class="font-weight-bold h4">Penarikan Saldo Gagal</span>',
                text:
                  'Maaf, kamu tidak bisa melakukan penarikan saldo dikarenakan kamu masih memiliki antrian penarikan yang belum disetujui.',
                imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
                showCloseButton: false,
                focusConfirm: true,
                confirmButtonText: 'Oke',
                customClass: {
                  confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
                  popup: 'mr-2 ml-1',
                },
                buttonsStyling: false,
              })
            }
            this.loadingConfirmationPin = false
          }
          break
        default:
          break
      }
    },
    formatCurrency(blur, el) {
      const input = document.getElementById(el)
      let inputVal = input.value

      if (inputVal === '' || inputVal === 'Rp' || inputVal === 'Rp ') {
        return
      }

      const originalLen = inputVal.length
      let caretPos = input.selectionStart

      if (inputVal.indexOf(',') >= 0) {
        const decimalPos = inputVal.indexOf(',')
        let leftSide = inputVal.substring(0, decimalPos)
        let rightSide = inputVal.substring(decimalPos)

        leftSide = this.formatNumber(leftSide)
        rightSide = this.formatNumber(rightSide)

        rightSide = rightSide.substring(0, 2)
        inputVal = 'Rp ' + leftSide + ',' + rightSide // eslint-disable-line
      } else {
        inputVal = this.formatNumber(inputVal)
        inputVal = 'Rp ' + inputVal // eslint-disable-line
      }

      input.value = inputVal

      const updatedLen = inputVal.length
      caretPos = updatedLen - originalLen + caretPos
      input.setSelectionRange(caretPos, caretPos)
    },
    alertFail() {
      this.$swal({
        title:
          '<span class="font-weight-bold h4">Maaf sedang ada gangguan,<br>coba lagi nanti</span>',
        imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'Oke',
        customClass: {
          confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
          popup: 'mr-2 ml-1',
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
    getRange(first, last) {
      if (
        moment(first).format('l') === moment(this.today).format('l')
        && moment(last).format('l') === moment(this.today).format('l')
      ) {
        this.changeData(1)
        return 'Real Time'
      }
      if (
        moment(first).format('l') === moment(this.last7).format('l')
        && moment(last).format('l') === moment(this.today).format('l')
      ) {
        // eslint-disable-line
        this.changeData(2)
        return '7 Hari Terakhir'
      }
      if (
        moment(first).format('l') === moment(this.last30).format('l')
        && moment(last).format('l') === moment(this.today).format('l')
      ) {
        this.changeData(3)
        return '30 Hari Terakhir'
      }
      if (
        moment(first).format('l')
          === moment(this.firstDateOfMonth).format('l')
        && moment(last).format('l') === moment(this.lastDateOfMonth).format('l')
      ) {
        this.changeData(4)
        return 'Bulan Ini'
      }
      this.changeData(5)
      return 'Custom Tanggal'
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
          this.categories = [
            '00:00',
            '04:00',
            '08:00',
            '12:00',
            '16:00',
            '20:00',
            '24:00',
          ]
          break
        case 2:
          this.series = [
            {
              name: 'Leads',
              data: [
                '2400000',
                '2300000',
                '2700000',
                '2000000',
                '2500000',
                '2800000',
                '2100000',
              ],
            },
            {
              name: 'Orders',
              data: [
                '1400000',
                '1300000',
                '1700000',
                '2000000',
                '1500000',
                '1800000',
                '1100000',
              ],
            },
            {
              name: 'Pcs',
              data: [
                '400000',
                '300000',
                '700000',
                '1000000',
                '500000',
                '800000',
                '100000',
              ],
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
              data: [
                '24',
                '23',
                '27',
                '20',
                '25',
                '28',
                '21',
                '24',
                '23',
                '27',
                '20',
                '25',
                '28',
                '21',
                '24',
              ],
            },
            {
              name: 'Orders',
              data: [
                '14',
                '13',
                '17',
                '20',
                '15',
                '18',
                '11',
                '14',
                '13',
                '17',
                '20',
                '15',
                '18',
                '11',
                '14',
              ],
            },
            {
              name: 'Pcs',
              data: [
                '4',
                '3',
                '7',
                '10',
                '5',
                '8',
                '1',
                '4',
                '3',
                '7',
                '10',
                '5',
                '8',
                '1',
                '4',
              ],
            },
          ]
          for (let i = 0; i < 29; i += 1) {
            //eslint-disable-line
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
    handleChangeChart() {
      this.$store.dispatch('dashboard/getPartnerIncomeGraph')
    },
    onChange(v) {
      this.pin = v
    },
    onComplete(v) {
      this.pin = v
    },
    toggleVisibilityPin() {
      if (this.visibilityPin === 'password') {
        this.visibilityPin = 'text'
      } else {
        this.visibilityPin = 'password'
      }
    },
    windowOpen(link) {
      const url = `https://${link}`
      window.open(url, '_blank')
    },
    async checkNotification() {
      await this.$http_komship
        .get('/v1/partner/notification-bar')
        .then(result => {
          const { data } = result.data
          this.notification = data.map(items => ({
            id: items.id,
            title: items.title,
            description: items.description,
            url_link: items.url_link,
            color: items.color,
            show: true,
          }))
        })
        .catch(err => console.error(err))
    },
    notificationSession(value) {
      const index = this.notification.findIndex(items => items.id === value.id)
      this.notification[index].show = false
      const parsed = JSON.stringify(this.notification)
      localStorage.setItem('notifSession', parsed)
    },
    formatRupiahNominal() {
      return this.formatRupiah(this.nominal)
    },
    handleTryAgain() {
      this.$refs['modal-error-pin'].hide()
    },
    fetchDataChart() {
      if (this.startDateChart === '' && this.endDateChart === '') {
        const now = new Date()

        const first = moment(now).format('YYYY-MM-DD')
        this.chartDateItem = first
      } else {
        const params = {
          start_date: this.startDateChart,
          end_date: this.endDateChart,
        }
        if (this.paymentMethodsChart !== 'semua') Object.assign(params, { payment_method: this.paymentMethodsChart })
        this.$http_komship
          .get('/v1/dashboard/partner/revenueOrderPerformance', {
            params,
          })
          .then(response => {
            const { data } = response.data

            this.viewDateTooltipDownload = moment(new Date()).format('DD MMMM')
            if (data.data_days !== undefined) {
              const now = new Date()
              const dateFormatter = moment(now).format('YYYY-MM-DD')
              const findChartToday = data.data_days.find(item => item.day === dateFormatter)
              if (findChartToday) {
                this.totalProfitTooltipDownload = findChartToday.total_profit
                this.totalOrderTooltipDownload = findChartToday.total_order
                this.dateTooltipDownload = moment(findChartToday.day).format('DD MMMM YYYY')
              }

              this.totalRevenueChart = data.total_profit
              this.totalOrderanChart = data.total_order
              this.seriesRevenue = [
                {
                  name: 'Jumlah Order',
                  data: data.data_days.map(item => item.total_order),
                },
                {
                  name: 'Omset',
                  data: data.data_days.map(item => item.total_profit),
                },
              ]
              this.options = {
                ...this.options,
                xaxis: {
                  ...this.options.xaxis,
                  categories: data.data_days.map(item => item.day),
                },
              }
            } else {
              this.seriesRevenue = []
            }
          })
      }
    },
    chartDateFilter() {
      const now = new Date(this.chartDateItem)

      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
      const first = moment(firstDay).format('YYYY-MM-DD')
      this.startDateChart = first

      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      const last = moment(lastDay).format('YYYY-MM-DD')
      this.endDateChart = last
      this.fetchDataChart()
    },
    async downloadChart() {
      this.downloadChartStatus = true
      document.getElementById('filter__month__chart__download').style.display = 'block'
      document.getElementById('filter__month__chart').style.display = 'none'
      document.getElementById('title__chart__tooltip__download').style.display = 'block'
      document.getElementById('title__chart__tooltip').style.display = 'none'
      const now = moment(new Date()).format('DD MMMM')
      document.getElementById('id__tooltip__chart__download').style.display = 'block'
      const canvas = await html2canvas(document.getElementById('chart__revenue'))
      canvas.style.display = 'none'
      document.body.appendChild(canvas)
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      const a = document.createElement('a')
      a.setAttribute('download', `${now}.png`)
      a.setAttribute('href', image)
      a.click()
      document.getElementById('id__tooltip__chart__download').style.display = 'none'
      document.getElementById('filter__month__chart__download').style.display = 'none'
      document.getElementById('filter__month__chart').style.display = 'block'
      document.getElementById('title__chart__tooltip__download').style.display = 'none'
      document.getElementById('title__chart__tooltip').style.display = 'block'
      this.downloadChartStatus = false
    },
    async changeAttr() {
      const element = document.getElementsByTagName('body')[0].className

      await (element === 'modal-open')
      document.querySelectorAll('div.modal-content')[0].removeAttribute('tabindex')
    },
  },
}
