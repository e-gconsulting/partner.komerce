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
                  label="PIC"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="PIC"
                    rules="required"
                  >
                    <v-select
                      v-model="staffId"
                      label="full_name"
                      :reduce="option => option.id"
                      :options="staffItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                      placeholder="Ketik untuk mencari..."
                      @search="onSearchStaff"
                    >
                      <li
                        v-if="hasMoreStaff"
                        slot="list-footer"
                        class="vs__dropdown-option vs__dropdown-option--disabled"
                      >
                        <feather-icon
                          icon="MoreHorizontalIcon"
                          size="16"
                        />
                      </li>
                    </v-select>
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
                <hr>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Koordinat"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="Latitude"
                        rules="required"
                      >
                        <b-form-input
                          v-model="latitude"
                          type="number"
                          :state="errors.length > 0 || submitErrors.lat ? false:null"
                          placeholder="Latitude"
                        />
                        <small class="text-danger">{{ errors[0] || submitErrors.lat }}</small>
                      </validation-provider>
                    </b-col>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="Longitude"
                        rules="required"
                      >
                        <b-form-input
                          v-model="longitude"
                          type="number"
                          :state="errors.length > 0 || submitErrors.lng ? false:null"
                          placeholder="Longitude"
                        />
                        <small class="text-danger">{{ errors[0] || submitErrors.lng }}</small>
                      </validation-provider>
                    </b-col>
                    <b-col cols="auto">
                      <b-button
                        v-b-tooltip.hover="'Pilih Lokasi'"
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="warning"
                        class="btn-icon"
                        @click.prevent="setupModal"
                      >
                        <feather-icon
                          icon="MapPinIcon"
                        />
                      </b-button>
                    </b-col>
                  </b-form-row>
                </b-form-group>
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
                      :disabled="loadingAddress"
                      :state="errors.length > 0 || submitErrors.address ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] || submitErrors.address }}</small>
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
                    <small class="text-danger">{{ errors[0] || submitErrors.province_id }}</small>
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
                    <small class="text-danger">{{ errors[0] || submitErrors.regency_id }}</small>
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
    <b-modal
      id="form-modal"
      ref="formModal"
      title="Pilih Lokasi"
      centered
      size="lg"
      ok-title="Pilih Lokasi"
      ok-variant="primary"
      cancel-variant="light"
      @ok="selectLocation"
    >
      <b-row class="justify-content-end align-items-center mb-75">
        <b-col md>
          <span class="text-secondary mr-50">Latitude:</span>
          <span class="font-weight-bolder mr-1">{{ coordinateTemp.lat }}</span>
          <span class="text-secondary mr-50">Longitude:</span>
          <span class="font-weight-bolder">{{ coordinateTemp.lng }}</span>
        </b-col>
        <b-col md="4">
          <b-form-group class="mb-0">
            <b-input-group
              class="input-group-merge"
            >
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <gmap-autocomplete
                class="form-control"
                @place_changed="setPlace"
              />
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <gmap-map
        style="width: 100%; height: 400px;"
        :zoom="zoom"
        :center="coordinate || coordinateTemp"
        @idle="sync"
        @center_changed="updateCenter"
      />
    </b-modal>
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
  BFormTextarea,
  BFormRow,
  BInputGroup,
  BInputGroupPrepend,
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
    BInputGroupPrepend,
    BFormTextarea,
    BInputGroup,
    BFormGroup,
    BFormRow,
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
      latitude: '',
      longitude: '',
      address: '',
      provinceId: '',
      regencyId: '',
      districtId: '',
      provinceItems: [],
      regencyItems: [],
      districtItems: [],

      coordinateTemp: {
        lat: -6.17539239552917,
        lng: 106.82715279729372,
      },
      coordinate: null,
      place: null,
      zoom: 12,

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
      return this.editMode ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
    endpoint() {
      const endpoint = '/operationalOffice'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  watch: {
    staffId(newValue) {
      this.phone = newValue ? this.staffItems.find(o => o.id === newValue).no_hp : ''
    },
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
    this.sync()
    this.loadProvincies()

    if (this.editMode) await this.loadForm()

    if (!this.editMode || !this.staffItems.length) this.loadStaffs()
  },
  methods: {
    updateCenter(latLng) {
      this.place = ''
      this.coordinateTemp = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      }
    },
    sync() {
      this.coordinate = this.coordinateTemp
    },
    setPlace(place) {
      this.place = place
      this.coordinateTemp = {
        lat: this.place.geometry.location.lat(),
        lng: this.place.geometry.location.lng(),
      }

      this.sync()
      this.zoom = 16
    },
    selectLocation(event) {
      event.preventDefault()

      this.latitude = this.coordinate.lat
      this.longitude = this.coordinate.lng

      if (this.place) {
        const addressParts = this.place.formatted_address?.split(',')
        this.address = addressParts?.length > 0 ? addressParts[0] : this.address
      } else {
        this.loadAddress()
      }

      this.$nextTick(() => {
        this.$refs.formModal.toggle()
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
    loadAddress() {
      this.loadingAddress = true

      this.$geocoder.send({
        lat: this.latitude,
        lng: this.longitude,
      }, response => {
        this.loadingAddress = false

        const { results } = response
        if (!results.length) return

        const data = results[0]
        const addressParts = data.formatted_address?.split(',')
        this.address = addressParts?.length > 0 ? addressParts[0] : this.address
      })
    },
    setupModal() {
      this.$refs.formModal.toggle()
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
    onSearchStaff(search, loading) {
      if (search.length) {
        this.searchStaff(loading, search, this)
      }
    },
    searchStaff: _.debounce((loading, search, that) => {
      loading(true)
      that.loadStaffs(search).finally(() => loading(false))
    }, 500),
    loadStaffs(search) {
      return this.$http.get('/staff', {
        params: {
          keyword: search,
          page: 1,
          limit: 5,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          for (let i = 0; i < data.length; i += 1) {
            data[i].id = data[i].staff.id
          }
          this.hasMoreStaff = response.data.data.total > data.length
          this.staffItems = data
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
