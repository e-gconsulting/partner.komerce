import {
  BTable,
  BCard,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

const dataGudangStatus = {
  unverified: 'Belum Diverifikasi',
  inactive: 'Non - Aktif',
  active: 'Aktif',
}

export default {
  components: {
    BTable,
    BCard,
  },
  data() {
    return {
      isLoadTable: false,
      perPage: 50,
      pageOptions: [50, 100, 200, 500],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      items: [
        {
          id: '1',
          name: 'Gudang Orang 1',
          addres: 'Tangerang Selatan, Banten',
          owner: 'Orang 1',
          email: 'maksdmksa@mail.com',
          no_hp: '1238084091298',
          status: dataGudangStatus.unverified,
          image_logo_url: null,
          total_partner: null,
        },
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
          key: 'no_hp',
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
      console.log('data', dt)
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
          console.log('data', data)
        })
        .catch(error => {
          if (error.response.data.message) {
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: 'Failed',
                  text: error.response.data.message,
                  variant: 'danger',
                  attachment: 'AlertTriangleIcon',
                },
              },
              { timeout: 2500 },
            )
          }
        })
    },
  },
}
