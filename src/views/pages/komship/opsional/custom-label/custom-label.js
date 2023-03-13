import {
  BModal,
  VBModal,
  BSpinner,
  BOverlay,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'
import { required } from '@validations'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    VBModal,
    BSpinner,
    BOverlay,
    ValidationObserver,
    ValidationProvider,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      required,
      customLabel: null,
      customShippingCost: null,
      isNotSetActive: true,

      nameSender: '',
      noHPSender: '',
      loadingSubmitSender: false,
      itemsCustomLabel: [],
      customLabelEditMode: false,
      fieldAddSender: false,
      editNameSender: '',
      editNoHPSender: '',
      loadingWrapperCustom: false,
      idCustomLabelEdit: null,
      senderIsDefault: null,
      editSenderIsDefault: null,
      loadingDeleteSender: false,
      messageValidateNumber: '',
      errorNumber: false,
      errorNumberEdit: false,
      messageErrorLengthSenderName: false,
      messageErrorLengthSenderNameEdit: false,
      senderIdentity1Name: null,
      senderIdentity1NoHp: null,
      indexIdentity: 1,
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  mounted() {
    this.getCustomLabel()
  },
  methods: {
    getCustomLabel() {
      this.loadingWrapperCustom = true
      this.$http_komship.get(`/v1/custom-labels/${this.profile.partner_id}`)
        .then(response => {
          const { data } = response.data
          this.itemsCustomLabel = data
          const getDefault = this.itemsCustomLabel.find(items => items.is_default === 1)
          const getSenderIdentity1 = this.itemsCustomLabel.find(items => items.name_label === this.profile.partner_name)
          this.senderIdentity1Name = getSenderIdentity1.name_label
          this.senderIdentity1NoHp = getSenderIdentity1.no_hp
          this.customShippingCost = this.profile.partner_is_shipping_cost
          this.customLabel = this.profile.partner_is_custom_label
          if (getSenderIdentity1 !== undefined) {
            // eslint-disable-next-line no-plusplus
            for (let x = 0; x < this.itemsCustomLabel.length; x++) {
              if (this.itemsCustomLabel[x].name_label === this.profile.partner_name) {
                this.itemsCustomLabel.splice(x, 1)
              }
            }
          }
          if (getDefault !== undefined) {
            // eslint-disable-next-line no-plusplus
            for (let x = 0; x < this.itemsCustomLabel.length; x++) {
              if (this.itemsCustomLabel[x].is_default === 1) {
                this.itemsCustomLabel.splice(x, 1)
              }
            }
            this.itemsCustomLabel.unshift(getDefault)
          }
          this.loadingWrapperCustom = false
        }).catch(err => {
          this.loadingWrapperCustom = false
        })
    },
    setCustomShippingCost() {
      let shipping = ''
      if (this.customShippingCost === true) {
        shipping = 1
        this.getCustomShippingCost(shipping)
      } else {
        shipping = 0
        this.$refs['modal-set-biaya-ongkir'].show()
      }
    },
    getCustomShippingCost(shipping) {
      this.$http_komship.post(`v1/setting/feature/shipping-cost?is_shipping_cost=${shipping}`)
        .then(async response => {
          if (response.data.code === 200) {
            await this.$store.dispatch('dashboard/getProfile')
            this.customShippingCost = this.profile.partner_is_shipping_cost
            let message = ''
            if (shipping === 1) {
              message = 'Berhasil mengaktifkan Biaya Ongkir'
            } else {
              message = 'Berhasil menon-aktifkan Biaya Ongkir'
            }
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: message,
                variant: 'success',
              },
            }, 2000)
            this.$refs['modal-set-biaya-ongkir'].hide()
          }
        }).catch(() => {
          if (shipping === 1) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal mengaktifkan fitur, terjadi kesalahan pada program',
                variant: 'danger',
              },
            }, 2000)
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal menon-aktifkan fitur, terjadi kesalahan pada program',
                variant: 'danger',
              },
            }, 2000)
          }
        })
    },
    setCustomLabel() {
      if (this.customLabel === false) {
        this.$refs['modal-set-custom-label'].show()
        this.changeAttr()
      }
      if (this.customLabel && this.isNotSetActive) {
        if (this.profile.partner_business_name === null
              || this.profile.partner_no_hp_business === null
              || this.profile.address_partner_business === null) {
          this.$bvModal.show('modal-blocker-profile')
        } else {
          this.$http.post(`/user/partner/setting/isCustomLabel/${this.profile.partner_id}`, {
            is_custom_label: 1,
          })
            .then(async response => {
              await this.$store.dispatch('dashboard/getProfile')
              this.customLabel = this.profile.partner_is_custom_label
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'CheckIcon',
                  text: 'Berhasil mengaktifkan Identitas Pengirim',
                  variant: 'success',
                },
              }, 2000)
            }).catch(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Gagal',
                  icon: 'AlertCircleIcon',
                  text: 'Gagal mengaktifkan fitur, terjadi kesalahan pada program',
                  variant: 'danger',
                },
              }, 2000)
            })
        }
      }
    },
    setIdentitySender() {
      if (this.profile.partner_business_name === null
        || this.profile.partner_no_hp_business === null
        || this.address_partner_business === null) {
        this.$bvModal.show('modal-blocker-profile')
      } else {
        this.$bvModal.show('modal-set-custom-label')
      }
    },
    editSenderNoActive() {
      this.customLabelEditMode = false
    },
    editSenderActive(data) {
      this.errorNumberEdit = false
      this.editNameSender = data.name_label
      this.editNoHPSender = data.no_hp
      this.idCustomLabelEdit = data.id
      if (data.is_default === 1) {
        this.editSenderIsDefault = true
      } else {
        this.editSenderIsDefault = false
      }
      this.customLabelEditMode = true
    },
    validateInputNameSenderEdit(e) {
      if (e.keyCode === 47 || e.keyCode === 61 || e.keyCode === 58 || e.keyCode === 59) {
        e.preventDefault()
        this.messageErrorLengthSenderNameEdit = true
      } else {
        this.messageErrorLengthSenderNameEdit = false
      }
    },
    formatNameSender(e) {
      return String(e).substring(0, 30)
    },
    validateInputNameSender(e) {
      if (e.keyCode === 47 || e.keyCode === 61 || e.keyCode === 58 || e.keyCode === 59) {
        e.preventDefault()
        this.messageErrorLengthSenderName = true
      } else {
        this.messageErrorLengthSenderName = false
      }
    },
    checkEditNumber() {
      if (this.editNoHPSender.length < 9) {
        this.errorNumberEdit = true
        this.messageValidateNumber = '*minimal 9 digit dan hanya berupa angka.'
      } else {
        this.errorNumber = false
        this.messageValidateNumber = ''
      }
    },
    checkNumber() {
      if (this.noHPSender.length < 9) {
        this.errorNumber = true
        this.messageValidateNumber = '*minimal 9 digit dan hanya berupa angka.'
      } else {
        this.errorNumber = false
        this.messageValidateNumber = ''
      }
    },
    deleteSenderLabel(data) {
      this.loadingDeleteSender = true
      this.$http_komship.delete(`/v1/custom-labels/delete/${data.id}`)
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: response.data.message,
              variant: 'success',
            },
          }, 2000)
          this.getCustomLabel()
          this.loadingDeleteSender = false
          this.customLabelEditMode = false
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.message,
              variant: 'danger',
            },
          }, 2000)
          this.loadingDeleteSender = false
        })
    },
    addSender() {
      this.customLabelEditMode = false
      this.fieldAddSender = true
    },
    submitSender() {
      this.loadingSubmitSender = true
      this.$refs.formRulesAdd.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('name_label', this.nameSender)
          formData.append('no_hp', this.noHPSender)
          formData.append('partner_id', this.profile.partner_id)
          formData.append('is_default', this.senderIsDefault ? 1 : 0)
          this.$http_komship.post('/v1/custom-labels/store', formData)
            .then(response => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'CheckIcon',
                  text: response.data.message,
                  variant: 'success',
                },
              }, 2000)
              this.nameSender = ''
              this.noHPSender = ''
              this.senderIsDefault = false
              this.getCustomLabel()
              this.fieldAddSender = false
              this.loadingSubmitSender = false
            }).catch(err => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err.response.message,
                  variant: 'danger',
                },
              }, 2000)
              this.loadingSubmitSender = false
            })
        } else {
          this.loadingSubmitSender = false
        }
      })
    },
    updateSenderLabel() {
      this.loadingSubmitSender = true
      // eslint-disable-next-line dot-notation
      this.$refs['formEditRules'][0].validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('name_label', this.editNameSender)
          formData.append('no_hp', this.editNoHPSender)
          formData.append('is_default', this.editSenderIsDefault ? 1 : 0)
          formData.append('_method', 'put')
          this.$http_komship.post(`/v1/custom-labels/update/${this.idCustomLabelEdit}`, formData)
            .then(response => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  icon: 'CheckIcon',
                  text: response.data.message,
                  variant: 'success',
                },
              }, 2000)
              this.getCustomLabel()
              this.loadingSubmitSender = false
              this.customLabelEditMode = false
            }).catch(err => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err.response.message,
                  variant: 'danger',
                },
              }, 2000)
              this.loadingSubmitSender = false
            })
        } else {
          this.loadingSubmitSender = false
        }
      })
    },
    handleNotActiveCustomLabel() {
      this.$http.post(`/user/partner/setting/isCustomLabel/${this.profile.partner_id}`, {
        is_custom_label: 0,
      })
        .then(async response => {
          await this.$store.dispatch('dashboard/getProfile')
          this.customLabel = this.profile.partner_is_custom_label
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'Berhasil menon-aktifkan Identitas Pengirim',
              variant: 'success',
            },
          }, 2000)
          this.isNotSetActive = true
          this.$refs['modal-set-custom-label'].hide()
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal menon-aktifkan fitur, terjadi kesalahan pada program',
              variant: 'danger',
            },
          }, 2000)
        })
    },
    alertCustomLabel() {
      this.isNotSetActive = false
      this.customLabel = true
      this.$refs['modal-set-custom-label'].hide()
    },
    alertBiayaOngkir() {
      this.isNotSetActive = false
      this.customShippingCost = true
      this.$refs['modal-set-biaya-ongkir'].hide()
    },
    removeFieldAddSender() {
      this.fieldAddSender = false
    },
  },
}
