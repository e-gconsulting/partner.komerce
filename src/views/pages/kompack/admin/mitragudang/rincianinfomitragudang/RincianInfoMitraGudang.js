import moment from 'moment'
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
      imagesone: '',
      imagesothers: [],
      isLoadingPage: true,
      detailInfo: {},
      countSlide: 0,
    }
  },
  watch: {
    countSlide: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        this.imagesone = this.imagesothers[newVal]
        this.$refs[`childOtherbox-${oldVal}`][0].classList.remove('borderActive')
        this.$refs[`childOtherbox-${newVal}`][0].classList.toggle('borderActive')
        if (oldVal > newVal) {
          this.$refs.imgcontainer__childBox.scrollLeft -= 100
        } else {
          this.$refs.imgcontainer__childBox.scrollLeft += 100
        }
      },
    },
  },
  computed: {
    tglJoinData() {
      return moment(this.detailInfo.join_date).format('DD MMMM YYYY')
    },
  },
  mounted() {
    this.fetchData()
    // this.$nextTick(() => {
    //   console.log(this.$refs['childOtherbox-0'])
    //   // this.$refs['childOtherbox-0'][0].classList.toggle('borderActive')
    // })
  },
  methods: {
    handleChangeImge(dt, refKey) {
      this.imagesone = dt
      const [, indexData] = refKey.split('-')
      this.countSlide = parseInt(indexData, 10)
    },
    handleCursor(type) {
      switch (type) {
        case 'left':
          if (this.countSlide === 0) {
            //
          } else {
            this.countSlide -= 1
          }
          break
        case 'right':
          if (this.countSlide === this.imagesothers.length - 1) {
            //
          } else {
            this.countSlide += 1
          }
          break
        default:
          break
      }
    },
    handleEditData() {
      this.$router.push({
        name: 'kompack-rincian-mitra-gudang',
        params: {
          id: this.$route.params.id,
        },
        query: {
          isEditMode: true,
        },
      })
    },
    fetchData() {
      this.$http_kompack(`/kompack/warehouse/information/${this.$route.params.id}`)
        .then(({ data }) => {
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
            }]
          }
          */
          this.detailInfo = { ...data.data }
          this.imagesone = data.data.image_warehouse[0].image_url
          this.imagesothers = data.data.image_warehouse.map(x => x.image_url)
          this.$nextTick(() => {
            this.isLoadingPage = false
          })
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Failed',
              text: 'Galat detail information mitra gudang',
              icon: 'AlertCircleIcon',
              variant: 'danger',
            },
          })
        })
    },
  },
}
