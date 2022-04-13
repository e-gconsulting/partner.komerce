import {
  BCard,
  BButton,
  BRow,
  BCol,
  BBadge,
} from 'bootstrap-vue'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BBadge,
  },
  data() {
    return {
      isLoadingPage: true,
      detailInfo: {},
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http_kompack(`/kompack/warehouse/information/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data)
          /*
          "data": {
            "id": "26",
            "owner": "amskdmsakdm",
            "phone_number": "128957192372918",
            "partner_verification": "Terverifikasi",
            "image_logo_url": "https:\/\/kompackdev.komerce.id\/warehouse_logo\/1649751302.Test_image_2.jpg",
            "warehouse_name": "amskdmsakdm",
            "avability": "Penuh",
            "pic_phone": "12849817294",
            "description": "mkasdmaksdm",
            "detail_address": ", AMPENAN, MATARAM, NUSA TENGGARA BARAT (NTB), 83511",
            "total_order": 0,
            "join_date": "2022-04-12",
            "image_warehouse": [{
                "id": 9,
                "warehouse_id": 12,
                "image_url": "https:\/\/kompackdev.komerce.id\/warehouse_images\/1649751303-Test_image_2.jpg",
                "created_at": "2022-04-12T08:15:03.000000Z",
                "updated_at": "2022-04-12T08:15:03.000000Z"
            }, {
                "id": 10,
                "warehouse_id": 12,
                "image_url": "https:\/\/kompackdev.komerce.id\/warehouse_images\/1649751305-Test_image.jpg",
                "created_at": "2022-04-12T08:15:05.000000Z",
                "updated_at": "2022-04-12T08:15:05.000000Z"
            }]
          }
          */
          this.detailInfo = data.data
          this.isLoadingPage = false
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Failed',
              text: 'Galat tambah data mitra gudang',
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          })
        })
    },
  },
}
