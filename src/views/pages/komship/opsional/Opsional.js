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
      customLabelIsDisable: true,
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
          this.customLabel = res.data.data.partner_is_custom_label
          this.isGetting = true
          if (res.data.data.partner_is_custom_label === false) {
            this.customLabelIsDisable = false
          } else {
            this.customLabelIsDisable = true
          }
          this.checkCustomLabel()
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
      console.log(this.profile.partner_id)
      if (this.customLabel === false) {
        this.$refs['modal-set-custom-label'].show()
      } else {
        this.$http.post(`/user/partner/setting/isCustomLabel/${this.profile.partner_id}`, {
          is_custom_label: 1,
        })
          .then(response => {
            console.log(response)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Custom Label berhasil diaktifkan',
                variant: 'success',
              },
            }, 2000)
          }).catch(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal update custom label',
                variant: 'danger',
              },
            }, 2000)
          })
      }
    },
    handleNotActiveCustomLabel() {
      this.$http.post(`/user/partner/setting/isCustomLabel/${this.profile.partner_id}`, {
        is_custom_label: 0,
      })
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Custom Label berhasil dinonaktifkan',
              variant: 'success',
            },
          }, 2000)
          console.log(response)
          this.customLabel = false
          this.$refs['modal-set-custom-label'].hide()
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal update custom label',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    alertCustomLabel() {
      this.$refs['modal-set-custom-label'].hide()
    },
  },
}
