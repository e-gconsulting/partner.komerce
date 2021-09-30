<template>
  <b-card>

    <h4>
      <strong>Edit Alamat Penjemputan</strong>
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
                      :options="itemsOrigin"
                      :state="errors.length > 0 ? false:null"
                      @input="loadOrigin"
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
                  variant="outline-primary"
                  class="mr-1"
                  @click.prevent="confirmDelete"
                >
                  Hapus
                </b-button>
                <b-button
                  type="reset"
                  variant="primary"
                  class="mr-1"
                  @click.prevent="submit"
                >
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import vSelect from 'vue-select'
import useJwt from '@/auth/jwt/useJwt'
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
      addressId: this.$route.params.id,

      optionOriginCode: [],

      loadingSubmit: false,

      itemsOrigin: [],

      hasMoreOrigin: false,

      // Validation
      required,
    }
  },
  mounted() {
    console.log(this.addressId)
    this.loadForm()
    this.loadOrigin()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          const formData = new FormData()
          formData.append('_method', 'put')
          formData.append('address_name', this.nameAddress)
          formData.append('is_default', this.dataIsDefault)
          formData.append('zip_code', this.originCode.value)
          formData.append('address_detail', this.detailAddress)
          formData.append('pic', this.picName)
          formData.append('phone', this.phoneUser)
          console.log(this.nameAddress)
          console.log(this.dataIsDefault)
          console.log(this.originCode)
          console.log(this.detailAddress)
          console.log(this.picName)
          console.log(this.phoneUser)

          axios2.post(`/v1/address/update/${this.addressId}`, formData, {
            headers: { Authorization: `Bearer ${useJwt.getToken()}` },
          }).then(response => {
            const { data } = response.data
            console.log(data)
          })
        }
      })
    },
    confirmDelete() {
      const formData = new FormData()
      formData.append('_method', 'delete')

      axios2.post(`/v1/address/delete/${this.addressId}`, formData, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response
        console.log(data)
      })
    },
    loadForm() {
      axios2.get(`/v1/address/${this.addressId}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        console.log(data)
        this.nameAddress = data.address_name
        this.detailAddress = data.address_detail
        this.originCode = data.origin_code
        this.picName = data.pic
        this.phoneUser = data.phone
        if (data.is_default === 0) {
          this.isDefault = false
          this.dataIsDefault = 0
        } else {
          this.isDefault = true
          this.dataIsDefault = 1
        }
      })
    },
    changeDefaultAddress() {
      if (this.isDefault === false) {
        this.dataIsDefault = 0
      } else {
        this.dataIsDefault = 1
      }
    },
    loadOrigin() {
      axios2.get(`/v1/origin?search=${this.originCode}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.itemsOrigin = data
        console.log(data)
        return this.itemsOrigin
      })
    },
    searchOrigin() {
      const getOrigin = axios2.get(`/v1/origin?search=${this.originCode}`, {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      }).then(response => {
        const { data } = response.data
        this.itemsOrigin = data
        console.log(this.itemsOrigin)
      })
      return { getOrigin }
    },
  },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
