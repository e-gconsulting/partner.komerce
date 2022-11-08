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

      navigationItem: [],

      gamificationIsFinished: 0,
      gamificationExpiredAt: 0,
      claimAvailable: true,
      claimIsActive: false,

      haveGamification: true,
      gamificationIsExpired: false,

      rekeningDisplay: {},
      bankItems: [],
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
    await this.loadProfile()
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
  },
  methods: {
    loadProfile() {
      this.$http_komship
        .post('v1/my-profile', {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        })
        .then(response => {
          const { data } = response.data
          this.fetchTicketPartnerCount()
          this.fetchDataChart()
          this.getGamificationList()
          this.$store.dispatch('dashboard/init')
          this.$store.dispatch('saldo/getBankAccount')
          if (data) {
            if (!data.is_onboarding) {
              this.$bvModal.show('ModalOnBoarding')
            } else {
              this.loadingOnboarding = false
            }
          }
        })
    },
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
    getGamificationList() {
      this.$http_komship.get('/v1/gamifaction/list')
        .then(response => {
          this.haveGamification = true
          const { data } = response.data
          this.gamificationExpiredAt = data.expired_at
          this.gamificationIsFinished = data.is_finish
          this.haveGamification = true
          if (data.is_claim === 1) this.haveGamification = false
          if (data.is_finish === 1) this.gamificationIsExpired = false
          if (data.is_finish === 0 && data.is_expired === true) this.gamificationIsExpired = true
          this.navigationItem.push({
            label: 'Verification',
            value: data.is_verification,
            number: 'M50.504 19.6V17.794H53.878V28H51.862V19.6H50.504Z',
          },
          {
            label: 'Setting Ekspedisi',
            value: data.is_expedition_setting,
            number: 'M50.358 25.788C51.254 25.0413 51.968 24.4207 52.5 23.926C53.032 23.422 53.4753 22.8993 53.83 22.358C54.1847 21.8167 54.362 21.2847 54.362 20.762C54.362 20.286 54.25 19.9127 54.026 19.642C53.802 19.3713 53.4567 19.236 52.99 19.236C52.5233 19.236 52.164 19.3947 51.912 19.712C51.66 20.02 51.5293 20.4447 51.52 20.986H49.616C49.6533 19.866 49.9847 19.0167 50.61 18.438C51.2447 17.8593 52.0473 17.57 53.018 17.57C54.082 17.57 54.8987 17.8547 55.468 18.424C56.0373 18.984 56.322 19.726 56.322 20.65C56.322 21.378 56.126 22.0733 55.734 22.736C55.342 23.3987 54.894 23.9773 54.39 24.472C53.886 24.9573 53.228 25.5453 52.416 26.236H56.546V27.86H49.63V26.404L50.358 25.788Z',
          },
          {
            label: 'Setting Gudang',
            value: data.is_warehouse_setting,
            number: 'M49.77 20.482C49.8167 19.5487 50.1433 18.83 50.75 18.326C51.366 17.8127 52.1733 17.556 53.172 17.556C53.8533 17.556 54.4367 17.6773 54.922 17.92C55.4073 18.1533 55.7713 18.4753 56.014 18.886C56.266 19.2873 56.392 19.7447 56.392 20.258C56.392 20.846 56.238 21.3453 55.93 21.756C55.6313 22.1573 55.272 22.428 54.852 22.568V22.624C55.3933 22.792 55.8133 23.0907 56.112 23.52C56.42 23.9493 56.574 24.5 56.574 25.172C56.574 25.732 56.4433 26.2313 56.182 26.67C55.93 27.1087 55.552 27.454 55.048 27.706C54.5533 27.9487 53.956 28.07 53.256 28.07C52.2013 28.07 51.3427 27.804 50.68 27.272C50.0173 26.74 49.6673 25.956 49.63 24.92H51.534C51.5527 25.3773 51.7067 25.746 51.996 26.026C52.2947 26.2967 52.7007 26.432 53.214 26.432C53.69 26.432 54.054 26.3013 54.306 26.04C54.5673 25.7693 54.698 25.424 54.698 25.004C54.698 24.444 54.5207 24.0427 54.166 23.8C53.8113 23.5573 53.2607 23.436 52.514 23.436H52.108V21.826H52.514C53.8393 21.826 54.502 21.3827 54.502 20.496C54.502 20.0947 54.3807 19.782 54.138 19.558C53.9047 19.334 53.564 19.222 53.116 19.222C52.6773 19.222 52.3367 19.3433 52.094 19.586C51.8607 19.8193 51.7253 20.118 51.688 20.482H49.77Z',
          },
          {
            label: 'Upload Produk',
            value: data.is_product_upload,
            number: 'M49.658 26.012V24.472L54.236 17.92H56.518V24.304H57.75V26.012H56.518V28H54.558V26.012H49.658ZM54.684 20.02L51.814 24.304H54.684V20.02Z',
          },
          {
            label: 'Tambah Order',
            value: data.is_add_order,
            number: 'M56.602 19.488H52.066V21.882C52.262 21.6393 52.542 21.4433 52.906 21.294C53.27 21.1353 53.6573 21.056 54.068 21.056C54.8147 21.056 55.426 21.2193 55.902 21.546C56.378 21.8727 56.7233 22.2927 56.938 22.806C57.1527 23.31 57.26 23.8513 57.26 24.43C57.26 25.5033 56.952 26.3667 56.336 27.02C55.7293 27.6733 54.8613 28 53.732 28C52.668 28 51.8187 27.734 51.184 27.202C50.5493 26.67 50.19 25.9747 50.106 25.116H52.01C52.094 25.4893 52.2807 25.788 52.57 26.012C52.8687 26.236 53.2467 26.348 53.704 26.348C54.2547 26.348 54.67 26.1753 54.95 25.83C55.23 25.4847 55.37 25.0273 55.37 24.458C55.37 23.8793 55.2253 23.4407 54.936 23.142C54.656 22.834 54.2407 22.68 53.69 22.68C53.298 22.68 52.9713 22.778 52.71 22.974C52.4487 23.17 52.262 23.4313 52.15 23.758H50.274V17.766H56.602V19.488Z',
          },
          {
            label: 'Ajukan Pickup',
            value: data.is_pickup_request,
            number: 'M55.034 20.342C54.9407 19.95 54.7773 19.656 54.544 19.46C54.32 19.264 53.9933 19.166 53.564 19.166C52.92 19.166 52.444 19.4273 52.136 19.95C51.8373 20.4633 51.6833 21.3033 51.674 22.47C51.898 22.0967 52.2247 21.8073 52.654 21.602C53.0833 21.3873 53.55 21.28 54.054 21.28C54.6607 21.28 55.1973 21.4107 55.664 21.672C56.1307 21.9333 56.4947 22.316 56.756 22.82C57.0173 23.3147 57.148 23.912 57.148 24.612C57.148 25.2747 57.0127 25.8673 56.742 26.39C56.4807 26.9033 56.0933 27.3047 55.58 27.594C55.0667 27.8833 54.4553 28.028 53.746 28.028C52.7753 28.028 52.01 27.8133 51.45 27.384C50.8993 26.9547 50.512 26.3573 50.288 25.592C50.0733 24.8173 49.966 23.8653 49.966 22.736C49.966 21.028 50.26 19.74 50.848 18.872C51.436 17.9947 52.3647 17.556 53.634 17.556C54.614 17.556 55.3747 17.822 55.916 18.354C56.4573 18.886 56.77 19.5487 56.854 20.342H55.034ZM53.606 22.89C53.1113 22.89 52.696 23.0347 52.36 23.324C52.024 23.6133 51.856 24.0333 51.856 24.584C51.856 25.1347 52.01 25.5687 52.318 25.886C52.6353 26.2033 53.0787 26.362 53.648 26.362C54.152 26.362 54.5487 26.208 54.838 25.9C55.1367 25.592 55.286 25.1767 55.286 24.654C55.286 24.1127 55.1413 23.6833 54.852 23.366C54.572 23.0487 54.1567 22.89 53.606 22.89Z',
          })

          const findItem = this.navigationItem.find(item => item.value === 0)
          if (findItem === undefined) this.claimIsActive = true
          this.timer()
        }).catch(err => {
          if (err.response.data.message === 'partner does not have gamification data!') {
            this.haveGamification = false
            this.gamificationIsFinished = null
          }
        })
    },
    showRemaining() {
      const now = new Date()
      const countDownDate = new Date(this.gamificationExpiredAt)
      const distance = countDownDate - now
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      if (days > 0) {
        if (this.$refs.countdown__gamification !== undefined) {
          this.$refs.countdown__gamification.innerHTML = `${days} hari : ${hours} jam : ${
            minutes} menit : ${seconds} detik`
        }
      }
      if (days === 0) {
        if (this.$refs.countdown__gamification !== undefined) {
          this.$refs.countdown__gamification.innerHTML = `${hours} jam : ${
            minutes} menit : ${seconds} detik`
        }
      }
      if (distance < 0) {
        this.claimAvailable = false
        clearInterval(this.timer)
        this.gamificationIsExpired = true
      }
    },
    timer() {
      setInterval(this.showRemaining, 1000)
    },
    claimPoint() {
      if (this.claimIsActive) {
        this.$http_komship.post('/v1/gamifaction/claim')
          .then(() => {
            this.$refs['popup-success-claim-kompoint'].show()
          }).catch(err => {
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
      }
    },
    closeSuccessClaim() {
      this.loadProfile()
      this.$refs['popup-success-claim-kompoint'].hide()
      window.location.reload()
    },
    setRekening(data) {
      const find = this.bankItems.find(item => item.bank_account_id === data)
      this.rekeningDisplay = find
    },
    loadBank() {
      this.$http_komship.get('v1/bank-account').then(response => {
        const { data } = response.data
        this.bankItems = data
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal load data, silahkan refresh halaman!',
            variant: 'danger',
          },
        }, 2000)
      })
    },
  },
}
