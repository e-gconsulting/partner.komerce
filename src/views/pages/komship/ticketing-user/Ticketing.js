import {
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import {
  BRow,
  BCol,
  BCard,
  BForm,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  required,
} from '@validations'
import moment from 'moment'
import {
  today,
  last7,
  last30,
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'

const firebaseConfig = {
  apiKey: 'AIzaSyCPYJYeP-9_G3S5MOV_-8QPDSmxF8dj84g',
  authDomain: 'komship-ticketing.firebaseapp.com',
  projectId: 'komship-ticketing',
  storageBucket: 'komship-ticketing.appspot.com',
  messagingSenderId: '669211426801',
  appId: '1:669211426801:web:55bca3d2dac7238b298e50',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging()

export default
{
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BFormGroup,
    vSelect,
    DateRangePicker,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      loadingDataTable: true,
      fieldsTicket: [
        {
          key: 'ticket_no',
          label: 'No. Tiket',
          trClass: 'border-top-0 bg-warning',
          class: 'bg-white',
        },
        {
          key: 'no_resi',
          label: 'Nomor Resi',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'shipping',
          label: 'Ekspedisi',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'customer_name',
          label: 'Customer',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'name',
          label: 'Jenis Tiket',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'ticket_status',
          label: 'Status Tiket',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'date_created',
          label: 'Waktu Dibuat',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'date_updated',
          label: 'Waktu Diupdate',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
      ],
      itemsTicket: [],
      itemsResi: [],

      // Date range picker
      picker: {
        startDate: firstDateOfMonth,
        endDate: lastDateOfMonth,
      },
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, today],
      },
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,
      imageFile: null,
      imageInitialFile: null,
      itemsImageInitialFile: [],
      selected: true,
      belumDiProses: 0,
      perluTindakLanjut: 0,
      sedangDiProses: 0,
      searchType: {
        label: 'Nomor Tiket',
        value: 'ticket_no',
      },
      searchItems: [
        {
          label: 'Nomor Tiket',
          value: 'ticket_no',
        },
        {
          label: 'Nomor Resi',
          value: 'no_resi',
        },
        {
          label: 'Nama Customer',
          value: 'customer_name',
        },
      ],

      // Validation
      required,
      disableButton: false,

      // Store
      loadingSubmitTicket: false,
      itemsNoResi: null,
      noResi: null,
      customerName: '',
      jenisTicketItems: [
        {
          label: 'Alamat penerima / Nomor HP tidak lengkap',
          value: 5,
        },
      ],
      ticketTypeItems: [],
      ticketType: null,
      description: '',
      file: null,

      // Filter
      ticketStatus: [],
      ticketStatusItems: [
        {
          label: 'Perlu Tindak Lanjut',
          value: 0,
          onCheck: true,
        },
        {
          label: 'Belum Diproses',
          value: 1,
          onCheck: false,
        },
        {
          label: 'Sedang Diproses',
          value: 2,
          onCheck: false,
        },
        {
          label: 'Selesai',
          value: 3,
          onCheck: false,
        },
      ],
      fontClassTicketStatus: {
        color: 'salmon',
      },
      search: '',
      filterTicketType: [],
      dateRange: {
        startDate: last30,
        endDate: today,
      },
      dateRangeUpdate: {
        startDate: last30,
        endDate: today,
      },
      fcmToken: '',

      // Pagination
      currentPage: 1,
      totalRows: 0,
      optionsPage: [250, 500],
      totalPerPage: 250,

      finished: 0,
      userId: JSON.parse(localStorage.userData),
    }
  },
  watch: {
    dateRange: {
      handler() {
        this.fetchTicket()
      },
    },
    dateRangeUpdate: {
      handler() {
        this.fetchTicket()
      },
    },
    currentPage: {
      handler() {
        this.fetchTicket()
      },
    },
  },
  computed: {
    computedClassFilter() {
      let result = '12'
      if (window.screen.width >= 600) {
        result = 'auto'
      }
      return result
    },
    computedClassTypeSearch() {
      return window.screen.width >= 600 ? 'pr-0' : 'pr-0 mb-1'
    },
    computedClassAnyFilter() {
      return window.screen.width >= 600 ? 'auto' : '12 mb-1'
    },
  },
  created() {
    this.receiveMessage()
  },
  async mounted() {
    const findStatusDefault = await this.ticketStatusItems.find(item => item.onCheck === true)
    await this.ticketStatus.push(findStatusDefault.value)
    this.fetchTicket()
    this.fetchTicketPartnerCount()
    this.fetchTicketType()
    this.fetchDataFirebase()
  },
  methods: {
    fetchTicket() {
      this.loadingDataTable = true
      const params = {}
      if (this.dateRange) {
        Object.assign(params, { start_date: this.formatDateParams(this.dateRange.startDate) })
        Object.assign(params, { end_date: this.formatDateParams(this.dateRange.endDate) })
      }
      if (this.dateRangeUpdate) {
        Object.assign(params, { update_start_date: this.formatDateParams(this.dateRangeUpdate.startDate) })
        Object.assign(params, { update_end_date: this.formatDateParams(this.dateRangeUpdate.endDate) })
      }
      if (this.ticketStatus) Object.assign(params, { ticket_status: this.ticketStatus.join() })
      if (this.search) Object.assign(params, { search: this.search })
      if (this.searchType) Object.assign(params, { search_type: this.searchType.value })
      if (this.filterTicketType) Object.assign(params, { ticket_type: this.filterTicketType.join() })
      Object.assign(params, { total_per_page: this.totalPerPage })
      Object.assign(params, { page: this.currentPage })
      this.$http_komship.get('/v1/ticket-partner/list', {
        params,
      })
        .then(response => {
          const { data } = response.data.data
          this.itemsTicket = data
          this.totalRows = response.data.data.total
          this.loadingDataTable = false
        })
        .catch(err => {
          this.itemsTicket = []
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          }, 2000)
          this.loadingDataTable = false
        })
    },
    fetchTicketPartnerCount() {
      this.$http_komship.get('v1/ticket-partner/count')
        .then(response => {
          const { data } = response.data
          this.belumDiProses = data.belum_diproses
          this.perluTindakLanjut = data.perlu_tindak_lanjut
          this.sedangDiProses = data.sedang_diproses
          this.finished = data.selesai
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    fetchDataResi() {
      this.customerName = this.itemsNoResi.customer_name
      this.noResi = this.itemsNoResi.no_resi
    },
    alertSubmitTicket() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.$refs['alert-validate-ticket'].show()
        } else {
          this.loadingSubmitTicket = false
        }
      })
    },
    closeAlertSubmitTicket() {
      this.$refs['alert-validate-ticket'].hide()
    },
    submitTicket() {
      this.$refs['alert-validate-ticket'].hide()
      this.loadingSubmitTicket = true
      this.$refs.formRules.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('no_resi', this.noResi)
          formData.append('customer_name', this.customerName)
          formData.append('ticket_type', this.ticketType.value)
          formData.append('description', this.description)
          if (this.itemsImageInitialFile.length > 1) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.itemsImageInitialFile.length; i++) {
              formData.append('file[]', this.itemsImageInitialFile[i])
            }
          } else {
            formData.append('file[]', this.itemsImageInitialFile[0])
          }

          this.$http_komship.post('/v1/ticket-partner/store', formData)
            .then(() => {
              this.loadingSubmitTicket = false
              this.noResi = null
              this.itemsNoResi = null
              this.customerName = ''
              this.ticketType = null
              this.description = ''
              this.itemsImageInitialFile = []
              this.$refs.formRules.reset()
              this.$refs['popup-success-create-ticket'].show()
            })
            .catch(err => {
              this.loadingSubmitTicket = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
            })
        } else {
          this.loadingSubmitTicket = false
        }
      })
    },
    closeSuccessCreateTicket() {
      this.fetchTicket()
      this.$refs['popup-success-create-ticket'].hide()
    },
    onRowSelected(data) {
      this.$router.push({ path: `/ticketing/detail/${data[0].id}`, params: { data_ticket: data } })
    },
    cekResi(search, loading) {
      if (search.length) {
        this.searchResi(loading, search, this)
      }
    },
    searchResi: _.debounce((loading, search, that) => {
      loading(true)
      that.loadResi(search).finally(() => loading(false))
    }, 500),
    loadResi(search) {
      return this.$http_komship.get(`/v1/ticket-partner/check-resi/${search}`)
        .then(response => {
          const { data } = response.data
          this.itemsResi = data
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    formatDateParams(d) {
      return moment(d).format('YYYY-MM-DD')
    },
    onChangeFile(event) {
      event.target.files.forEach(this.myFile)
    },
    myFile(data) {
      this.itemsImageInitialFile.push(data)
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
    deleteFile(data) {
      const findIndexObj = this.itemsImageInitialFile.findIndex(items => items.name === data.name)
      this.itemsImageInitialFile.splice(findIndexObj, 1)
    },
    setSearchType(data) {
      this.searchType = data
      this.fetchTicket()
      this.$root.$emit('bv::hide::popover', 'popover-search-type')
    },
    filterTicketByStatus(data) {
      const findIndexObj = this.ticketStatusItems.findIndex(items => items.value === data.value)
      const findObj = this.ticketStatus.findIndex(items => items === data.value)
      if (this.ticketStatusItems[findIndexObj].onCheck === true) {
        this.ticketStatus.push(data.value)
      } else {
        this.ticketStatus.splice(findObj, 1)
      }
      this.fetchTicket()
    },
    filterByTicketType(data) {
      const findIndexObj = this.ticketTypeItems.findIndex(items => items.id === data.id)
      const findObj = this.filterTicketType.findIndex(items => items === data.id)
      if (this.ticketTypeItems[findIndexObj].onCheck === true) {
        this.filterTicketType.push(data.id)
      } else {
        this.filterTicketType.splice(findObj, 1)
      }
      this.fetchTicket()
    },
    fetchTicketType() {
      this.$http_komship.get('/v1/ticket-partner/ticket-type/list')
        .then(response => {
          const { data } = response.data
          this.ticketTypeItems = data
          // eslint-disable-next-line no-plusplus
          for (let x = 0; x < this.ticketTypeItems.length; x++) {
            Object.assign(this.ticketTypeItems[x], { onCheck: false })
          }
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    statusTicketClass(data) {
      let resultVariant = ''
      if (data === 1) {
        resultVariant = 'font-medium text-primary'
      } else if (data === 2) {
        resultVariant = 'font-medium text-warning'
      } else if (data === 3) {
        resultVariant = 'font-medium text-success'
      } else if (data === 4) {
        resultVariant = 'font-medium text-secondary'
      }
      return resultVariant
    },
    searchTicket: _.debounce(function () {
      this.fetchTicket()
    }, 1000),
    async clearFilter() {
      this.loadingDataTable = true
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < this.ticketTypeItems.length; x++) {
        this.ticketTypeItems[x].onCheck = false
      }
      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < this.ticketStatusItems.length; x++) {
        this.ticketStatusItems[x].onCheck = false
      }
      const findIndexStatusDefault = await this.ticketStatusItems.findIndex(item => item.value === 0)
      this.ticketStatusItems[findIndexStatusDefault].onCheck = true
      const findStatusDefault = await this.ticketStatusItems.find(item => item.onCheck === true)
      await this.ticketStatus.push(findStatusDefault.value)
      const params = {
        ticket_status: this.ticketStatus.join(),
      }
      this.$http_komship.get('/v1/ticket-partner/list', {
        params,
      })
        .then(response => {
          const { data } = response.data.data
          this.itemsTicket = data
          this.loadingDataTable = false
        })
        .catch(err => {
          this.itemsTicket = []
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.loadingDataTable = false
        })
    },
    receiveMessage() {
      try {
        onMessage(messaging, payload => {
          this.fetchTicket()
          this.fetchTicketPartnerCount()
          this.fetchTicketType()
          this.fetchDataFirebase()
        })
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
      }
    },
    fetchDataFirebase() {
      Notification.requestPermission().then(permission => {
        if (!('permission' in Notification)) {
          Notification.permission = permission
        }
        // you got permission !
      }, rejection => {
        // handle rejection here.
      })
      getToken(messaging, { vapidKey: 'BLZr38POWZ6vwjTUx4v2vlPHK-3fiI-DMPY18tAbu1dpchDiAYMyR7l2PE3WbH5hOM55X2zBR_C-5BLrpUA1-ZM' }).then(currentToken => {
        if (currentToken) {
          this.fcmToken = currentToken
          this.$http
            .post('/user/update-fcm-token', {
              user_id: this.userId.id,
              fcm_token: currentToken,
            })
          Notification.requestPermission().then(permission => {
            console.log('permiss', permission)
            if (permission === 'denied' || permission === 'default') {
              this.$refs['modal-alert-notification'].show()
            }
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'No registration token available. Request permission to generate one.',
              variant: 'danger',
            },
          }, 2000)
        }
      }).catch(() => {
        this.$refs['modal-alert-notification'].show()
      })
    },
    convertTicketStatus(data) {
      let result = ''
      if (data === 0) {
        result = 'Perlu Tindak Lanjut'
      } else if (data === 1) {
        result = 'Belum Diproses'
      } else if (data === 2) {
        result = 'Sedang Diproses'
      } else if (data === 3) {
        result = 'Selesai'
      } else if (data === 4) {
        result = 'Batal'
      }
      return result
    },
    clearFieldTicket() {
      this.noResi = null
      this.itemsResi = []
      this.itemsNoResi = null
      this.customerName = ''
      this.ticketType = null
      this.description = ''
      this.itemsImageInitialFile = []
      this.$refs.formRules.reset()
    },
    setPerPage(page) {
      this.totalPerPage = page
      this.fetchTicket()
    },
    checkVariantClear() {
      let result = 'outline-primary'
      if (this.itemsNoResi !== null || this.ticketType !== null || this.itemsImageInitialFile !== [] || this.description !== '') {
        result = 'outline-dark'
      }
      return result
    },
    checkDisableClear() {
      let result = true
      if (this.itemsNoResi !== null || this.ticketType !== null || this.itemsImageInitialFile !== [] || this.description !== '') {
        result = false
      }
      return result
    },
  },
}
