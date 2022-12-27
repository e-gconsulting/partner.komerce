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
    async fetchData() {
      await this.$http_kompack(`/kompack/warehouse/information/${this.$route.params.id}`)
        .then(({ data }) => {
          this.detailInfo = { ...data.data }
          this.imagesone = data.data.image_warehouse[0].image_url
          this.imagesothers = [...data.data.image_warehouse].splice(0, 8).map(x => x.image_url)
          this.$nextTick(() => {
            this.isLoadingPage = false
          })
        })
        .catch(() => {
          this.isLoadingPage = false
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
