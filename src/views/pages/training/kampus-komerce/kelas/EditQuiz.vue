<template>
  <b-row>
    <b-col cols="12">
      <b-overlay
        variant="light"
        :show="loading"
        spinner-variant="primary"
        blur="0"
        opacity=".5"
        rounded="sm"
      >
        <div class="pb-1">
          <b-row>
            <b-col md="8">
              <b-card-actions
                ref="formCard"
                title="Quiz"
                no-actions
                no-body
              >
                <h4 class="ml-2">
                  Advertiser
                </h4>
                <p class="ml-2">
                  Modul 1 (Default)
                </p>
                <b-table
                  ref="table"
                  striped
                  hover
                  responsive
                  class="position-relative"
                  empty-text="Tidak ada data untuk ditampilkan."
                  :empty-filtered-text="`Tidak ada hasil untuk kata kunci '${filter}'.`"

                  :fields="fields"
                  :items="items"
                  :show-empty="!loading"
                  :per-page="perPage"
                  :current-page="currentPage"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  :tbody-tr-class="rowClass"
                  :busy.sync="loading"
                >

                  <!-- A custom formatted column -->
                  <template #cell(question)="data">
                    <b-row>
                      <b-col
                        md="3"
                        class="pt-1"
                      >
                        <p>{{ data.value.value }}</p>
                      </b-col>
                      <b-col
                        md="9"
                        class="mt-50"
                      >
                        <v-select
                          v-model="data.value.value"
                        />
                      </b-col>
                    </b-row>
                  </template>

                  <template #cell(aksi)>
                    <b-button
                      variant="flat-warning"
                      class="btn-icon"
                    >
                      <feather-icon
                        icon="EditIcon"
                      />
                    </b-button>
                    <b-button
                      variant="flat-danger"
                      class="btn-icon"
                    >
                      <feather-icon
                        icon="Trash2Icon"
                      />
                    </b-button>
                  </template>

                </b-table>
              </b-card-actions>
            </b-col>
            <b-col md="4">
              <b-card-actions
                ref="formCard"
                title="Add Question"
                no-actions
              >
                <b-form
                  class="mt-2"
                  @submit.prevent
                >
                  <b-row>

                    <!-- question -->
                    <b-col cols="12">
                      <b-form-group
                        label="Question"
                      >
                        <b-form-textarea
                          v-model="questions"
                        />
                      </b-form-group>
                    </b-col>

                    <!-- Answer -->
                    <b-col
                      cols="12"
                      class="mt-1"
                    >
                      <b-form-group
                        label="Answer"
                      >
                        <b-row>
                          <b-col md="9">
                            <b-form-input
                              v-model="answer"
                            />
                          </b-col>
                          <b-col md="3">
                            <b-row>
                              <b-col
                                md="4"
                                class="d-flex justify-content-center align-items-center"
                              >
                                <b-form-checkbox
                                  v-model="selected"
                                  class="ml-2"
                                />
                              </b-col>
                              <b-col md="2">
                                <b-button
                                  variant="flat-danger"
                                  class="btn-icon"
                                >
                                  <feather-icon
                                    icon="Trash2Icon"
                                  />
                                </b-button>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row>
                          <b-col md="9">
                            <b-form-input
                              v-model="answer2"
                            />
                          </b-col>
                          <b-col md="3">
                            <b-row>
                              <b-col
                                md="4"
                                class="d-flex justify-content-center align-items-center"
                              >
                                <b-form-checkbox
                                  v-model="selected"
                                  class="ml-2"
                                />
                              </b-col>
                              <b-col md="2">
                                <b-button
                                  variant="flat-success"
                                  class="btn-icon"
                                >
                                  <feather-icon
                                    icon="PlusIcon"
                                  />
                                </b-button>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-col>

                  </b-row>
                </b-form>
              </b-card-actions>
            </b-col>
          </b-row>
        </div>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BButton,
  // BSpinner,
  // BFormSelect,
  // BFormFile,
  // BAvatar,
  // BFormRow,
  BOverlay,
  //   BCard,
  //   BCardText,
  //   BCardTitle,
  //   BCardBody,
  // BFormRadioGroup,
  BFormTextarea,
  BTable,
  // BBadge,
  BFormCheckbox,
} from 'bootstrap-vue'
import { required, min, minValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
// import flatPickr from 'vue-flatpickr-component'
// import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.id'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'

export default {
  directives: {
    Ripple,
  },
  components: {
    // ValidationProvider,
    // ValidationObserver,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BForm,
    // BFormRow,
    BRow,
    BCol,
    BButton,
    // BSpinner,
    // BFormSelect,
    // BFormFile,
    // BAvatar,
    // BFormRadioGroup,
    BOverlay,
    // flatPickr,
    vSelect,
    // Cleave,
    BCardActions,
    // BCard,
    // BCardTitle,
    // BCardBody,
    // BCardText,
    BTable,
    // BBadge,
    // BProgress,
    BFormCheckbox,
  },
  mixins: [heightTransition],
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

      fields: [
        // A virtual column that doesn't exist in items
        // A column that needs custom formatting
        { key: 'question', label: 'Question' },
        { key: 'aksi' },
        // A regular column
      ],
      items: [
        { question: { value: 'Question 1' } },
        { question: { value: 'Question 2' } },
      ],

      questions: 'Apa yang di maksud dengan facebook ads',

      answer: 'a. test',
      answer2: 'b. testing',

    }
  },
  computed: {
    id() {
      return this.$route.params.id || this.$route.query.id
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
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    // add question
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    // end
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
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
