<template>
  <b-card-actions
    ref="formCard"
    title="Add Module"
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
                  label="Judul"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Judul"
                    rules="required"
                  >
                    <b-form-input
                      v-model="moduleTitle"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Subjudul"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Subjudul"
                    rules="required"
                  >
                    <b-form-input
                      v-model="moduleSubtitle"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Thumbnail"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="Thumbnail"
                        rules="required"
                      >
                        <b-form-file
                          v-model="thumbnail"
                          :state="errors.length > 0 ? false:null"
                          :placeholder="iconInitialFile ?
                            iconInitialFile.split('/').pop()
                            : `Pilih atau drop file disini...`"
                          drop-placeholder="Drop file disini..."
                          accept="image/*"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-col>
                    <b-col
                      v-if="iconFile || iconInitialFile"
                      cols="auto"
                    >
                      <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        v-b-tooltip.hover.top="'Lihat File'"
                        variant="gradient-secondary"
                        class="btn-icon"
                        target="_blank"
                        :href="iconFile ? fileUrl(iconFile) : iconInitialFile"
                      >
                        <feather-icon icon="FileIcon" />
                      </b-button>
                    </b-col>
                  </b-form-row>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Status Modul"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Status Modul"
                    rules="required"
                  >
                    <v-select
                      v-model="statusModule"
                      :options="statusKelasOptions"
                      label="title"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Trainer"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Trainer"
                    rules="required"
                  >
                    <v-select
                      v-model="trainerId"
                      label="name"
                      :reduce="option => option.id"
                      :options="trainerItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
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
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BButton,
  BSpinner,
  BFormFile,
  VBTooltip,
  BFormRow,
  // BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, min } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
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
    BFormRow,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    // BFormTextarea,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.class_id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,

      moduleTitle: '',
      moduleSubtitle: '',
      thumbnail: [],
      statusModule: '',

      trainerId: '',
      trainerItems: [],

      name: '',
      iconFile: null,
      iconInitialFile: null,

      statusKelasOptions: [
        { title: 'Draft', value: 'draft' },
        { title: 'Publish', value: 'publish' },
      ],
    }
  },
  computed: {
    successText() {
      return this.editMode ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
  },
  mounted() {
    if (this.editMode) this.loadForm()
    console.log(this.moduleTitle)
    console.log(this.moduleSubtitle)
    console.log(this.thumbnail)
    console.log(this.statusModule)
    console.log(this.trainerName)
    console.log(this.id)
    this.loadTrainer()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('module_title', this.moduleTitle)
          formData.append('module_subtitle', this.moduleSubtitle)
          formData.append('module_thumbnail', this.thumbnail)
          formData.append('module_status', this.statusModule.value)
          formData.append('module_trainer', this.trainerId)
          formData.append('module_class_id', this.id)

          this.$http.post('/lms/module/store', formData)
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  text: this.successText,
                  variant: 'success',
                  icon: 'CheckIcon',
                },
              }, { timeout: 2500 })
              this.$router.push({ name: this.$route.meta.name })
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
    loadTrainer() {
      return this.$http.get('/lms/trainer')
        .then(async response => {
          const { data } = response.data
          this.trainerItems = data
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
