<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Reset Password v1 -->
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
        <b-card-title class="mb-1">
          Ubah Password
        </b-card-title>
        <b-card-text class="mb-2">
          Masukan password baru Kamu
        </b-card-text>

        <!-- form -->
        <validation-observer ref="simpleRules">
          <b-form
            class="auth-reset-password-form mt-2"
            @submit.prevent="submit"
          >

            <!-- password -->
            <b-form-group
              label="password baru"
              label-for="reset-password-new"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="Password"
                rules="required|password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-new"
                    v-model="password"
                    :type="password1FieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password1ToggleIcon"
                      @click="togglePassword1Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- confirm password -->
            <b-form-group
              label-for="reset-password-confirm"
              label="Confirm Password"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirm Password"
                rules="required|confirmed:Password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="reset-password-confirm"
                    v-model="cPassword"
                    :type="password2FieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="reset-password-confirm"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="password2ToggleIcon"
                      @click="togglePassword2Visibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              block
              type="submit"
              variant="primary"
            >
              buat password
            </b-button>
          </b-form>
        </validation-observer>

      </b-card>
    <!-- /Reset Password v1 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import {
  BCard, BCardTitle, BCardText, BForm, BFormGroup, BInputGroup, BInputGroupAppend, BLink, BFormInput, BButton,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { $themeConfig } from '@themeConfig'
import moment from 'moment'

export default {
  components: {
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      error: '',
      cPassword: '',
      status: '',
      userEmail: '',
      // sideImg: require('@/assets/images/illustration/auth-illustration.png'),
      loading: false,
      custommessages3: {
        required: 'Mohon masukkan email',
        email: 'Belum ada akun yang menggunakan email ini.',
      },
      // validation rules
      required,
      password: '',
      password1FieldType: 'password',
      password2FieldType: 'password',
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
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    // imgUrl() {
    //   if (store.state.appConfig.layout.skin === 'dark') {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.sideImg = require('@/assets/images/illustration/auth-illustration.png')
    //     return this.sideImg
    //   }
    //   return this.sideImg
    // },
  },
  methods: {
    handleRedirectTodataforgot() {
      this.$router.push('partner.id')
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    submit() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true
          this.error = ''

          useJwt.resetPassword({
            password: this.password,
            cPassword: this.cPassword,
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
