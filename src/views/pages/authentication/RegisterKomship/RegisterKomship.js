import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { required, email } from '@validations'
import { NoSpace } from '@/libs/helpers'
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
  BModal,
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
    BModal,
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
      NoSpace,

      errorCoupon: false,
      couponCode: '',
      couponCodeLengthError: false,
      couponNotFound: false,
      isAffiliate: false,
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
    register() {
      this.loading = true
      this.usernameTaken = ''
      this.emailTaken = ''
      this.serviceTitle = ''
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          if (this.couponCode.length > 0) {
            this.$http_komship_affiliate.get(`/v1/coupon/check-register?coupon_name=${this.couponCode}&member_email=${this.userEmail}`)
              .then(() => {
                this.error = ''
                this.$refs.inputkirimemail_email.value = this.userEmail
                this.$refs.inputkirimemail_full_name.value = this.fullname
                this.$http_komship.post('/v1/register', {
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
                    // this.loading = false
                    // const routeData = this.$router.resolve({ name: 'komship-register-validate' })
                    // window.open(routeData.href, '_blank')
                    this.$refs.submitformkirimemail.click()
                  }
                  if (data.message === 'Akun Kamu Terdaftar Sebagai Management, Silahkan Gunakan Email Lain.') this.$refs['modal-validate-existing-manajemen'].show()
                  if (data.message === 'Akun Kamu Terdaftar Sebagai Talent, Silahkan Gunakan Email Lain.') this.$refs['modal-validate-existing-manajemen'].show()
                  if (data.message === 'Akun Kamu Terdaftar Sebagai Talent Partner Komship, Silahkan Gunakan Email Lain.') this.$refs['modal-validate-existing-manajemen'].show()
                  if (data.data?.role_id === 3) this.$refs['modal-validate-existing-manajemen'].show()
                  if (data.data?.role_id === 5) this.$refs['modal-validate-existing-manajemen'].show()
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
              }).catch(err => {
                this.loading = false
                if (err.response.data.message === 'Not found.') {
                  this.couponNotFound = true
                }
                if (err.response.data.code === 409) {
                  this.isAffiliate = true
                }
              })
          } else {
            this.error = ''
            this.$refs.inputkirimemail_email.value = this.userEmail
            this.$refs.inputkirimemail_full_name.value = this.fullname
            this.$http_komship.post('/v1/register', {
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
                // this.loading = false
                // const routeData = this.$router.resolve({ name: 'komship-register-validate' })
                // window.open(routeData.href, '_blank')
                this.$refs.submitformkirimemail.click()
              }
              if (data.message === 'Akun Kamu Terdaftar Sebagai Management, Silahkan Gunakan Email Lain.') this.$refs['modal-validate-existing-manajemen'].show()
              if (data.message === 'Akun Kamu Terdaftar Sebagai Talent, Silahkan Gunakan Email Lain.') this.$refs['modal-validate-existing-manajemen'].show()
              if (data.message === 'Akun Kamu Terdaftar Sebagai Talent Partner Komship, Silahkan Gunakan Email Lain.') this.$refs['modal-validate-existing-manajemen'].show()
              if (data.data?.role_id === 3) this.$refs['modal-validate-existing-manajemen'].show()
              if (data.data?.role_id === 5) this.$refs['modal-validate-existing-manajemen'].show()
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
          }
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
    closeModalValidateManajemen() {
      this.$refs['modal-validate-existing-manajemen'].hide()
    },
    couponValidation() {
      this.couponNotFound = false
      this.isAffiliate = false
      if (!this.couponCode.match(/^[a-z0-9]+$/i) && this.couponCode.length > 0) {
        this.errorCoupon = true
      } else {
        this.errorCoupon = false
      }
      if (this.couponCode.length < 4 && this.couponCode.length > 0) {
        this.couponCodeLengthError = true
      } else {
        this.couponCodeLengthError = false
      }
    },
    couponCodeFormat(e) {
      return e.toUpperCase()
    },
    regexCoupon(e) {
      this.couponCode = e.target.value.replace(/[^A-Za-z0-9]/g, '')
    },
  },
}
