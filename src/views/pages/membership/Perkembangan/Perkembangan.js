import {
  BTable,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'
import {
  today,
  last30,
  last7,
  firstDateOfMonth,
  formatYmd,
} from '@/store/helpers'
import filterLib from '@/libs/filters'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BTable,
    BCard,
    BSpinner,
    BCardBody,
    DateRangePicker,
  },
  data() {
    return {
      loadDataAwal: true,
      search: '',
      locale: {
        format: 'dd/mm/yyyy',
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, today],
      },
      rangeDate: {
        startDate: last30,
        endDate: today,
      },
      isLoadTable: false,
      perPage: 50,
      pageOptions: [50, 100, 200, 500],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      items: [
        {
          partner_id: 201,
          full_name: 'Tatausahaku',
          email: 'asdkmaksmdkasmdk@mail.com',
          no_hp: '12739741293879141',
          registered: '2020-05-29 20:24:38',
          email_verified_at: '2020-05-29 21:24:38',
          is_onboarding: 1,
          first_product: '2021-05-01 21:24:38',
          first_order: '2021-07-01 21:24:38',
          first_pickup: '2021-09-01 21:24:38',
          last_pickup: '2021-09-02 21:24:38',
          total_order: 188,
          total_transaksi: 13494799,
          total_ongkir: 20020002020,
          total_revenue: 1020,
        },
      ],
      fields: [
        {
          key: 'full_name',
          label: 'Nama',
          sortable: true,
          stickyColumn: true,
          thClass: 'text-black',
          thStyle: {
            color: 'black',
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'registered',
          label: 'Registrasi',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => (this.$moment(val).isValid() ? this.$moment(val).format('DD MMMM YYYY') : val),
          thStyle: {
            verticalAlign: 'middle',
            textTransform: 'capitalize',
          },
        },
        {
          key: 'email_verified_at',
          label: 'Verifikasi Email',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => (this.$moment(val).isValid() ? this.$moment(val).format('DD MMMM YYYY') : val),
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'is_onboarding',
          label: 'On Boarding',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'first_product',
          label: '1st Produk',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => (this.$moment(val).isValid() ? this.$moment(val).format('DD MMMM YYYY') : val),
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'first_order',
          label: '1st Order',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => (this.$moment(val).isValid() ? this.$moment(val).format('DD MMMM YYYY') : val),
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'first_pickup',
          label: '1st Pickup',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => (this.$moment(val).isValid() ? this.$moment(val).format('DD MMMM YYYY') : val),
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'last_pickup',
          label: 'Pickup Akhir',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => (this.$moment(val).isValid() ? this.$moment(val).format('DD MMMM YYYY') : val),
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'total_order',
          label: 'Total Order',
          sortable: true,
          class: 'text-black text-right',
          tdClass: 'cell__custom',
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'total_transaksi',
          label: 'Total Transaksi',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => `${filterLib.rupiah(val)},-`,
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'total_ongkir',
          label: 'Total Ongkir',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => `${filterLib.rupiah(val)},-`,
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'total_revenue',
          label: 'Total Revenue',
          sortable: true,
          class: 'text-black',
          tdClass: 'cell__custom',
          formatter: val => `${filterLib.rupiah(val)},-`,
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
      ],
      paramsCallAPI: {
        start_date: formatYmd(last30),
        end_date: formatYmd(today),
        page: null,
        limits: 50,
      },
      filteredItems: [],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  watch: {
    rangeDate: {
      handler(val) {
        // calling api for table and update data table
        if (val) {
          const { startDate, endDate } = val
          this.paramsCallAPI.start_date = startDate
          this.paramsCallAPI.end_date = endDate
        } else {
          this.paramsCallAPI.start_date = val.startDate
          this.paramsCallAPI.end_date = val.endDate
        }
      },
      deep: true,
    },
    perPage: {
      handler(val) {
        this.paramsCallAPI.limits = val
      },
    },
    currentPage: {
      handler(val) {
        this.paramsCallAPI.page = val
      },
    },
    paramsCallAPI: {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
  },
  mounted() {
    this.totalRows = this.items.length
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isLoadTable = true
      this.$http_komship({
        methods: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/v1/admin/partnerGrowth',
        params: {
          ...this.paramsCallAPI,
        },
      })
        .then(resp => {
          const parseData = JSON.parse(JSON.stringify(resp.data.data))
          if (Array.isArray(parseData.data) && parseData.data.length === 0) {
            this.items = []
            this.filteredItems = []
            this.totalRows = 0
          } else {
            const dtitems = parseData.data.map(x => ({ ...x, last_pickup: '2020-02-02 20:20:20' }))
            this.items = dtitems
            this.filteredItems = dtitems
            this.totalRows = dtitems.total
          }
          this.loadDataAwal = false
          this.isLoadTable = false
        })
        .catch(e => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'Unable to load the table data. Please try again later or contact support.',
              variant: 'danger',
            },
          })
          this.loadDataAwal = false
          this.isLoadTable = false
        })
    },
    formatDate(d) {
      return this.$moment(d).format('D MMM YYYY')
    },
    checkDataStatusOnboarding(dt) {
      let strWord = ''
      if (dt === 1) {
        strWord = 'Selesai'
      } else {
        strWord = 'Belum'
      }
      return strWord
    },
    handlePhone(phonetext, type) {
      switch (type) {
        case 'wa':
          window.open(`https://wa.me/${phonetext.substring(1)}`, '_blank')
          break
        case 'copy':
          navigator.clipboard.writeText(phonetext)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success copy to clipboard',
              icon: 'BellIcon',
              variant: 'success',
            },
          })
          break
        default:
          break
      }
    },
    onChangeSearch(dtsearch) {
      if (dtsearch) {
        const filteredData = [...this.items].filter(x => {
          if (x.full_name.indexOf(dtsearch) !== -1) {
            return true
          }
          if (x.email.indexOf(dtsearch) !== -1) {
            return true
          }
          if (x.no_hp.indexOf(dtsearch) !== -1) {
            return true
          }
          return false
        })
        this.filteredItems = filteredData
      } else {
        this.filteredItems = this.items
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    setperPage(pagedt) {
      this.perPage = pagedt
    },
  },
}
