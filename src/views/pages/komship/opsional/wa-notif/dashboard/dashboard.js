import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import { mapState } from 'vuex'

export default {
  components: {
    vSelect,
  },

  data() {
    return {
      expiredDate: 0,
      statusWhatsapp: 'Terhubung',
      Notification: {},
      iconToggle: true,
      pickupNotification: false,
      codNotification: false,
      codTooltip: 'Aktifkan Notifikasi',
      notificationTooltip: 'Aktifkan Notifikasi',
      messageTemplateCod: '',
      messageTemplatePickup: 'lorem ipsum dolor sit amet, consectetur',
      listFitur: [{ value: 1, name: 'Notifikasi WhatsApp Premium' }],
      listSubscription: [],
      subscription: {},
      fitur: { value: 1, name: 'Notifikasi WhatsApp Premium' },
      saldo_kompay: 0,
      disabledSubcription: true,
      loadingSubcription: false,
      isTemplate: true,
    }
  },

  computed: {
    ...mapState('dashboard', ['profile']),
  },

  mounted() {
    this.fetchData()
    if (this.profile.partner_is_notification_whatsapp !== 2) {
      this.$router.push({ name: 'opsional-feature' })
    }
  },

  methods: {
    fetchData() {
      this.$http_komship
        .get('/v1/setting/notification-whatsapp-dashboard')
        .then(response => {
          const { data } = response.data
          this.Notification = data
          this.expiredDate = data.whatsapp_expired_at
          this.codNotification = data.notification_cod.status
          this.pickupNotification = data.notification_pickup.status
          this.messageTemplateCod = data.notification_cod.message
          this.messageTemplatePickup = data.notification_pickup.message
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    logout() {
      this.$http_komship
        .post('/v1/setting/whatsapp-logout')
        .then(response => {
          if (response.data.code === 200) {
            this.$router.push({ name: 'koneksi-wa' })
          }
          console.log(response)
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    async modalRenew() {
      await this.$http_komship
        .get('/v1/setting/notification-whatsapp-premium-fee')
        .then(response => {
          const { data } = response.data
          this.saldo_kompay = data.kompay_balance
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
      await this.$http_komship
        .get('/v1/setting/renew-whatsapp-premium-fee')
        .then(response => {
          const { data } = response.data
          this.listSubscription = data
          this.subscription = { ...this.listSubscription[0] }
          this.subscriptionChange()
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
      this.$bvModal.show('modal-renew-subcription')
    },
    subscriptionChange() {
      if (this.saldo_kompay < this.subscription.nominal) {
        this.disabledSubcription = true
      } else {
        this.disabledSubcription = false
      }
    },
    subscribe() {
      this.disabledSubcription = true
      this.loadingSubcription = true
      const formData = new FormData()
      formData.append('is_renew', '1')
      formData.append('id_whatsapp_fee', this.subscription.id)
      this.$http_komship
        .post('/v1/setting/renew-whatsapp-subscription', formData)
        .then(response => {
          if (response.data.code === 200) {
            this.$bvModal.hide('modal-renew-subcription')
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'AlertCircleIcon',
                text: 'Berhasil melakukan pembayaran dan perpanjangan',
                variant: 'success',
              },
            })
            this.loadingSubcription = false
            this.fetchData()
          } else {
            this.loadingSubcription = false
          }
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'Gagal melakukan pembayaran dan perpanjangan',
              variant: 'danger',
            },
          })
        })
    },
    templateCod() {
      let status = ''
      if (this.codNotification === true) {
        this.codTooltip = 'Matikan Notifikasi'
        this.isTemplate = true
        status = 1
      } else {
        this.codTooltip = 'Aktifkan Notifikasi'
        status = 0
      }

      const formData = new FormData()
      formData.append('type_notification', 'is_received')
      formData.append('status', status)

      this.$http_komship
        .post('/v1/setting/on-or-off-template-whatsapp', formData)
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'AlertCircleIcon',
              text: response.data.message,
              variant: 'success',
            },
          })
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    templatePickup() {
      let status = ''
      if (this.pickupNotification === true) {
        this.notificationTooltip = 'Matikan Notifikasi'
        this.isTemplate = false
        status = 1
      } else {
        this.notificationTooltip = 'Aktifkan Notifikasi'
        status = 0
      }

      const formData = new FormData()
      formData.append('type_notification', 'is_sending')
      formData.append('status', status)

      this.$http_komship
        .post('/v1/setting/on-or-off-template-whatsapp', formData)
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'AlertCircleIcon',
              text: response.data.message,
              variant: 'success',
            },
          })
        })
        .catch(err => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err.response.data.message,
              variant: 'danger',
            },
          })
        })
    },
    hoverTemplate(template) {
      if (template === 'cod') {
        this.isTemplate = true
      } else {
        this.isTemplate = false
      }
    },
  },
}
