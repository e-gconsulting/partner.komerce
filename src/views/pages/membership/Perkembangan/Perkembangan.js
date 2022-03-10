import {
  // BButton,
  BTable,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import {
  today,
  last30,
} from '@/store/helpers'

export default {
  components: {
    flatPickr,
    // BButton,
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
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      items: [
        {
          partner_id: 1,
          nama_layanan: 'Tatausahaku',
          email: 'asdkmaksmdkasmdk@mail.com',
          no_hp: '12739741293879141',
          registered: '2020-05-29 20:24:38',
          email_verified_at: '2020-05-29 21:24:38',
          is_onboarding: 1,
          first_product: '2021-05-01 21:24:38',
          first_order: '2021-07-01 21:24:38',
          first_pickup: '2021-09-01 21:24:38',
          total_order: 188,
          total_transaksi: 13494799,
        },
        {
          id: 2,
          nama_layanan: 'COD',
          total: '54',
        },
        {
          id: 3,
          nama_layanan: 'Hiring dan COD',
          total: '54',
        },
      ],
      fields: [
        {
          key: 'namedata',
          label: 'Nama',
          sortable: true,
        },
        {
          key: 'total',
          label: 'Registrasi',
          sortable: true,
        },
        {
          key: 'total',
          label: 'Verifikasi Email',
          sortable: true,
        },
        {
          key: 'total',
          label: 'On Boarding',
          sortable: true,
        },
      ],
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
        } else {
          // handle error
        }
      },
    },
  },
  mounted() {
    //
    this.totalRows = this.items.length
  },
  created() {
    setTimeout(() => {
      this.loadDataAwal = false
    }, 1000)
  },
  methods: {
    submitData() {

    },
    onChangeSearch() {
      //
    },
    checkAksesLayanan() {
      //
    },
    hideModalAksesLayanan() {
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-akseslayanan')
      })
    },
    simpanDataAksesLayanan() {
      // calling api and finish hide modal
      // refresh or watch selected list akses layanan
      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit-akseslayanan')
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
