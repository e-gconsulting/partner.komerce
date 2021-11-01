<template>
  <b-card>

    <!-- Modal Create PIN -->
    <b-modal
      ref="create-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >

      <b-col class="d-flex justify-content-center mt-50">
        <h4>
          <strong>Buat PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small>
          <strong>Amankan uang kamu di Kompship menggunakan PIN</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          v-b-modal.modal-confirm-create-new-pin
          variant="primary"
        >
          Buat PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      id="modal-confirm-create-new-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Konfirmasi PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan Ulang PIN</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="confirmCreatePin"
        >
          Konfirmasi
        </b-button>
      </b-col>

    </b-modal>
    <!-- End Create PIN -->
    <!-- =========================================================================================== -->

    <h4>
      <strong>Pengaturan PIN</strong>
    </h4>

    <b-row class="mt-3 ">
      <b-col
        cols="8"
        class="d-flex align-items-center ml-1"
      >

        <b-row class="d-flex align-items-center">
          <b-img
            variant="light-primary"
            square
            class="mr-1"
            src="@core/assets/image/icon-on-page-pin.png"
          />
          <div class="mt-50">
            <h4>
              <strong>PIN</strong>
            </h4>
            <small>
              <strong>Pastikan PIN kamu aman karena digunakan untuk menarik saldo dan mengatur rekening bank</strong>
            </small>
          </div>
        </b-row>
      </b-col>
      <b-col
        cols="auto"
      >
        <b-row>
          <b-button
            variant="primary"
            @click="changePin"
          >
            Ganti PIN
          </b-button>
          <b-button
            v-b-modal.modal-forgot-pin
            variant="outline-primary"
            class="ml-1"
          >
            Lupa PIN
          </b-button>
        </b-row>
      </b-col>
    </b-row>

    <!-- =================================================================================================== -->
    <!-- Change PIN -->

    <!-- Modal Change PIN -->
    <b-modal
      ref="modal-change-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Ganti PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan PIN Lama</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <small class="text-danger">{{ errorConfirmPin }}</small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="confirmChangePin"
        >
          <b-spinner
            v-if="loadingSubmit"
            variant="light"
            small
          />
          Konfirmasi
        </b-button>
      </b-col>

    </b-modal>

    <!-- Modal Change New PIN -->
    <b-modal
      ref="modal-new-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Ganti PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan PIN Baru</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="isMatchChangePin"
        >
          <b-spinner
            v-if="loadingSubmit"
            variant="light"
            small
          />
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <!-- Konfirmasi New PIN -->
    <b-modal
      ref="modal-confirm-new-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Ganti PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan Ulang PIN Baru</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <small class="text-danger">{{ errorMatchesPin }}</small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="submitChangePin"
        >
          <b-spinner
            v-if="loadingSubmit"
            small
            variant="light"
          />
          Konfirmasi
        </b-button>
      </b-col>

    </b-modal>
    <!-- End Change PIN -->
    <!-- =================================================================================================== -->

    <!-- =================================================================================================== -->
    <!-- Forgot PIN -->
    <b-modal
      id="modal-forgot-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Lupa PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Pilih metode untuk mengirim kode</strong>
        </small>
      </b-col>

      <b-row class="d-flex justify-content-center ml-1">
        <b-col md="6">
          <div class="demo-inline-spacing">
            <b-button
              v-b-modal.modal-forgot-no-pin
              block
              variant="primary"
            >
              SMS
            </b-button>
          </div>
        </b-col>
      </b-row>

      <b-row class="d-flex justify-content-center ml-1">
        <b-col md="6">
          <div class="demo-inline-spacing">
            <b-button
              block
              variant="outline-primary"
              @click="forgotPinByEmail"
            >
              Email
            </b-button>
          </div>
        </b-col>
      </b-row>

    </b-modal>

    <!-- By No -->
    <b-modal
      id="modal-forgot-no-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Lupa PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan kode verifikasi (OTP) yang dikirimkan ke No 0857******34</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <div style="display: flex; flex-direction: row;">
          <vue-otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <div v-if="countOtp > 1">
          <small>Kirim Ulang({{ countOtp }})</small>
        </div>
        <div v-else>
          <b-button
            variant="flat-primary"
            size="sm"
            class="btn-icon"
          >
            Kirim Ulang
          </b-button>
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          v-b-modal.forgot-create-new-pin
          variant="primary"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      id="forgot-create-new-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Masukan PIN Baru</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          v-b-modal.forgot-confirm-new-pin
          variant="primary"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      id="forgot-confirm-new-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Masukan Ulang PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="tes()"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <!-- By Email -->
    <b-modal
      ref="modal-forgot-email-pin"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Lupa PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan kode verifikasi (OTP) yang dikirimkan ke No maung@******.com</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <div style="display: flex; flex-direction: row;">
          <vue-otp-input
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <div v-if="countOtp > 0">
          <small>Kirim Ulang({{ countOtp }})</small>
        </div>
        <div v-else>
          <b-button
            variant="flat-primary"
            size="sm"
            class="btn-icon"
            @click="sendOtpAgain"
          >
            Kirim Ulang
          </b-button>
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          v-b-modal.forgot-create-new-pin-email
          variant="primary"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      id="forgot-create-new-pin-email"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Masukan PIN Baru</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          v-b-modal.forgot-confirm-new-pin-email
          variant="primary"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      id="forgot-confirm-new-pin-email"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-4">
        <h4>
          <strong>Masukan Ulang PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="tes()"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <!-- End Forgot PIN -->
    <!-- =============================================================================================== -->

  </b-card>
</template>

<script>
import CodeInput from 'vue-verification-code-input'
import useJwt from '@/auth/jwt/useJwt'
// import axios from 'axios'
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BImg,
  BModal,
  VBModal,
  BSpinner,
} from 'bootstrap-vue'
import VueOtpInput from '@bachdgvn/vue-otp-input'
import httpKomship from '@/libs/http_komship'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BImg,
    CodeInput,
    BModal,
    VueOtpInput,
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      loadingSubmit: false,
      dataPin: null,

      errorConfirmPin: '',
      errorMatchesPin: '',

      matchesPin: null,

      countOtp: 10,
      sendOtpEmail: false,
    }
  },
  mounted() {
    this.showModal()
  },
  methods: {
    // Handle OTP
    handleOnComplete(value) {
      console.log('OTP completed: ', value)
    },
    handleOnChange(value) {
      console.log('OTP changed: ', value)
    },
    // ==================================================================
    createPin() {
      httpKomship.post('https://komshipdev.komerce.id/api/v1/pin/store', {
        pin: this.dataPin,
      },
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response
        console.log(data)
      }).catch(() => {
        this.$taost({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal buat pin, silahkan coba lagi',
            variant: 'danger',
          },
        })
      })
    },
    onChange(v) {
      console.log('onChange ', v)
      this.dataPin = v
    },
    onComplete(v) {
      console.log('onComplete ', v)
      this.dataPin = v
    },
    showModal() {
      httpKomship.get('/v1/pin/check', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        if (data.is_set === true) {
          this.$refs['create-pin'].hide()
        } else {
          this.$refs['create-pin'].show()
        }
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertIconIcon',
            text: 'Gagal cek pin, silahkan refresh page',
            variant: 'danger',
          },
        })
      })
    },
    tes() {
      this.$swal({
        text: 'PIN Berhasil Diganti',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      })
    },
    confirmCreatePin() {
      httpKomship.get('https://komshipdev.komerce.id/api/v1/pin/check',
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        const { data } = response
        console.log(data)
        this.$swal({
          title: 'PIN Berhasil Dibuat',
          text: 'Selamat kamu telah berhasil mengamankan saldo yang kamu miliki',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-primary ml-1',
          },
          buttonsStyling: false,
        })
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal konfirmasi buat pin',
            variant: 'danger',
          },
        })
      })
    },
    changePin() {
      this.$refs['modal-change-pin'].show()
    },
    confirmChangePin() {
      this.loadingSubmit = true
      this.$httpKomship.post('/v1/pin/auth', {
        pin: this.dataPin,
      },
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        if (data.is_match === true) {
          this.loadingSubmit = false
          this.$refs['modal-new-pin'].show()
          this.$refs['modal-change-pin'].hide()
        } else {
          this.loadingSubmit = false
          this.errorConfirmPin = 'PIN tidak valid'
        }
        console.log(data)
      }).catch(() => {
        this.loadingSubmit = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal buat ganti pin, silahkan coba lagi',
            variant: 'danger',
          },
        })
      })
    },
    isMatchChangePin() {
      this.loadingSubmit = true
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('pin', this.dataPin)

      this.$httpKomship.post('/v1/pin/update', formData, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response
        console.log(data)
        if (data.status === 'success') {
          this.loadingSubmit = false
          this.$refs['modal-confirm-new-pin'].show()
          this.$refs['modal-new-pin'].hide()
          this.matchesPin = this.dataPin
        } else {
          this.loadingSubmit = false
        }
      }).catch(() => {
        this.loadingSubmit = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal ganti pin, silahkan coba lagi',
            variant: 'danger',
          },
        })
      })
    },
    submitChangePin() {
      this.loadingSubmit = true
      setTimeout(() => {
        if (this.matchesPin === this.dataPin) {
          this.loadingSubmit = false
          this.$refs['modal-confirm-new-pin'].hide()
          this.tes()
        } else {
          this.loadingSubmit = false
          this.errorMatchesPin = 'PIN tidak valid'
        }
      }, 2000)
    },
    countDownTimerOtp() {
      if (this.countOtp > 0) {
        setTimeout(() => {
          this.countOtp -= 1
          this.countDownTimerOtp()
        }, 1000)
      }
    },
    forgotPinByEmail() {
      this.$refs['modal-forgot-email-pin'].show()
      this.loadingSubmit = true
      const formData = new FormData()
      formData.append('_method', 'post')
      this.$httpKomship.post('v1/send-otp', formData, {
        headers: {
          Authorization: `Bearer ${useJwt.getToken()}`,
        },
      }).then(response => {
        this.loadingSubmit = false
        const { data } = response
        console.log(data)
        this.countDownTimerOtp()
      }).catch(() => {
        this.loadingSubmit = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal kirim email, silahkan coba lagi',
            variant: 'danger',
          },
        })
      })
    },
    sendOtpAgain() {
      this.countOtp = 10
      const formData = new FormData()
      formData.append('_method', 'post')
      httpKomship.post('v1/send-otp', formData, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response
        console.log(data)
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal kirim OTP, silahkan coba lagi',
            variant: 'danger',
          },
        })
      })
      this.countDownTimerOtp()
    },
  },
}
</script>

<style>
  [dir] .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  [dir] .otp-input::-webkit-inner-spin-button,
  [dir] .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
