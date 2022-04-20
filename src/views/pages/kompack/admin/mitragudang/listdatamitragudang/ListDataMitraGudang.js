import {
  BTable,
  BCard,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dataGudangStatus = {
  inactive: 'nonaktif',
  active: 'aktif',
  wordingActive: 'Aktif',
  wordingInactive: 'Non - Aktif',
  wordingUnverified: 'Belum Diverifikasi',
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
      items: [],
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
            minWidth: '20%',
            textTransform: 'capitalize',
            verticalAlign: 'middle',
          },
        },
        {
          key: 'rincian',
          label: 'Rincian',
          thStyle: {
            minWidth: '14%',
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
      if (dt.status === dataGudangStatus.inactive) {
        if (dt.is_verification === 1) {
          return 'bg-red-100 text-red-600'
        }
        return 'bg-yellow-100 text-warning'
      }
      return 'bg-green-100 text-green-600'
    },
    dataStatusText(dt) {
      if (dt.status === dataGudangStatus.inactive) {
        if (dt.is_verification === 1) {
          return dataGudangStatus.wordingInactive
        }
        return dataGudangStatus.wordingUnverified
      }
      return dataGudangStatus.wordingActive
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
          this.items = data.data.sort((x, y) => y.id - x.id)
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
