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
          @click="tesCreate()"
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
          <div>
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
            v-b-modal.modal-change-pin
            variant="primary"
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
      id="modal-change-pin"
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

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          v-b-modal.modal-new-pin
          variant="primary"
        >
          Konfirmasi
        </b-button>
      </b-col>

    </b-modal>

    <!-- Modal New PIN -->
    <b-modal
      id="modal-new-pin"
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
          v-b-modal.modal-confirm-new-pin
          variant="primary"
        >
          Konfirmasi
        </b-button>
      </b-col>

    </b-modal>

    <!-- Konfirmasi New PIN -->
    <b-modal
      id="modal-confirm-new-pin"
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

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="tes()"
        >
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
              v-b-modal.modal-forgot-email-pin
              block
              variant="outline-primary"
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
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small>Kirim Ulang(59)</small>
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
      id="modal-forgot-email-pin"
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
        <CodeInput
          :loading="false"
          class="input"
          @change="onChange"
          @complete="onComplete"
        />
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <small>Kirim Ulang(59)</small>
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
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BImg,
  BModal,
  VBModal,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BImg,
    CodeInput,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
  },
  mounted() {
    this.showModal()
  },
  methods: {
    onChange(v) {
      console.log('onChange ', v)
    },
    onComplete(v) {
      console.log('onComplete ', v)
    },
    showModal() {
      this.$refs['create-pin'].show()
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
    tesCreate() {
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
    },
  },
}
</script>

<style>

</style>
