import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { required, email } from '@validations'
import { kirimEmailConfig } from '@/libs/helpers'
import CryptoJS from 'crypto-js'
import httpKomship from '@/views/pages/komship/setting-kompship/http_komship'
import qs from 'qs'
import axios from 'axios'
import {
  BCol,
  BNavbarBrand,
  BImg,
  BRow,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCol,
    BNavbarBrand,
    BImg,
    BRow,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      agree: false,
      fullname: '',
      nomorHandphone: '',
      userEmail: '',
      userPassword: '',
      confirmPassword: '',
      loading: false,

      submitErrors: '',

      required,
      email,

      passwordFieldTypePassword: 'password',
      passwordFieldTypeConfirmPassword: 'password',

      errorCharPassword: '',

      usernameTaken: '',
      emailTaken: '',
      data: [],

      // Existing
      userEmailExisting: '',
      modeNewUser: true,
      modeExistingUser: false,
      serviceTitle: '',
      serviceIsKomship: false,

      messageValidateNo: '',
    }
  },
  computed: {
    passwordToggleIconPassword() {
      return this.passwordFieldTypePassword === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconConfirmPassword() {
      return this.passwordFieldTypeConfirmPassword === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    subscribeKirimEmail() {
      const timestamp = Math.floor(Date.now() / 1000)
      const unixtimestamp = timestamp
      const toHash = `${kirimEmailConfig.username}::${kirimEmailConfig.token}::${unixtimestamp}`
      // console.log('toHash :', toHash)
      const hash = CryptoJS.HmacSHA256(toHash, kirimEmailConfig.token)
      const generatedtoken = hash.toString(CryptoJS.enc.Hex)
      // console.log('generatedtoken :', generatedtoken)
      const data = qs.stringify({
        lists: '19',
        full_name: this.fullname,
        email: this.userEmail,
        'fields[no_hp]': this.nomorHandphone,
        'fields[alamat]': 'Indonesia',
        tags: 'new tag, test tag',
      })

      const config = {
        method: 'post',
        url: 'https://api.kirim.email/v3/subscriber/',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json, text/plain, */*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Credentials': true,

          'Content-Type': 'application/x-www-form-urlencoded',
          'Auth-Id': kirimEmailConfig.username,
          'Auth-Token': generatedtoken,
          Timestamp: unixtimestamp,
        },
        data,
      }
      // calling api
      axios(config)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    },
    register() {
      this.loading = true
      this.usernameTaken = ''
      this.emailTaken = ''
      this.serviceTitle = ''
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.error = ''
          this.$refs.inputkirimemail_email.value = this.userEmail
          this.$refs.inputkirimemail_full_name.value = this.fullname
          httpKomship.post('/v1/register', {
            full_name: this.fullname,
            no_hp: this.nomorHandphone,
            email: this.userEmail,
            password: this.userPassword,
            password_confirmation: this.confirmPassword,
          }).then(response => {
            const { data } = response
            if (data.message === 'Akun Kamu telah terdaftar Komerce Hiring') {
              this.emailTaken = 'The email has already been taken.'
              this.loading = false
              this.modeNewUser = false
              this.modeExistingUser = true
              this.userEmailExisting = this.userEmail
              this.serviceTitle = 'Hiring Talent'
              this.agree = false
            } else if (data.message === 'Akun Kamu telah terdaftar Komship') {
              this.emailTaken = 'The email has already been taken.'
              this.loading = false
              this.modeNewUser = false
              this.modeExistingUser = true
              this.userEmailExisting = this.userEmail
              this.serviceTitle = 'Komship'
              this.agree = false
              this.serviceIsKomship = true
            }

            if (data.code !== 400) {
              this.loading = false
              const routeData = this.$router.resolve({ name: 'komship-register-validate' })
              window.open(routeData.href, '_blank')
              this.$refs.submitformkirimemail.click()
            }
            this.loading = false
          }).catch(() => {
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Gagal',
                text: 'Gagal untuk register, silahkan coba lagi!',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            }, 2000)
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    },
    togglePasswordVisibilityPassword() {
      if (this.passwordFieldTypePassword === 'password') {
        this.passwordFieldTypePassword = 'text'
      } else if (this.passwordFieldTypePassword === 'text') {
        this.passwordFieldTypePassword = 'password'
      }
    },
    togglePasswordVisibilityConfirmPassword() {
      if (this.passwordFieldTypeConfirmPassword === 'password') {
        this.passwordFieldTypeConfirmPassword = 'text'
      } else if (this.passwordFieldTypeConfirmPassword === 'text') {
        this.passwordFieldTypeConfirmPassword = 'password'
      }
    },
    validPassword() {
      if (this.userPassword.length < 8) {
        this.errorCharPassword = '*Minimal 8 karakter'
      } else {
        this.errorCharPassword = ''
      }
    },
    resetValidationUsername() {
      this.usernameTaken = ''
    },
    resetValidationEmail() {
      this.emailTaken = ''
    },
    registerExisting() {
      this.loading = true
      this.$refs.loginFormExisting.validate().then(success => {
        if (success) {
          this.$http.put('/register/partner-existing', {
            email: this.userEmailExisting,
          }).then(response => {
            this.loading = false
            this.$router.push({ name: 'komship-register-validate' })
          }).catch(() => {
            this.loading = false
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: 'Gagal',
                text: 'Gagal untuk register, silahkan coba lagi!',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          })
        } else {
          this.loading = false
        }
      })
    },
    validateNoHp() {
      if (this.nomorHandphone.length < 8) {
        this.messageValidateNo = 'Nomor handphone minimal 8 digit'
      } else {
        this.messageValidateNo = ''
      }
    },
  },
}
