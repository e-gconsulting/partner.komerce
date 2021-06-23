<template>
  <b-card-actions
    ref="formCard"
    :title="`${editMode ? 'Ubah' : 'Tambah'} ${$route.meta.name.singular}`"
    no-actions
  >
    <b-row>
      <b-col md="6">
        <!-- form -->
        <validation-observer ref="formRules">
          <b-form>
            <b-row>
              <b-col md="12">
                <b-form-group label="Pendapatan Minimum" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="minimum_income"
                    rules="required|min:3"
                  >
                    <b-form-input
                      v-model="name"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
                      type="number"
                    />
                    <small class="text-danger">{{
                      errors[0] || submitErrors.name
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Jenis Sharing Fee" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="PIC"
                    rules="required"
                  >
                    <v-select
                      v-model="staffId"
                      label="full_name"
                      :reduce="option => option.id"
                      :options="['Presentase %', 'Nominal Rp']"
                      :filterable="false"
                      placeholder="Ketik untuk mencari..."
                    >
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Nilai Sharing Fee" label-cols-md="4">
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
                  label="Nilai Maksimal Sharing Fee"
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
                <hr />
              </b-col>
              <b-col md="12" class="mt-2">
                <b-button
                  :variant="editMode ? 'warning' : 'primary'"
                  type="submit"
                  class="mr-50"
                  :disabled="loadingSubmit"
                  @click.prevent="submit"
                >
                  <b-spinner v-if="loadingSubmit" small />
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
  VBTooltip,
} from 'bootstrap-vue'
import { required, min, minValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.id'

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
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    vSelect,
    Cleave,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      loadingAddress: false,
      submitErrors: '',

      required,
      min,
      minValue,

      name: '',
      staffId: '',
      staffItems: [],
      hasMoreStaff: false,
      phone: '',

      options: {
        phone: {
          phone: true,
          phoneRegionCode: 'ID',
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
      return this.editMode
        ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
    endpoint() {
      const endpoint = '/operationalOffice'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  watch: {
    staffId(newValue) {
      this.phone = newValue
        ? this.staffItems.find(o => o.id === newValue).no_hp
        : ''
    },
  },
  async mounted() {
    this.sync()
    this.loadProvincies()

    if (this.editMode) await this.loadForm()

    if (!this.editMode || !this.staffItems.length) this.loadStaffs()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            name: this.name,
            staff_id: this.staffId,
            phone: this.phone,
            lat: this.latitude,
            lng: this.longitude,
            address: this.address,
            province_id: this.provinceId,
            regency_id: this.regencyId,
            district_id: this.districtId,
          }

          if (this.editMode) Object.assign(data, { id: this.id })

          this.$http
            .post(this.endpoint, data)
            .then(() => {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    text: this.successText,
                    variant: 'success',
                    attachment: 'CheckIcon',
                  },
                },
                { timeout: 2500 },
              )
              this.$router.push({ name: this.$route.meta.navActiveLink })
            })
            .catch(error => {
              this.loadingSubmit = false

              if (error.response.status === 422) {
                this.submitErrors = Object.fromEntries(
                  Object.entries(
                    error.response.data.data,
                  ).map(([key, value]) => [key, value[0]]),
                )
              }
            })
        }
      })
    },
    loadForm() {
      this.$refs.formCard.showLoading = true

      return this.$http
        .get(this.endpoint)
        .then(async response => {
          const { data } = response.data

          this.name = data.name
          this.address = data.address
          this.latitude = Number(data.lat)
          this.longitude = Number(data.lng)
          this.coordinateTemp.lat = this.latitude
          this.coordinateTemp.lng = this.longitude
          this.zoom = 16

          if (data.district) {
            this.provinceItems = [data.district.regency.province]
            this.provinceId = data.district.regency.province.id
            this.regencyItems = [data.district.regency]
            this.regencyId = data.district.regency.id
            this.districtItems = [data.district]
            this.districtId = data.district.id
          }

          if (data.staff) {
            data.staff.full_name = data.staff.user.full_name
            data.staff.no_hp = data.phone

            this.staffItems = [data.staff]
            this.staffId = Number(data.staff_id)
            this.loadStaffs(data.staff.full_name)
          }
        })
        .finally(() => {
          this.$refs.formCard.showLoading = false
        })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
