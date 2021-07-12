<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card-actions
      ref="formCard"
      :title="`Manage ${$route.meta.name.singular}`"
      no-actions
    >
      <b-row>
        <b-col md="6">
          <!-- form -->
          <validation-observer ref="formRules">
            <b-form>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Posisi" label-cols-md="4">
                    <validation-provider
                      #default="{ errors }"
                      name="Posisi"
                      rules=""
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
                <b-col v-if="position_id">
                  <b-button variant="primary">Assign Position</b-button>
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
  </b-overlay>
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
  BOverlay,
  BButton,
} from 'bootstrap-vue'
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
    BOverlay,
    BButton,
  },
  data() {
    return {
      id: this.$route.params.id,
      submitErrors: '',
      loading: false,

      assignedPositions: [],
      hasMorePosition: false,
      positionItems: [],
      position_id: '',
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
    await this.loadAssignedPositions()
    await this.loadPositions()
    this.getAccess()
  },
  methods: {
    loadAssignedPositions() {
      this.loading = true
      return this.$http
        .get('menu/getPositionAccess', {
          params: {
            menu_id: this.id,
          },
        })
        .then(({ data }) => {
          this.assignedPositions = data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
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
              is_division_external: 1,
            },
          },
        )
        .then(response => {
          const { data } = response.data.data
          this.positionItems = data.filter(
            position => !this.assignedPositions.some(
              assignedPosition => assignedPosition.id === position.id,
            ),
          )
          const positionItemsLength = this.positionItems.length
          this.hasMorePosition = response.data.data.total - positionItemsLength > positionItemsLength
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
