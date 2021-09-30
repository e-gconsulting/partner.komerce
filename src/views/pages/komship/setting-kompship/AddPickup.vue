<template>
  <b-card>

    <h4>
      <strong>Tambah Alamat Penjemputan</strong>
    </h4>

    <b-row class="mt-3">
      <b-col
        cols="10"
        class="border pb-1"
      >

        <b-row class="d-flex mt-50 mb-1">
          <b-col md="6">
            <h5>
              <strong>Alamat 1</strong>
            </h5>
          </b-col>
        </b-row>

        <validation-observer ref="formRules">
          <b-form>
            <b-row>

              <b-col cols="10">
                <b-form-group
                  label="Nama Alamat"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Nama Alamat"
                    rules="required"
                  >
                    <b-form-input
                      v-model="nameAddress"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Kode Post/Kecamatan"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Kode Post/Kecamatan"
                    rules="required"
                  >
                    <v-select
                      v-model="originCode"
                      label="label"
                      :options="optionOriginCode"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Alamat Detail"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Alamat Detail"
                    rules="required"
                  >
                    <b-form-textarea
                      v-model="detailAddress"
                      placeholder="Alamat Detail"
                      rows="3"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="Nama PIC"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="Nama PIC"
                    rules="required"
                  >
                    <b-form-input
                      v-model="picName"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="10">
                <b-form-group
                  label="No. HP"
                  label-cols-md="3"
                >
                  <validation-provider
                    #default="{errors}"
                    name="No. HP"
                    rules="required"
                  >
                    <b-form-input
                      v-model="phoneUser"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col
                md="10"
              >
                <b-form-group
                  label-cols-md="3"
                >
                  <b-form-checkbox
                    v-model="isDefault"
                    @change="changeDefaultAddress"
                  >
                    Jadikan sebagai alamat utama
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <!-- submit and reset -->
              <b-col
                md="12"
                class="d-flex justify-content-end mt-2"
              >
                <b-button
                  type="submit"
                  variant="primary"
                  class="mr-50"
                  @click.prevent="submitAddress"
                >
                  <b-spinner
                    v-if="loadingSubmit"
                    small
                  />
                  Simpan
                </b-button>
              </b-col>

            </b-row>
          </b-form>
        </validation-observer>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import vSelect from 'vue-select'
import useJwt from '@/auth/jwt/useJwt'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import {
  BCard,
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BButton,
  BFormCheckbox,
  BSpinner,
} from 'bootstrap-vue'
import axios2 from './baseUrl2'

export default {

  components: {
    BCard,
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    vSelect,
    BButton,
    BFormCheckbox,
    ValidationObserver,
    ValidationProvider,
    BSpinner,
  },
  data() {
    return {

      nameAddress: '',
      detailAddress: '',
      originCode: '',
      picName: '',
      phoneUser: '',
      isDefault: false,
      dataIsDefault: null,

      optionOriginCode: [],

      loadingSubmit: false,

      // Validation
      required,

    }
  },
  mounted() {
    this.changeDefaultAddress()
    this.getOriginCode()
  },
  methods: {
    submitAddress() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('address_name', this.nameAddress)
          formData.append('origin_code', this.originCode.value)
          formData.append('address_detail', this.detailAddress)
          formData.append('pic', this.picName)
          formData.append('phone', this.phoneUser)
          formData.append('is_default', this.dataIsDefault)

          axios2.post('/v1/address/store', formData,
            {
              headers: { Authorization: `Bearer ${useJwt.getToken()}` },
            }).then(response => {
            const { data } = response
            console.log(data)
            this.$router.push({ name: this.$route.meta.navActiveLink })
          }).catch(() => {
            this.loadingSubmit = false
          })
        }
      })
    },
    changeDefaultAddress() {
      if (this.isDefault === false) {
        this.dataIsDefault = 0
      } else {
        this.dataIsDefault = 1
      }
      console.log(this.isDefault)
      console.log(this.dataIsDefault)
    },
    getOriginCode() {
      axios2.get('/v1/origin', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.optionOriginCode = data
      })
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
