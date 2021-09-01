<template>
  <b-card-actions
    ref="formCard"
    title="Edit Module"
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
                      :options="statusModuleOptions"
                      label="title"
                      :searchable="false"
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
                      :searchable="false"
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
                  variant="primary"
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
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.module_id,
      classId: this.$route.params.class_id,
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
      imageFile: null,
      imageInitialFile: null,

      statusModuleOptions: [
        { title: 'Draft', value: 'draft' },
        { title: 'Publish', value: 'publish' },
      ],
    }
  },
  computed: {
    successText() {
      return `Satu ${this.$route.meta.name} berhasil diperbaharui`
    },
  },
  mounted() {
    console.log(this.id)
    console.log(this.classId)
    console.log(this.moduleTitle)
    console.log(this.moduleSubtitle)
    console.log(this.thumbnail)
    console.log(this.statusModule)
    console.log(this.trainerId)
    this.$http.get('/lms/module/list/14').then(response => {
      const { data } = response
      console.log(data)
    })
    this.loadForm()
    this.loadTrainer()
    this.$http.get('/lms/trainer').then(response => {
      const { data } = response.data
      console.log(data)
    })
    console.log(this.trainerId)
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('_method', 'put')
          formData.append('module_title', this.moduleTitle)
          formData.append('module_subtitle', this.moduleSubtitle)
          if (this.imageFile) formData.append('module_thumbnail', this.imageFile)
          if (this.statusModule.value) formData.append('module_status', this.statusModule.value)
          formData.append('module_trainer', this.trainerId.id)
          formData.append('module_class_id', this.id)

          console.log(this.moduleTitle)
          console.log(this.moduleSubtitle)
          console.log(this.imageFile)
          console.log(this.statusModule)
          console.log(this.trainerId)

          this.$http.post(`/lms/module/update/${this.id}`, formData)
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
      return this.$http.get(`/lms/module/${this.id}`).then(response => {
        const { data } = response.data
        this.moduleTitle = data.module_title
        this.moduleSubtitle = data.module_subtitle
        if (data.module_thumbnail) this.imageInitialFile = data.module_thumbnail
        this.statusModule = data.module_status
        this.trainerId = data.module_trainer

        console.log(data)
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
