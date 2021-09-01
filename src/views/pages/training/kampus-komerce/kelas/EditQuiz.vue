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
                title="Edit Quiz"
                no-actions
                no-body
              >
                <h4 class="ml-2">
                  {{ className }}
                </h4>
                <p class="ml-2">
                  {{ moduleName }} - ( {{ moduleSubname }} )
                </p>
                <b-table
                  ref="table"
                  striped
                  hover
                  responsive
                  class="position-relative"
                  empty-text="Tidak ada data untuk ditampilkan."

                  :show-empty="!loading"
                  :per-page="perPage"
                  :current-page="currentPage"
                  :items="tableProvider"
                  :fields="tableFileds"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
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
                        <b-dropdown
                          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                          variant="outline-secondary"
                          :text="data.item.question"
                        >
                          <b-dropdown-item
                            v-for="(dataAnswer, index) in data.item.answer"
                            :key="index + 1"
                          >
                            {{ dataAnswer.answer }}
                          </b-dropdown-item>
                        </b-dropdown>
                      </b-col>
                    </b-row>
                  </template>

                  <template #cell(aksi)="data">
                    <b-button
                      variant="flat-warning"
                      class="btn-icon"
                      @click="editQuestions(data)"
                    >
                      <feather-icon
                        icon="EditIcon"
                      />
                    </b-button>
                    <b-button
                      variant="flat-danger"
                      class="btn-icon"
                      @click="confirmDelete(data)"
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

            <!-- Form edit Questions -->
            <b-col
              md="4"
            >
              <b-card-actions
                ref="formCard"
                title="Edit Question"
                no-actions
              >
                <validation-observer ref="formRules">
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
                          <validation-provider
                            #default="{ errors }"
                            name="Question"
                          >
                            <b-form-textarea
                              v-model="questions"
                              :state="errors.length > 0 ? false:null"
                            />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
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
                          <b-row
                            v-for="(answers, index) in answer"
                            :key="`answers_${index}`"
                            :class="answer.length > 1 ? 'mt-1' : ''"
                          >
                            <b-col md="9">
                              <validation-provider
                                #default="{ errors }"
                                name="Answer"
                              >
                                <b-form-input
                                  v-model="answers.answer"
                                  :state="errors.length > 0 ? false:null"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col md="3">
                              <b-row>
                                <b-col
                                  md="4"
                                  class="d-flex justify-content-center align-items-center"
                                >
                                  <b-form-checkbox
                                    v-model="answers.correct_answer"
                                    class="ml-2"
                                  />
                                </b-col>
                                <b-col
                                  v-if="answer.length - 1"
                                  md="2"
                                >
                                  <b-button
                                    variant="flat-danger"
                                    class="btn-icon"
                                    @click="removeItem(index)"
                                  >
                                    <feather-icon
                                      icon="Trash2Icon"
                                    />
                                  </b-button>
                                </b-col>
                              </b-row>
                            </b-col>
                          </b-row>
                          <b-button
                            class="mt-1"
                            variant="flat-success"
                            @click="addAnswer"
                          >
                            <feather-icon
                              icon="PlusIcon"
                            />
                          </b-button>
                        </b-form-group>
                      </b-col>
                      <b-col class="text-right mt-3">
                        <b-button
                          variant="danger"
                          pill
                          @click="submit"
                        >
                          <b-spinner
                            v-if="loadingSubmit"
                            small
                          />
                          Simpan
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-form>
                </validation-observer>
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput,
  BFormGroup,
  BForm,
  BRow,
  BCol,
  BButton,
  BOverlay,
  BFormTextarea,
  BTable,
  BFormCheckbox,
  BDropdown,
  BDropdownItem,
  BSpinner,
} from 'bootstrap-vue'
import { required, min, minValue } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import vSelect from 'vue-select'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.id'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'

export default {
  directives: {
    Ripple,
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BForm,
    BRow,
    BCol,
    BButton,
    BOverlay,
    // vSelect,
    BCardActions,
    BTable,
    BFormCheckbox,
    BDropdown,
    BDropdownItem,
    BSpinner,
  },
  mixins: [heightTransition],
  data() {
    return {
      lessonId: this.$route.params.lesson_id,
      loading: false,
      loadingSubmit: false,
      submitErrors: '',

      nextTodoId: 2,
      perPage: 10,
      pageOptions: [5, 10, 20],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',

      endpointDelete: '/lms/lesson/quiz/delete/:question_id',

      deletedIds: [],

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

      tableItem: [{}],
      newTable: null,

      questions: '',
      questionsId: '',

      answer: [],
      answerItem: [],

      selected: 'yes',

      test: [{ status: true }],

      checked: [],

      quizId: '',

    }
  },
  computed: {
    successText() {
      // eslint-disable-next-line quotes
      return `Satu Quiz berhasil diperbaharui`
    },
    tableFileds() {
      const fields = [...this.fields]
      return fields
    },
  },
  watch: {
    editQuest() {
      this.editQuestions()
    },
  },
  mounted() {
    this.loadQuestions()
  },
  methods: {
    editQuestions(data) {
      console.log(data)
      this.questions = data.item.question
      this.questionsId = data.item.id
      this.answer = data.item.answer
    },
    confirmDelete(data) {
      console.log(data)
      this.$swal({
        title: 'Anda yakin?',
        text: 'Hapus satu question dari tabel. Aksi ini tidak dapat di batalkan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.delete(data)
        }
      })
    },
    delete(data) {
      this.loading = true
      const endpoint = this.endpointDelete.replace(/:question_id/g, data.item.id)

      this.$http.delete(endpoint).then(() => {
        this.deletedIds.push(data.item.id)
      }).finally(() => {
        this.loading = false
      })
    },
    isDeleted(id) {
      return this.deletedIds.includes(id)
    },
    rowClass(item, type) {
      const colorClass = 'table-danger'
      if (!item || type !== 'row') { return }

      // eslint-disable-next-line consistent-return
      if (this.isDeleted(item.class_id)) { return colorClass }
    },
    refreshTable() {
      this.$refs.table.refresh()
    },
    submit() {
      const formDatas = {
        _method: 'put',
        quiz_id: this.quizId,
        question_id: this.questionsId,
        type: 'module',
        ref_id: this.edumoLessonId,
        question: this.questions,
        question_type: 'text',
        answers: this.answer,
        answers_type: 'choices',
      }

      console.log(formDatas)
      console.log(this.quizId)
      console.log(this.questionsId)
      console.log(this.edumoLessonId)
      console.log(this.questions)
      console.log(this.answer)

      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.submitErrors = ''
          this.loadingSubmit = true

          this.$http.post('/lms/lesson/quiz/update', formDatas)
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
              this.refreshTable()
              this.loadingSubmit = false
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
    tableProvider() {
      return this.$http.get(`/lms/lesson/quiz/${this.lessonId}`).then(response => {
        const { data } = response.data
        return data.question
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: 'Tidak ada Quiz untuk Lesson ini',
            variant: 'danger',
          },
        })
        return []
      })
    },
    loadQuestions() {
      this.$http.get('/lms/lesson/quiz/1').then(response => {
        const { data } = response.data
        this.quizId = data.quiz_id
        this.moduleName = data.module_title
        this.moduleSubname = data.module_subtitle
        this.className = data.class_skill
        this.lessonId = data.lesson_id
        this.getEdumoId()
        console.log(data)
      })
    },
    getEdumoId() {
      this.$http.get(`/lms/lesson/${this.lessonId}`).then(response => {
        const { data } = response.data
        this.edumoLessonId = data.edumo_lesson_id
        console.log(this.edumoLessonId)
      })
    },
    addAnswer() {
      this.position += 1
      this.answer.push({
        answer: '', correct_answer: this.test[0].status, position: this.position,
      })
      this.test.push({ status: true })
    },

    removeItem(index) {
      this.answer.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

</style>
