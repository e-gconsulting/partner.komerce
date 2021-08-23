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
                  {{ className }}
                </h4>
                <p class="ml-2">
                  {{ moduleName }} - ({{ moduleSubname }})
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
                  :items="tableProvider"
                  :show-empty="!loading"
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
                        <p>{{ data.item.question }}</p>
                      </b-col>
                      <b-col
                        md="9"
                        class="mt-50"
                      >
                        <v-select
                          v-model="data.item.question"
                          :options="data.item.answer"
                          label="answer"
                        />
                      </b-col>
                    </b-row>
                  </template>

                  <template #cell(aksi)="data">
                    <b-button
                      variant="flat-warning"
                      class="btn-icon"
                      @click="addRow"
                    >
                      <feather-icon
                        icon="EditIcon"
                      />
                    </b-button>
                    <b-button
                      variant="flat-danger"
                      class="btn-icon"
                      @click="test(data)"
                    >
                      <feather-icon
                        icon="Trash2Icon"
                      />
                    </b-button>
                  </template>

                </b-table>
                <b-button
                  variant="danger"
                  pill
                  class="ml-2 mb-2"
                >
                  Submit
                </b-button>
              </b-card-actions>
            </b-col>
            <b-col
              md="4"
            >
              <question-item
                @remove="removeRow(index)"
                @childToParent="testParent"
                @childToParent2="testParent2"
              />
              {{ rows }}
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
  // BFormInput,
  // BFormGroup,
  // BForm,
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
  // BFormTextarea,
  BTable,
  // BBadge,
  // BFormCheckbox,
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
// import MyItem from './MyItem.vue'
import QuestionItem from './QuestionItem.vue'

export default {
  directives: {
    Ripple,
  },
  components: {
    // ValidationProvider,
    // ValidationObserver,
    // BFormInput,
    // BFormGroup,
    // BFormTextarea,
    // BForm,
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
    // BFormCheckbox,
    // MyItem,
    QuestionItem,
  },
  mixins: [heightTransition],
  data() {
    return {
      loading: false,
      loadingSubmit: false,
      submitErrors: '',

      className: '',
      moduleName: '',
      moduleSubname: '',

      required,
      min,
      minValue,
      fields: [
        { key: 'question', label: 'Question' },
        { key: 'aksi' },
      ],

      rows: [{ row: '' }],

      dataLocal: [],

      itemQuestion: [],

      edumoLessonId: '',

      answerItem: [],

      tableItems: [],

      answer: '',
      questions: '',

    }
  },
  computed: {
    successText() {
      return this.editMode ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
    tableFileds() {
      const fields = [...this.fields]
      return fields
    },
  },
  mounted() {
    this.$http.get('/lms/lesson/quiz/28').then(response => {
      const { data } = response.data
      console.log(data)
    })
    this.$http.get('/lms/module/list/27').then(response => {
      const { data } = response.data
      console.log(data)
    })
    this.loadQuiz()
  },
  methods: {
    test(data) {
      console.log(data.item.answer)
    },
    testParent(value) {
      this.questions = value
    },
    testParent2(value) {
      this.answer = value
      const localStorage = {
        type: 'module',
        ref_id: this.edumoLessonId,
        question: this.questions,
        question_type: 'text',
        answer: this.answer,
      }
      // console.log(this.tableItem.push(localStorage))
      // console.log(this.tableItem)
      this.tableItem.push(localStorage)
    },
    tableProvider() {
      return this.$http.get('/lms/lesson/quiz/28').then(response => {
        const { data } = response.data
        this.dataLocal.push(data.question)
        this.tableItem = data.question
        return this.tableItem
      })
    },
    loadQuiz() {
      this.$http.get('/lms/lesson/quiz/28').then(response => {
        const { data } = response.data
        console.log(data.question)
      })
      this.$http.get('/lms/module/45').then(response => {
        const { data } = response.data
        this.moduleName = data.module_title
        this.moduleSubname = data.module_subtitle
      })
      this.$http.get('/lms/module/list/27').then(response => {
        const { data } = response.data
        this.className = data.class_skill
      })
      this.$http.get('/lms/lesson/28').then(response => {
        const { data } = response.data
        this.edumoLessonId = data.edumo_lesson_id
        console.log(this.edumoLessonId)
      })
    },
    addQuestion() {
      const formData = new FormData()
      formData.append('type', 'module')
      formData.append('ref_id', this.edumoLessonId)
      formData.append('question', 'candra adalah wibu meresahkan komerce')
      formData.append('question_type', 'text')
      formData.append('answers', this.answerItem)

      console.log(formData)
    },
    fieldAnswer() {

    },
    addRow() {
      this.rows.splice(0, 1, { row: '' })
    },

    removeRow(index) {
      this.rows.splice(index, 1)
    },
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.submitErrors = ''
          this.loadingSubmit = true

          this.$http.post(this.endpoint)
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

<style lang="scss" scoped>
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
// [dir] .vs__clear {
//   display: none;
// }

// [dir] .vs__dropdown-menu {
//   pointer-event: none;
// }
</style>
