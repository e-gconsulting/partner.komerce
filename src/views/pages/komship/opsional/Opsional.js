import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BModal,
  VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import httpKomship2 from '../setting-kompship/http_komship2'

export default {
  components: {
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      profile: [],
      quickType: null,
      mutationBank: null,
      customLabel: null,
      isGetting: false,
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      httpKomship2.post('v1/my-profile')
        .then(res => {
          this.profile = res.data.data
          this.quickType = res.data.data.partner_is_allowed_edit
          this.mutationBank = res.data.data.partner_is_mutation_bank
          this.isGetting = true
        })
        .catch(err => {
          console.log(err)
          this.isGetting = true
        })
    },
    setQuickType() {
      this.$http.post(`/user/partner/setting/isAllowedEdit/${this.profile.partner_id}`, { is_allowed_edit: this.quickType })
        .then(res => {
          if (res.data.code === 200) {
            this.getProfile()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Input Cepat Berhasil ${this.quickType ? 'Diaktifkan' : 'Dinonaktifkan'}`,
                variant: 'success',
              },
            }, 2000)
          }
        })
    },
    setMutationBank() {
      this.$http.post(`user/partner/setting/isMutationBank/${this.profile.partner_id}`, { is_mutation_bank: this.mutationBank ? '1' : '0' })
        .then(res => {
          if (res.data.code === 200) {
            this.getProfile()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Mutasi Rekening Berhasil ${this.mutationBank ? 'Diaktifkan' : 'Dinonaktifkan'}`,
                variant: 'success',
              },
            }, 2000)
          }
        })
    },
    setCustomLabel() {
      console.log(this.customLabel)
      if (this.customLabel === false) this.$refs['modal-set-custom-label'].show()
    },
  },
}
