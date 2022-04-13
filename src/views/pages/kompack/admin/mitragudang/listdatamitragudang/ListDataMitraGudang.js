import {
  BTable,
  BCard,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dataGudangStatus = {
  unverified: 'Belum Diverifikasi',
  inactive: 'nonaktif',
  active: 'Aktif',
}

export default {
  components: {
    BTable,
    BCard,
  },
  data() {
    return {
      isLoadTable: true,
      perPage: 50,
      pageOptions: [50, 100, 200, 500],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      items: [
      /*
        address: "MATARAM, MATARAM"
        email: "ragil@email.com"
        id: 16
        image_logo_url: "https://kompackdev.komerce.id/warehouse_logo/1649651136.mburi.jpg"
        is_verification: 0
        name: "ragil setiawans"
        owner: "ragil setiawans"
        phone_number: "081229460004"
        status: "nonaktif"
        total_partner: 0
      */
      ],
      fields: [
        {
          key: 'name',
          label: 'Gudang',
          sortable: true,
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'owner',
          label: 'Nama Pemilik',
          sortable: true,
          tdClass: 'text-black',
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'phone_number',
          label: 'Kontak',
          sortable: true,
          tdClass: 'text-black',
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'rincian',
          label: 'Rincian',
          thStyle: {
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
      ],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    dataStatusClass(dt) {
      switch (dt) {
        case dataGudangStatus.unverified:
          return 'bg-yellow-100 text-warning'
        case dataGudangStatus.active:
          return 'bg-green-100 text-green-600'
        case dataGudangStatus.inactive:
          return 'bg-red-100 text-red-600'
        default:
          return ''
      }
    },
    lihatRincian(dt) {
      this.$router.push({
        name: 'kompack-rincian-mitra-gudang',
        params: {
          id: dt.id,
        },
      })
    },
    fetchData() {
      this.$http_kompack.get('/kompack/warehouse')
        .then(({ data }) => {
          this.items = data.data
          this.$nextTick(() => {
            this.isLoadTable = false
          })
        })
        .catch(error => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failed',
              text: 'Galat, list mitra gudang',
              variant: 'danger',
              attachment: 'AlertTriangleIcon',
            },
          }, { timeout: 2500 })
        })
    },
  },
}
