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
        },
        {
          key: 'nomor_resi',
          label: 'Nomor Resi',
        },
        {
          key: 'ekspedisi',
          label: 'Ekspedisi',
        },
        {
          key: 'customer',
          label: 'Customer',
        },
        {
          key: 'jenis_ticket',
          label: 'Jenis Tiket',
        },
        {
          key: 'status_ticket',
          label: 'Status Tiket',
        },
        {
          key: 'waktu_dibuat',
          label: 'Waktu Dibuat',
        },
        {
          key: 'waktu_diupdate',
          label: 'Waktu Diupdate',
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
      ],
    }
  },
  methods: {
    submitTicket() {
      this.$refs['popup-success-create-ticket'].show()
    },
    closeSuccessCreateTicket() {
      this.$refs['popup-success-create-ticket'].hide()
    },
  },
}
