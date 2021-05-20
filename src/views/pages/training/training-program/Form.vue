<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
    class="p-2"
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
                      :state="errors.length > 0 ? false:null"
                      disabled
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Training Center"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Training Center"
                    rules="required"
                  >
                    <v-select
                      v-model="trainingCenterId"
                      label="name"
                      :reduce="option => option.id"
                      :options="trainingCenterItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                      @search="onSearchTrainingCenter"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Batch"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Batch"
                  >
                    <b-form-input
                      v-model="batch"
                      disabled
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Kuota"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Kuota"
                    rules="required|min_value:1"
                  >
                    <b-form-input
                      v-model="quota"
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
                      label="name"
                      :reduce="option => option.id"
                      :options="skillItems"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Ketik untuk mencari..."
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Kurikulum"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Kurikulum"
                    rules="required"
                  >
                    <v-select
                      v-model="curriculumId"
                      label="name"
                      :reduce="option => option.id"
                      :options="curriculumItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                      placeholder="Ketik untuk mencari..."
                      :disabled="!skillId"
                      @search="onSearchCurriculum"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Posisi"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Posisi"
                    rules="required"
                  >
                    <v-select
                      v-model="positionId"
                      label="position_name"
                      :reduce="option => option.id"
                      :options="positionItems"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Ketik untuk mencari..."
                    >
                      <li
                        v-if="hasMorePosition"
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
                <hr>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Level"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Level"
                    rules="required"
                  >
                    <b-form-radio-group
                      v-model="level"
                      class="mt-50"
                      :options="levelOptions"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Instruktur"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Instruktur"
                    rules="required"
                  >
                    <v-select
                      v-model="instructorId"
                      label="name"
                      :reduce="option => option.id"
                      :options="instructorItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                      @search="onSearchInstructor"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Tanggal"
                  label-cols-md="4"
                >
                  <flat-pickr
                    v-model="date"
                    class="form-control"
                    :config="{ mode: 'range', altInput: true, altFormat: 'j/n/Y', dateFormat: 'Y-m-d',}"
                  />
                  <small class="text-danger">{{ submitErrors.start_date || submitErrors.end_date }}</small>
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
  </b-overlay>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BSpinner, BFormRadioGroup, BOverlay,
} from 'bootstrap-vue'
import { required, min } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BFormRadioGroup,
    BOverlay,
    flatPickr,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,

      name: 'Auto',
      level: '',
      batch: 'Auto',
      quota: '',
      skillId: '',
      curriculumId: '',
      date: null,
      instructorId: '',
      positionId: '',
      hasMorePosition: false,
      positionItems: [],
      trainingCenterId: '',
      passingGrade: '',
      instructorItems: [],
      trainingCenterItems: [],
      skillItems: [],
      curriculumItems: [],

      levelOptions: [
        { text: 'Dasar', value: 'basic' },
        { text: 'Spesifik', value: 'specific' },
        { text: 'Pematangan', value: 'mature' },
      ],
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
      const endpoint = '/trainingProgram'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
    dates: {
      get() {
        if (!this.date) {
          return []
        }

        return this.date.split(' to ')
      },
      set(value) {
        this.date = value[0] === value[1] ? value[0] : value
      },
    },
    startDate() {
      return this.dates[0]
    },
    endDate() {
      return this.dates.length > 1 ? this.dates[1] : this.dates[0]
    },
  },
  watch: {
    skillId(_, oldValue) {
      this.curriculumId = oldValue ? '' : this.curriculumId
      this.loadCurriculums()
    },
  },
  async mounted() {
    this.loadPositions()
    this.loadSkills()

    if (this.editMode) await this.loadForm()

    if (!this.editMode || !this.trainingCenterItems.length) this.loadTrainingCenter()
    if (!this.editMode || !this.instructorItems.length) this.loadInstructor()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            training_center_id: this.trainingCenterId,
            instructure_id: this.instructorId,
            curriculum_id: this.curriculumId,
            position_id: this.positionId,
            skill_id: this.skillId,
            quota: this.quota,
            level: this.level,
            start_date: this.startDate,
            end_date: this.endDate,
          }

          this.$http.post(this.endpoint, data)
            .then(response => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  text: this.successText,
                  variant: 'success',
                  attachment: 'CheckIcon',
                },
              }, { timeout: 2500 })

              if (this.editMode) {
                this.$router.push({ name: this.$route.meta.navActiveLink })
                return
              }

              this.$router.push({
                name: 'training-programs-edit',
                params: { id: response.data.data.id },
                query: { tab: 'participant' },
              })
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
      this.loading = true

      return this.$http.get(this.endpoint)
        .then(async response => {
          const { data } = response.data

          this.name = data.name
          this.trainingCenterId = Number(data.training_center_id)
          this.instructorId = Number(data.instructure_id)
          this.level = data.level
          this.quota = data.quota
          this.batch = data.batch
          this.dates = [data.start_date, data.end_date]

          if (data.training_center) {
            this.trainingCenterItems = [{ id: data.training_center.id, name: data.training_center.name }]
            this.trainingCenterId = data.training_center.id
            this.loadTrainingCenter(data.training_center.name)
          }

          if (data.skill) {
            this.skillId = data.skill.id
          }

          if (data.curriculum) {
            this.curriculumItems = [{ id: data.curriculum.id, name: data.curriculum.name }]
            this.curriculumId = data.curriculum.id
            this.loadCurriculums(data.curriculum.name)
          }

          if (data.position) {
            this.positionId = data.position.id
          }

          if (data.instructure) {
            this.instructorItems = [{ id: data.instructure.id, name: data.instructure.name }]
            this.instructorId = data.instructure.id
            this.loadInstructor(data.instructure.name)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSearchTrainingCenter(search, loading) {
      if (search.length) {
        this.searchTrainingCenter(loading, search, this)
      }
    },
    searchTrainingCenter: _.debounce((loading, search, that) => {
      loading(true)
      that.loadTrainingCenter(search).finally(() => loading(false))
    }, 500),
    loadTrainingCenter(search) {
      return this.$http.get('/trainingCenter', {
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
          this.trainingCenterItems = data
        })
    },
    onSearchInstructor(search, loading) {
      if (search.length) {
        this.searchInstructor(loading, search, this)
      }
    },
    searchInstructor: _.debounce((loading, search, that) => {
      loading(true)
      that.loadInstructor(search).finally(() => loading(false))
    }, 500),
    loadInstructor(search) {
      return this.$http.get('/instructure', {
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
          this.instructorItems = data
        })
    },
    loadSkills() {
      return this.$http.get('/skill', {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          this.skillItems = data
        })
    },
    onSearchCurriculum(search, loading) {
      if (search.length) {
        this.searchCurriculum(loading, search, this)
      }
    },
    searchCurriculum: _.debounce((loading, search, that) => {
      loading(true)
      that.loadCurriculums(search).finally(() => loading(false))
    }, 500),
    loadCurriculums(search) {
      return this.$http.get('/curriculum', {
        params: {
          keyword: search,
          skill_id: this.skillId,
          page: 1,
          limit: 5,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          this.curriculumItems = data
        })
    },
    loadPositions() {
      return this.$http.post('/position', {}, {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.positionItems = data
        })
    },
    async getFile(url) {
      const response = await fetch(url)
      const blob = await response.blob()
      const filename = url.split('/').pop()

      return new File([blob], filename, { type: blob.type })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
