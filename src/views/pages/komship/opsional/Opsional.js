import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import httpKomship2 from '../setting-kompship/http_komship2'

export default {
  data() {
    return {
      profile: [],
      quickType: null,
      mutationBank: null,
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
  },
}
