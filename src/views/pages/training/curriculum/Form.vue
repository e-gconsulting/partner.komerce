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
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
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
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Level"
                  label-cols-md="4"
                  rules="required"
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
                  label="Passing Grade"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Passing Grade"
                    rules="required|between:0,100"
                  >
                    <b-form-input
                      v-model="passingGrade"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger d-block">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Attachment"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="Attachment"
                      >
                        <b-form-file
                          v-model="attachmentFile"
                          :state="errors.length > 0 ? false:null"
                          :placeholder="attachmentInitialFile ?
                            attachmentInitialFile.split('/').pop()
                            : `Pilih atau drop file disini...`"
                          drop-placeholder="Drop file disini..."
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-col>
                    <b-col
                      v-if="attachmentFile || attachmentInitialFile"
                      cols="auto"
                    >
                      <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        v-b-tooltip.hover.top="'Lihat File'"
                        variant="gradient-secondary"
                        class="btn-icon"
                        target="_blank"
                        :href="attachmentFile ? fileUrl(attachmentFile) : attachmentInitialFile"
                      >
                        <feather-icon icon="FileIcon" />
                      </b-button>
                    </b-col>
                  </b-form-row>
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
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BSpinner, BFormFile, BFormRadioGroup, BFormRow, VBTooltip,
} from 'bootstrap-vue'
import { required, min } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import vSelect from 'vue-select'
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
    BFormGroup,
    BFormRow,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BFormRadioGroup,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,

      name: '',
      level: '',
      skillId: '',
      passingGrade: '',
      attachmentFile: null,
      attachmentInitialFile: null,
      skillItems: [],

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
      const endpoint = '/curriculum'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  async mounted() {
    this.loadSkills()

    if (this.editMode) this.loadForm()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('_method', this.method)
          formData.append('name', this.name)
          formData.append('level', this.level)
          formData.append('skill_id', this.skillId)
          formData.append('passing_grade', this.passingGrade)

          if (this.attachmentFile) formData.append('attachment', this.attachmentFile)

          this.$http.post(this.endpoint, formData)
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
          this.skillId = Number(data.skill_id)
          this.level = data.level
          this.passingGrade = data.passing_grade

          if (data.attachment) this.attachmentInitialFile = data.attachment
        })
        .finally(() => {
          this.$refs.formCard.showLoading = false
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
    async getFile(url) {
      const response = await fetch(url)
      const blob = await response.blob()
      const filename = url.split('/').pop()

      return new File([blob], filename, { type: blob.type })
    },
    fileUrl: file => URL.createObjectURL(file),
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
