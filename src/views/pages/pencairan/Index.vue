<template>
  <section id="cod-pencairan">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-header class="custom-card-header">
          <b-row style="width: 100%;">
            <b-col
              md="12"
              class="dashboard-report-wrapper"
            >
              <h4 class="card-title">
                Antrian Penarikan
              </h4>
            </b-col>
          </b-row>
        </b-card-header>

        <b-card-body>
          <b-row>
            <b-col lg="3" />
            <b-col lg="3" />
            <b-col lg="3" />
            <b-col
              sm="12"
              lg="3"
              class="d-flex"
            >
              <b-input-group class="input-group-merge mr-1">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="field-search-for-tbl"
                  v-model="searchTerm"
                  placeholder="Search"
                />
              </b-input-group>
              <b-dropdown
                id="dropdown-search-tbl"
                ref="dropdownFilter"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                right
                no-caret
                variant="primary"
              >
                <template
                  #button-content
                >
                  <feather-icon icon="SlidersIcon" />
                </template>
                <b-dropdown-form
                  style="width: 417px;"
                >
                  <b-form-group
                    v-model="filterDropdown.name"
                    label="Nama"
                    label-for="dropdown-form-nama"
                    @submit.stop.prevent
                  >
                    <b-form-input
                      id="dropdown-form-nama"
                      size="lg"
                      placeholder="Masukkan Nama"
                    />
                  </b-form-group>

                  <b-form-group
                    label="Status"
                    label-for="dropdown-form-status"
                  >
                    <b-form-select
                      id="dropdown-form-status"
                      v-model="filterDropdown.selectedStatus"
                      size="lg"
                      class="mb-2"
                      :options="optionsStatus"
                      placeholder="Pilih Status"
                    />
                  </b-form-group>
                  <div class="d-flex justify-content-end">
                    <b-button
                      variant="outline-primary"
                      size="lg"
                      class="mr-2"
                      @click="onClickResetFilterDropdown"
                    >
                      Reset
                    </b-button>
                    <b-button
                      variant="primary"
                      size="lg"
                      @click="onClickTerapkanFilterDropdown"
                    >
                      Terapkan
                    </b-button>
                  </div>
                </b-dropdown-form>
              </b-dropdown>
            </b-col>
            <b-col
              lg="12"
              class="mt-2"
            >
              <b-table-simple responsive>
                <b-thead>
                  <b-tr>
                    <b-th sticky-column>
                      Sticky Column Header
                    </b-th>
                    <b-th>Heading 1</b-th>
                    <b-th>Heading 2</b-th>
                    <b-th>Heading 3</b-th>
                    <b-th>Heading 4</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr>
                    <b-th sticky-column>
                      Sticky Column Row Header
                    </b-th>
                    <b-td>Cell</b-td>
                    <b-td>Cell</b-td>
                    <b-td>Cell</b-td>
                    <b-td>Cell</b-td>
                  </b-tr>
                  <b-tr>
                    <b-th sticky-column>
                      Sticky Column Row Header
                    </b-th>
                    <b-td>Cell</b-td>
                    <b-td>Cell</b-td>
                    <b-td>Cell</b-td>
                    <b-td>Cell</b-td>
                  </b-tr>
                </b-tbody>
                <b-tfoot>
                  <b-tr>
                    <b-th sticky-column>
                      Sticky Column Footer
                    </b-th>
                    <b-th>Heading 1</b-th>
                    <b-th>Heading 2</b-th>
                    <b-th>Heading 3</b-th>
                    <b-th>Heading 4</b-th>
                  </b-tr>
                </b-tfoot>
              </b-table-simple>
            </b-col>

          </b-row>
        </b-card-body>
      </b-card>
    </div>

    <div
      v-else
      class="text-center"
    >
      <b-spinner
        variant="primary"
        label="Text Centered"
      />
    </div>
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BFormInput,
  BFormGroup,
  BDropdownForm,
  BTableSimple,
  BThead,
  BTbody,
  BTh,
  BTr,
  BTd,
  BTfoot,
  BInputGroup,
  BInputGroupPrepend,
  BDropdown,
  // BDropdownItem,
  // BAlert,
  BButton,
  // BAvatar,
  BSpinner,
  BCardBody,
  // BListGroup,
  BCardHeader,
  BFormSelect,
  // BButtonGroup,
  // BListGroupItem,
} from 'bootstrap-vue'
// import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'

// import store from '@/store/index'
// import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BFormInput,
    BTableSimple,
    BThead,
    BTbody,
    BTh,
    BTr,
    BTd,
    BTfoot,
    BInputGroup,
    BFormGroup,
    BDropdownForm,
    BInputGroupPrepend,
    BDropdown,
    // BDropdownItem,
    // BAlert,
    BButton,
    // BAvatar,
    BSpinner,
    BCardBody,
    // BListGroup,
    BFormSelect,
    BCardHeader,
    // BButtonGroup,
    // VueApexCharts,
    // BListGroupItem,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      dir: false,
      alertshow: false,
      loadDataAwal: true,
      rows: [],
      searchTerm: '',
      filterDropdown: {
        name: '',
        selectedStatus: null,
      },
      optionsStatus: [
        { value: null, text: 'Pilih Status' },
        { value: 'Aktif', text: 'Aktif' },
        { value: 'Tidak Aktif', text: 'Tidak Aktif' },
      ],
    }
  },
  computed: {
    //
  },
  watch: {
    searchTerm: {
      handler() {
        this.fetchData({ searchTerm: this.searchTerm })
      },
    },
  },
  mounted() {
    //
  },
  created() {
    this.loadDataAwal = false
    // this.fetchData()
    // check data from API when there is withdrawal pending/process in api
    // get data for series performa expedisi and performa partner
    // get data for select option kurir
    // get data for select option bulan or just hardcode
  },
  methods: {
    kFormatter,
    onClickResetFilterDropdown() {
      //
    },
    onClickTerapkanFilterDropdown() {
      // Close the dropdown and (by passing true) return focus to the toggle button
      this.$refs.dropdownFilter.hide(true)
    },
    async fetchData(params) {
      // change this endpoint
      const endpoint = 'https://jsonplaceholder.typicode.com/posts'
      if (params) {
        this.$http.get(endpoint, { params: { ...params } })
          .then(data => {
            const newParseData = data.data.map(x => {
              const dt = {
                title: x.title,
                body: x.body.substring(0, 15),
              }
              return dt
            })
            this.rows = newParseData
          })
          .catch(e => {
            console.log('error', e)
          })
          .finally(() => {
            this.loadDataAwal = false
          })
      } else {
        this.$http.get(endpoint)
          .then(data => {
            const newParseData = data.data.map(x => {
              const dt = {
                title: x.title,
                body: x.body.substring(0, 15),
              }
              return dt
            })
            this.rows = newParseData
          })
          .catch(e => {
            console.log('error', e)
          })
          .finally(() => {
            this.loadDataAwal = false
          })
      }
    },
    toPage(params = '') {
      console.log(params)
      // make sure to pass params on router base for changing page
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-custom-topcodnoncod{
  @media only screen and (max-width: 390px) {
    padding: 10px;
  }
}
</style>
