/* eslint-disable global-require */
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BModal,
  VBModal,
  BSpinner,
  BOverlay,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import { mapState } from 'vuex'

export default {
  components: {
    BModal,
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
      quickType: null,
      orderMassal: null,
      returnInsight: null,
      orderNotes: null,
      mutationBank: null,
      notifWA: null,
      isGetting: false,
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
      required,
      loadingDeleteSender: false,
      messageValidateNumber: '',
      errorNumber: false,
      errorNumberEdit: false,
      messageErrorLengthSenderName: false,
      messageErrorLengthSenderNameEdit: false,
      senderIdentity1Name: null,
      senderIdentity1NoHp: null,
      indexIdentity: 1,

      customerReputation: null,
      salesTracking: null,
      editAdminSalesTracking: false,
      addSalesTrackingMode: false,
      adminSalesTrackingItem: [],
      errorInputAdmin: false,
      nameAdmin: '',
      editAdminSalesTrackingItems: {},
      adminNameEdit: '',
      idEditAdmin: null,
      deleteItemAdmin: {},
      loadingListAdminSalesTracking: false,
      loadingAddAdminSalesTracking: false,
      checkRankingSales: false,
      adminName: '',
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  mounted() {
    this.getProfile()
    this.myProfile()
  },
  methods: {
    getProfile() {
      this.quickType = this.profile.partner_is_allowed_edit
      this.mutationBank = this.profile.partner_is_mutation_bank
      this.orderMassal = this.profile.partner_is_mass_order
      this.returnInsight = this.profile.partner_is_return_insight
      this.orderNotes = this.profile.partner_is_order_notes
      this.notifWA = this.profile.partner_is_notification_whatsapp
      this.customerReputation = this.profile.partner_is_customer_reputation
      this.salesTracking = this.profile.partner_is_tracking_sales
      this.isGetting = true
      this.getCustomLabel()
    },
    setQuickType() {
      this.$http.post(`/user/partner/setting/isAllowedEdit/${this.profile.partner_id}`, { is_allowed_edit: this.quickType })
        .then(async res => {
          if (res.data.code === 200) {
            await this.$store.dispatch('dashboard/getProfile')
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
    setOrderMassal() {
      this.$http.post(`/user/partner/setting/isMassOrder/${this.profile.partner_id}`, { is_mass_order: this.orderMassal ? 1 : 0 })
        .then(async res => {
          if (res.data.code === 200) {
            await this.$store.dispatch('dashboard/getProfile')
            this.getProfile()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Order Massal Berhasil ${this.orderMassal ? 'Diaktifkan' : 'Dinonaktifkan'}`,
                variant: 'success',
              },
            }, 2000)
          }
        })
    },
    setReturnInsight() {
      this.$http_komship.post('/v1/setting/settingIsReturnInsight', { is_return_insight: this.returnInsight ? 1 : 0 })
        .then(async res => {
          if (res.data.code === 200) {
            await this.$store.dispatch('dashboard/getProfile')
            this.getProfile()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Fitur Pendukung Wawasan Retur Berhasil ${this.returnInsight ? 'Diaktifkan' : 'Dinonaktifkan'}`,
                variant: 'success',
              },
            }, 2000)
          }
        })
    },
    setOrderNotes() {
      this.$http_komship.post('/v1/setting/settingIsOrderNotes', { is_order_notes: this.orderNotes ? 1 : 0 })
        .then(async res => {
          if (res.data.code === 200) {
            await this.$store.dispatch('dashboard/getProfile')
            this.getProfile()
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Fitur Pendukung Catatan Order Berhasil ${this.orderNotes ? 'Diaktifkan' : 'Dinonaktifkan'}`,
                variant: 'success',
              },
            }, 2000)
          }
        })
    },
    setMutationBank() {
      this.$http.post(`user/partner/setting/isMutationBank/${this.profile.partner_id}`, { is_mutation_bank: this.mutationBank ? '1' : '0' })
        .then(async res => {
          if (res.data.code === 200) {
            await this.$store.dispatch('dashboard/getProfile')
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
    setNotifWa() {
      const post = () => {
        this.$http_komship.post('/v1/setting/isNotificationWhatsapp', {
          is_nofitication_whatsapp: this.notifWA ? '1' : '0',
        }).then(async () => {
          await this.$store.dispatch('dashboard/getProfile')
          this.getProfile()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: `Notif Whatsapp Berhasil ${this.notifWA ? 'Diaktifkan' : 'Dinonaktifkan'}`,
              variant: 'success',
            },
          }, 2000)
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: `Gagal ${this.notifWA ? 'Mengaktifkan' : 'Menonaktikan'} Notif Whatsapp`,
              variant: 'danger',
            },
          }, 2000)
        })
      }
      if (this.notifWA) {
        this.$swal({
          html: '<span>Notif WA ini menggunakan <b>No. WA Komship</b> dan akan otomatis mengiriman reminder bahwa paket telah berangkat dan notif kedua ketika paket <b>tiba di dekat kota customer.</b><br><br>Fitur ini GRATIS. Kamu yakin mau aktifin?</span>',
          imageUrl: require('@/assets/images/icons/warning.svg'),
          confirmButtonText: 'Ya, Aktifkan',
          confirmButtonClass: 'btn btn-primary',
          showCancelButton: true,
          cancelButtonText: 'Batal',
          cancelButtonColor: '#FFFFFF',
          cancelButtonClass: 'btn btn-outline-primary text-primary',
        }).then(response => {
          if (response.isConfirmed) {
            post()
          } else {
            this.notifWA = false
          }
        })
      } else {
        post()
      }
    },
    setCustomerReputation() {
      let value = 0
      if (this.customerReputation === true) {
        value = 1
      }
      const formData = new FormData()
      formData.append('is_customer_reputation', value)
      this.$http_komship.post('/v1/setting/settingIsCustomerReputation', formData)
        .then(async response => {
          await this.$store.dispatch('dashboard/getProfile')
          this.getProfile()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: response.data.message,
              variant: 'success',
            },
          }, 2000)
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: err.response.message,
              variant: 'success',
            },
          }, 2000)
        })
    },
    async changeAttr() {
      const element = document.getElementsByTagName('body')[0].className

      await (element === 'modal-open')
      document.querySelectorAll('div.modal-content')[0].removeAttribute('tabindex')
    },
    setSalesTracking() {
      this.$http_komship.post('/v1/setting/settingIsTrackingSales', {
        is_tracking_sales: this.salesTracking ? 1 : 0,
      }).then(async response => {
        await this.$store.dispatch('dashboard/getProfile')
        await this.getProfile()
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Sukses',
            icon: 'CheckIcon',
            text: this.salesTracking ? 'Fitur Pendukung Pelacakan Penjualan berhasil diaktifkan' : 'Fitur Pendukung Pelacakan Penjualan berhasil dinonaktifkan',
            variant: 'success',
          },
        }, 2000)
      }).catch(err => {
        if (err.response.data.message === 'Please Store Tracking Sales!') {
          this.$refs['popup-sales-tracking'].show()
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        }
      })
    },
    addSalesTracking() {
      this.$refs['popup-sales-tracking'].hide()
      this.$refs['popup-add-sales-tracking'].show()
      this.getListAdminSalesTracking()
    },
    handleClosePopupSalesTracking() {
      this.$refs['popup-sales-tracking'].hide()
      this.salesTracking = false
    },
    handleCloseAddSalesTracking() {
      this.$refs['popup-add-sales-tracking'].hide()
    },
    handleClosePopupDeleteSalesTracking() {
      this.$refs['popup-delete-sales-tracking'].hide()
    },
    checkValidInputAdmin() {
      if (this.nameAdmin === '') this.errorInputAdmin = true
      if (this.nameAdmin !== '') this.errorInputAdmin = false
    },
    submitAdminSalesTracking() {
      this.loadingAddAdminSalesTracking = true
      this.$http_komship.post('/v1/tracking-sales/store', {
        name: this.nameAdmin,
      }).then(async response => {
        this.nameAdmin = ''
        await this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Sukses',
            icon: 'CheckIcon',
            text: 'kamu berhasil menambahkan Admin',
            variant: 'success',
          },
        }, 2000)
        await this.getListAdminSalesTracking()
        if (this.adminSalesTrackingItem.length === 0) {
          await this.setSalesTracking()
          this.$refs['popup-add-sales-tracking'].hide()
        }
        this.addSalesTrackingMode = false
        this.loadingAddAdminSalesTracking = false
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.loadingAddAdminSalesTracking = false
      })
    },
    handleEditAdminSalesTracking(data) {
      this.editAdminSalesTracking = true
      this.editAdminSalesTrackingItems = data
      this.adminNameEdit = data.name
      this.idEditAdmin = data.id
    },
    handleSubmitEditAdminSalesTracking() {
      this.loadingAddAdminSalesTracking = true
      this.$http_komship.put(`/v1/tracking-sales/update/${this.editAdminSalesTrackingItems.id}`, {
        name: this.adminNameEdit,
      }).then(async response => {
        await this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Sukses',
            icon: 'CheckIcon',
            text: 'kamu berhasil edit Admin',
            variant: 'success',
          },
        }, 2000)
        await this.getListAdminSalesTracking()
        this.editAdminSalesTracking = false
        this.loadingAddAdminSalesTracking = false
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.loadingAddAdminSalesTracking = false
      })
    },
    setAdminNameEdit(data) {
      this.adminNameEdit = data
      if (data === '') this.errorInputAdmin = true
      if (data !== '') this.errorInputAdmin = false
    },
    getListAdminSalesTracking() {
      this.loadingListAdminSalesTracking = true
      this.$http_komship.get('/v1/tracking-sales/list')
        .then(response => {
          this.adminSalesTrackingItem = response.data.data
          this.loadingListAdminSalesTracking = false
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
          this.loadingListAdminSalesTracking = false
        })
    },
    handleFormAddAdminSalesTracking() {
      this.addSalesTrackingMode = true
    },
    handleDeleteAdminSalesTracking(data) {
      this.deleteItemAdmin = data
      this.adminName = data.name
      this.$refs['popup-delete-sales-tracking'].show()
    },
    deleteAdminSalesTracking() {
      this.$http_komship.delete(`/v1/tracking-sales/delete/${this.deleteItemAdmin.id}`)
        .then(async () => {
          await this.getListAdminSalesTracking()
          await this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Sukses',
              icon: 'CheckIcon',
              text: 'kamu berhasil menghapus Admin',
              variant: 'success',
            },
          }, 2000)
          this.$refs['popup-delete-sales-tracking'].hide()
        }).catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        })
    },
    myProfile() {
      const url = '/v1/my-profile'
      this.$http_komship.post(url)
        .then(res => {
          const { data } = res.data
          this.checkRankingSales = data.partner_is_tracking_sales_dashboard
        })
    },
    onOffTrackingSales(value) {
      const onOff = value ? 1 : 0
      const url = `/v1/setting/onOffTrackingSalesDashboard?is_dashboard=${onOff}`
      this.$http_komship.post(url)
        .then(res => {
          const { data } = res
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckCircleIcon',
              text: data.message,
              variant: 'success',
            },
          }, { timeout: 1000 })
          this.checkRankingSales = value
        })
    },
  },
}
