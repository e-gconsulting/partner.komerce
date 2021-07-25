<template>
  <b-card-actions
    ref="formCard"
    :title="`Detail ${$route.meta.name.singular}`"
    no-actions
  >
    <!-- form -->
    <validation-observer ref="formRules">
      <b-form>
        <b-row>
          <b-col md="6">
            <b-col md="12">
              <b-form-group label="Status" label-cols-md="4">
                <validation-provider
                  #default="{ errors }"
                  name="Status"
                  rules="required"
                >
                  <b-form-input
                    v-model="status"
                    :state="
                      errors.length > 0 || submitErrors.name ? false : null
                    "
                    type="text"
                    disabled
                  />
                  <small class="text-danger">{{
                    errors[0] || submitErrors.name
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="No. Invoice" label-cols-md="4">
                <validation-provider
                  #default="{ errors }"
                  name="No Invoice"
                  rules="required"
                >
                  <b-form-input
                    v-model="invoice_id"
                    :state="
                      errors.length > 0 || submitErrors.name ? false : null
                    "
                    type="text"
                    disabled
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Partner" label-cols-md="4">
                <validation-provider
                  #default="{ errors }"
                  name="Partner"
                  rules="required"
                >
                  <v-select
                    v-model="partner"
                    label="full_name"
                    :options="partnerItems"
                    placeholder="Ketik untuk mencari..."
                    @search="onSearchPartner"
                  >
                    <li
                      v-if="hasMorePartner"
                      slot="list-footer"
                      class="vs__dropdown-option vs__dropdown-option--disabled"
                    >
                      <feather-icon icon="MoreHorizontalIcon" size="16" />
                    </li>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Judul Invoice" label-cols-md="4">
                <validation-provider
                  #default="{ errors }"
                  name="Judul Invoice"
                  rules="required"
                >
                  <b-form-input
                    v-model="title"
                    :state="
                      errors.length > 0 || submitErrors.name ? false : null
                    "
                    type="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Tanggal" label-cols-md="4">
                <validation-provider
                  #default="{ errors }"
                  name="Tanggal"
                  rules="required"
                >
                  <flat-pickr
                    v-model="invoice_period"
                    class="form-control"
                    :config="{
                      altInput: true,
                      altFormat: 'j/n/Y',
                      dateFormat: 'Y-m-d',
                    }"
                  />
                  <small class="text-danger">{{
                    errors[0] || submitErrors.name
                  }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2">
            <b>Data Tagihan</b>
          </b-col>
          <b-col md="2">
            <b>Nama Talent</b>
          </b-col>
          <b-col md="2">
            <b>Tanggal Assign</b>
          </b-col>
          <b-col md="2">
            <b>Nominal</b>
          </b-col>
          <b-col md="2" />
        </b-row>
        <b-row v-for="item in [1, 2, 3]" :key="item">
          <b-col md="2" offset-md="2">
            <p class="mt-1">Alifah Nuraeni</p>
          </b-col>
          <b-col md="2">
            <p class="mt-1">01 Maret 2020</p>
          </b-col>
          <b-col md="2">
            <p class="mt-1">Rp. 300.000</p>
          </b-col>
          <b-col md="2">
            <b-row>
              <b-button variant="outline-warning" type="button" class="mr-1">
                <feather-icon icon="Edit2Icon" size="18" />
              </b-button>
              <b-button variant="outline-danger" type="button">
                <feather-icon icon="Trash2Icon" size="18" />
              </b-button>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="8" offset-md="2" class="mt-1">
            <h3>Total Tagihan</h3>
            <b class="text-danger">Rp. 3.300.000</b>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mt-2">
            <hr />
            <b-button
              variant="outline-danger"
              type="button"
              class="mr-50"
              tag="router-link"
              :to="{ name: 'invoice-admin' }"
            >
              <b-spinner v-if="loadingSubmit" small />
              Cancel
            </b-button>
            <b-button
              variant="success"
              type="submit"
              class="mr-50"
              :disabled="loadingSubmit"
              @click.prevent="submit"
            >
              <b-spinner v-if="loadingSubmit" small />
              Publish
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
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
import Ripple from 'vue-ripple-directive'
import flatPickr from 'vue-flatpickr-component'
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
    flatPickr,
    vSelect,
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

      // new states
      status: 'draft',
      invoice_id: 0,
      title: '',
      invoice_period: '',
      partnerItems: [],
      hasMorePartner: false,
      partner: '',

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
    // if (this.editMode) await this.loadForm()
    // if (!this.editMode || !this.staffItems.length) this.loadStaffs()
    this.loadPartners()
  },
  methods: {
    onSearchPartner(search, loading) {
      if (search.length) {
        this.searchPartner(loading, search, this)
      }
    },
    searchPartner: _.debounce((loading, search, that) => {
      loading(true)
      that.loadPartners(search).finally(() => loading(false))
    }, 500),
    loadPartners(search) {
      return this.$http
        .get('/user/partner/pagination', {
          params: {
            name: search,
            page: 1,
            limit: 5,
            sort: 'name',
            direction: 'asc',
            account_status: 'active',
          },
        })
        .then(async response => {
          const { data } = response.data.data
          this.partnerItems = data
          this.hasMorePartner = response.data.data.total > this.partnerItems.length
        })
    },
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
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
