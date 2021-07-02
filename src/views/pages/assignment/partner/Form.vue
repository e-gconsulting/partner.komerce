<template>
  <b-card-actions
    ref="formCard"
    :title="`${editMode ? 'Ubah' : 'Tambah'} ${$route.meta.name.singular}`"
    no-actions
  >
    <validation-observer ref="formRules">
      <b-row>
        <b-col md="6">
          <!-- form -->
          <b-form>
            <b-row>
              <b-col md="12">
                <b-form-group label="No SK" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="No SK"
                    rules="required|min:3"
                  >
                    <b-form-input
                      v-model="sk_number"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
                      type="text"
                    />
                    <small class="text-danger">{{
                      errors[0] || submitErrors.name
                    }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Dokumen" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Dokumen"
                    rules="required|url"
                  >
                    <b-form-input
                      v-model="document_url"
                      :state="
                        errors.length > 0 || submitErrors.name ? false : null
                      "
                      type="url"
                    />
                    <small class="text-danger">{{
                      errors[0] || submitErrors.name
                    }}</small>
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
                      v-model="release_date"
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
                  <br />
                  <small class="text-default">
                    * Tanggal Talent mulai di hire oleh Partner
                  </small>
                </b-form-group>
                <hr />
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" class="mt-2">
          <b-row>
            <b-col md="1">
              <b>List Talent</b>
            </b-col>
            <b-col md="2">
              <b>Nama</b>
            </b-col>
            <b-col md="2">
              <b>Partner</b>
            </b-col>
            <b-col md="2">
              <b>Team Lead</b>
            </b-col>
            <b-col md="2">
              <b>Device</b>
            </b-col>
            <b-col md="2">
              <b>Kantor</b>
            </b-col>
            <b-col md="1">
              <b>Aksi</b>
            </b-col>
          </b-row>
          <b-row
            class="mt-1"
            v-for="(assignment, index) in assignments"
            :key="index"
          >
            <b-col md="2" offset-md="1">
              <validation-provider
                #default="{ errors }"
                name="Talent"
                rules="required"
              >
                <v-select
                  v-model="assignment.talent_id"
                  label="full_name"
                  :reduce="option => option.id"
                  :options="talentItems"
                  placeholder="Ketik untuk mencari..."
                  @search="onSearchTalent"
                >
                  <li
                    v-if="hasMoreTalent"
                    slot="list-footer"
                    class="vs__dropdown-option vs__dropdown-option--disabled"
                  >
                    <feather-icon icon="MoreHorizontalIcon" size="16" />
                  </li>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col md="2">
              <validation-provider
                #default="{ errors }"
                name="Partner"
                rules="required"
              >
                <v-select
                  v-model="assignment.partner_id"
                  label="full_name"
                  :reduce="option => option.partner_detail.id"
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
            </b-col>
            <b-col md="2">
              <validation-provider
                #default="{ errors }"
                name="Team Lead"
                rules="required"
              >
                <v-select
                  v-model="assignment.staff_id"
                  label="full_name"
                  :reduce="option => option.id"
                  :options="teamLeadItems"
                  placeholder="Ketik untuk mencari..."
                  @search="onSearchTeamLead"
                >
                  <li
                    v-if="hasMoreTeamLead"
                    slot="list-footer"
                    class="vs__dropdown-option vs__dropdown-option--disabled"
                  >
                    <feather-icon icon="MoreHorizontalIcon" size="16" />
                  </li>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col md="2">
              <validation-provider
                #default="{ errors }"
                name="Device"
                rules="required"
              >
                <v-select
                  v-model="assignment.device_id"
                  label="brancd"
                  :reduce="option => option.id"
                  :options="deviceItems"
                  placeholder="Ketik untuk mencari..."
                  @search="onSearchDevice"
                  :disabled="!assignment.partner_id"
                >
                  <li
                    v-if="hasMoreDevice"
                    slot="list-footer"
                    class="vs__dropdown-option vs__dropdown-option--disabled"
                  >
                    <feather-icon icon="MoreHorizontalIcon" size="16" />
                  </li>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col md="2">
              <validation-provider
                #default="{ errors }"
                name="Kantor"
                rules="required"
              >
                <v-select
                  v-model="assignment.office_id"
                  label="office_name"
                  :reduce="option => option.id"
                  :options="officeItems"
                  placeholder="Ketik untuk mencari..."
                  @search="onSearchOffice"
                >
                  <li
                    v-if="hasMoreOffice"
                    slot="list-footer"
                    class="vs__dropdown-option vs__dropdown-option--disabled"
                  >
                    <feather-icon icon="MoreHorizontalIcon" size="16" />
                  </li>
                </v-select>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-col>
            <b-col md="1">
              <b-button
                variant="outline-danger"
                type="button"
                @click="removeAssignment(index)"
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
                @click="addAssignment"
              >
                Tambah Kolom
              </b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="12">
          <p>
            <small>
              * Assign akan mengganti status Talent dari Non Job menjadi Hired
            </small>
          </p>
          <b-button
            :variant="editMode ? 'warning' : 'primary'"
            type="submit"
            class="mr-50"
            :disabled="loadingSubmit"
            @click.prevent="submit"
          >
            <b-spinner v-if="loadingSubmit" small />
            Assign
          </b-button>
        </b-col>
      </b-row>
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
import { required, integer, min } from '@validations'
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
      submitErrors: '',

      required,
      min,
      integer,

      hasMoreTalent: false,
      talentItems: [],
      hasMorePartner: false,
      partnerItems: [],
      hasMoreTeamLead: false,
      teamLeadItems: [],
      hasMoreDevice: false,
      deviceItems: [],
      hasMoreOffice: false,
      officeItems: [],

      sk_number: '',
      release_date: null,
      document_type: 'partner assignment',
      document_url: '',
      assignments: [],
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
      const endpoint = '/skDocument/skPartnerAssignment'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  async mounted() {
    this.loadTalents()
    this.loadPartners()
    this.loadTeamLeads()
    this.loadOffices()
    this.loadDevices()

    // if (this.editMode) await this.loadForm()
  },
  methods: {
    onSearchTalent(search, loading) {
      if (search.length) {
        this.searchTalent(loading, search, this)
      }
    },
    searchTalent: _.debounce((loading, search, that) => {
      loading(true)
      that.loadTalents(search).finally(() => loading(false))
    }, 500),
    loadTalents(search) {
      return this.$http
        .get(
          '/talent',
          {},
          {
            params: {
              name: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
              status: 'selected,hired,non job',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.talentItems = Object.keys(data).map(key => data[key])
          this.hasMoreTalent = response.data.data.total > this.talentItems.length
        })
    },
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
        .get(
          '/user/partner/pagination',
          {},
          {
            params: {
              name: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
              account_status: 'active',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.partnerItems = Object.keys(data).map(key => data[key])
          this.hasMorePartner = response.data.data.total > this.partnerItems.length
        })
    },
    onSearchTeamLead(search, loading) {
      if (search.length) {
        this.searchTeamLead(loading, search, this)
      }
    },
    searchTeamLead: _.debounce((loading, search, that) => {
      loading(true)
      that.loadTeamLeads(search).finally(() => loading(false))
    }, 500),
    loadTeamLeads(search) {
      return this.$http
        .get(
          '/leader',
          {},
          {
            params: {
              keyword: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
              account_status: 'active',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.teamLeadItems = Object.keys(data).map(key => data[key])
          this.hasMoreTeamLead = response.data.data.total > this.teamLeadItems.length
        })
    },
    onSearchDevice(search, loading) {
      if (search.length) {
        this.searchDevice(loading, search, this)
      }
    },
    searchDevice: _.debounce((loading, search, that) => {
      loading(true)
      that.loadDevices(search).finally(() => loading(false))
    }, 500),
    loadDevices(search) {
      return this.$http
        .get(
          '/device/pagination',
          {},
          {
            params: {
              brancd: search,
              // no_partner: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.deviceItems = Object.keys(data).map(key => data[key])
          this.hasMoreDevice = response.data.data.total > this.deviceItems.length
        })
    },
    onSearchOffice(search, loading) {
      if (search.length) {
        this.searchOffice(loading, search, this)
      }
    },
    searchOffice: _.debounce((loading, search, that) => {
      loading(true)
      that.loadOffices(search).finally(() => loading(false))
    }, 500),
    loadOffices(search) {
      return this.$http
        .post(
          '/office/pagination',
          {},
          {
            params: {
              office_name: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.officeItems = Object.keys(data).map(key => data[key])
          this.hasMoreOffice = response.data.data.total > this.officeItems.length
        })
    },
    addAssignment() {
      this.assignments.push({
        talent_id: '',
        partner_id: '',
        office_id: '',
        device_id: '',
        staff_id: '',
      })
    },
    removeAssignment(index) {
      this.assignments.splice(index, 1)
    },
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            sk_number: this.sk_number,
            release_date: this.release_date,
            document_type: this.document_type,
            document_url: this.document_url,
            assignments: this.assignments,
          }

          // if (this.editMode) Object.assign(data, { id: this.id })

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
