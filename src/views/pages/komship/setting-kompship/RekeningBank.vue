<template>
  <b-card>
    <!-- Verivication PIN -->
    <b-modal
      ref="modal-pin"
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
          <strong>Verifikasi PIN</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-3">
        <small>
          <strong>Mohon verifikasi identitas kamu dengan masukan PIN</strong>
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

      <b-col class="text-center mt-1">
        <small class="text-danger">{{ errorPin }}</small>
      </b-col>

      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="primary"
          @click="confirmPin"
        >
          Konfirmasi
        </b-button>
      </b-col>
      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="outline-primary"
        >
          Kembali
        </b-button>
      </b-col>

    </b-modal>

    <!-- Verification No. HP -->
    <b-modal
      id="modal-hp"
      no-close-on-backdrop
      hide-header-close
      ok-only
      hide-header
      modal-class="modal-primary"
      centered
    >

      <b-col class="d-flex justify-content-center mt-50">
        <h4>
          <strong>Verifikasi No HP</strong>
        </h4>
      </b-col>

      <b-col class="d-flex justify-content-center mt-3">
        <small class="text-center">
          <strong>Mohon verifikasi identitas kamu dengan memasukan Kode Verifikasi (OTP) yang dikirimkan via SMS ke No 085788888834</strong>
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
        >
          Konfirmasi
        </b-button>
      </b-col>
      <b-col class="d-flex justify-content-center mt-1">
        <b-button
          variant="outline-primary"
        >
          Kembali
        </b-button>
      </b-col>

    </b-modal>

    <!-- {{ tes() }} -->
    <b-col cols="12">
      <h4>
        <strong>Pengaturan Rekening Bank</strong>
      </h4>
    </b-col>

    <b-col
      md="10"
      class="border ml-1 mt-2"
    >

      <b-row class="d-flex align-items-center mb-1">
        <b-col>
          <h5>
            <strong>Rekening 1</strong>
          </h5>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button
            class="btn-icon"
            variant="flat-dark"
          >
            <feather-icon
              icon="EditIcon"
            />
          </b-button>
        </b-col>
      </b-row>

      <b-form @submit.prevent>
        <b-row>

          <b-col cols="10">
            <b-form-group
              label="Nama Bank"
              label-cols-md="3"
            >
              <v-select />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="No Rekening"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Nama"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-col>

    <b-col
      md="10"
      class="border ml-1 mt-2"
    >

      <b-row class="d-flex align-items-center mb-1">
        <b-col>
          <h5>
            <strong>Rekening 1</strong>
          </h5>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button
            class="btn-icon"
            variant="flat-dark"
          >
            <feather-icon
              icon="EditIcon"
            />
          </b-button>
        </b-col>
      </b-row>

      <b-form @submit.prevent>
        <b-row>

          <b-col cols="10">
            <b-form-group
              label="Nama Bank"
              label-cols-md="3"
            >
              <v-select />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="No Rekening"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Nama"
              label-cols-md="3"
            >
              <b-form-input />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            class="d-flex justify-content-end pb-1"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="outline-primary"
              class="mr-1"
            >
              Hapus
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              v-b-modal.modal-hp
              type="reset"
              variant="primary"
              class="mr-1"
            >
              Simpan
            </b-button>
          </b-col>

        </b-row>
      </b-form>
    </b-col>

    <b-col
      md="10"
      class="ml-1 mt-1"
    >
      <div class="demo-inline-spacing">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          block
          variant="outline-primary"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-50"
          />
          <span class="align-middle">Tambahkan Rekening</span>
        </b-button>
      </div>
    </b-col>

  </b-card>
</template>

<script>
import CodeInput from 'vue-verification-code-input'
import useJwt from '@/auth/jwt/useJwt'
import {
  BRow,
  BCol,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BModal,
  VBModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import axios2 from './baseUrl2'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    vSelect,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BModal,
    CodeInput,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      dataPin: null,
      errorPin: '',

      loadingSubmit: false,
    }
  },
  mounted() {
    this.showModal()
  },
  methods: {
    onChange(v) {
      console.log('onChange ', v)
    },
    onComplete(v) {
      this.dataPin = v
      console.log('onComplete ', v)
    },
    showModal() {
      this.$refs['modal-pin'].show()
    },
    hideModal() {
      this.$refs['modal-pin'].hide()
    },
    confirmPin() {
      axios2.post('/v1/pin/auth', {
        pin: this.dataPin,
      },
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        if (data.is_set === true) {
          this.hideModal()
        } else {
          this.errorPin = 'PIN tidak valid'
        }
      })
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
