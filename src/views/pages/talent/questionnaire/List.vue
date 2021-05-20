<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body>
        <b-card-body class="pb-0">
          <b-form-row class="align-items-md-center">
            <b-col>
              <b-card-title class="mb-1 mb-md-0">
                {{ $route.meta.name.plural }}
              </b-card-title>
            </b-col>
            <b-col cols="auto">
              <!-- Card Actions -->
              <b-card-actions-container
                class="mr-md-50"
                :available-actions="['refresh']"
                @refresh="reload"
              />
            </b-col>
            <b-col md="auto">
              <b-form-group class="mb-0">
                <b-input-group
                  class="input-group-merge"
                  size="sm"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SearchIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Cari..."
                    debounce="500"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-card-body>
        <div class="mt-1 pl-2 d-flex overflow-x-scroll overflow-y-hidden">
          <div
            v-for="(item, index) in filterPositionItems"
            :key="`filter-position-${item.id}`"
            class="mr-50"
          >
            <b-form-group>
              <b-button
                :variant="filterPositionId === item.id ? 'primary' : 'flat-primary'"
                class="text-nowrap"
                :class="{'mr-2': index === (filterPositionItems.length - 1)}"
                :pressed="filterPositionId === item.id"
                pill
                size="sm"
                @click="selectPosition(item.id)"
              >
                {{ item.position_name }}
              </b-button>
            </b-form-group>
          </div>
        </div>
        <b-card-body>
          <b-overlay
            variant="light"
            :show="loading"
            spinner-variant="primary"
            blur="0"
            opacity=".5"
            rounded="sm"
          >
            <div
              v-if="!loading && !items.length && filter"
              class="text-center pt-4 pb-5 mb-1"
            >
              Tidak ada hasil untuk kata kunci '{{ filter }}'.
            </div>
            <div
              v-else-if="!loading && !items.length"
              class="text-center pt-4 pb-5 mb-1"
            >
              Tidak ada data untuk ditampilkan.
            </div>
            <div
              v-else
              style="min-height: 80px"
            >
              <draggable
                v-model="items"
                tag="ul"
                class="list-group list-group-flush cursor-move mb-2"
                @change="changeOrder"
              >
                <transition-group name="fade">
                  <b-list-group-item
                    v-for="item in items"
                    :key="`item-${item.id}`"
                    :variant="isDeleted(item.id) ? 'danger' : undefined"
                    tag="li"
                  >
                    <div class="d-flex align-items-center">
                      <div class="ml-n50 d-flex">
                        <feather-icon
                          icon="MoreVerticalIcon"
                          class="text-secondary"
                          size="20"
                        />
                        <feather-icon
                          icon="MoreVerticalIcon"
                          class="text-secondary ml-n1 mr-50"
                          size="20"
                        />
                      </div>
                      <b-avatar
                        :text="item.order"
                        variant="primary"
                      />
                      <strong class="ml-1 mr-auto">{{ item.question }}</strong>
                      <span
                        v-if="isDeleted(item.id)"
                        class="text-danger"
                      >Deleted</span>
                      <div v-else>
                        <b-button
                          v-if="hasActionEdit"
                          class="btn-icon mr-50"
                          size="sm"
                          variant="flat-warning"
                          @click="setupModal(item)"
                        >
                          <feather-icon
                            icon="EditIcon"
                          />
                        </b-button>
                        <b-button
                          v-if="hasActionDelete"
                          class="btn-icon"
                          size="sm"
                          variant="flat-danger"
                          @click="confirmDelete(item)"
                        >
                          <feather-icon
                            icon="Trash2Icon"
                          />
                        </b-button>
                      </div>
                    </div>
                  </b-list-group-item>
                </transition-group>
              </draggable>
            </div>
          </b-overlay>
        </b-card-body>

        <b-card-body
          v-if="items.length"
          class="text-center pt-0"
        >
          <div v-if="items.length < total">
            <b-button
              variant="primary"
              class="px-2"
              :disabled="loadingLoadMore"
              @click="loadMore"
            >
              <b-spinner
                v-if="loadingLoadMore"
                small
              />
              Lebih banyak
            </b-button>
          </div>
          <div v-if="items.length === total">
            Menampilkan seluruh hasil.
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      v-b-tooltip.hover.left="'Tambah Baru'"
      v-b-modal.form-modal
      variant="primary"
      class="btn-icon btn-floating rounded-circle"
      size="lg"
    >
      <feather-icon
        icon="PlusIcon"
        size="16"
      />
    </b-button>
    <b-modal
      id="form-modal"
      ref="formModal"
      :title="`${editMode ? 'Ubah' : 'Tambah'} ${$route.meta.name.singular}`"
      :ok-title="loadingSubmit ? 'Submitting..' : 'Submit'"
      :ok-disabled="loadingSubmit"
      :ok-variant="editMode ? 'warning' : 'primary'"
      cancel-variant="light"
      centered
      @hidden="resetModal"
      @ok="handleOk"
    >
      <validation-observer ref="formRules">
        <b-form @submit.stop.prevent="submit">
          <b-form-group
            label="Nama"
            label-cols-md="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Nama"
              rules="required|min:3"
            >
              <b-form-input
                v-model="question"
                :state="errors.length > 0 || submitErrors.question ? false:null"
              />
              <small class="text-danger">{{ errors[0] || submitErrors.question }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Posisi"
            label-cols-md="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Posisi"
              rules="required"
            >
              <v-select
                v-model="positionId"
                label="position_name"
                :reduce="option => option.id"
                :options="positionItems"
                :state="errors.length > 0 ? false:null"
                placeholder="Ketik untuk mencari..."
              >
                <li
                  v-if="hasMorePosition"
                  slot="list-footer"
                  class="vs__dropdown-option vs__dropdown-option--disabled"
                >
                  <feather-icon
                    icon="MoreHorizontalIcon"
                    size="16"
                  />
                </li>
              </v-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Urutan"
            label-cols-md="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Urutan"
              rules="required|min_value:1"
            >
              <b-form-input
                v-model="order"
                type="number"
                :state="errors.length > 0 || submitErrors.order || unavailableError ? false:null"
              />
              <small class="text-danger">{{ errors[0] || submitErrors.order || unavailableError }}</small>
            </validation-provider>
          </b-form-group>
        </b-form>
      </validation-observer>
    </b-modal>
  </b-row>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import BCardActionsContainer from '@core/components/b-card-actions/BCardActionsContainer.vue'
import {
  BRow,
  BButton,
  BAvatar,
  BSpinner,
  BFormRow,
  BCol,
  BCard,
  BCardBody,
  BCardTitle,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupPrepend,
  BOverlay,
  BListGroupItem,
  BModal,
  VBTooltip,
  BForm,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { min, required } from '@core/utils/validations/validations'
import vSelect from 'vue-select'
import draggable from 'vuedraggable'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BButton,
    BAvatar,
    BFormRow,
    BForm,
    BCol,
    BCard,
    BCardTitle,
    BCardBody,
    BCardActionsContainer,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    BOverlay,
    BSpinner,
    draggable,
    BListGroupItem,
    vSelect,
    BModal,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  data() {
    return {
      perPage: 10,
      filter: '',
      total: 1,
      currentPage: 1,
      sortBy: '',
      sortDirection: 'asc',
      items: [],
      endpointGetAll: '/questionnaire',
      endpointDelete: '/questionnaire/:id',
      loading: false,
      loadingLoadMore: false,
      deletedIds: [],

      required,
      min,

      id: '',
      loadingSubmit: false,
      submitErrors: '',

      question: '',
      order: '',

      positionId: '',
      positionItems: [],
      hasMorePosition: false,

      filterPositionId: 1,
    }
  },
  computed: {
    unavailableError() {
      const index = this.items.map(item => Number(item.order)).indexOf(Number(this.order))

      if (index === -1) {
        return ''
      }

      if (this.editMode && this.items[index].id === this.id) {
        return ''
      }

      return 'Urutan ini telah digunakan'
    },
    hasActionDelete() {
      return this.endpointDelete !== undefined
    },
    filterPositionItems() {
      return this.positionItems
    },
    hasActionEdit() {
      return true
    },
    hasActionCreate() {
      return true
    },
    method() {
      return this.editMode ? 'put' : 'post'
    },
    editMode() {
      return this.id !== undefined && this.id !== ''
    },
    successText() {
      return this.editMode ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
    endpoint() {
      const endpoint = '/questionnaire'
      return this.editMode ? `${endpoint}/${this.id}` : endpoint
    },
  },
  watch: {
    filter() {
      this.reload()
    },
    filterPositionId() {
      this.reload()
    },
  },
  mounted() {
    this.reload()
    this.loadPositions()
  },
  methods: {
    async reload() {
      this.loading = true
      this.currentPage = 1
      this.items = await this.loadItems()
      this.loading = false
    },
    async loadMore() {
      this.loadingLoadMore = true
      this.currentPage += 1

      const newItems = await this.loadItems()
      if (!newItems.length) this.currentPage += 1

      this.items = [...this.items, ...newItems]
      this.loadingLoadMore = false
    },
    loadItems() {
      return this.$http.get(this.endpointGetAll, {
        params: {
          keyword: this.filter,
          position_id: this.filterPositionId,
          page: this.currentPage,
          limit: this.perPage,
          sort: this.sortBy,
          direction: this.sortDirection,
        },
      }).then(response => {
        const { data } = response.data
        this.total = response.data.data.total
        return Object.keys(data).map(key => data[key])
      }).catch(() => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: 'Unable to load the table data. Please try again later or contact support.',
            variant: 'danger',
          },
        })
      })
    },
    changeOrder() {
      this.loading = true

      const formData = new FormData()
      formData.append('_method', 'put')

      this.items.forEach((item, index) => {
        formData.append('id[]', item.id)
        formData.append('question[]', item.question)
        formData.append('position_id[]', item.position_id)
        formData.append('order[]', index + 1)
      })

      this.$http.post('/questionnaireBulk', formData)
        .then(response => {
          if (response.data.status !== undefined && !response.data.status) {
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

          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              text: 'Urutan kuesioner berhasil diubah',
              variant: 'success',
              icon: 'CheckIcon',
            },
          }, { timeout: 2500 })

          if (this.items.length) {
            for (let index = 0; index < this.items.length; index += 1) {
              this.items[index].order = index + 1
            }
          }
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
          this.loading = false
        })
    },
    loadPositions() {
      return this.$http.post('/position', {}, {
        params: {
          is_division_external: 1,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data
          this.positionItems = data
        })
    },
    confirmDelete(data) {
      this.$swal({
        title: 'Anda yakin?',
        text: `Hapus satu ${this.$route.meta.name.singular} dari tabel. Aksi ini tidak dapat dibatalkan.`,
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
      const endpoint = this.endpointDelete.replace(/:id/g, data.id)

      this.$http.delete(endpoint)
        .then(() => {
          this.deletedIds.push(data.id)

          setTimeout(() => {
            const index = this.items.indexOf(data)
            this.items.splice(index, 1)
            this.total -= 1
          }, 3000)
        })
        .finally(() => {
          this.loading = false
        })
    },
    isDeleted(id) {
      return this.deletedIds.includes(id)
    },
    setupModal(data) {
      this.question = data.question
      this.positionId = Number(data.position_id)
      this.order = Number(data.order)
      this.id = data.id

      this.$refs.formModal.toggle()
    },
    resetModal() {
      this.id = ''
      this.question = ''
      this.positionId = ''
      this.order = ''
      this.submitErrors = ''
    },
    handleOk(event) {
      event.preventDefault()
      this.submit()
    },
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.loadingSubmit = true

          const data = {
            _method: this.method,
            question: this.question,
            position_id: this.positionId,
            order: this.order,
          }

          if (this.editMode) Object.assign(data, { id: this.id })

          this.$http.post(this.endpoint, data)
            .then(response => {
              if (response.data.status !== undefined && !response.data.status) {
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

              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Success',
                  text: this.successText,
                  variant: 'success',
                  icon: 'CheckIcon',
                },
              }, { timeout: 2500 })

              this.$nextTick(() => {
                this.$refs.formModal.toggle()
              })

              const resData = response.data.data

              if (this.editMode) {
                const item = this.items.find(o => o.id === this.id)
                this.items.splice(this.items.indexOf(item), 1)
              }

              if (Number(resData.position_id) !== Number(this.filterPositionId)) return

              if (this.items.length) {
                for (let index = 0; index < this.items.length; index += 1) {
                  if (Number(this.items[index].order) > Number(resData.order)) {
                    this.items.splice(index, 0, resData)
                    break
                  } else if (index === this.items.length - 1) {
                    this.items.push(resData)
                    break
                  }
                }
              } else {
                this.items.push(resData)
              }

              this.total += 1
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
    selectPosition(id) {
      this.filterPositionId = id
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
