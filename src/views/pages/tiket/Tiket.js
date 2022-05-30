import {
  BRow, BCol, BCard, BForm, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
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

export default {
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
      timeResponse: [],
      modes: 'single',
      selectMode: 'single',
      selected: true,

      // Date range picker
      picker: {
        startDate: firstDateOfMonth,
        endDate: lastDateOfMonth,
      },
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Mei',
          'Jun',
          'Jul',
          'Agu',
          'Sep',
          'Okt',
          'Nov',
          'Des',
        ],
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
          label: 'Menunggu Tindak Lanjut',
          value: 0,
          onCheck: false,
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
  mounted() {
    this.fetchTicket()
    this.fetchTicketType()
    this.fetchTimeResponse()
    this.formatDate()
    // console.log(moment('2022-01-01').utc().fromNow())
  },
  methods: {
    fetchTimeResponse() {
      this.$http_komship
        .get('/v1/ticket-admin/time-response')
        .then(res => {
          const { data } = res.data
          this.timeResponse = data
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
    fetchTicket() {
      this.loadingDataTable = true
      const params = {}
      if (this.dateRange) {
        Object.assign(params, {
          start_date: this.formatDateParams(this.dateRange.startDate),
        })
        Object.assign(params, {
          end_date: this.formatDateParams(this.dateRange.endDate),
        })
      }
      if (this.dateRangeUpdate) {
        Object.assign(params, {
          update_start_date: this.formatDateParams(
            this.dateRangeUpdate.startDate,
          ),
        })
        Object.assign(params, {
          update_end_date: this.formatDateParams(this.dateRangeUpdate.endDate),
        })
      }
      if (this.ticketStatus) {
        Object.assign(params, { ticket_status: this.ticketStatus.join() })
      }
      if (this.search) Object.assign(params, { search: this.search })
      if (this.searchType) {
        Object.assign(params, { search_type: this.searchType.value })
      }
      if (this.filterTicketType) {
        Object.assign(params, { ticket_type: this.filterTicketType.join() })
      }
      Object.assign(params, { total_per_page: this.totalPerPage })
      Object.assign(params, { page: this.currentPage })
      this.$http_komship
        .get('/v1/ticket-admin/list', {
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
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Failure',
                icon: 'AlertCircleIcon',
                text: err.response.data.message,
                variant: 'danger',
              },
            },
            2000,
          )
          this.loadingDataTable = false
        })
    },
    onRowSelected(data) {
      this.selected = data
      this.$router.push({
        path: `/tiket/detail/${data[0].id}`,
        params: { data_tiket: data },
      })
    },
    formatDate(d) {
      return moment(d).format('HH:mm D/MM/YYYY')
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
      const findIndexObj = this.itemsImageInitialFile.findIndex(
        items => items.name === data.name,
      )
      this.itemsImageInitialFile.splice(findIndexObj, 1)
    },
    setSearchType(data) {
      this.searchType = data
      this.fetchTicket()
      this.$root.$emit('bv::hide::popover', 'popover-search-type')
    },
    filterTicketByStatus(data) {
      const findIndexObj = this.ticketStatusItems.findIndex(
        items => items.value === data.value,
      )
      const findObj = this.ticketStatus.findIndex(items => items === data.value)
      if (this.ticketStatusItems[findIndexObj].onCheck === true) {
        this.ticketStatus.push(data.value)
      } else {
        this.ticketStatus.splice(findObj, 1)
      }
      this.fetchTicket()
    },
    filterByTicketType(data) {
      const findIndexObj = this.ticketTypeItems.findIndex(
        items => items.id === data.id,
      )
      const findObj = this.filterTicketType.findIndex(
        items => items === data.id,
      )
      if (this.ticketTypeItems[findIndexObj].onCheck === true) {
        this.filterTicketType.push(data.id)
      } else {
        this.filterTicketType.splice(findObj, 1)
      }
      this.fetchTicket()
    },
    fetchTicketType() {
      this.$http_komship
        .get('/v1/ticket-admin/ticket-type/list')
        .then(response => {
          const { data } = response.data
          this.ticketTypeItems = data
          for (let x = 0; x < this.ticketTypeItems.length; x += 1) {
            Object.assign(this.ticketTypeItems[x], { onCheck: false })
          }
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
    searchTicket: _.debounce(() => {
      this.fetchTicket()
    }, 1000),
    clearFilter() {
      this.loadingDataTable = true
      const params = {}
      this.$http_komship
        .get('/v1/ticket-admin/list', {
          params,
        })
        .then(response => {
          const { data } = response.data.data
          this.itemsTicket = data
          this.loadingDataTable = false
        })
        .catch(err => {
          this.itemsTicket = []
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
          this.loadingDataTable = false
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
      this.itemsNoResi = null
      this.customerName = ''
      this.ticketType = null
      this.description = ''
      this.itemsImageInitialFile = []
    },
    setPerPage(page) {
      this.totalPerPage = page
      this.fetchTicket()
    },
  },
}
