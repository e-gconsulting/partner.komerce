<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body>
        <b-card-body>
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
          <div class="pt-2">
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
                <b-list-group key="list-group">
                  <transition-group name="fade">
                    <b-list-group-item
                      v-for="(item, index) in items"
                      :key="`item-${item.id}`"
                      :variant="isDeleted(item.id) ? 'danger' : undefined"
                      tag="li"
                    >
                      <div class="d-flex align-items-center">
                        <b-avatar
                          :text="(index + 1).toString()"
                        />
                        <strong class="ml-1 mr-auto">{{ item.position_name }}</strong>
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
                </b-list-group>
              </div>
            </b-overlay>
          </div>
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
                v-model="name"
                :state="errors.length > 0 || submitErrors.name ? false:null"
              />
              <small class="text-danger">{{ errors[0] || submitErrors.name }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Division"
            label-cols-md="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Division"
              rules="required"
            >
              <v-select
                v-model="divisionId"
                label="division_name"
                :reduce="option => option.id"
                :options="divisionItems"
                :state="errors.length > 0 ? false:null"
                transition=""
                placeholder="Ketik untuk mencari..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
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
  BListGroup,
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
    BListGroup,
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
      endpointGetAll: '/position/pagination',
      endpointDelete: '/position/delete/:id',
      loading: false,
      loadingLoadMore: false,
      deletedIds: [],

      required,
      min,

      id: '',
      loadingSubmit: false,
      submitErrors: '',

      name: '',
      divisionId: '',

      divisionItems: [],
    }
  },
  computed: {
    hasActionDelete() {
      return this.endpointDelete !== undefined
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
      const endpoint = '/position'
      return this.editMode ? `${endpoint}/edit` : `${endpoint}/add`
    },
  },
  watch: {
    filter() {
      this.reload()
    },
  },
  mounted() {
    this.reload()
    this.loadDivisions()
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
      return this.$http.post(this.endpointGetAll, null, {
        params: {
          position_name: this.filter,
          page: this.currentPage,
          limit: this.perPage,
          sort: this.sortBy,
          direction: this.sortDirection,
        },
      }).then(response => {
        const { data } = response.data.data
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
    loadDivisions() {
      return this.$http.get('/division', {
        params: {
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          this.divisionItems = data
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

      this.$http.get(endpoint)
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
      this.name = data.position_name
      this.divisionId = Number(data.division_id)
      this.id = data.id

      this.$refs.formModal.toggle()
    },
    resetModal() {
      this.id = ''
      this.name = ''
      this.divisionId = ''
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
            _method: 'post',
            position_name: this.name,
            division_id: this.divisionId,
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
                this.items[this.items.indexOf(item)] = resData
                return
              }

              this.items.push(resData)
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
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
