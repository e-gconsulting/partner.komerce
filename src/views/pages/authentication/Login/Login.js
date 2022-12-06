/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BCardTitle,
  BLink,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
  BAlert,
  VBTooltip,
  BSpinner,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'
import { NoSpace } from '@/libs/helpers'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BButton,
    BForm,
    // BAlert,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BSpinner,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userId: '',
      error: '',
      status: '',
      showResendEmailVerification: true,
      usernameEmail: '',
      password: '',
      loading: false,
      // validation rules
      required,
      email,
      custommessages: {
        required: 'Mohon masukan password Kamu.',
      },
      custommessages1: {
        required: 'Mohon masukan username atau email.',
      },

      messageResendEmailVerification: '',
      loadingResendVerification: false,

      countTimerEmail: 60,

      // Mode Page
      modeVerificationEmail: false,
      modeLogin: true,
      isKompack: null,
      emailProfile: null,
      NoSpace,
    }
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app

    return {
      // App Name
      appName,
      appLogoImage,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true
          this.showResendEmailVerification = false
          this.error = ''
          this.userId = ''

          useJwt
            .login({
              username_email: this.usernameEmail,
              password: this.password,
              login_from: 'website',
            })
            .then(response => {
              const { data } = response
              const user = data.data
              if (response.data.status === false) {
                this.error = 'Maaf, username atau password yang Kamu masukan salah'
                this.loading = false
              } else {
                useJwt.setToken(response.data.data.token)
                this.getUser(response.data.data)
              }
            })
            .catch(() => {
              this.$toast({
                component: ToastificationContentVue,
                props: {
                  title: 'Gagal',
                  text: 'Gagal untuk login, silahkan coba lagi!',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                },
              })
              this.loading = false
            })
        }
      })
    },
    getUser(userData) {
      this.userId = userData.id
      this.$http
        .post('/user/get-profile', {
          user_id: this.userId,
        })
        .then(async response => {
          let ability = []

          let { data } = response.data
          data = Array.isArray(data) ? data[0] : data
          const role = data.role_name.toUpperCase()
          this.isKompack = data.is_kompack
          this.emailProfile = data.email

          if (!['ADMIN', 'MANAGEMENT', 'PARTNER', 'SDM', 'KOMSHIP MEMBER', 'TALENT GLOBAL'].includes(role)) {
            this.error = 'Akun anda tidak memiliki hak akses untuk masuk.'
            this.logout()
            return
          }

          if (['PARTNER', 'SDM'].includes(role)) {
            if (!userData.email_verified_at) {
              // eslint-disable-next-line operator-linebreak
              this.error =
                'Email Kamu belum terverifikasi'
              this.showResendEmailVerification = true
              this.logout()
              return
            }
          }

          switch (role) {
            case 'ADMIN':
              ability = [
                { action: 'read', subject: 'Dashboard' },
                { action: 'manage', subject: 'Training' },
                { action: 'manage', subject: 'Management' },
                { action: 'manage', subject: 'MasterData' },
                { action: 'manage', subject: 'Partner' },
                { action: 'manage', subject: 'Position' },
                { action: 'manage', subject: 'Talent' },
                { action: 'manage', subject: 'Training' },
                { action: 'manage', subject: 'Division' },
                { action: 'manage', subject: 'Invoice' },
                { action: 'manage', subject: 'Assignment' },
                { action: 'manage', subject: 'JobRoleSetting' },

                // Komship
                { action: 'manage', subject: 'Komship' },
                { action: 'manage', subject: 'Dashboard Komship Admin' },
                { action: 'manage', subject: 'Pencairan' },
                { action: 'manage', subject: 'Pendapatan' },
                { action: 'manage', subject: 'Membership Komship' },
                { action: 'manage', subject: 'Perkembangan Partner' },
                { action: 'manage', subject: 'Data Partner' },
                { action: 'manage', subject: 'Arsip Partner' },
                { action: 'manage', subject: 'Data Layanan' },
                { action: 'manage', subject: 'Ekspedisi' },
                { action: 'manage', subject: 'Biaya Ekspedisi' },
                { action: 'manage', subject: 'Performa' },
              ]
              // KOMPACK
              if (userData.is_kompack === 1) {
                ability.push({ action: 'manage', subject: 'Kompack-Admin' })
              }
              break
            case 'MANAGEMENT':
              ability = [
                { action: 'read', subject: 'Dashboard' },
                { action: 'manage', subject: 'Training' },
                { action: 'manage', subject: 'Management' },
                { action: 'manage', subject: 'MasterData' },
                { action: 'manage', subject: 'Partner' },
                { action: 'manage', subject: 'Position' },
                { action: 'manage', subject: 'Talent' },
                { action: 'manage', subject: 'Training' },
                { action: 'manage', subject: 'Division' },
                { action: 'manage', subject: 'Invoice' },
                { action: 'manage', subject: 'Assignment' },
                { action: 'manage', subject: 'JobRoleSetting' },
              ]
              break
            case 'PARTNER':
              if (userData.is_komship === 1) {
                ability = [
                  { action: 'manage', subject: 'Komship TalentPool' },
                  { action: 'manage', subject: 'Komship Wishlist' },
                  { action: 'manage', subject: 'PartnerProfile' },
                  { action: 'read', subject: 'Dashboard Komship' },
                  { action: 'manage', subject: 'Customer' },
                  { action: 'manage', subject: 'Produk' },
                  { action: 'manage', subject: 'Tambah Produk' },
                  { action: 'manage', subject: 'Data Produk' },
                  { action: 'manage', subject: 'Order' },
                  { action: 'manage', subject: 'Tambah Order' },
                  { action: 'manage', subject: 'Data Order' },
                  { action: 'manage', subject: 'Pickup' },
                  { action: 'manage', subject: 'Ajukan Pickup' },
                  { action: 'manage', subject: 'History Pickup' },
                  { action: 'manage', subject: 'Keuangan' },
                  { action: 'manage', subject: 'Penghasilan' },
                  { action: 'manage', subject: 'Saldo' },
                  { action: 'manage', subject: 'Setting Komship' },
                  { action: 'manage', subject: 'Setting Profile' },
                  { action: 'manage', subject: 'Setting Access Account' },
                  { action: 'manage', subject: 'Setting Pickup Address' },
                  { action: 'manage', subject: 'Setting Rekening Bank' },
                  { action: 'manage', subject: 'Setting PIN' },
                  { action: 'manage', subject: 'Setting Ekspedisi' },
                  { action: 'manage', subject: 'Hiring' },
                  { action: 'manage', subject: 'Fitur Pendukung' },
                  { action: 'manage', subject: 'MyApps' },
                  { action: 'manage', subject: 'Kendala' },
                ]
                // KOMPACK
                if (userData.is_kompack === 1) {
                  ability.push({ action: 'manage', subject: 'Gudang Kompack' })
                  ability.push({ action: 'manage', subject: 'Gudang Komship' })
                  ability.push({ action: 'manage', subject: 'Gudang' })
                }
                if (userData.is_kompack === 0) {
                  ability.push({ action: 'manage', subject: 'Gudang Komship' })
                  ability.push({ action: 'manage', subject: 'Gudang' })
                }
              } else {
                ability = [
                  { action: 'manage', subject: 'komtim' },
                ]
              }
              break
            case 'SDM':
              ability = [
                { action: 'read', subject: 'TalentHome' },
                { action: 'manage', subject: 'TalentProfile' },
              ]
              break
            case 'KOMSHIP MEMBER':
              ability = [
                { action: 'manage', subject: 'Dashboard Komship' },
              ]
              break
            default:
              break
          }

          if (role === 'PARTNER') {
            data = await this.getPartnerProfile(this.userId)

            if (data.nik) {
              ability.push({ action: 'manage', subject: 'DetailTalent' })
              ability.push({ action: 'manage', subject: 'Wishlist' })
            }
          }

          if (role === 'TALENT GLOBAL') {
            const itemMember = await this.getAccessKomship(data.id)
            const menuAccess = itemMember.privilege.filter(item => item.access !== 'No Data Access.')
            menuAccess.forEach(item => {
              if (item.menu_name === 'PRODUCT') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 1)
                const findAccessManage = item.access.find(accessItem => accessItem.access_id === 2)
                if (findAccessView !== undefined) ability.push({ action: 'manage', subject: 'Data Produk' })
                if (findAccessManage !== undefined) ability.push({ action: 'manage', subject: 'Tambah Produk' })
                ability.push({ action: 'manage', subject: 'Produk' })
              }
              if (item.menu_name === 'ORDER') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 1)
                const findAccessManage = item.access.find(accessItem => accessItem.access_id === 2)
                if (findAccessView !== undefined) ability.push({ action: 'manage', subject: 'Data Order' })
                if (findAccessManage !== undefined) ability.push({ action: 'manage', subject: 'Tambah Order' })
                ability.push({ action: 'manage', subject: 'Order' })
              }
              if (item.menu_name === 'DASHBOARD') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 1)
                if (findAccessView !== undefined) ability.push({ action: 'read', subject: 'Dashboard Komship' })
              }
              if (item.menu_name === 'GUDANG') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 1)
                if (findAccessView !== undefined) {
                  ability.push({ action: 'manage', subject: 'Gudang Komship' })
                  ability.push({ action: 'manage', subject: 'Gudang' })
                }
              }
              if (item.menu_name === 'PICKUP') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 6)
                const findAccessManage = item.access.find(accessItem => accessItem.access_id === 5)
                if (findAccessView !== undefined) ability.push({ action: 'manage', subject: 'History Pickup' })
                if (findAccessManage !== undefined) ability.push({ action: 'manage', subject: 'Ajukan Pickup' })
                ability.push({ action: 'manage', subject: 'Pickup' })
              }
              if (item.menu_name === 'FINANCE') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 7)
                const findAccessManage = item.access.find(accessItem => accessItem.access_id === 8)
                if (findAccessView !== undefined) ability.push({ action: 'manage', subject: 'Penghasilan' })
                if (findAccessManage !== undefined) ability.push({ action: 'manage', subject: 'Saldo' })
                ability.push({ action: 'manage', subject: 'Keuangan' })
              }
              if (item.menu_name === 'SETTING') {
                const findAccessBank = item.access.find(accessItem => accessItem.access_id === 12)
                const findAccessPin = item.access.find(accessItem => accessItem.access_id === 13)
                const findAccessExpedition = item.access.find(accessItem => accessItem.access_id === 14)
                if (findAccessBank !== undefined) ability.push({ action: 'manage', subject: 'Setting Rekening Bank' })
                if (findAccessPin !== undefined) ability.push({ action: 'manage', subject: 'Setting PIN' })
                if (findAccessExpedition !== undefined) ability.push({ action: 'manage', subject: 'Setting Ekspedisi' })
                ability.push({ action: 'manage', subject: 'Setting Komship' })
              }
              if (item.menu_name === 'KENDALA') {
                const findAccessView = item.access.find(accessItem => accessItem.access_id === 1)
                if (findAccessView !== undefined) ability.push({ action: 'manage', subject: 'Kendala' })
              }
            })
            ability.push({ action: 'manage', subject: 'MyApps' })
          }

          data.ability = ability
          this.$ability.update(ability)

          localStorage.setItem('userData', JSON.stringify(data))
          this.$store.commit('auth/UPDATE_USER_DATA', data)

          this.$router
            .go(getHomeRouteForLoggedInUser(role, userData.is_komship))
            .then(() => {})
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response.data.error)
              this.$toast({
                component: ToastificationContentVue,
                props: {
                  title: 'Failed',
                  text: error.response.data.error,
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                },
              })
            })
        })
        .finally(() => {
          this.loading = false
        })
    },
    resendEmailVerification() {
      this.loadingResendVerification = true
      this.showResendEmailVerification = true
      if (this.countTimerEmail !== 60) {
        this.countTimerEmail = 60
      }
      if (this.isKompack === 1) {
        this.$http_komship.post(`/kompack/v1/register/resend-email?email=${this.emailProfile}`)
          .then(() => {
            this.error = ''
            this.loadingResendVerification = false
            this.modeLogin = false
            this.modeVerificationEmail = true
            this.countDownTimer()
          })
          .catch(() => {
            this.loadingResendVerification = false
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Gagal',
                text: 'Gagal untuk login, silahkan coba lagi!',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          })
      }
      if (this.isKompack === 0) {
        this.$http
          .get(`/resend_verification_email/${this.userId}`)
          .then(() => {
            this.error = ''
            this.loadingResendVerification = false
            this.modeLogin = false
            this.modeVerificationEmail = true
            this.countDownTimer()
          })
          .catch(() => {
            this.loadingResendVerification = false
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Gagal',
                text: 'Gagal untuk login, silahkan coba lagi!',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          })
      }
    },
    getPartnerProfile(userId) {
      return this.$http
        .get(`/user/partner/get-profile/${userId}`)
        .then(response => response.data.data[0])
        .finally(() => {
          this.loading = false
        })
    },
    getAccessKomship(id) {
      const params = {
        user_id: id,
      }
      return this.$http.get('/user/partner/get-menu-komship-member', {
        params,
      }).then(response => response.data.data)
    },
    logout() {
      useJwt
        .logout({})
        .then(() => {
          // Remove userData from localStorage
          // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
          localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
          localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleChangeModePage() {
      this.modeVerificationEmail = false
      this.modeLogin = true
    },
    countDownTimer() {
      if (this.countTimerEmail > 0) {
        setTimeout(() => {
          this.countTimerEmail -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
  },
}
