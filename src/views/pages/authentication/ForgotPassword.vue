<template>
  <div class="auth-wrapper auth-v1 px-2">
    <b-row class="auth-inner m-0">
      <b-card class="text-white mt-2">
        <b-link class="brand-logo text-center">
          <b-link class="brand-logo d-none d-lg-flex text-center">
            <b-img
              :src="appLogoImage"
              alt="logo"
              class="flat-image-dark text-center"
              style="width: 216px; text-align:center;"
            />
          </b-link>
        </b-link>

        <b-card-title class="mb-1 text-center">
          Lupa Password
        </b-card-title>
        <b-card-text class="mb-2 text-center text-black">
          Tautan untuk mengatur ulang password
          akan dikirim melalui email.
        </b-card-text>
        <b-alert
          variant="danger"
          :show="!!error"
        >
          <div class="alert-body">
            <span>{{ error }}</span>
          </div>
        </b-alert>
        <b-alert
          variant="danger"
          :show="!!error"
        >
          <div class="alert-body">
            <span>{{ error }}</span>
          </div>
        </b-alert>
        <!-- form -->
        <validation-observer
          ref="loginForm"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="submit"
          >
            <!-- email -->
            <b-form-group
              label="Email"
              label-for="login-email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                vid="email"
                rules="required|email"
                :custom-messages="custommessages3"
              >
                <b-form-input
                  id="login-email"
                  v-model="userEmail"
                  :state="errors.length > 0 ? false:null"
                  name="login-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-card-text class="text-center mt-2">
              <span class="text-black">Ayoo! kembali </span>
              <b-link
                :to="{name:'auth-login'}"
              >
                <span>&nbsp;masuk</span>
              </b-link>
            </b-card-text>
            <!-- submit buttons -->
            <div class="inline-spacing">
              <b-button
                type="submit"
                variant="primary"
                block
                @click="showmodal"
              >
                <b-spinner
                  v-if="loading"
                  small
                />
                kirim
              </b-button>
            </div>
            <b-modal
              ref="my-modal"
              hide-footer
              modal-class="modal-dark"
              centered
            >

              <b-col
                md="12"
                class="d-flex justify-content-center pt-3"
              >
                <b-img
                  width="100"
                  src="@core/assets/image/iconsquare-popup-success.png"
                />
              </b-col>

              <b-col class="text-center mt-1">
                <h4 class="text-black">
                  <strong>
                    Tautan untuk mengatur ulang password
                    berhasil dikirim melalui email. Silahkan cek email Kamu.
                  </strong>
                </h4>
                <div>
                  <b-link
                    v-if="showResendEmailVerification"
                    class="ml-50"
                    @click="resendEmailVerification"
                  >
                    <span :to="{name:'auth-login'}">Kirim ulang ({{ time }})</span>
                  </b-link>
                </div>
              </b-col>
              <b-button
                type="submit"
                variant="primary"
                block
                :to="{name:'auth-login'}"
              >
                Kembali Masuk
              </b-button>

            </b-modal>
            <div class="mt-1">
            <!-- <p
            v-else
            >
            </p> -->
            </div>
          </b-form>
        </validation-observer>
        <!-- </b-col> -->
      </b-card>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BModal, BAlert, BLink, BFormGroup, BFormInput, BCardText, BCardTitle, BImg, BForm, BSpinner, BButton, VBTooltip,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { $themeConfig } from '@themeConfig'
import moment from 'moment'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BAlert,
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
      userEmail: '',
      showResendEmailVerification: true,
      date: moment(60 * 1000),
      // sideImg: require('@/assets/images/illustration/auth-illustration.png'),
      loading: false,
      custommessages3: {
        required: 'Mohon masukkan email',
        email: 'Belum ada akun yang menggunakan email ini.',
      },
      password: '',
      // validation
      required,

      // validation rules
      // email,
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
    time() {
      return this.date.format('ss')
    },
  },
  mounted() {
    clearInterval(() => {
      this.date = moment(this.date.subtract(1, 'seconds'))
    }, 1000)
  },
  methods: {
    showmodal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    resendEmailVerification() {
      this.showResendEmailVerification = true
      this.error = ''

      this.$http
        .get(`/resend_verification_email/${this.userId}`)
        .then(() => {
          this.userId = ''

          this.$swal({
            title: 'Terkirim',
            text: 'Harap periksa email anda untuk verifikasi akun Anda.',
            icon: 'success',
            confirmButtonText: 'Mengerti',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          })
        })
        .catch(() => {})
    },
    countdown() {
      if (this.countdown <= 0) {
        setTimeout(() => {
          this.countdown = 1
          this.countdown()
        }, 1000)
      }
    },
    handleRedirectTodataforgot() {
      this.$router.push('login')
    },
    submit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true
          this.error = ''
          this.showResendEmailVerification = true
          useJwt.forgotpassword({
            email: this.userEmail,
          })
            .then(response => {
              if (response.data.status === false) {
                this.error = response.data.message
                this.loading = false
              } else {
                this.$swal({
                  title: 'Tautan Dikirm',
                  text: 'Tautan untuk mengatur ulang password telah dikirim ke email Anda.',
                  icon: 'success',
                  confirmButtonText: 'Mengerti',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                })

                // Redirect to login page
                this.$router.push({ name: 'auth-login' })
              }
            }).catch(() => {
              this.loading = false
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
