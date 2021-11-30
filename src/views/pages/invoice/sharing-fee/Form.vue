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
                <b-form-group
                  label="Pendapatan Minimum"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Pendapatan Minimum"
                    rules="required|integer"
                  >
                    <money
                      v-model="minimum_income"
                      v-bind="money"
                      class="form-control"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
                    />
                    <small class="text-danger">{{
                      errors[0] || submitErrors.name
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Jenis Sharing Fee"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Jenis Sharing Fee"
                    rules="required"
                  >
                    <v-select
                      v-model="sharing_fee_type"
                      label="label"
                      :options="sharing_fee_type_option"
                      :reduce="option => option.value"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Nilai Sharing Fee"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nilai Sharing Fee"
                    :rules="`required|integer${
                      sharing_fee_type === 'percentage' ? '|max_value:100' : ''
                    }`"
                  >
                    <money
                      v-if="sharing_fee_type === 'rp'"
                      v-model="sharing_fee_value"
                      v-bind="money"
                      class="form-control"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
                    />
                    <b-form-input
                      v-else
                      v-model="sharing_fee_value"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
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
                    name="Nilai Maksimal Sharing Fee"
                    rules="required|integer"
                  >
                    <money
                      v-model="max_nominal_sharing_fee"
                      v-bind="money"
                      class="form-control"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <hr>
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
  VBTooltip,
} from 'bootstrap-vue'
import { required, integer, maxValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import { Money } from 'v-money'

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
    Money,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      integer,
      maxValue,

      sharing_fee_type_option: [
        {
          value: 'percentage',
          label: 'Presentase %',
        },
        {
          value: 'rp',
          label: 'Nominal Rp',
        },
      ],
      minimum_income: '',
      sharing_fee_type: '',
      sharing_fee_value: '',
      max_nominal_sharing_fee: '',
      money: {
        thousands: '.',
        prefix: 'Rp ',
        precision: 0,
        masked: false,
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
        ? `${this.$route.meta.name.singular} berhasil diperbaharui`
        : `${this.$route.meta.name.singular} berhasil ditambah`
    },
    endpoint() {
      const endpoint = '/talentSharingFee'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  async mounted() {
    if (this.editMode) await this.loadForm()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            minimum_income: this.minimum_income,
            sharing_fee_type: this.sharing_fee_type,
            sharing_fee_value: this.sharing_fee_value,
            max_nominal_sharing_fee: this.max_nominal_sharing_fee,
          }

          this.$http
            .post(this.endpoint, data)
            .then(response => {
              if (!response.data.status) {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Failed',
                      text: response.data.message,
                      variant: 'danger',
                      attachment: 'AlertTriangleIcon',
                    },
                  },
                  { timeout: 2500 },
                )
              } else {
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
              }
            })
            .catch(error => {
              if (!error.response?.data.status) {
                this.$toast(
                  {
                    component: ToastificationContent,
                    props: {
                      title: 'Failed',
                      text: error.response.data.message,
                      variant: 'danger',
                      attachment: 'AlertTriangleIcon',
                    },
                  },
                  { timeout: 2500 },
                )
              }
              if (error.response.status === 422) {
                this.submitErrors = Object.fromEntries(
                  Object.entries(
                    error.response.data.data,
                  ).map(([key, value]) => [key, value[0]]),
                )
              }
            })
            .finally(() => {
              this.loadingSubmit = false
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
          this.minimum_income = data.minimum_income
          this.sharing_fee_type = data.sharing_fee_type
          this.sharing_fee_value = data.sharing_fee_value
          this.max_nominal_sharing_fee = data.max_nominal_sharing_fee
        })
        .catch(error => {
          if (!error.response?.data.status) {
            this.$toast(
              {
                component: ToastificationContent,
                props: {
                  title: 'Failed',
                  text: error.response.data.message,
                  variant: 'danger',
                  attachment: 'AlertTriangleIcon',
                },
              },
              { timeout: 2500 },
            )
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
