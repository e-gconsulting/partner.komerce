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
                  label="Skill Name"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Skill Name"
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
                  label="Icon Image"
                  label-cols-md="4"
                >
                  <b-form-row>
                    <b-col>
                      <validation-provider
                        #default="{ errors }"
                        name="Icon Image"
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
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BSpinner, BFormFile, VBTooltip, BFormRow,
} from 'bootstrap-vue'
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
      const endpoint = '/skill'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  mounted() {
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

          if (this.iconFile) formData.append('icon', this.iconFile)

          this.$http.post(this.endpoint, formData)
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
      this.$refs.formCard.showLoading = true

      return this.$http.get(this.endpoint)
        .then(async response => {
          const { data } = response.data

          this.name = data.name
          if (data.icon) this.iconInitialFile = data.icon
        })
        .finally(() => {
          this.$refs.formCard.showLoading = false
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
