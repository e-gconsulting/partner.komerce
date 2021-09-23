<template>
  <b-row>
    <b-col
      cols="6"
      class="wrapper-kompship-register"
    >
      <b-navbar-brand class="ml-4 mt-1">
        <b-img
          src="@core/assets/image/brand.png"
        />
      </b-navbar-brand>
      <b-col
        md="12"
        class="pt-5 mt-3"
      >
        <b-col class="ml-3">
          <h3 class="ml-5 mb-2">
            Daftar
          </h3>

          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="ml-5"
              @submit.prevent="login"
            >
              <b-row>

                <!-- full name -->
                <b-col cols="8">
                  <b-form-group
                    label="Nama Lengkap"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Nama Lengkap"
                      rules="required"
                    >
                      <b-form-input
                        v-model="fullname"
                        placeholder="Nama Lengkap"
                        :state="errors.length > 0 || submitErrors.fullname ? false:null"
                        name="fullname"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- email -->
                <b-col cols="8">
                  <b-form-group
                    label="Email"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                      <b-form-input
                        v-model="userEmail"
                        type="email"
                        placeholder="Email"
                        :state="errors.length > 0 || submitErrors.email ? false:null"
                      />
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- password -->
                <b-col cols="8">
                  <b-form-group>
                    <div class="d-flex justify-content-between">
                      <label for="login-password">Password</label>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="Password"
                      vid="password"
                      rules="required"
                    >
                      <b-input-group
                        class="input-group-merge"
                        :class="errors.length > 0 ? 'is-invalid':null"
                      >
                        <b-form-input
                          id="login-password"
                          v-model="userPassword"
                          :state="errors.length > 0 || submitErrors.password ? false:null"
                          class="form-control-merge"
                          :type="passwordFieldType"
                          name="login-password"
                        />
                        <b-input-group-append is-text>
                          <feather-icon
                            class="cursor-pointer"
                            :icon="passwordToggleIcon"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] || submitErrors.password }}</small>
                    </validation-provider>
                  </b-form-group>

                </b-col>
                <b-col cols="8">
                  <b-form-group>
                    <div class="d-flex justify-content-between">
                      <label for="login-password">Konfirmasi Password</label>
                    </div>
                    <validation-provider
                      #default="{ errors }"
                      name="Password"
                      vid="password"
                      rules="required"
                    >
                      <b-input-group
                        class="input-group-merge"
                        :class="errors.length > 0 ? 'is-invalid':null"
                      >
                        <b-form-input
                          id="login-password-konfirm"
                          v-model="userPassword"
                          :state="errors.length > 0 || submitErrors.password ? false:null"
                          class="form-control-merge"
                          :type="passwordFieldType"
                          name="login-password"
                        />
                        <b-input-group-append is-text>
                          <feather-icon
                            class="cursor-pointer"
                            :icon="passwordToggleIcon"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] || submitErrors.password }}</small>
                    </validation-provider>
                  </b-form-group>

                </b-col>

                <!-- checkbox -->
                <b-col cols="12">
                  <b-form-group>
                    <b-form-checkbox
                      v-model="agree"
                    >
                      Saya setuju dengan syarat dan ketentuan Kompship
                    </b-form-checkbox>
                  </b-form-group>
                </b-col>

                <!-- submit -->
                <b-col cols="12">
                  <b-col md="6">
                    <div class="demo-inline-spacing">
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
                        Daftar
                      </b-button>
                    </div>
                  </b-col>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>

        </b-col>
      </b-col>
    </b-col>
    <b-col
      cols="6"
      class="wrapper-preview-dashboard-kompship d-flex justify-content-center align-items-center"
    >
      <b-img
        src="@core/assets/image/prev-dash.png"
      />
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { required, email } from '@validations'
import useJwt from '@/auth/jwt/useJwt'
import {
  BCol,
  BNavbarBrand,
  BImg,
  BRow,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
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
    BInputGroup,
    BInputGroupAppend,
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
      agree: '',
      fullname: '',
      userEmail: '',
      userPassword: '',
      loading: false,

      submitErrors: '',

      required,
      email,

      data: [],
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    login() {
      console.log(this.fullname)
      console.log(this.userEmail)
      console.log(this.userPassword)
      if (this.agree === '') {
        this.agree = false
      }
      console.log(this.agree)
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = true
          this.error = ''

          useJwt.registerKomship({
            full_name: this.fullname,
            email: this.userEmail,
            password: this.userPassword,
            password_confirmation: this.userPassword,
          })
            .then(response => {
              if (response.data.status === false) {
                this.error = response.data.message
                this.loading = false
              } else {
                this.$router.push({ name: 'auth-login' })

                this.$swal({
                  title: 'Pendaftaran berhasil',
                  text: 'Harap periksa email anda untuk verifikasi akun Anda.',
                  icon: 'success',
                  confirmButtonText: 'Mengerti',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                })
              }
            }).catch(error => {
              this.loading = false

              if (error.response.status === 422) {
                this.submitErrors = Object.fromEntries(
                  Object.entries(error.response.data.data).map(
                    ([key, value]) => [key, value[0]],
                  ),
                )
              }
            })
        }
      })
    },
  },
}
</script>

<style scoped>

[dir] .wrapper-kompship-register {
  background-color: #FFFFFF;
}

[dir] .wrapper-preview-dashboard-kompship {
  background: linear-gradient(147.38deg, rgba(231, 233, 242, 0.76) 0%, rgba(203, 206, 219, 0) 100%);
}

</style>
