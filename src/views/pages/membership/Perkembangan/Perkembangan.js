import {
  BTable,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import {
  today,
  last30,
  formatYmd,
} from '@/store/helpers'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    flatPickr,
    BTable,
    BCard,
    BSpinner,
    BCardBody,
  },
  data() {
    return {
      loadDataAwal: true,
      search: '',
      configFilterDate: {
        mode: 'range',
        maxDate: 'today',
        defaultDate: [last30, today],
      },
      rangeDate: '',
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
        {
          partner_id: 202,
          full_name: 'Tatausahaku2',
          email: 'asdkmaksmdkasmdk@mail.com',
          no_hp: '12739741293879141',
          registered: '2020-05-29 20:24:38',
          email_verified_at: '2020-05-29 21:24:38',
          is_onboarding: 0,
          first_product: '2021-05-01 21:24:38',
          first_order: '2021-07-01 21:24:38',
          first_pickup: '2021-09-01 21:24:38',
          last_pickup: '2021-09-02 21:24:38',
          total_order: 188,
          total_transaksi: 13494799,
          total_ongkir: 20020002020,
          total_revenue: 1020,
        },
        {
          partner_id: 203,
          full_name: 'Tatausahaku3',
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
          class: 'text-black',
        },
        {
          key: 'registered',
          label: 'Registrasi',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'email_verified_at',
          label: 'Verifikasi Email',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'is_onboarding',
          label: 'On Boarding',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'first_product',
          label: 'Produk Awal',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'first_pickup',
          label: 'Pickup Awal',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'last_pickup',
          label: 'Pickup Akhir',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'no_hp',
          label: 'Pickup Akhir1',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'first_order',
          label: 'Pickup Akhir2',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'total_order',
          label: 'Pickup Akhir3',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'total_transaksi',
          label: 'Pickup Akhir4',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'total_ongkir',
          label: 'Pickup Akhir6',
          sortable: true,
          class: 'text-black',
        },
        {
          key: 'total_revenue',
          label: 'Pickup Akhir7',
          sortable: true,
          class: 'text-black',
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
        if (val.indexOf('to') !== -1) {
          const [startDate, endDate] = val.split(' to ')
          this.paramsCallAPI.start_date = startDate
          this.paramsCallAPI.end_date = endDate
        } else {
          this.paramsCallAPI.start_date = val
          this.paramsCallAPI.end_date = val
        }
      },
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
    checkDataStatusOnboarding(dt) {
      let strWord = ''
      if (dt === 1) {
        strWord = 'Selesai'
      } else {
        strWord = 'Belum'
      }
      return strWord
    },
    onChangeSearch(dtsearch) {
      if (dtsearch) {
        const filteredData = [...this.items].filter(x => x.full_name.indexOf(dtsearch) !== -1)
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
