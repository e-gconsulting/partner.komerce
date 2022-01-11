<template>
  <b-card-actions
    ref="formCard"
    title="Edit Kelas"
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
                    name="Skill"
                    rules="required"
                  >
                    <v-select
                      v-model="skill"
                      :options="skillItems"
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
                  label="Cover Kelas"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="Cover Kelas"
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
                        <div v-if="imageFile !== null">
                          <small
                            v-if="imageFile.size > 1024 * 2048"
                            class="text-danger"
                          >
                            Ukuran File Tidak Bisa Lebih dari 2 MB
                          </small>
                        </div>
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
                        name="Deskripsi Video"
                        rules="required"
                      >
                        <ckeditor
                          v-model="descriptionVideo"
                          :editor="editor"
                          :config="editorConfig"
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
                    name="Video Pengantar"
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
                    name="Status Kelas"
                    rules="required"
                  >
                    <v-select
                      v-model="statusClass"
                      :options="statusKelasOptions"
                      label="title"
                      :searchable="false"
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required, min } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import Ripple from 'vue-ripple-directive'
import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

Vue.use(CKEditor)

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
      classId: this.$route.params.class_id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,

      name: '',
      imageFile: null,
      imageInitialFile: null,

      skill: '',
      descriptionVideo: '',
      videoPengantar: '',
      statusClass: [
        { title: '', value: '' },
      ],

      edumoClassId: '',

      skillItems: [],

      statusKelasOptions: [
        { title: 'Private', value: 'draft' },
        { title: 'Publish', value: 'publish' },
      ],

      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      },
    }
  },
  computed: {
    successText() {
      return 'Satu Kelas berhasil di perbaharui'
    },
  },
  async mounted() {
    this.loadForm()
    this.loadSkills()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('_method', 'put')
          if (this.skill) formData.append('class_skill', this.skill)
          if (this.imageFile) formData.append('class_img', this.imageFile)
          formData.append('class_trailer_url', this.videoPengantar)
          formData.append('class_trailer_description', this.descriptionVideo)
          if (this.statusClass.value) formData.append('class_status', this.statusClass.value)

          this.$http.post(`/lms/class/update/${this.classId}`, formData)
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
      return this.$http.get(`/lms/class/${this.classId}`).then(response => {
        const { data } = response.data
        this.skill = data.class_name
        if (data.class_img) this.imageInitialFile = data.class_img
        this.descriptionVideo = data.class_trailer_description
        this.videoPengantar = data.class_trailer_url
        this.statusClass[0].value = data.class_status
        if (this.statusClass[0].value === 'draft') {
          this.statusClass[0].title = 'Private'
        } else if (this.statusClass[0].value === 'publish') {
          this.statusClass[0].title = 'Publish'
        }
        this.edumoClassId = data.edumo_class_id
      })
    },
    loadSkills(search) {
      return this.$http.get('/skill', {
        params: {
          keyword: search,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          this.skillItems = data.map(skill => skill.name)
        })
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
