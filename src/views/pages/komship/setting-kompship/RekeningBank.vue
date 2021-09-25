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

    <b-col cols="12">
      <h4>
        <strong>Pengaturan Rekening Bank</strong>
      </h4>
    </b-col>

    <b-col
      v-for="(data, index) in formRekening"
      :key="index + 1"
      md="10"
      class="border ml-1 mt-2"
    >

      <b-row class="d-flex align-items-center mb-1">
        <b-col>
          <h5>
            <strong>Rekening {{ index+1 }}</strong>
          </h5>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-button
            class="btn-icon"
            variant="flat-dark"
            @click="editRekening(data.bank_account_id)"
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
              <div v-if="addForm === false">
                <b-form-input
                  v-model="data.bank_name"
                />
              </div>
              <div v-else>
                <b-form-input
                  v-model="bankName"
                />
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="No Rekening"
              label-cols-md="3"
            >
              <div v-if="addForm === false">
                <b-form-input
                  v-model="data.account_no"
                />
              </div>
              <div v-else>
                <b-form-input
                  v-model="accountNo"
                />
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="10">
            <b-form-group
              label="Nama"
              label-cols-md="3"
            >
              <div v-if="addForm === false">
                <b-form-input
                  v-model="data.account_name"
                />
              </div>
              <div v-else>
                <b-form-input
                  v-model="accountName"
                />
              </div>
            </b-form-group>
          </b-col>

          <b-col
            v-if="editMode === data.bank_account_id"
            md="12"
            class="d-flex justify-content-end mt-1 pb-1"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="outline-primary"
              class="mr-1"
              @click="removeFormRekening(index)"
            >
              Hapus
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="primary"
              class="mr-1"
              @click="createRekening"
            >
              Simpan
            </b-button>
          </b-col>

          <!-- Add Rekening -->

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
          @click="addRekening"
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
// import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import axios2 from './baseUrl2'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    // vSelect,
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
      addForm: false,

      editMode: null,

      bankName: '',
      accountNo: '',
      accountName: '',

      formRekening: [{ row: '' }],

      loadingSubmit: false,
      submitAction: false,
    }
  },
  mounted() {
    this.showModal()
    this.getBank()
  },
  methods: {
    getBank() {
      axios2.get('v1/bank-account', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        console.log(data.at(-1))
        this.formRekening = data
      })
    },
    createRekening() {
      axios2.post('/v1/bank-account/store',
        {
          bank_name: this.bankName,
          account_name: this.accountName,
          account_no: this.accountNo,
        },
        {
          headers: { Authorization: `Bearer ${useJwt.getToken()}` },
        }).then(response => {
        const { data } = response
        console.log(data)
      })
    },
    editRekening(data) {
      this.editMode = data
      console.log(data)
    },
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
    addRekening() {
      this.formRekening.push({ form: '' })
    },
    removeFormRekening(index) {
      this.formRekening.splice(index, 1)
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
