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
                    <b-th>Nama</b-th>
                    <b-th>Nama Bank</b-th>
                    <b-th>No Rekening</b-th>
                    <b-th>Nominal</b-th>
                    <b-th>Status</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr
                    v-for="row in rowsTable"
                    :key="row.userId"
                  >
                    <b-td
                      class="font-weight-bolder"
                    >
                      <span>
                        {{ row.name }}
                      </span>
                      <br>
                      <span>
                        {{ row.email }}
                      </span>
                    </b-td>
                    <b-td>
                      {{ row.bankName }}
                    </b-td>
                    <b-td>{{ row.bankNo }}</b-td>
                    <b-td
                      class="font-weight-bolder"
                    >
                      {{ row.nominal }}
                    </b-td>
                    <b-td
                      :class="colorStatus(row.status)"
                    >
                      {{ row.status }}
                    </b-td>
                  </b-tr>
                </b-tbody>
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
  // BTfoot,
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
    // BTfoot,
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
      rowsTable: [
        {
          userId: 1,
          name: 'Hanif Muflihul',
          email: 'hallobusiness@gmail.com',
          bankName: 'Bank Mandiri',
          bankNo: 9000021233213,
          nominal: 4500000,
          status: 'Perlu disetujui',
        },
        {
          userId: 11,
          name: 'Terry Siphron',
          email: 'hallobusiness@gmail.com',
          bankName: 'Bank Mandiri',
          bankNo: 9000021233213,
          nominal: 5000000,
          status: 'Sedang direview',
        },
        {
          userId: 21,
          name: 'Kadin Franci',
          email: 'hallobusiness@gmail.com',
          bankName: 'Bank Mandiri',
          bankNo: 9000021233213,
          nominal: 5000000,
          status: 'Disetujui',
        },
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
    // get data tabel pencairan
    // get data for select option status
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
    colorStatus(status) {
      let classStatusColor = ''
      switch (status) {
        case 'Perlu disetujui':
          // #FF6A3A
          classStatusColor = 'colorStatusPrimary'
          break
        case 'Sedang direview':
          // #FBA63C
          classStatusColor = 'colorStatusWarning'
          break
        case 'Disetujui':
          // #34A770
          classStatusColor = 'colorStatusSuccess'
          break
        default:
          break
      }
      return classStatusColor
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
.colorStatusPrimary{
  color: #FF6A3A;
}
.colorStatusSuccess{
  color: #34A770;
}
.colorStatusWarning{
  color: #FBA63C;
}
</style>
