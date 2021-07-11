<template>
  <b-card-actions
    ref="formCard"
    :title="`Manage ${$route.meta.name.singular}`"
    no-actions
    :show="loading"
  >
    <b-row>
      <b-col md="6">
        <!-- form -->
        <validation-observer ref="formRules">
          <b-form>
            <b-row>
              <b-col md="12">
                <b-form-group label="Menu" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Menu"
                    rules="required"
                  >
                    <v-select
                      v-model="menu_id"
                      label="name"
                      :reduce="option => option.id"
                      :options="menuItems"
                      placeholder="Ketik untuk mencari..."
                      @search="onSearchMenu"
                    >
                      <li
                        v-if="hasMoreMenu"
                        slot="list-footer"
                        class="
                          vs__dropdown-option vs__dropdown-option--disabled
                        "
                      >
                        <feather-icon icon="MoreHorizontalIcon" size="16" />
                      </li>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
                <b-form-group label="Posisi" label-cols-md="4">
                  <validation-provider
                    #default="{ errors }"
                    name="Posisi"
                    rules="required"
                  >
                    <v-select
                      v-model="position_id"
                      label="position_name"
                      :reduce="option => option.id"
                      :options="positionItems"
                      placeholder="Ketik untuk mencari..."
                      @search="onSearchPosition"
                    >
                      <li
                        v-if="hasMorePosition"
                        slot="list-footer"
                        class="
                          vs__dropdown-option vs__dropdown-option--disabled
                        "
                      >
                        <feather-icon icon="MoreHorizontalIcon" size="16" />
                      </li>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="12">
                <hr />
                <h3>Access:</h3>
                <b-row
                  v-for="access in listAccess"
                  :key="access.id"
                  class="mb-1"
                >
                  <b-col md="4">
                    <h5>
                      {{ access.access_name }}
                    </h5>
                  </b-col>
                  <b-col md="8">
                    <b-form-checkbox
                      v-model="checked"
                      name="check-button"
                      switch
                    >
                    </b-form-checkbox>
                  </b-col>
                </b-row>
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
  BFormGroup,
  BForm,
  BRow,
  BCol,
  VBTooltip,
  BFormCheckbox,
} from 'bootstrap-vue'
import { required, integer } from '@validations'
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  components: {
    BCardActions,
    ValidationProvider,
    ValidationObserver,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BFormCheckbox,
    vSelect,
  },
  data() {
    return {
      id: this.$route.params.id,
      submitErrors: '',
      loading: false,

      required,
      integer,

      hasMorePosition: false,
      positionItems: [],
      position_id: '',
      hasMoreMenu: false,
      menuItems: [],
      menu_id: '',
      listAccess: [],
      checked: false,
    }
  },
  computed: {
    successText() {
      return `Satu ${this.$route.meta.name.singular} berhasil diperbaharui`
    },
  },
  async mounted() {
    this.loadPositions()
    this.loadMenus()
    this.getAccess()
  },
  methods: {
    onSearchPosition(search, loading) {
      if (search.length) {
        this.searchPosition(loading, search, this)
      }
    },
    searchPosition: _.debounce((loading, search, that) => {
      this.loading = true
      that.loadPositions(search).finally(() => loading(false))
    }, 500),
    loadPositions(search) {
      this.loading = true
      return this.$http
        .post(
          '/position/pagination',
          {},
          {
            params: {
              division_id: this.divisionId,
              position_name: search,
              page: 1,
              limit: 5,
              sort: 'name',
              direction: 'asc',
            },
          },
        )
        .then(async response => {
          const { data } = response.data.data
          this.positionItems = Object.keys(data).map(key => data[key])
          this.hasMorePosition = response.data.data.total > this.positionItems.length
        })
        .finally(() => {
          this.loading = false
        })
    },
    onSearchMenu(search, loading) {
      if (search.length) {
        this.searchMenu(loading, search, this)
      }
    },
    searchMenu: _.debounce((loading, search, that) => {
      this.loading = true
      that.loadMenus(search).finally(() => loading(false))
    }, 500),
    loadMenus(search) {
      this.loading = true
      return this.$http
        .get('/menu', {
          params: {
            parent_menu_id: 4,
            keyword: search,
          },
        })
        .then(response => {
          const { data } = response.data
          this.menuItems = data
          this.hasMoreMenu = response.data.data.total > this.menuItems.length
        })
        .finally(() => {
          this.loading = false
        })
    },
    getAccess() {
      this.loading = true
      this.$http
        .get('menu/access')
        .then(({ data }) => {
          this.listAccess = data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
