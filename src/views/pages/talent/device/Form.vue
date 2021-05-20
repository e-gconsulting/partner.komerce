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
                  label="Merek"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Merek"
                    rules="required|min:3"
                  >
                    <b-form-input
                      v-model="brand"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Spesifikasi"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Spesifikasi"
                    rules="required|min:3"
                  >
                    <b-form-input
                      v-model="specification"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Tipe"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Tipe"
                    rules="required"
                  >
                    <b-form-select
                      v-model="type"
                      :options="typeOptions"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <hr>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Partner"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Partner"
                    rules="required"
                  >
                    <v-select
                      v-model="partnerNum"
                      label="label"
                      :reduce="option => option.no_partner"
                      :options="partnerItems"
                      :state="errors.length > 0 ? false:null"
                      :filterable="false"
                      placeholder="Ketik untuk mencari..."
                      @search="onSearchPartner"
                    >
                      <li
                        v-if="hasMorePartner"
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
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Pemegang device"
                  label-cols-md="4"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Pemegang device"
                    rules="required"
                  >
                    <b-form-radio-group
                      v-model="ownerType"
                      class="mt-50"
                      :options="ownerTypeOptions"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <transition-group name="fade">
                  <b-form-group
                    v-if="hasTalent"
                    key="form-0"
                    label="Talent"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Talent"
                      rules="required"
                    >
                      <v-select
                        v-model="talentId"
                        label="full_name"
                        :reduce="option => option.id"
                        :options="talentItems"
                        :state="errors.length > 0 ? false:null"
                        :filterable="false"
                        placeholder="Ketik untuk mencari..."
                        @search="onSearchTalent"
                      >
                        <li
                          v-if="hasMoreTalent"
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
                </transition-group>
              </b-col>
              <b-col md="12">
                <b-form-group
                  label="Tanggal Diterima"
                  label-cols-md="4"
                >
                  <flat-pickr
                    v-model="pickDate"
                    class="form-control"
                    :config="{ altInput: true, altFormat: 'j F Y', dateFormat: 'Y-m-d',}"
                  />
                  <small class="text-danger">{{ submitErrors.birth_date }}</small>
                </b-form-group>
                <hr>
              </b-col>
              <b-col md="12">
                <b-form-row>
                  <b-col md="4">
                    <div class="py-50">
                      Attachment
                    </div>
                  </b-col>
                  <b-col>
                    <transition-group name="fade">
                      <div
                        v-for="(item, index) in documentationFiles"
                        :key="`documentation-file-${item.index}`"
                        class="file-group-item"
                      >
                        <b-form-group>
                          <b-form-row>
                            <b-col>
                              <validation-provider
                                #default="{ errors }"
                                :name="`Attachment-${index + 1}`"
                              >
                                <b-input-group>
                                  <b-form-file
                                    v-model="documentationFiles[index].file"
                                    :state="errors.length > 0 ? false:null"
                                    :placeholder="documentationInitialFiles[index] && documentationInitialFiles[index].attachment_url ?
                                      documentationInitialFiles[index].attachment_url.split('/').pop()
                                      : `Pilih atau drop file disini...`"
                                    drop-placeholder="Drop file disini..."
                                    accept="image/*"
                                    @change="onChangeFile(index)"
                                  />
                                  <b-input-group-append
                                    v-if="(documentationInitialFiles[index]
                                      && documentationInitialFiles[index].attachment_url)
                                      || documentationFiles[index].file || index > 0"
                                  >
                                    <b-button
                                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                      v-b-tooltip.hover.top="'Hapus'"
                                      class="btn-icon"
                                      variant="danger"
                                      @click="deleteDocumentationFile(index)"
                                    >
                                      <feather-icon icon="XIcon" />
                                    </b-button>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </b-col>
                            <b-col
                              v-if="(documentationInitialFiles[index]
                                && documentationInitialFiles[index].attachment_url)
                                || documentationFiles[index].file"
                              cols="auto"
                            >
                              <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                v-b-tooltip.hover.top="'Lihat File'"
                                variant="gradient-secondary"
                                class="btn-icon"
                                target="_blank"
                                :href="documentationFiles[index].file ? fileUrl(documentationFiles[index].file) : documentationInitialFiles[index].attachment_url"
                              >
                                <feather-icon icon="FileIcon" />
                              </b-button>
                            </b-col>
                          </b-form-row>
                        </b-form-group>
                      </div>
                      <div
                        v-if="documentationFiles.length < 3"
                        key="add-more-file"
                        class="file-group-item"
                      >
                        <b-button
                          variant="outline-dark"
                          size="sm"
                          @click="addMoreFile"
                        >
                          <feather-icon icon="PlusIcon" />
                          Tambah
                        </b-button>
                      </div>
                    </transition-group>
                  </b-col>
                </b-form-row>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BButton,
  BCol,
  BForm,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormRadioGroup, BFormRow,
  BFormSelect, BInputGroup, BInputGroupAppend,
  BRow,
  BSpinner, VBTooltip,
} from 'bootstrap-vue'
import { min, required } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
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
    BFormRadioGroup,
    BFormRow,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BFormSelect,
    flatPickr,
    BInputGroupAppend,
    BInputGroup,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      loadingSubmit: false,
      submitErrors: '',

      required,
      min,

      // brand: 'Asus A46CB',
      // specification: 'Ram 8GB',
      // type: 'Laptop',
      // ownerType: 1,
      // talentId: 43,
      // partnerNum: 1430,
      // pickDate: '2021-03-26',

      brand: '',
      specification: '',
      type: '',
      ownerType: '',
      talentId: '',
      talentItems: [],
      hasMoreTalent: false,
      partnerNum: '',
      partnerItems: [],
      hasMorePartner: false,
      documentationFileIndex: 0,
      documentationFiles: [{ file: null, index: 0 }],
      documentationInitialFiles: [],
      documentationDeletedFiles: [],
      pickDate: null,

      typeOptions: [
        { text: 'Laptop', value: 'Laptop' },
        { text: 'Handphone', value: 'HP' },
        { text: 'Modem', value: 'Modem' },
        { text: 'Other', value: 'Other' },
      ],
      ownerTypeOptions: [
        { text: 'Talent', value: 1 },
        { text: 'IT Support', value: 2 },
      ],
    }
  },
  computed: {
    editMode() {
      return this.id !== undefined
    },
    hasTalent() {
      return this.ownerType === 1
    },
    successText() {
      return this.editMode ? `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
        : `Satu ${this.$route.meta.name.singular} berhasil ditambah`
    },
    endpointSubmit() {
      const endpoint = '/device'
      return this.editMode ? `${endpoint}/edit` : `${endpoint}/store`
    },
    endpoint() {
      const endpoint = '/device'
      return `${endpoint}/${this.id}`
    },
  },
  async mounted() {
    if (this.editMode) await this.loadForm()

    if (!this.editMode || !this.partnerItems.length) this.loadPartners()
    if (!this.editMode || !this.talentItems.length) this.loadTalents()
  },
  methods: {
    submit() {
      this.$refs.formRules.validate().then(async success => {
        if (success) {
          this.loadingSubmit = true

          const formData = new FormData()
          formData.append('brancd', this.brand)
          formData.append('spesification', this.specification)
          formData.append('device_type', this.type)
          formData.append('no_partner', this.partnerNum)
          formData.append('device_owner_type', this.ownerType)
          formData.append('device_pick_date', this.pickDate)
          formData.append('user_sdm_id', this.hasTalent ? this.talentId : 0)

          if (this.editMode) formData.append('id', this.id)

          this.documentationFiles.forEach(file => {
            if (file.file) {
              formData.append(`attachment_${file.index + 1}`, file.file)
            }
          })

          if (this.documentationDeletedFiles.length) await this.submitDeleteDocumentationFile()

          this.$http.post(this.endpointSubmit, formData)
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
              this.$router.push({ name: this.$route.meta.navActiveLink })
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
    loadForm() {
      this.$refs.formCard.showLoading = true

      return this.$http.get(this.endpoint)
        .then(async response => {
          const data = response.data.data[0]

          this.brand = data.brancd
          this.specification = data.spesification
          this.type = data.device_type
          this.ownerType = data.device_owner_type
          this.pickDate = data.device_pick_date

          if (data.attachments.length) {
            this.documentationFileIndex = data.attachments.length - 1
            this.documentationInitialFiles = data.attachments
            this.documentationFiles = this.documentationInitialFiles.map((_, index) => ({ file: null, index }))
          }

          if (data.partner) {
            const item = { ...data.partner, label: `${data.partner.no_partner} - ${data.partner.full_name}` }
            this.partnerItems = [item]
            this.partnerNum = data.no_partner
            this.loadPartners(data.partner.full_name)
          }

          if (data.sdm) {
            this.talentItems = [data.sdm]
            this.talentId = Number(data.sdm.id)
            this.loadTalents(data.sdm.full_name)
          }
        })
        .finally(() => {
          this.$refs.formCard.showLoading = false
        })
    },
    onSearchTalent(search, loading) {
      if (search.length) {
        this.searchTalent(loading, search, this)
      }
    },
    searchTalent: _.debounce((loading, search, that) => {
      loading(true)
      that.loadTalents(search).finally(() => loading(false))
    }, 500),
    loadTalents(search) {
      return this.$http.get('/talent', {
        params: {
          keyword: search,
          page: 1,
          limit: 5,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          this.hasMoreTalent = response.data.data.total > data.length
          this.talentItems = data
        })
    },
    onSearchPartner(search, loading) {
      if (search.length) {
        this.searchPartner(loading, search, this)
      }
    },
    searchPartner: _.debounce((loading, search, that) => {
      loading(true)
      that.loadPartners(search).finally(() => loading(false))
    }, 500),
    loadPartners(search) {
      const key = /^-?\d+$/.test(search) ? 'no_partner' : 'name'

      return this.$http.get('/user/partner/pagination', {
        params: {
          [key]: search,
          page: 1,
          limit: 5,
          sort: 'name',
          direction: 'asc',
        },
      })
        .then(async response => {
          const { data } = response.data.data
          for (let i = 0; i < data.length; i += 1) {
            data[i].label = `${data[i].no_partner} - ${data[i].full_name}`
          }
          this.hasMorePartner = response.data.data.total > data.length
          this.partnerItems = data
        })
    },
    async getFile(url) {
      const response = await fetch(url)
      const blob = await response.blob()
      const filename = url.split('/').pop()

      return new File([blob], filename, { type: blob.type })
    },
    fileUrl: file => URL.createObjectURL(file),
    fileName(file) {
      if (!file) return ''

      const { name } = file
      const { length } = name
      if (length <= 10) return name

      return `...${name.substring(length - 10, length)}`
    },
    deleteDocumentationFile(index) {
      if (this.documentationInitialFiles[index]) {
        this.documentationDeletedFiles.push(this.documentationInitialFiles[index])
        this.documentationInitialFiles.splice(index, 1)
      }

      if (this.documentationFiles.length === 1) {
        this.documentationFiles[index].file = null
        return
      }

      this.documentationFiles.splice(index, 1)
    },
    onChangeFile(index) {
      if (this.documentationInitialFiles[index]) {
        this.documentationDeletedFiles.push(this.documentationInitialFiles[index])
        this.documentationInitialFiles[index].attachment_url = ''
      }
    },
    async submitDeleteDocumentationFile() {
      const promises = this.documentationDeletedFiles.map(async item => this.deleteFile(item))
      await Promise.all(promises)
    },
    deleteFile(data) {
      return this.$http.get(`attachment/file/delete/${data.id}`)
    },
    addMoreFile() {
      this.documentationFileIndex += 1
      this.documentationFiles.push({ file: null, index: this.documentationFileIndex })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style scoped>
.file-group-item {
  transition: all 0.2s;
}

.file-group-item.fade-leave-active {
  position: absolute;
  width: calc(100% - 10px);
}
</style>
