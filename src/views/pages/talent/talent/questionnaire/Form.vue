<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-row v-if="questionItems.length">
      <b-col
        md="6"
      >
        <!-- form -->
        <validation-observer ref="formRules">
          <b-form>
            <b-row>
              <b-col
                v-for="(item, index) in questionItems"
                :key="`item-${item.id}`"
                md="12"
              >
                <b-form-group
                  :label="item.question"
                  :label-for="`field-${item}`"
                  label-cols-md="12"
                >
                  <validation-provider
                    #default="{ errors }"
                    :name="`Kuesioner ke-${index + 1}`"
                    rules="required"
                  >
                    <b-form-input
                      :id="`field-${item}`"
                      v-model="item.value"
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
    <div v-else>
      <br><br><br><br><br>
    </div>
  </b-overlay>
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
  BOverlay,
} from 'bootstrap-vue'
import { required, min, minValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { heightFade } from '@core/directives/animations'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    // BFormTextarea,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BOverlay,
  },
  directives: {
    heightFade,
  },
  data() {
    return {
      id: this.$route.params.id || this.$route.query.id,
      selfRegister: this.$route.name === 'talent-register',
      loading: false,
      loadingSubmit: false,
      submitErrors: '',

      talent: '',
      questionItems: [],
      answersInitial: [],

      required,
      min,
      minValue,

      educationOptions: [
        { text: 'SD', value: 'SD' },
        { text: 'SMP', value: 'SMP' },
        { text: 'SMA/SMK', value: 'SMA/SMK' },
        { text: 'Sarjana', value: 'Sarjana' },
      ],
      experienceStatusOptions: [
        { text: 'Yes', value: 1 },
        { text: 'No', value: 0 },
      ],
      experienceYearOptions: [
        { text: '< 1 year', value: '< 1 year' },
        { text: '1 year', value: '1 year' },
        { text: '2 years', value: '2 years' },
        { text: '3 years', value: '3 years' },
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
      const endpoint = '/questionnaireAnswer'
      return this.editMode ? `${endpoint}/${this.talent.talent.user_id}` : `${endpoint}/${this.talent.talent.user_id}`
    },
  },
  async mounted() {
    this.loading = true

    if (this.editMode) {
      await this.loadTalent()
      await this.loadForm()
    }

    await this.loadQuestionnaire()

    this.loading = false
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            questionnaire_id: this.questionItems.map(item => item.id),
            answer: this.questionItems.map(item => item.value),
          }

          this.$http.post(this.endpoint, data)
            .then(() => {
              if (!this.selfRegister) {
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
                return
              }
              this.$swal({
                title: 'Pendaftaran berhasil',
                text: 'Harap periksa email anda untuk verifikasi akun Anda.',
                icon: 'success',
                confirmButtonText: 'Mengerti',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
              })

              this.logout()
              this.$router.replace({ name: 'auth-login' }).catch(() => {})
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
    logout() {
      useJwt.logout({
      })
        .then(() => {
          // Remove userData from localStorage
          // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
          localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
          localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadForm() {
      return this.$http.get(this.endpoint)
        .then(async response => {
          const { data } = response.data

          this.answersInitial = data.map(item => ({ ...item, questionnaire_id: Number(item.questionnaire_id) }))
        })
    },
    loadQuestionnaire(search) {
      return this.$http.get('/questionnaire', {
        params: {
          position_id: this.talent.position_id,
          keyword: search,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.questionItems = data.map(item => {
            const answerIndex = this.answersInitial.map(answer => answer.questionnaire_id).indexOf(item.id)
            return { ...item, value: answerIndex !== -1 ? this.answersInitial[answerIndex].answer : '' }
          })
        })
    },
    loadTalent() {
      return this.$http.get(`/talent/${this.id}`)
        .then(async response => {
          const { data } = response.data

          this.talent = data
        })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
