<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>
      <!-- Verivication PIN -->
      <b-modal
        ref="modal-pin"
        no-close-on-backdrop
        hide-header-close
        hide-footer
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
            <b-spinner
              v-if="loadingSubmit"
              small
            />
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
              @click="editRekening(data)"
            >
              <feather-icon
                icon="EditIcon"
              />
            </b-button>
          </b-col>
        </b-row>

        <validation-observer ref="formRules">
          <b-form>
            <b-row>
              <b-col cols="10">
                <b-form-group
                  label="Nama Bank"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdRek === data.bank_account_id">
                    <validation-provider
                      #default="{errors}"
                      name="Nama Bank"
                      rules="required"
                    >
                      <b-form-input
                        v-model="bankName"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.bank_name"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="No Rekening"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdRek === data.bank_account_id">
                    <validation-provider
                      #default="{errors}"
                      name="No Rekening"
                      rules="required"
                    >
                      <b-form-input
                        v-model="accountNo"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.account_no"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Nama"
                  label-cols-md="3"
                >
                  <div v-if="editMode === true && editIdRek === data.bank_account_id">
                    <validation-provider
                      #default="{errors}"
                      name="Nama"
                      rules="required"
                    >
                      <b-form-input
                        v-model="accountName"
                        :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </div>
                  <div v-else>
                    <b-form-input
                      v-model="data.account_name"
                      disabled
                    />
                  </div>
                </b-form-group>
              </b-col>

              <!-- Edit Rekening -->
              <transition name="fade">
                <b-col
                  v-if="editIdRek === data.bank_account_id"
                  md="12"
                  class="d-flex justify-content-end mt-1 pb-1"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="outline-primary"
                    class="mr-1"
                    @click.prevent="confirmDelete(data)"
                  >
                    Hapus
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="primary"
                    class="mr-1"
                    @click="submitEditRekening"
                  >
                    <b-spinner
                      v-if="loadingSubmit"
                      variant="light"
                      small
                    />
                    Simpan
                  </b-button>
                </b-col>
              </transition>

            </b-row>
          </b-form>
        </validation-observer>
      </b-col>

      <!-- Add Rekening -->
      <b-col
        v-if="fieldActionAddRekening === true"
        md="10"
        class="border ml-1 mt-2"
      >

        <b-row class="d-flex align-items-center mb-1">
          <b-col>
            <h5>
              <strong>Tambah Rekening</strong>
            </h5>
          </b-col>
        </b-row>

        <validation-observer ref="formRulesAdd">
          <b-form>
            <b-row>

              <b-col cols="10">
                <b-form-group
                  label="Nama Bank"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Nama Bank"
                    rules="required"
                  >
                    <b-form-input
                      v-model="fieldAddBankName"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="No Rekening"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="No rekening"
                    rules="required"
                  >
                    <b-form-input
                      v-model="fieldAddAccountNo"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Nama"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Nama"
                    rules="required"
                  >
                    <b-form-input
                      v-model="fieldAddAccountName"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                md="12"
                class="d-flex justify-content-end mt-1 pb-1"
              >
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="outline-primary"
                  class="mr-1"
                  @click="cancelAddRekening"
                >
                  Hapus
                </b-button>
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  type="reset"
                  variant="primary"
                  class="mr-1"
                  @click="submitRekening"
                >
                  <b-spinner
                    v-if="loadingSubmit"
                    variant="light"
                    small
                  />
                  Simpan
                </b-button>
              </b-col>

            </b-row>
          </b-form>
        </validation-observer>
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
  </b-overlay>
</template>

<script>
import CodeInput from 'vue-verification-code-input'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { required } from '@validations'
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
  BOverlay,
  BSpinner,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
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
    ValidationObserver,
    ValidationProvider,
    BOverlay,
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      loadingSubmit: false,
      loading: false,
      dataPin: null,
      errorPin: '',
      addForm: true,

      editIdRek: null,

      // Validation
      required,

      bankName: '',
      accountNo: '',
      accountName: '',

      editMode: false,

      formRekening: [{ row: '' }],

      fieldActionAddRekening: false,

      submitAction: false,

      // Create Rekening Bank
      fieldAddBankName: '',
      fieldAddAccountNo: '',
      fieldAddAccountName: '',
    }
  },
  mounted() {
    // this.showModal()
    this.getBank()
  },
  methods: {
    getBank() {
      this.loading = true
      return axios2.get('v1/bank-account', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        this.formRekening = data
        this.loading = false
      })
    },
    submitRekening() {
      this.loadingSubmit = true
      this.$refs.formRulesAdd.validate().then(success => {
        if (success) {
          axios2.post('/v1/bank-account/store',
            {
              bank_name: this.fieldAddBankName,
              account_name: this.fieldAddAccountName,
              account_no: this.fieldAddAccountNo,
            },
            {
              headers: { Authorization: `Bearer ${useJwt.getToken()}` },
            }).then(response => {
            const { data } = response
            console.log(data)
            this.loadingSubmit = false
            this.getBank()
            this.fieldActionAddRekening = false
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    editRekening(data) {
      this.editIdRek = data.bank_account_id
      this.bankName = data.bank_name
      this.accountNo = data.account_no
      this.accountName = data.account_name
      this.editMode = true
      this.addForm = false
      console.log(this.bankName)
      console.log(this.accountNo)
      console.log(this.accountName)
    },
    submitEditRekening() {
      this.loadingSubmit = true
      this.$refs.formRules.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('_method', 'put')
          formData.append('bank_name', this.bankName)
          formData.append('account_name', this.accountName)
          formData.append('account_no', this.accountNo)
          console.log(this.bankName)
          console.log(this.accountNo)
          console.log(this.accountName)

          axios2.post(`/v1/bank-account/update/${this.editIdRek}`, formData,
            {
              headers: { Authorization: `Bearer ${useJwt.getToken()}` },
            }).then(response => {
            const { data } = response
            this.loadingSubmit = false
            this.getBank()
            console.log(data)
          }).catch(() => {
            this.loadingSubmit = false
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Gagal',
                icon: 'AlertCircleIcon',
                text: 'Gagal edit rekening bank, silahkan coba lagi',
                variant: 'danger',
              },
            })
          })
        } else {
          this.loadingSubmit = false
        }
      })
    },
    confirmDelete(data) {
      this.$swal({
        title: 'Anda yakin?',
        text: 'Ingin hapus satu rekening ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      axios2.delete(`/v1/bank-account/delete/${data.bank_account_id}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      })
        .then(response => {
          this.getBank()
          console.log(response)
        })
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
      this.loadingSubmit = true
      axios2.post('/v1/pin/auth', {
        pin: this.dataPin,
      },
      {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        if (data.is_match === true) {
          this.loadingSubmit = false
          this.hideModal()
        } else {
          this.errorPin = 'PIN tidak valid'
          this.loadingSubmit = false
        }
      })
    },
    addRekening() {
      this.fieldActionAddRekening = true
    },
    cancelAddRekening() {
      this.fieldActionAddRekening = false
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
