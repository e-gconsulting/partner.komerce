<template>
  <b-card-actions
    ref="formCard"
    :title="`${editMode ? 'Edit' : 'Add'} Trainer`"
    no-actions
  >
    <b-row>
      <b-col
        md="6"
      >
        <!-- form -->
        <validation-observer ref="formRules">
          <b-form>
            <b-row>
              <b-col
                class="pb-2"
                md="12"
              >
                <b-form-row>
                  <b-col cols="4">
                    <div class="text-center mr-md-1">
                      <b-avatar
                        size="86px"
                        :src="imageFile ? fileUrl(imageFile) : imageInitialFile"
                      />
                    </div>
                  </b-col>
                  <b-col cols="8">
                    <b-form-group
                      label="Foto profil"
                      label-cols-md="12"
                    >
                      <validation-provider
                        #default="{ errors }"
                        name="Foto profil"
                      >
                        <b-form-file
                          v-model="imageFile"
                          :state="errors.length > 0 ? false:null"
                          :placeholder="imageInitialFile ?
                            imageInitialFile.split('/').pop()
                            : `Pilih atau drop file disini...`"
                          drop-placeholder="Drop file disini..."
                          accept="image/*"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-form-row>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Nama Lengkap"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama Lengkap"
                    rules="required|min:3"
                  >
                    <b-form-input
                      v-model="name"
                      :state="errors.length > 0 || submitErrors.name ? false:null"
                      :formatter="capitalize"
                    />
                    <small class="text-danger">{{ errors[0] || submitErrors.name }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Skill"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Skill"
                    rules="required"
                  >
                    <v-select
                      v-model="skillId"
                      label="title"
                      :options="skillItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="No HP"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="No HP"
                    rules="required"
                  >
                    <cleave
                      v-model="phone"
                      class="form-control"
                      :options="options.phone"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Email"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <b-form-input
                      v-model="email"
                      type="email"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Provinsi"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Provinsi"
                    rules="required"
                  >
                    <v-select
                      v-model="provinceId"
                      label="name"
                      :reduce="option => option.id"
                      :options="provinceItems"
                      :state="errors.length > 0 || submitErrors.province_id ? false:null"
                      placeholder="Ketik untuk mencari..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Kota"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Kota"
                    rules="required"
                  >
                    <v-select
                      v-model="regencyId"
                      label="name"
                      :reduce="option => option.id"
                      :options="regencyItems"
                      :disabled="!provinceId"
                      :state="errors.length > 0 || submitErrors.regency_id ? false:null"
                      placeholder="Ketik untuk mencari..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Kecamatan"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Kecamatan"
                    rules="required"
                  >
                    <v-select
                      v-model="districtId"
                      label="name"
                      :reduce="option => option.id"
                      :options="districtItems"
                      :disabled="!regencyId"
                      :state="errors.length > 0 || submitErrors.district_id ? false:null"
                      placeholder="Ketik untuk mencari..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Detail Alamat"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Detail Alamat"
                    rules="required"
                  >
                    <b-form-textarea
                      v-model="address"
                      rows="3"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Nama Bank"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama Bank"
                    rules="required"
                  >
                    <b-form-input
                      v-model="bankName"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="No Rekening"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="No Rekening"
                    rules="required"
                  >
                    <b-form-input
                      v-model="bankAccountNumber"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger d-block">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Nama Pemilik Bank"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama Pemilik Bank"
                    rules="required|min:3"
                  >
                    <b-form-input
                      v-model="bankAccountName"
                      :formatter="capitalize"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="NPWP"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="NPWP"
                  >
                    <cleave
                      v-model="npwp"
                      class="form-control"
                      :options="options.npwp"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="CV"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="CV"
                      >
                        <b-form-file
                          v-model="cvFile"
                          :state="errors.length > 0 ? false:null"
                          :placeholder="cvInitialFile ?
                            cvInitialFile.split('/').pop()
                            : `Pilih atau drop file disini...`"
                          drop-placeholder="Drop file disini..."
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-col>
                    <b-col
                      v-if="cvInitialFile"
                      cols="auto"
                    >
                      <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        v-b-tooltip.hover.top="'Lihat File'"
                        variant="gradient-secondary"
                        class="btn-icon"
                        target="_blank"
                        :href="cvFile ? fileUrl(cvFile) : cvInitialFile"
                      >
                        <feather-icon icon="FileIcon" />
                      </b-button>
                    </b-col>
                  </b-form-row>
                </b-form-group>
              </b-col>
              <b-col
                md="12"
                class="mt-2"
              >
                <b-button
                  :variant="editMode ? 'warning' : 'primary'"
                  type="submit"
                  class="mr-50"
                  :disabled="loadingSubmit"
                  @click.prevent="submit"
                >
                  <b-spinner
                    v-if="loadingSubmit"
                    small
                  />
                  Submit
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-col>
    </b-row>
  </b-card-actions>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BButton,
  BSpinner,
  BFormFile,
  BFormRow,
  VBTooltip,
  BFormTextarea,
  BAvatar,
} from 'bootstrap-vue'
import { required, min } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import vSelect from 'vue-select'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.id'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  components: {
    BCardActions,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormFile,
    BFormGroup,
    BFormRow,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    vSelect,
    Cleave,
    BFormTextarea,
    BAvatar,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,

      name: '',
      skillId: '',
      phone: '',
      email: '',

      provinceId: '',
      provinceItems: [],

      regencyId: '',
      regencyItems: [],

      districtId: '',
      districtItems: [],
      address: '',

      imageFile: null,
      imageInitialFile: null,

      cityId: '',
      bankName: '',
      bankAccountNumber: '',
      bankAccountName: '',
      npwp: '',
      cvFile: null,
      cvInitialFile: null,
      skillItems: [
        { title: 'Advertiser', value: 'Advertiser' },
        { title: 'Customer Service', value: 'Customer Service' },
        { title: 'Admin Marketplace', value: 'Admin Marketplace' },
      ],
      cityItems: [],

      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'ID',
        },
        npwp: {
          delimiters: ['.', '.', '.', '-', '.'],
          blocks: [2, 3, 3, 1, 3, 3],
        },
      },
    }
  },
  computed: {
    method() {
      return this.editMode ? 'put' : 'post'
    },
    editMode() {
      return this.id !== undefined
    },
    successText() {
      return this.editMode ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
    endpoint() {
      const endpoint = '/lms/trainer'
      return this.editMode ? `${endpoint}/update/${this.id}` : `${endpoint}/store`
    },
  },
  async mounted() {
    if (this.editMode) {
      // console.log(this.method)
      this.loadProvincies()
      this.loadRegencies()
      this.loadDistricts()
      this.loadForm()
      return
    }
    // this.$http.get('/lms/trainer').then(response => {
    //   const { data } = response.data
    //   console.log(data)
    // })

    this.loadProvincies()
    this.loadRegencies()
    this.loadDistricts()
    // console.log(this.method)
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('_method', this.method)
          formData.append('name', this.name)
          formData.append('skill_id', 1)
          formData.append('phone', this.phone)
          formData.append('email', this.email)
          formData.append('bank_name', this.bankName)
          formData.append('bank_account_number', this.bankAccountNumber)
          formData.append('bank_account_name', this.bankAccountName)
          formData.append('province_id', this.provinceId.id)
          formData.append('regency_id', this.regencyId.id)
          formData.append('district_id', this.districtId.id)
          formData.append('address', this.address)
          formData.append('npwp', this.npwp)

          if (this.cvFile) formData.append('cv', this.cvFile)
          // console.log(this.provinceId)
          // console.log(this.regencyId)
          // console.log(this.districtId)

          // const formDatas = {
          //   name: this.name,
          //   skill_id: this.skillId,
          //   cv: this.cvFile,
          //   phone: this.phone,
          //   email: this.email,
          //   bank_name: this.bankName,
          //   bank_account_number: this.bankAccountNumber,
          //   bank_account_name: this.bankAccountName,
          //   npwp: this.npwp,
          //   province_id: this.provinceId,
          //   regency_id: this.regencyId,
          //   address: this.address,
          // }

          // console.log(formDatas)

          this.$http.post(this.endpoint, formData)
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  text: this.successText,
                  variant: 'success',
                  attachment: 'CheckIcon',
                },
              }, { timeout: 2500 })
              this.$router.push({ name: this.$route.meta.navActiveLink })
            })
            .catch(error => {
              this.loadingSubmit = false

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
    loadForm() {
      this.$refs.formCard.showLoading = true

      return this.$http.get(`/lms/trainer/${this.id}`)
        .then(async response => {
          const { data } = response.data

          this.name = data[0].name
          this.skillId = data[0].skill_id
          this.phone = data[0].phone
          this.email = data[0].email
          this.bankName = data[0].bank_name
          this.bankAccountNumber = data[0].bank_account_number
          this.bankAccountName = data[0].bank_account_name
          this.npwp = data[0].npwp
          this.provinceId = data[0].province
          this.regencyId = data[0].regency
          this.districtId = data[0].district
          this.address = data[0].address

          if (data[0].cv) this.cvInitialFile = data[0].cv
        })
        .finally(() => {
          this.$refs.formCard.showLoading = false
        })
    },
    loadProvincies() {
      return this.$http.get('/region/province', {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.provinceItems = data
        })
    },
    loadRegencies() {
      return this.$http.get('/region/regency', {
        params: {
          province_id: this.provinceId,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.regencyItems = data
        })
    },
    loadDistricts() {
      return this.$http.get('/region/district', {
        params: {
          regency_id: this.regencyId,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.districtItems = data
        })
    },
    async getFile(url) {
      const response = await fetch(url)
      const blob = await response.blob()
      const filename = url.split('/').pop()

      return new File([blob], filename, { type: blob.type })
    },
    capitalize(value) {
      return value.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    fileUrl: file => URL.createObjectURL(file),
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
