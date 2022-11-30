/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BModal, BLink, BFormGroup, BFormInput, BCardText, BCardTitle, BImg, BForm, BSpinner, BButton, VBTooltip,
} from 'bootstrap-vue'
import { required, forgotpasswordEmail } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { $themeConfig } from '@themeConfig'
import { NoSpace } from '@/libs/helpers'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BModal,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      error: '',
      status: '',
      usernameEmail: '',
      emailverifikasi: '',
      showResendEmailVerification: false,
      dismissCountDown: 0,
      dismissSecs: 0,
      loading: false,
      custommessages: {
        required: 'Mohon masukan email.',
      },
      password: '',

      required,
      forgotpasswordEmail,

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
    resendTextStyle() {
      if (this.dismissSecs > 0) {
        return {
          color: '#828282',
        }
      }
      return {
        color: '#F95031',
      }
    },
    checkCountResend() {
      if (this.dismissCountDown < 2) {
        return true
      }
      return false
    },
  },
  methods: {
    handleClickResend() {
      if (this.dismissSecs === 0) {
        this.dismissSecs = 60
        this.dismissCountDown += 1
        this.resendEmailVerification()
        this.$nextTick(() => this.countDownChanged())
      }
    },
    countDownChanged() {
      if (this.dismissSecs > 0) {
        setTimeout(() => {
          this.dismissSecs -= 1
          this.countDownChanged()
        }, 1000)
      }
    },
    resendEmailVerification() {
      this.$http_komship.post('/v1/forgot-password', {
        email: this.usernameEmail,
      })
        .then(response => {
          if (response.data.code === 400) {
            this.error = response.data.message
            this.loading = false
            this.emailverifikasi = 'Belum ada akun yang menggunakan email ini.'
          } else {
            this.showResendEmailVerification = true
          }
        }).catch(() => {
          this.loading = false
        })
    },
    handleRedirectTodataforgot() {
      this.$router.push('login')
    },
    submit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true
          this.error = ''
          this.emailverifikasi = ''
          this.$http.post('/v1/partner/send-link-forgot-password', {
            email: this.usernameEmail,
          })
            .then(response => {
              if (response.data.code === 200) {
                this.dismissSecs = 60
                this.showResendEmailVerification = true
                this.$nextTick(() => this.countDownChanged())
              }
            }).catch(error => {
              if (error.response.data.code === 400) {
                this.error = error.response.data.message
                this.loading = false
                this.emailverifikasi = 'Belum ada akun yang menggunakan email ini.'
              }
              this.loading = false
            })
        }
      })
    },
  },
}
