<template>
  <b-card>

    <!-- Modal Create PIN -->
    <b-modal
      ref="create-pin"
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
      title="Primary Modal"
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Buat PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small>
          <strong>Amankan uang kamu di Kompship menggunakan PIN</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          id="first-create-new-pin"
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
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
      ref="modal-confirm-create-new-pin"
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Konfirmasi PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan Ulang PIN</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChangeConfirm"
          @complete="onCompleteConfirm"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <span class="text-primary">
          <strong>
            {{ errorConfirmPin }}
          </strong>
        </span>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          @click="confirmCreatePin"
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

    <!-- Notif Success Create Pin -->
    <b-modal
      ref="modal-success-create-pin"
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
          src="@core/assets/image/icon-popup-success.png"
        />
      </b-col>

      <b-col class="text-center mt-2">
        <h4 class="text-black">
          <strong>
            PIN Kamu Berhasil Dibuat
          </strong>
        </h4>
        <p class="text-black">
          PIN digunakan untuk meningkatkan keamanan transaksi kamu
        </p>
      </b-col>

    </b-modal>
    <b-modal
      ref="modal-success-changed-pin"
      hide-footer
      hide-header-close
      hide-header
      modal-class="modal-dark"
      centered
    >

      <b-col
        md="12"
        class="d-flex justify-content-center pt-3"
      >
        <b-img
          width="100"
          src="@core/assets/image/icon-popup-success.png"
        />
      </b-col>

      <b-col class="text-center mt-2 mb-3">
        <h4 class="text-black">
          <strong>
            PIN Berhasil Diganti
          </strong>
        </h4>
      </b-col>

    </b-modal>
    <!-- End Create PIN -->
    <!-- =========================================================================================== -->

    <h4 class="text-black">
      <strong>Pengaturan PIN</strong>
    </h4>

    <b-row class="mt-3 align-items-center">
      <b-col
        cols="12"
        md="8"
        class="d-flex align-items-center ml-1 mb-1"
      >

        <b-row class="d-flex align-items-center">
          <b-img
            variant="light-primary"
            square
            class="mr-1"
            src="@core/assets/image/icon-on-page-pin.png"
          />
          <div class="mt-50 pr-1">
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
        cols="12"
        md="auto"
      >
        <b-row>
          <b-button
            variant="primary"
            @click="changePin"
          >
            Ganti PIN
          </b-button>
          <b-button
            variant="outline-primary"
            class="ml-1"
            @click="showPopupForgotPin"
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
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Ganti PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan PIN Lama</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <small class="text-primary">{{ errorConfirmPin }}</small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
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
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Ganti PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan PIN Baru</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
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
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Ganti PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan Ulang PIN Baru</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2">
        <small class="text-danger">{{ errorMatchesPin }}</small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
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
      ref="modal-forgot-pin"
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Lupa PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 mb-1">
        <small class="text-center">
          <strong>Pilih metode untuk mengirim kode</strong>
        </small>
      </b-col>

      <b-row class="d-flex justify-content-center ml-1 pb-2">
        <b-col md="6">
          <div class="demo-inline-spacing">
            <b-button
              block
              variant="primary"
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
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Lupa PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan kode verifikasi (OTP) yang dikirimkan ke No 0857******34</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <div style="display: flex; flex-direction: row;">
          <vue-otp-input
            ref="otpInput"
            input-classes="otp-input"
            :input-type="visibilityOTP"
            separator="-"
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityOTP"
        >
          Tampilkan
        </b-button>
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

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          @click="handleForgotCreateNewPin"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      ref="forgot-create-new-pin"
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Masukan PIN Baru</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          @click="handleForgotConfirmNewPin"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      ref="forgot-confirm-new-pin"
      no-close-on-backdrop
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Masukan Ulang PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          :disabled="matchesPin !== dataPin || dataPin === null"
          @click="submitChangeNewPin"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <!-- By Email -->
    <b-modal
      ref="modal-forgot-email-pin"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Lupa PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small class="text-center">
          <strong>Masukan kode verifikasi (OTP) yang dikirimkan ke email {{ emailUser }}</strong>
        </small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <div style="display: flex; flex-direction: row;">
          <vue-otp-input
            ref="otpInput"
            input-classes="otp-input"
            :input-type="visibilityOTP"
            separator="-"
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityOTP"
        >
          Tampilkan
        </b-button>
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

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          :disabled="dataPin === null || dataPin.length < 4"
          @click="handleChangePinByEmail"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      ref="forgot-create-new-pin-email"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Masukan PIN Baru</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          @click="handleChangeNewPin"
        >
          Ganti PIN
        </b-button>
      </b-col>

    </b-modal>

    <b-modal
      ref="forgot-confirm-new-pin-email"
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      hide-footer
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-2">
        <h4>
          <strong>Masukan Ulang PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-2 mb-1">
        <CodeInput
          :loading="false"
          class="input"
          :type="visibilityPin"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center">
        <b-button
          variant="flat-primary"
          class="btn-icon"
          @click="toggleVisibilityPin"
        >
          Tampilkan
        </b-button>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1 pb-2">
        <b-button
          variant="primary"
          :disabled="matchesPin !== dataPin || dataPin === null"
          @click="submitChangeNewPin"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import { mapState } from 'vuex'

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
      confirmDataPin: null,

      errorConfirmPin: '',
      errorMatchesPin: '',
      errorMatchesConfirmPin: '',

      matchesPin: null,

      countOtp: 60,
      sendOtpEmail: false,

      visibilityPin: 'password',
      visibilityOTP: 'password',

      emailUser: '',

      pinFromOtp: '',
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  mounted() {
    this.showModal()
    this.getProfile()
  },
  methods: {
    // Handle OTP
    handleOnComplete(value) {
      this.dataPin = value
    },
    handleOnChange(value) {
      this.dataPin = value
    },
    // ==================================================================
    createPin() {
      this.$http_komship.post('/v1/pin/store', {
        pin: this.dataPin,
      }, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(() => {}).catch(() => {
        this.$taost({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal buat pin, silahkan coba lagi',
            variant: 'danger',
          },
        }, 2000)
      })
    },
    onChange(v) {
      this.dataPin = v
    },
    onComplete(v) {
      this.dataPin = v
    },
    onChangeConfirm(v) {
      this.dataPinConfirm = v
    },
    onCompleteConfirm(v) {
      this.dataPinConfirm = v
    },
    showModal() {
      this.$http_komship.get('/v1/pin/check', {
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
        }, 2000)
      })
    },
    tes() {
      this.$refs['forgot-confirm-new-pin-email'].hide()
      this.$refs['modal-success-changed-pin'].show()
    },
    submitChangeNewPin() {
      this.$http_komship.put('/v1/pin/update', {
        pin: this.dataPin,
      }).then(response => {
        this.$refs['forgot-confirm-new-pin-email'].hide()
        this.$refs['modal-success-changed-pin'].show()
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
      })
    },
    confirmCreatePin() {
      this.loadingSubmit = true
      if (this.dataPin === this.dataPinConfirm) {
        this.$http_komship.post('/v1/pin/store', {
          pin: this.dataPin,
        }, {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(() => {
          this.loadingSubmit = false
          this.$refs['create-pin'].hide()
          this.$refs['modal-confirm-create-new-pin'].hide()
          this.$refs['modal-success-create-pin'].show()
          this.visibilityPin = 'password'
          this.visibilityOTP = 'password'
        }).catch(() => {
          this.loadingSubmit = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal konfirmasi buat pin',
              variant: 'danger',
            },
          }, 2000)
        })
      } else {
        this.loadingSubmit = false
        this.errorConfirmPin = 'PIN harus sama'
      }
    },
    changePin() {
      this.$refs['modal-change-pin'].show()
    },
    confirmChangePin() {
      this.loadingSubmit = true
      this.$http_komship.post('/v1/pin/auth', {
        pin: this.dataPin,
      }, {
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
        }, 2000)
      })
    },
    isMatchChangePin() {
      this.loadingSubmit = true
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('pin', this.dataPin)

      this.$http_komship.post('/v1/pin/update', formData, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response
        if (data.status === 'success') {
          this.loadingSubmit = false
          this.$refs['modal-confirm-new-pin'].show()
          this.$refs['modal-new-pin'].hide()
          this.matchesPin = this.dataPin
          this.visibilityPin = 'password'
          this.visibilityOTP = 'password'
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
        }, 2000)
      })
    },
    submitChangePin() {
      this.loadingSubmit = true
      setTimeout(() => {
        if (this.matchesPin === this.dataPin) {
          this.loadingSubmit = false
          this.$refs['modal-confirm-new-pin'].hide()
          this.tes()
          this.visibilityPin = 'password'
          this.visibilityOTP = 'password'
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
      this.$refs['modal-forgot-pin'].hide()
      this.$refs['modal-forgot-email-pin'].show()
      this.loadingSubmit = true
      const formData = new FormData()
      formData.append('_method', 'post')
      this.$http_komship.post('/v1/send-otp', formData, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(() => {
        this.loadingSubmit = false
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
        }, 2000)
      })
    },
    sendOtpAgain() {
      this.countOtp = 60
      const formData = new FormData()
      formData.append('_method', 'post')
      this.$http_komship.post('v1/send-otp', formData, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(() => {}).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: 'Gagal kirim OTP, silahkan coba lagi',
            variant: 'danger',
          },
        }, 2000)
      })
      this.countDownTimerOtp()
    },
    handleChangeNewPin() {
      this.$refs['forgot-create-new-pin-email'].hide()
      this.$refs['forgot-confirm-new-pin-email'].show()
      this.matchesPin = this.dataPin
      this.dataPin = null
    },
    getProfile() {
      this.emailUser = this.profile.user_email.replace(`${this.profile.user_email.substr(3, 7)}`, '****')
    },
    handleForgotCreateNewPin() {
      this.$refs['modal-forgot-no-pin'].hide()
      this.$refs['forgot-create-new-pin'].show()
    },
    handleForgotConfirmNewPin() {
      this.$refs['forgot-create-new-pin'].hide()
      this.$refs['forgot-confirm-new-pin'].show()
    },
    handleChangePinByEmail() {
      this.$http_komship.post('/v1/auth-otp', {
        otp: this.dataPin,
      }).then(response => {
        const { data } = response.data
        if (data.is_match) {
          this.$refs['forgot-create-new-pin-email'].show()
          this.$refs['modal-forgot-email-pin'].hide()
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Gagal',
              icon: 'AlertCircleIcon',
              text: 'Gagal verification OTP, masukan OTP yang sudah dikirimkan ke email!',
              variant: 'danger',
            },
          }, 2000)
        }
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Gagal',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
      })
    },
    showPopupForgotPin() {
      this.$refs['modal-forgot-pin'].show()
    },
    toggleVisibilityPin() {
      if (this.visibilityPin === 'password') {
        this.visibilityPin = 'text'
      } else {
        this.visibilityPin = 'password'
      }
    },
    toggleVisibilityOTP() {
      if (this.visibilityOTP === 'password') {
        this.visibilityOTP = 'number'
      } else {
        this.visibilityOTP = 'password'
      }
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
