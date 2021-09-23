<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="8"
        class="bg-google d-none d-lg-flex align-items-center px-5"
        :style="{
          backgroundImage: `url('${imgUrl}')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: 'center',
        }"
      >
        <!-- Brand logo-->
        <b-link class="brand-logo d-none d-lg-flex">
          <b-img
            :src="appLogoImage"
            alt="logo"
            class="flat-image-light"
            style="width: 36px"
          />
          <h2 class="brand-text text-primary ml-50 mt-auto mb-auto">
            <span class="text-white">{{ appName }}</span>
          </h2>
        </b-link>
        <!-- /Brand logo-->
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        />
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <!-- Brand logo-->
        <b-link class="brand-logo d-flex d-lg-none">
          <b-img :src="appLogoImage" alt="logo" style="width: 36px" />
          <h2 class="brand-text text-primary ml-50 mt-auto mb-auto">
            {{ appName }}
          </h2>
        </b-link>
        <!-- /Brand logo-->

        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
            Masuk
          </b-card-title>
          <b-card-text class="mb-2">
            Silahkan masuk menggunakan akun Anda
          </b-card-text>

          <b-alert variant="danger" :show="!!error">
            <div class="alert-body">
              <span>{{ error }}</span>
              <b-link
                v-if="showResendEmailVerification"
                class="ml-50"
                @click="resendEmailVerification"
              >
                <u>Kirim ulang</u>
              </b-link>
            </div>
          </b-alert>

          <!-- form -->
          <validation-observer ref="loginForm" #default="{ invalid }">
            <b-form class="auth-login-form mt-2" @submit.prevent="login">
              <!-- email -->
              <b-form-group label="Username atau Email" label-for="login-email">
                <validation-provider
                  #default="{ errors }"
                  label="Username atau Email"
                  vid="email"
                  rules="required"
                >
                  <b-form-input
                    id="login-email"
                    v-model="usernameEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@mail.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{ name: 'auth-forgot-password' }">
                    <small>Lupa Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group v-if="false">
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid || loading"
              >
                <b-spinner v-if="loading" small />
                Masuk
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'
import {
  BRow,
  BCol,
  BAlert,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BSpinner,
  BButton,
  VBTooltip,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
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
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
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
      userId: '',
      error: '',
      status: '',
      showResendEmailVerification: false,
      usernameEmail: '',
      password: '',
      sideImg: require('@/assets/images/illustration/auth-illustration.png'),
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
  mounted() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGQyMzE4NTg0YWNmYTU4MGQxYjM1ZWM1NzczNTFlYThjYzY2ZTA4MjNhODdkMWZiODJlYjVlYWQxYTUxNzA1M2RhMjVmYTk0MGI2NzExMDEiLCJpYXQiOjE2MjczNjc3MjMsIm5iZiI6MTYyNzM2NzcyMywiZXhwIjoxNjU4OTAzNzIzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.Swq2EdjNWL7JrRZFu1Gh9x5ZHwo7jmCioZz4Z19IQB2rTIGUDyhkds276ZzPHh-pDwkrD2uEWhceOuXrKnlOwtvJOu3Kf3VymsabIKqJpb8e4dq76FWPbUD6k-WexL7QKQan9gH1LwoQey2nMKFi5hd7_3A9sFLRrQerqh3qugWdD7RqqYS3vYY9M3VqHf108w5iQa_GHkRx2KRv0PxRVRqofkTCBBf-Oc-kcvLkau8N6BVojkYDJ8Cl8uG5XcS0F1RjbNy6SuiuTyqq1BqaZmcasi87zwJEeuJSgdqBfnNch608impEBu9q_ON1kMIgK9LZvqL8_Uk1vP5qosUq39VgJj8qbFDpCKsKus6fjO78G-zeYbZ32D-s03QwPr9FkwoZXg_HaiyTDvsbTcgH63wU-Q7ycor8IgSKPsfkJN1OytohleJMWYOObiN-IKqKGbXnf85DnJrhZuOZB9tQdoq4fIXYx68LQgmiLSVemXUbHMtRmXbYWwAIFy3QexPRGtHxK8wCzqEH-whXh66RKBy31gf1Fu9wxHHEb95U_UfYYynbbDxapwurJHzgxUswdBWDNguNoAJZslZfwVMguAmgtylFvNYzIlEWkENTk5fcTNOJsmVWDYuO-QJyWwCStB7_a7jcPFHLqcs7pwu9cvV-X1__x0BgRD6E9VBfYQg'
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    axios.post(
      'https://devinternal.komerce.id/api/user',
      config,
    ).then(response => {
      const { data } = response
      console.log(data)
    })
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
            .loginKomship({
              username_email: this.usernameEmail,
              password: this.password,
              login_from: 'website',
              fcm_token: 'fMFJVmT_vCk:APA91bEwLh3_5dGKDFJI9M4ISZrqD9sOuN_mtYKxj85ZyaLaxo1sBIi9Iq8X5ZUieX5GyGDfkl_woikKVfJCp5j-U7MxNWDE5GlNg8E3IpnsP7GQARlsbcMsLmiM9eMD5xXYTSGXUUKS',
            })
            .then(response => {
              if (response.data.status === false) {
                this.error = response.data.message
                this.loading = false
              } else {
                useJwt.setToken(response.data.data.token)
                this.getUser(response.data.data)
              }
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    getUser(userData) {
      this.userId = userData.id

      this.$http
        .post('/v1/my-profile', {
          user_id: this.userId,
        })
        .then(async response => {
          let ability = []

          let { data } = response.data
          data = Array.isArray(data) ? data[0] : data
          const role = data.role_name.toUpperCase()

          if (!['ADMIN', 'MANAGEMENT', 'PARTNER', 'SDM'].includes(role)) {
            this.error = 'Akun anda tidak memiliki hak akses untuk masuk.'
            this.logout()
            return
          }

          if (['PARTNER', 'SDM'].includes(role)) {
            if (!userData.email_verified_at) {
              // eslint-disable-next-line operator-linebreak
              this.error =
                'Email belum terverifikasi, harap periksa email Anda.'
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
              ]
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
              ability = [
                { action: 'manage', subject: 'Komship TalentPool' },
                { action: 'manage', subject: 'Komship Wishlist' },
                { action: 'manage', subject: 'PartnerProfile' },
                { action: 'read', subject: 'Dashboard Komship' },
                { action: 'manage', subject: 'Customer' },
                { action: 'manage', subject: 'Produk' },
                { action: 'manage', subject: 'Order' },
                { action: 'manage', subject: 'Pickup' },
                { action: 'manage', subject: 'Keuangan' },
                { action: 'manage', subject: 'Setting Komship' },
                { action: 'manage', subject: 'Hiring' },
              ]
              break
            case 'SDM':
              ability = [
                { action: 'read', subject: 'TalentHome' },
                { action: 'manage', subject: 'TalentProfile' },
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

          data.ability = ability
          this.$ability.update(ability)

          localStorage.setItem('userData', JSON.stringify(data))
          this.$store.commit('auth/UPDATE_USER_DATA', data)

          this.$router
            .replace(getHomeRouteForLoggedInUser(role))
            .then(() => {})
            .catch(error => {
              this.$refs.loginForm.setErrors(error.response.data.error)
            })
        })
        .finally(() => {
          this.loading = false
        })
    },
    resendEmailVerification() {
      this.showResendEmailVerification = false
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
    getPartnerProfile(userId) {
      return this.$http
        .get(`/user/partner/get-profile/${userId}`)
        .then(response => response.data.data[0])
        .finally(() => {
          this.loading = false
        })
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
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
