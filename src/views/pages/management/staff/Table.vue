<template>
  <div>
    <card-table
      ref="cardTable"
      :endpoint-get-all="endpointGetAll"
      :endpoint-delete="endpointDelete"
      :filters="filters"
      :fields="fields"
      :show-filter="toggleModal"
    />
    <b-modal
      id="form-modal"
      ref="formModal"
      title="Filter"
      centered
    >
      <validation-observer ref="formRules">
        <b-form @submit.stop.prevent="submit">
          <b-form-group
            label="Divisi"
            label-cols-md="4"
          >
            <validation-provider
              #default="{ errors }"
              name="Divisi"
            >
              <v-select
                v-model="divisionId"
                label="division_name"
                :reduce="option => option.id"
                :options="divisionItems"
                :state="errors.length > 0 ? false:null"
                :filterable="false"
                placeholder="Ketik untuk mencari..."
                transition=""
                @search="onSearchDivision"
              >
                <li
                  v-if="hasMoreDivision"
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
        </b-form>
      </validation-observer>

      <template #modal-footer>
        <b-form-row class="align-items-center w-100">
          <b-col md>
            <b-button
              size="sm"
              variant="flat-danger"
              class="px-50 ml-n50"
              @click="resetForm"
            >
              Reset Filter
            </b-button>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="light"
              @click="toggleModal"
            >
              Cancel
            </b-button>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="primary"
              @click="handleOk"
            >
              Terapkan
            </b-button>
          </b-col>
        </b-form-row>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CardTable from '@/views/components/CardTable.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BButton, BCol, BForm, BFormGroup, BFormRow, BModal,
} from 'bootstrap-vue'
import { min, required } from '@core/utils/validations/validations'
import vSelect from 'vue-select'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormRow,
    BCol,
    CardTable,
    BModal,
    vSelect,
    BFormGroup,
    BForm,
    BButton,
  },
  data() {
    return {
      endpointGetAll: '/staff',
      endpointDelete: '/staff/:id',
      fields: [
        {
          key: 'staff.id', sortKey: 'id', label: 'Id', sortable: true, sortDirection: 'desc',
        },
        { key: 'full_name', label: 'Nama', sortable: true },
        { key: 'division_name', label: 'Divisi' },
        { key: 'position_name', label: 'Posisi' },
        { key: 'office_name', label: 'Kantor' },
      ],

      required,
      min,

      divisionId: '',
      hasMoreDivision: false,
      divisionItems: [],
    }
  },
  computed: {
    filters() {
      return {
        division_id: this.divisionId,
      }
    },
  },
  mounted() {
    this.loadDivisions()
  },
  methods: {
    toggleModal() {
      this.$refs.formModal.toggle()
    },
    handleOk(event) {
      event.preventDefault()
      this.submit()
    },
    resetForm() {
      this.name = ''
    },
    submit() {
      this.$refs.formRules.validate().then(success => {
        if (success) {
          this.$refs.cardTable.refreshTable()

          this.$nextTick(() => {
            this.$refs.formModal.toggle()
          })
        }
      })
    },
    onSearchDivision(search, loading) {
      if (search.length) {
        this.searchDivision(loading, search, this)
      }
    },
    searchDivision: _.debounce((loading, search, that) => {
      loading(true)
      that.loadDivisions(search).finally(() => loading(false))
    }, 500),
    loadDivisions(search) {
      return this.$http.get('/division', {
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
          this.hasMoreDivision = response.data.data.total > data.length
          this.divisionItems = data
        })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
