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
                <b-col
                  cols="8"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama Lengkap"
                    rules="required"
                  >
                    <div class="inputs">
                      <div :class="errors[0] ? 'input space-error0' : 'input'">
                        <b-form-input
                          id="fullname"
                          v-model="fullname"
                          :state="errors.length > 0 || submitErrors.fullname ? false:null"
                          name="fullname"
                          class="border-0 bg-light input-name-komship"
                          required
                        />
                        <label for="fullname">
                          Nama Lengkap
                        </label>
                        <small class="text-danger"> {{ errors[0] }} </small>
                      </div>
                    </div>
                  </validation-provider>
                </b-col>

                <!-- email -->
                <b-col cols="8">
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <div class="inputs">
                      <div :class="errors[0] ? 'input space-error0' : 'input'">
                        <b-form-input
                          id="emailUser"
                          v-model="userEmail"
                          type="email"
                          class="border-0 bg-light"
                          :state="errors.length > 0 || submitErrors.email ? false:null"
                          required
                        />
                        <label for="emailUser">
                          Email
                        </label>
                        <small class="text-danger"> {{ errors[0] }} </small>
                      </div>
                    </div>
                  </validation-provider>
                </b-col>

                <!-- password -->
                <b-col cols="8">
                  <b-form-group class="form-group-password">
                    <validation-provider
                      #default="{errors}"
                      name="Password"
                      vid="password"
                      rules="required"
                    >
                      <div class="input-password d-flex">
                        <b-form-input
                          id="password"
                          v-model="password"
                          :type="passwordFieldType"
                          class="border-0 bg-light"
                          :state="errors.length > 0 ? false:null"
                          required
                        />
                        <b-input-group-append
                          is-text
                          class="border-0 class-password"
                        >
                          <feather-icon
                            :icon="passwordToggleIcon"
                            class="cursor-pointer border-0 bg-light"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                        <label for="password">Password</label>
                      </div>
                      <div class="mb-1">
                        <small class="text-danger">{{ errors[0] }}</small>
                      </div>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col
                  cols="8"
                >
                  <b-form-group class="mb-2">
                    <validation-provider
                      #default="{errors}"
                      name="Konfirmasi Password"
                      vid="password"
                      rules="required"
                    >
                      <div class="input-password d-flex">
                        <b-form-input
                          id="confirm-password"
                          v-model="confirmPassword"
                          :type="passwordFieldType"
                          class="border-0 bg-light"
                          :state="errors.length > 0 || submitErrors.password ? false:null"
                          required
                        />
                        <b-input-group-append
                          is-text
                          class="border-0 bg-light"
                        >
                          <feather-icon
                            :icon="passwordToggleIcon"
                            class="cursor-pointer border-0"
                            @click="togglePasswordVisibility"
                          />
                        </b-input-group-append>
                        <label for="confirm-password">Confirm Password</label>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>

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
  // BInputGroup,
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
    // BInputGroup,
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

/* tes */

[dir] .input{
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 0.7rem;
}

[dir] .input-password {
    position: relative;
    width: 100%;
    height: 50px;
}

[dir] .input.space-error0{
    margin-bottom: 2.3rem;
}

[dir] .space-error-passowrd {
  margin-bottom: 0.7rem;
}

[dir] .input input{
    width: 100%;
    height: 50px;
    padding-top: 1.1rem;
    padding-left: 9px;
    outline: none;
    border: 1px solid #8c8c8c;
    border-radius: 3px;
    transition: 0.2s;
}

[dir] .input-password input{
    width: 100%;
    height: 50px;
    padding-top: 1.1rem;
    padding-left: 9px;
    outline: none;
    border: 1px solid #8c8c8c;
    border-radius: 3px;
    transition: 0.2s;
}

[dir] .group-password {
  flex-wrap: nowrap;
}

[dir] .form-group-password {
  margin-bottom: 0px !important;
}

[dir] .input label{
    position: absolute;
    top: 30%;
    left: 10px;
    font-size: 1.1rem;
    color: #000;
    transition: 0.2s;
}

[dir] .input-password label{
    position: absolute;
    top: 30%;
    left: 10px;
    font-size: 1.1rem;
    color: #000;
    transition: 0.2s;
}

[dir] .input input:focus ~ label, .input input:valid ~ label{
    top: 10%;
    font-size: 0.8rem;
    color: #000;
}

[dir] .input-password input:focus ~ label, .input input:valid ~ label{
    top: 10%;
    font-size: 0.8rem;
    color: #000;
}

[dir] .input input:focus{
    border-width: 2px;
    border-color: #0A66C3;
}

[dir] .input-password input:focus{
    border-width: 2px;
    border-color: #0A66C3;
}

[dir] .input-group-text {
  border: 0;
  background: #f6f6f6;
}

[dir] .input-name-komship {
  border-radius: 10px;
}
</style>
