<template>
  <div>
    <h2 class="text-[32px] text-[#222222] font-bold text-center mt-[4vw] mb-3">
      Registrasi Kompack
    </h2>
    <b-form>
      <b-row class="justify-center">
        <b-col
          xl="8"
          cols="11"
          class="mb-1"
        >
          <b-form-input
            v-model="email"
            type="text"
            class="input-register mb-[3px]"
            :class="emailValid === false ? 'is-invalid' : ''"
            required
            @keyup="validateEmail"
            @change="validateForm"
          />
          <label class="label-register">Email</label>
          <small
            v-if="email === ''"
            class="text-primary"
          >Alamat Email tidak boleh kosong ya</small>
          <small
            v-else-if="emailValid === false"
            class="text-primary"
          >Alamat Email tidak sesuai format</small>
          <small
            v-else-if="emailAlready"
            class="text-[#828282]"
          >Lanjutkan mengisi form dibawah ini</small>
          <div
            v-else-if="isExistingAccount"
            class="text-[14px] text-[#222222] mt-1"
          >
            <p>Halo {{ email }},
              <br>Kamu sudah menggunakan layanan lain di Komerce.
            </p>
            <p>
              Untuk mendaftar Kompack, Anda cukup menyetujui
              ketentuan persyaratan dan melakukan pendaftaran.
            </p>
          </div>
        </b-col>
        <template v-if="!isExistingAccount">
          <b-col
            xl="8"
            cols="11"
            class="mb-1"
          >
            <b-form-input
              v-model="fullName"
              type="text"
              class="input-register mb-[3px]"
              :class="fullNameValid === false ? 'is-invalid' : ''"
              required
              @keyup="() => fullNameValid = fullName.length >= 3"
              @change="validateForm"
            />
            <label class="label-register">Nama</label>
            <small
              v-if="fullName === ''"
              class="text-primary"
            >Nama tidak boleh kosong ya</small>
            <small
              v-else-if="fullNameValid === false"
              class="text-primary"
            >Nama minimal 3 karakter</small>
          </b-col>
          <b-col
            xl="8"
            cols="11"
            class="mb-1"
          >
            <b-form-input
              v-model="phoneNumber"
              type="number"
              class="input-register mb-[3px]"
              :class="phoneNumberValid === false ? 'is-invalid' : ''"
              required
              @keypress="validatePhoneNumber($event)"
              @keyup="() => phoneNumberValid = phoneNumber.length >= 8"
              @change="validateForm"
            />
            <label class="label-register">Nomor Telepon</label>
            <small
              v-if="phoneNumber === ''"
              class="text-primary"
            >Nomor Telepon tidak boleh kosong ya</small>
            <small
              v-else-if="phoneNumberValid === false"
              class="text-primary"
            >Nomor Telepon minimal 8 digit</small>
          </b-col>
          <b-col
            xl="8"
            cols="11"
            class="mb-1"
          >
            <b-form-input
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              class="input-register mb-[3px]"
              :class="passwordValid === false ? 'is-invalid' : ''"
              required
              @keyup="() => passwordValid = password.length >= 8"
              @change="validateForm"
            />
            <label class="label-register">Password</label>
            <feather-icon
              :icon="passwordVisible ? 'EyeOffIcon' : 'EyeIcon'"
              class="icon-password"
              role="button"
              @click="() => passwordVisible = !passwordVisible"
              @change="validateForm"
            />
            <small
              v-if="password === ''"
              class="text-primary"
            >Password tidak boleh kosong ya</small>
            <small
              v-else-if="passwordValid === false"
              class="text-primary"
            >Password minimal 8 karakter</small>
          </b-col>
          <b-col
            xl="8"
            cols="11"
            class="mb-1"
          >
            <b-form-input
              v-model="confirmPassword"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              class="input-register mb-[3px]"
              :class="confirmPasswordMatch === false ? 'is-invalid' : ''"
              required
              @keyup="() => confirmPasswordMatch = confirmPassword == password"
              @change="validateForm"
            />
            <label class="label-register">Konfirmasi Password</label>
            <feather-icon
              :icon="confirmPasswordVisible ? 'EyeOffIcon' : 'EyeIcon'"
              class="icon-password"
              role="button"
              @click="() => confirmPasswordVisible = !confirmPasswordVisible"
            />
            <small
              v-if="confirmPasswordMatch === false"
              class="text-primary"
            >Konfirmasi Password tidak sesuai</small>
          </b-col>
        </template>
        <b-col
          xl="8"
          cols="11"
          class="mb-1"
        >
          <b-form-checkbox
            v-model="terms"
            @change="validateForm"
          >
            <span class="text-[16px]">
              Dengan Mendaftar, saya setuju dengan
              <a
                href="https://kompack.id/syarat"
                target="_blank"
                class="text-info"
              > Ketentuan Penggunaan dan Kebijakan privasi</a>
            </span>
          </b-form-checkbox>
        </b-col>
        <b-col
          xl="8"
          cols="11"
        >
          <b-button
            :variant="validateForm() ? 'primary' : 'secondary'"
            size="lg"
            class="mb-1"
            block
            :disabled="!validateForm() || loadingSubmit"
            @click="submitRegister"
          >
            <b-spinner
              v-if="loadingSubmit"
              variant="default"
              class="mr-[5px]"
              small
            />
            <span class="text-[16px] font-bold">Daftar</span>
          </b-button>
          <p class="text-[16px] text-center">
            Sudah punya akun ?&nbsp;
            <router-link
              to="login"
              class="text-info font-semibold"
            >
              Masuk
            </router-link>
          </p>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      emailValid: null,
      emailAlready: null,
      fullName: null,
      fullNameValid: null,
      phoneNumber: null,
      phoneNumberValid: null,
      password: null,
      passwordValid: null,
      passwordVisible: null,
      confirmPassword: null,
      confirmPasswordMatch: null,
      confirmPasswordVisible: null,
      terms: null,
      isExistingAccount: null,
      loadingSubmit: false,
    }
  },
  methods: {
    async validateEmail() {
      const email = String(this.email)
      this.emailValid = email.toLowerCase()
        // eslint-disable-next-line no-useless-escape
        .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) != null
      if (!this.emailValid) return
      await this.$http_kompack.get('/kompack/register/check-email', {
        params: { email: this.email },
      }).then(result => {
        const { data } = result
        this.emailAlready = data.code === 200
        this.isExistingAccount = data.code !== 200
      }).catch(err => {
        console.error(err)
      })
    },
    validatePhoneNumber(evt) {
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((
        charCode > 31
        && (charCode < 48 || charCode > 57)
      )) return evt.preventDefault()
      if (
        this.phoneNumber !== null
        && this.phoneNumber.length > 14
      ) return evt.preventDefault()
      return true
    },
    validateForm() {
      if (
        this.emailValid
        && this.fullNameValid
        && this.phoneNumberValid
        && this.passwordValid
        && this.confirmPasswordMatch
        && this.terms === true
      ) return true
      if (
        this.isExistingAccount
        && this.terms === true
      ) return true
      return false
    },
    async submitRegister() {
      let submit
      this.loadingSubmit = true
      if (this.isExistingAccount) {
        submit = await this.$http_kompack.post('/kompack/register/existing', {
          email: this.email,
        })
      } else {
        submit = await this.$http_kompack.post('/kompack/register', {
          email: this.email,
          full_name: this.fullName,
          no_hp: this.phoneNumber,
          password: this.password,
          password_confirmation: this.confirmPassword,
        })
      }
      const { data } = submit
      this.loadingSubmit = false
      this.$emit('submit-register', data.code === 200)
    },
  },
}
</script>
