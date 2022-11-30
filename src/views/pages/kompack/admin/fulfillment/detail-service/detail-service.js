import {
  BRow,
  BCol,
  BCard,
  BTable,
} from 'bootstrap-vue'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
  },
  data() {
    return {
      items: [
        {
          id: 40,
          name: 'Gudang Putra Jaya Abadi',
          loc: 'Tangerang Selatan',
          active_at: '2021-10-12',
          owner: 'Budi Darsono',
          supply: 'Tersedia',
        },
      ],
      fields: [
        {
          key: 'name',
          label: 'Mitra Gudang',
          thClass: 'text-black text-capitalize bg-white',
          variant: 'light',
        },
        {
          key: 'active_at',
          label: 'Tanggal Mulai Aktif',
          thClass: 'text-black text-capitalize bg-white',
          variant: 'light',
        },
        {
          key: 'owner',
          label: 'Owner',
          thClass: 'text-black text-capitalize bg-white',
          variant: 'light',
        },
        {
          key: 'supply',
          label: 'Ketersedia',
          thClass: 'text-black text-capitalize bg-white',
          variant: 'light',
        },
        {
          key: 'rincian',
          label: 'Rincian',
          thClass: 'text-black text-capitalize bg-white',
          variant: 'light',
        },
      ],
    }
  },
  mounted() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http_kompack.get('/v1/admin/withdrawal/list')
        .then(({ data }) => {
          console.log('data', data)
        })
        .catch(e => {
          // handle error
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'Unable to load the table data. Please try again later or contact support.',
              variant: 'danger',
            },
          })
        })
    },
  },
}
