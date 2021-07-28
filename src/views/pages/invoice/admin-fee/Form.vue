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
                <b-form-group label="Posisi" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Posisi"
                    rules="required"
                  >
                    <v-select
                      v-model="position_id"
                      label="position_name"
                      :reduce="option => option.id"
                      :options="positionItems"
                      placeholder="Ketik untuk mencari..."
                      @search="onSearchPosition"
                    >
                      <li
                        v-if="hasMorePosition"
                        slot="list-footer"
                        class="
                          vs__dropdown-option vs__dropdown-option--disabled
                        "
                      >
                        <feather-icon icon="MoreHorizontalIcon" size="16" />
                      </li>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Deskripsi" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Deskripsi"
                    rules="required"
                  >
                    <b-form-textarea
                      v-model="description"
                      :state="
                        errors.length > 0 || submitErrors.description
                          ? false
                          : null
                      "
                    />
                    <small class="text-danger">{{
                      errors[0] || submitErrors.description
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Biaya Standar" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Biaya Standar"
                    rules="required|integer"
                  >
                    <b-form-input
                      v-model="admin_fee"
                      :state="
                        errors.length > 0 || submitErrors.admin_fee
                          ? false
                          : null
                      "
                      type="number"
                    />
                    <small class="text-danger">{{
                      errors[0] || submitErrors.admin_fee
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Jenis Sharing Fee" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Jenis Sharing Fee"
                    rules="required"
                  >
                    <v-select
                      v-model="admin_fee_discount_type"
                      :reduce="option => option.value"
                      label="label"
                      :options="sharing_fee_type_option"
                    >
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <hr />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="5">
                <b>Jumlah Talent Minimal</b>
              </b-col>
              <b-col md="5">
                <b>Biaya</b>
              </b-col>
            </b-row>
            <b-row
              class="mt-1"
              v-for="(
                talent_admin_fee_discount, index
              ) in talent_admin_fee_discounts"
              :key="`talent_admin_fee_discounts_${index}`"
            >
              <b-col md="5">
                <validation-provider
                  #default="{ errors }"
                  name="Jumlah Talent Minimal"
                  rules="required|integer"
                >
                  <b-form-input
                    v-model="talent_admin_fee_discount.minimum_total_talent"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col md="5">
                <validation-provider
                  #default="{ errors }"
                  name="Jumlah Talent Minimal"
                  rules="required|integer"
                >
                  <b-form-input
                    v-model="talent_admin_fee_discount.admin_fee_discount_value"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>
              <b-col md="2">
                <b-button
                  variant="outline-danger"
                  type="button"
                  @click="removeTalentAdminFeeDiscounts(index)"
                >
                  <feather-icon icon="Trash2Icon" size="18" />
                </b-button>
              </b-col>
              <b-col md="12">
                <hr />
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-right">
                <b-button
                  variant="outline-danger"
                  type="button"
                  @click="addTalentAdminFeeDiscounts"
                >
                  Tambah Kolom
                </b-button>
              </b-col>
            </b-row>
            <b-row>
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
  BFormTextarea,
} from 'bootstrap-vue'
import { required, integer } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

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
    BFormTextarea,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      integer,

      hasMorePosition: false,
      positionItems: [],
      position_id: '',
      description: '',
      admin_fee: '',
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
      admin_fee_discount_type: '',
      talent_admin_fee_discounts: [],
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
      const endpoint = '/talentAdminFee'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  async mounted() {
    this.loadPositions()
    if (this.editMode) await this.loadForm()
  },
  methods: {
    onSearchPosition(search, loading) {
      if (search.length) {
        this.searchPosition(loading, search, this)
      }
    },
    searchPosition: _.debounce((loading, search, that) => {
      loading(true)
      that.loadPositions(search).finally(() => loading(false))
    }, 500),
    loadPositions(search) {
      return this.$http
        .post(
          '/position/pagination',
          {},
          {
            params: {
              division_id: this.divisionId,
              position_name: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.positionItems = Object.keys(data).map(key => data[key])
          this.hasMorePosition = response.data.data.total > this.positionItems.length
        })
    },
    addTalentAdminFeeDiscounts() {
      this.talent_admin_fee_discounts.push({
        minimum_total_talent: '',
        admin_fee_discount_value: '',
      })
    },
    removeTalentAdminFeeDiscounts(index) {
      this.talent_admin_fee_discounts.splice(index, 1)
    },
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            position_id: this.position_id,
            description: this.description,
            admin_fee: this.admin_fee,
            admin_fee_discount_type: this.admin_fee_discount_type,
            talent_admin_fee_discounts: this.talent_admin_fee_discounts,
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

          this.position_id = data.position_id
          this.description = data.description
          this.admin_fee = data.admin_fee
          this.admin_fee_discount_type = data.admin_fee_discount_type
          this.talent_admin_fee_discounts = data.talent_admin_fee_discounts
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
