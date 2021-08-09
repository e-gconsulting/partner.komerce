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
    <div class="pb-1">
      <b-card-actions
        ref="formCard"
        title="Add Lesson"
        no-actions
        no-body
      >
        <b-row class="mt-2">
          <b-col
            md="11"
          >
            <!-- form edit talent -->
            <validation-observer ref="formRules">
              <b-form>
                <b-row>
                  <b-col md="12">
                    <b-col md="8">
                      <b-form-group
                        label="Modul"
                        label-cols-md="4"
                        class="ml-2"
                      >
                        <validation-provider
                          #default="{ errors }"
                          name="Modul"
                        >
                          <b-form-input
                            :state="errors.length > 0 ? false:null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-col>
                  <b-col md="12">
                    <b-col md="8">
                      <b-form-group
                        label="Judul"
                        label-cols-md="4"
                        class="ml-2"
                      >
                        <validation-provider
                          #default="{ errors }"
                          name="Judul"
                        >
                          <b-form-input
                            :state="errors.length > 0 ? false:null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-col>
                  <b-col md="12">
                    <b-col md="8">
                      <b-form-group
                        label="Deskripsi Video"
                        label-cols-md="4"
                        class="ml-2"
                      >
                        <validation-provider
                          #default="{ errors }"
                          name="Deskripsi Video"
                        >
                          <b-form-textarea
                            id="textarea-default"
                            rows="3"
                            :state="errors.length > 0 ? false:null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-col>
                  <b-col md="12">
                    <b-col md="8">
                      <b-form-group
                        label="Video"
                        label-cols-md="4"
                        class="ml-2"
                      >
                        <validation-provider
                          #default="{ errors }"
                          name="Video"
                        >
                          <b-form-input
                            :state="errors.length > 0 ? false:null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-col>
                  <b-col
                    md="12"
                    class="mt-2 ml-2 mb-2"
                  >
                    <b-button
                      variant="primary"
                      type="submit"
                      class="mr-50"
                      :disabled="loadingSubmit"
                      :to="{ name: $route.meta.routeAddQuiz }"
                    >
                      <b-spinner
                        v-if="loadingSubmit"
                        small
                      />
                      Lanjut
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </b-col>
        </b-row>
      </b-card-actions>
    </div>
  </b-overlay>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BButton,
  BSpinner,
  // BFormSelect,
  // BFormFile,
  // BAvatar,
  // BFormRow,
  BOverlay,
  // BFormRadioGroup,
  BFormTextarea,
} from 'bootstrap-vue'
import { required, min, minValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import vSelect from 'vue-select'
// import flatPickr from 'vue-flatpickr-component'
// import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.id'
// const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BForm,
    // BFormRow,
    BRow,
    BCol,
    BButton,
    BSpinner,
    // BFormSelect,
    // BFormFile,
    // BAvatar,
    // BFormRadioGroup,
    BOverlay,
    // flatPickr,
    // vSelect,
    // Cleave,
    BCardActions,
  },
  data() {
    return {
      loading: false,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,
      minValue,

      trainerOptions: [
        { title: 'Candra' },
        { title: 'Candra Fakboy Komerce' },
      ],

      statusKelasOptions: [
        { title: 'Private' },
        { title: 'Public' },
      ],

    }
  },
  computed: {
    id() {
      return this.$route.params.id || this.$route.query.id
    },
    idResign() {
      return this.$route.params.user_id || this.$route.query.user_id
    },
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
      const endpoint = 'docResign'
      return `/${endpoint}`
    },
  },
  mounted() {
    this.isValid = ''
    this.$http.get(`/talent/${this.id}`).then(response => {
      const { data } = response.data
      this.resultUserId = data.id
    })
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.submitErrors = ''
          this.loadingSubmit = true
          const tab = 'talent-off'

          const formData = {
            user_id: this.resultUserId,
            status_off: this.fieldPemutusan.value,
            url_document: this.fieldURLDocument,
            url_other: this.fieldURLDocumentOther,
          }

          this.$http.post(this.endpoint, formData)
            .then(async response => {
              if (response.data.success !== undefined && !response.data.success) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Failed',
                    text: response.data.message,
                    variant: 'danger',
                    icon: 'AlertCircleIcon',
                  },
                }, { timeout: 2500 })

                return
              }

              const { data } = response

              if (!this.selfRegister && !this.editProfileMode) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    text: this.successText,
                    variant: 'success',
                    attachment: 'CheckIcon',
                  },
                }, { timeout: 2500 })
              }

              this.$emit('on-submit', data)
              this.$router.push({ name: this.$route.meta.navActiveLink, query: { tab } })
            })
            .catch(error => {
              if (error.response.status === 422) {
                this.submitErrors = Object.fromEntries(
                  Object.entries(error.response.data.data).map(
                    ([key, value]) => [key, value[0]],
                  ),
                )
              }
            })
            .finally(() => {
              this.loadingSubmit = false
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
