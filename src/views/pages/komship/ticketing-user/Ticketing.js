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
import { mapFields } from 'vuex-map-fields'
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
          key: 'ekspedisi',
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
          key: 'jenis_ticket',
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
      searchType: 'Nomor Tiket',
      searchItems: [
        {
          label: 'Nomor Tiket',
          value: 0,
        },
        {
          label: 'Nomor Resi',
          value: 1,
        },
        {
          label: 'Nama Customer',
          value: 2,
        },
      ],

      // Validation
      required,

      // Store
      itemsNoResi: null,
      noResi: null,
      customerName: '',
      jenisTicketItems: [
        {
          label: 'Alamat penerima / Nomor HP tidak lengkap',
          value: 5,
        },
      ],
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
    }
  },
  computed: {
    ...mapFields('penghasilan', [
      'dateRange',
    ]),
  },
  mounted() {
    this.fetchTicket()
    this.fetchTicketPartnerCount()
  },
  methods: {
    fetchTicket() {
      this.loadingDataTable = true
      const params = {}
      if (this.ticketStatus) Object.assign(params, { ticket_status: this.ticketStatus.join() })
      this.$http_komship.get('/v1/ticket-partner/list', {
        params,
      })
        .then(response => {
          console.log(response)
          const { data } = response.data
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
        }).catch(err => {
          console.log(err.response)
        })
    },
    fetchDataResi() {
      console.log(this.noResi)
      this.customerName = this.itemsNoResi.customer_name
      this.noResi = this.itemsNoResi.no_resi
    },
    fetchJenisTicket() {
      console.log(this.ticketType)
    },
    submitTicket() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          console.log(this.noResi)
          console.log(this.customerName)
          console.log(this.ticketType)
          console.log(this.itemsImageInitialFile)
          console.log(this.description)

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
            .then(response => {
              console.log(response)
            })
        }
      })
      // this.$refs['popup-success-create-ticket'].show()
    },
    closeSuccessCreateTicket() {
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
          console.log(this.itemsResi)
        }).catch(err => {
          console.log(err)
        })
    },
    handleChangeDatePicker() {

    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    onChangeFile(event) {
      console.log('event', event)
      console.log('imageFile', this.imageFile)
      event.target.files.forEach(this.myFile)
    },
    myFile(data) {
      this.itemsImageInitialFile.push(data)
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
    deleteFile(data) {
      console.log(data)
      const findIndexObj = this.itemsImageInitialFile.findIndex(items => items.name === data.name)
      console.log('findObject', findIndexObj)
      this.itemsImageInitialFile.splice(findIndexObj, 1)
    },
    setSearchType(data) {
      this.searchType = data.label
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
  },
}
