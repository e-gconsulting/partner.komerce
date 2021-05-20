<template>
  <b-card-actions
    ref="formCard"
    :title="`${editMode ? 'Ubah' : 'Tambah'} ${$route.meta.name.singular}`"
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
              <b-col md="12">
                <b-form-group
                  label="Nama"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nama"
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
                  label="Skills"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Skills"
                    rules="required"
                  >
                    <v-select
                      v-model="skillIds"
                      label="name"
                      :reduce="option => option.id"
                      :options="skillItems"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Ketik untuk mencari..."
                      multiple
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Capacity"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Capacity"
                    rules="required|min_value:1"
                  >
                    <b-form-input
                      v-model="capacity"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <hr>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Address"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Address"
                    rules="required|min:5"
                  >
                    <b-form-textarea
                      v-model="address"
                      :state="errors.length > 0 || submitErrors.address ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] || submitErrors.address }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Province"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Province"
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
                    <small class="text-danger">{{ errors[0] || submitErrors.province_id }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Regency"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Regency"
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
                    <small class="text-danger">{{ errors[0] || submitErrors.regency_id }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="District"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="District"
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
                    <small class="text-danger">{{ errors[0] || submitErrors.district_id }}</small>
                  </validation-provider>
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
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BSpinner, BFormTextarea,
} from 'bootstrap-vue'
import { required, min, minValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import vSelect from 'vue-select'

export default {
  components: {
    BCardActions,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormTextarea,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,
      minValue,

      name: '',
      skillIds: '',
      capacity: '',
      address: '',
      provinceId: '',
      regencyId: '',
      districtId: '',
      skillItems: [],
      provinceItems: [],
      regencyItems: [],
      districtItems: [],
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
      const endpoint = '/trainingCenter'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  watch: {
    provinceId(_, oldValue) {
      this.regencyId = oldValue ? '' : this.regencyId
      this.loadRegencies()
    },
    regencyId(_, oldValue) {
      this.districtId = oldValue ? '' : this.districtId
      this.loadDistricts()
    },
  },
  async mounted() {
    this.loadSkills()
    this.loadProvincies()

    if (this.editMode) this.loadForm()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            name: this.name,
            skills: this.skillIds,
            capacity: this.capacity,
            address: this.address,
            province_id: this.provinceId,
            regency_id: this.regencyId,
            district_id: this.districtId,
          }

          this.$http.post(this.endpoint, data)
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

      return this.$http.get(this.endpoint)
        .then(async response => {
          const { data } = response.data

          this.name = data.name
          this.skillIds = data.training_center_skills.map(value => Number(value.skill_id))
          this.capacity = data.capacity
          this.address = data.address

          if (data.district) {
            this.provinceItems = [data.district.regency.province]
            this.provinceId = data.district.regency.province.id
            this.regencyItems = [data.district.regency]
            this.regencyId = data.district.regency.id
            this.districtItems = [data.district]
            this.districtId = data.district.id
          }
        })
        .finally(() => {
          this.$refs.formCard.showLoading = false
        })
    },
    loadSkills(search) {
      return this.$http.get('/skill', {
        params: {
          keyword: search,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          this.skillItems = data
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
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
