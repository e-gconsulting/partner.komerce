<template>
  <div class="auth-wrapper auth-v1 px-2">
    <b-row class="auth-inner m-0">
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
      <b-card class="text-white mt-2">
        <b-col
          lg="12"
          :style="{
            backgroundImage: `url('${imgUrl}')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
          }"
        >

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
            #default="{invalid}"
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
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid || loading"
              >
                <b-spinner
                  v-if="loading"
                  small
                />
                Kirim
              </b-button>
              <!-- <b-modal
                id="modal-2"
                ref="modalAddOrderPopUp"
                hide-footer
                hide-header
                centered
                @hide="handleRedirectToDataOrder"
              >
                <div class="modal-add-order-popup-success">
                  <div class="image-wrapper">
                    <img src="@/assets/images/icons/success.svg">
                  </div>
                  <div class="text-wrapper">
                    Tautan untuk mengatur ulang password
                    berhasil dikirim melalui email. Silahkan cek email Kamu.
                  </div>
                  <span class="text-wrapper"> kirim ulang{{ countdown }}</span>
                  <b-button
                    class="next-button no-mg"
                    tag="router-link"
                    :to="{name:'auth-login'}"
                  >
                    Kembali Masuk
                  </b-button>
                </div>
              </b-modal> -->
            </b-form>
          </validation-observer>
        </b-col>
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
    // BModal,
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
      // sideImg: require('@/assets/images/illustration/auth-illustration.png'),
      loading: false,

      // validation rules
      required,
      email,
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
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/illustration/auth-illustration.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  // created: {
  // this.countdown()
  // },
  methods: {
    countdown() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown = 1
          this.countdown()
        }, 1000)
      }
    },
    handleRedirectToDataOrder() {
      this.$router.push('forgot-password')
    },
    submit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true
          this.error = ''

          useJwt.resetPassword({
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
