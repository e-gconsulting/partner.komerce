import {
  BRow,
  BCol,
  BCard,
  BForm,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default
{
  components: {
    BRow,
    BCol,
    BCard,
    BForm,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      fieldsTicket: [
        {
          key: 'no_ticket',
          label: 'No. Tiket',
          trClass: 'border-top-0 bg-warning',
          class: 'bg-white',
        },
        {
          key: 'nomor_resi',
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
          key: 'customer',
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
          key: 'status_ticket',
          label: 'Status Tiket',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'waktu_dibuat',
          label: 'Waktu Dibuat',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
        {
          key: 'waktu_diupdate',
          label: 'Waktu Diupdate',
          trClass: 'border-top-0',
          class: 'bg-white',
        },
      ],
      itemsTicket: [
        {
          no_ticket: 'TIC747220323008 ',
          nomor_resi: '1221662200098800',
          ekspedisi: 'JNE',
          customer: 'Candra Maung',
          jenis_ticket: 'Fake Ticket',
          status_ticket: 'Belum Diproses',
          waktu_dibuat: '15:30 23/03/2022',
          waktu_diupdate: '15:30 23/03/2022',
        },
        {
          no_ticket: 'TIC747220323008 ',
          nomor_resi: '1221662200098800',
          ekspedisi: 'JNE',
          customer: 'Candra Maung',
          jenis_ticket: 'Fake Ticket',
          status_ticket: 'Belum Diproses',
          waktu_dibuat: '15:30 23/03/2022',
          waktu_diupdate: '15:30 23/03/2022',
        },
        {
          no_ticket: 'TIC747220323008 ',
          nomor_resi: '1221662200098800',
          ekspedisi: 'JNE',
          customer: 'Candra Maung',
          jenis_ticket: 'Fake Ticket',
          status_ticket: 'Belum Diproses',
          waktu_dibuat: '15:30 23/03/2022',
          waktu_diupdate: '15:30 23/03/2022',
        },
        {
          no_ticket: 'TIC747220323008 ',
          nomor_resi: '1221662200098800',
          ekspedisi: 'JNE',
          customer: 'Candra Maung',
          jenis_ticket: 'Fake Ticket',
          status_ticket: 'Belum Diproses',
          waktu_dibuat: '15:30 23/03/2022',
          waktu_diupdate: '15:30 23/03/2022',
        },
      ],

      // Store
      noResi: '',
      customerName: '',
      ticketType: '',
      description: '',
      file: null,
    }
  },
  mounted() {
    this.$http_komship.get('/v1/ticket-partner/list')
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    submitTicket() {
      this.$refs['popup-success-create-ticket'].show()
    },
    closeSuccessCreateTicket() {
      this.$refs['popup-success-create-ticket'].hide()
    },
    onRowSelected(data) {
      console.log(data)
      this.$router.push('/ticketing/detail')
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
      return this.$http_komship.get(`/v1/ticket-partner/check_resi/${search}`)
        .then(response => {
          console.log(response)
        }).catch(err => {
          console.log(err)
        })
    },
  },
}
