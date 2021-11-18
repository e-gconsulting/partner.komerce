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
          <h3 class="ml-5 mb-2 register-title">
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
                <b-col
                  cols="9"
                  class="mb-1"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama Lengkap"
                    rules="required"
                  >
                    <b-form-input
                      id="fullname"
                      v-model="fullname"
                      class="bg-light"
                      :state="errors.length > 0 || submitErrors.fullname ? false:null"
                      name="fullname"
                      required
                    />
                    <label for="fullname">
                      Nama Lengkap
                    </label>
                    <small class="text-danger"> {{ errors[0] }} </small>
                  </validation-provider>
                </b-col>

                <!-- email -->
                <b-col
                  cols="9"
                  class="mb-1"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="emailUser"
                      v-model="userEmail"
                      class="bg-light"
                      :state="errors.length > 0 || submitErrors.email ? false:null"
                      required
                    />
                    <label for="emailUser">
                      Email
                    </label>
                    <small class="text-danger"> {{ errors[0] }} </small>
                  </validation-provider>
                </b-col>

                <!-- password -->
                <b-col
                  cols="9"
                  class="mb-1"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Password"
                    vid="password"
                    rules="required"
                  >
                    <b-form-input
                      id="password"
                      v-model="password"
                      class="bg-light"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      required
                    />
                    <label for="password">Password</label>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="icon-password"
                      @click="togglePasswordVisibility"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
                <b-col
                  cols="9"
                  class="mb-1"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Konfirmasi Password"
                    vid="password"
                    rules="required"
                  >
                    <b-form-input
                      id="confirm-password"
                      v-model="confirmPassword"
                      :class="confirmPassword !== confirmPassword ? 'is-invalid' : 'bg-light'"
                      :type="passwordFieldType"
                      :state="errors.length > 0 || submitErrors.password ? false:null"
                      required
                    />
                    <label for="confirm-password">Confirm Password</label>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="icon-password"
                      @click="togglePasswordVisibility"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>

                  <b-form-group v-if="confirmPassword !== password">
                    <small class="text-danger">*Pastikan konfirmasi password sama dengan password sebelumnya</small>
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
                <b-col
                  cols="12"
                  class="px-0"
                >
                  <b-col md="7">
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
  // BInputGroup,
  // BInputGroupAppend,
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
    // BInputGroup,
    // BInputGroupAppend,
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

.register-title{
  font-weight: 600;
  font-size: 24px;
}
[dir] .input-group-text{
  background-color: #f6f6f6;
  border-radius: 13px;
}
[dir] .form-control{
  border-radius: 13px;
  box-shadow: unset;
  height: 50px;
  padding-bottom: 0;
  color: #222222;
}
[dir] .is-invalid{
  background-color: #FFEDED!important;
  background-image: unset!important;
}
[dir] .form-control:focus{
  background-color: #FFFFFF!important;
  border: 1.5px solid #FF6A3A;
  box-shadow: unset;
}
[dir] label {
    position: absolute;
    top: 13px;
    padding-left: 15px;
    z-index: 99999;
    font-size: 1.1rem;
    font-weight: 500;
    color: #828282;
    transition: 0.2s;
}
[dir] .icon-password{
  position: absolute;
  top: 16px;
  font-size: 1.1rem;
  right: 25px;
}
[dir] .form-control:focus ~ label, .form-control:valid ~ label{
  top: 5px;
  font-size: 0.7rem;
  color: #828282;
}
[dir] .form-control:focus ~ .input-group-text{
  background-color: #FFFFFF!important;
}
</style>
