<template>
  <b-card-actions
    ref="formCard"
    :title="`${editMode ? 'Edit' : 'Add'} ${$route.meta.name.singular}`"
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
                  label="Skill"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="class_skill"
                    rules="required"
                  >
                    <v-select
                      v-model="skill"
                      :options="skillOptions"
                      label="title"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Cover Kelas"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="class_img"
                      >
                        <b-form-file
                          v-model="iconFile"
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
                  </b-form-row>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Deskripsi Video"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="class_trailer_description"
                        rules="required"
                      >
                        <b-form-textarea
                          v-model="descriptionVideo"
                          placeholder="Textarea"
                          rows="3"
                          :state="errors.length > 0 ? false:null"
                        />
                      </validation-provider>
                    </b-col>
                  </b-form-row>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Video Pengantar"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="class_trailer_url"
                    rules="required"
                  >
                    <b-form-input
                      v-model="videoPengantar"
                      label="title"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Status Kelas"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="class_status"
                    rules="required"
                  >
                    <v-select
                      v-model="statusClass"
                      :options="statusKelasOptions"
                      label="title"
                      :state="errors.length > 0 ? false:null"
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
  BFormTextarea,
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
    BFormTextarea,
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
      iconFile: null,
      iconInitialFile: null,

      skill: '',
      descriptionVideo: '',
      videoPengantar: '',
      statusClass: '',

      skillOptions: [
        { title: 'Advertiser', value: 'Advertiser' },
        { title: 'Customer Service', value: 'Customer Service' },
        { title: 'Admin Marketplace', value: 'Admin Marketplace' },
      ],

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
    console.log(this.skill)
    console.log(this.coverKelas)
    console.log(this.descriptionVideo)
    console.log(this.videoPengantar)
    console.log(this.statusClass)
    this.$http.get('/lms/class/list').then(response => {
      const { data } = response
      console.log(data)
    })
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('class_skill', this.skill.value)
          formData.append('class_img', this.iconFile)
          formData.append('skill_level', 'Beginner')
          formData.append('class_trailer_url', this.videoPengantar)
          formData.append('class_trailer_description', this.descriptionVideo)
          formData.append('class_status', this.statusClass.value)

          this.$http.post('/lms/class/store', formData)
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
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
