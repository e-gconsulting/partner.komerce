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
              <h3 class="card-title">
                Antrian Penarikan
              </h3>
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
                    v-model="filterDropdown.partner_name"
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
                        {{ row.partner_name }}
                      </span>
                      <br>
                      <span>
                        {{ row.partner_email }}
                      </span>
                    </b-td>
                    <b-td>
                      {{ row.bank_name }}
                    </b-td>
                    <b-td>
                      {{ row.bank_account_no }}
                      <br>
                      {{ row.bank_account_name }}
                    </b-td>
                    <b-td
                      class="font-weight-bolder text-right"
                    >
                      {{ row.nominal }}
                    </b-td>
                    <b-td
                      style="cursor: pointer;"
                    >
                      <!-- <b-link
                        :to="{ name: 'cod-rincian-penarikan-saldo', params: { slug: row.status.replace(' ','-') } }"
                      > -->
                      <span
                        :class="colorStatus(row.status)"
                      >
                        {{ row.status }}
                      </span>
                      <!-- </b-link> -->
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>

              <b-table
                striped
                hover
                responsive
                :per-page="perPage"
                :current-page="currentPage"
                :items="items"
                :busy="isLoadTable"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <!-- A virtual composite column -->
                <template #cell(detailName)="data">
                  <b>
                    {{ data.item.name }}
                  </b>
                  <br>
                  <span
                    class="text-secondary"
                    style="color: #222222;"
                  >
                    {{ data.item.email }}
                  </span>
                </template>
                <template #cell(servicesCustom)="data">
                  <div class="d-flex">
                    <div
                      v-for="(itm,idx) in data.item.services"
                      :key="idx"
                    >
                      <img
                        :src="require('@/assets/images/logo/logo.png')"
                        :title="itm"
                        alt="logo"
                        width="29px"
                        height="29px"
                        style="border-radius: 15px;"
                      >
                    </div>
                  </div>
                </template>
                <template #cell(detailPartner)="data">
                  <b-button
                    variant="flat-info"
                    @click="detailPartner(data.item.id)"
                  >
                    Lihat Detail...
                  </b-button>
                </template>
                <template #cell(arsipkanPartner)="data">
                  <b-button
                    v-b-modal.modal-konfirmasi-arsip
                    variant="flat-default"
                    @click="arsipkanBtnPartner(data.item.id)"
                  >
                    <feather-icon icon="ArchiveIcon" />
                  </b-button>
                </template>
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner
                      class="align-middle"
                    />
                    <strong>Loading...</strong>
                  </div>
                </template>
              </b-table>

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
  // BLink,
  BFormInput,
  BFormGroup,
  BDropdownForm,
  BTable,
  BTableSimple,
  BThead,
  BTbody,
  BTh,
  BTr,
  BTd,
  BInputGroup,
  BInputGroupPrepend,
  BDropdown,
  BButton,
  BSpinner,
  BCardBody,
  BCardHeader,
  BFormSelect,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import axioskomsipdev from '@/libs/axioskomsipdev'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    // BLink,
    BFormInput,
    BTable,
    BTableSimple,
    BThead,
    BTbody,
    BTh,
    BTr,
    BTd,
    BInputGroup,
    BFormGroup,
    BDropdownForm,
    BInputGroupPrepend,
    BDropdown,
    BButton,
    BSpinner,
    BCardBody,
    BFormSelect,
    BCardHeader,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      alertshow: false,
      loadDataAwal: true,
      searchTerm: '',
      filterDropdown: {
        partner_name: '',
        selectedStatus: null,
      },
      optionsStatus: [
        { value: null, text: 'Pilih Status' },
        { value: 'completed', text: 'Completed' },
        { value: 'requested', text: 'Canceled' },
        { value: 'canceled', text: 'Canceled' },
        { value: 'on_review', text: 'On Review' },
        { value: 'rejected', text: 'Rejected' },
      ],
      rowsTable: [],
      isLoadTable: false,
      perPage: 5,
      // pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      items: [
        {
          id: 1,
          name: 'Skylar Korsgaard',
          email: 'hallobusiness@gmail.com',
          username: 'Hanifsaja',
          no_hp: 'Rp 27.000.000',
          services: [1, 2, 3],
        },
        {
          id: 2,
          name: 'Skylar Korsgaard',
          email: 'hallobusiness@gmail.com',
          username: 'Hanifsaja',
          no_hp: 'Rp 27.000.000',
          services: [1, 2, 3],
        },
      ],
      fields: [
        // A virtual column made up from two fields
        {
          key: 'detailName',
          label: 'Nama',
        },
        {
          key: 'username',
          label: 'Username',
          sortable: true,
        },
        {
          key: 'no_hp',
          label: 'No Handphone',
          sortable: true,
        },
        {
          key: 'servicesCustom',
          label: 'Layanan yang digunakan',
        },
        {
          key: 'detailPartner',
          label: '',
        },
        {
          key: 'arsipkanPartner',
          label: '',
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
        this.fetchData({ partner_name: this.searchTerm })
      },
    },
  },
  mounted() {
    this.fetchData()
    //
  },
  created() {
    //
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    kFormatter,
    onClickResetFilterDropdown() {
      this.filterDropdown = {
        partner_name: '',
        selectedStatus: null,
      }
    },
    onClickTerapkanFilterDropdown() {
      this.fetchData({ ...this.filterDropdown })
      // Close the dropdown and (by passing true) return focus to the toggle button
      this.$refs.dropdownFilter.hide(true)
    },
    colorStatus(status) {
      let classStatusColor = ''
      switch (status) {
        case 'on_review':
          // #FBA63C
          classStatusColor = 'colorStatusWarning'
          break
        case 'rejected':
          // #FBA63C
          classStatusColor = 'colorStatusWarning'
          break
        case 'completed':
          // #34A770
          classStatusColor = 'colorStatusSuccess'
          break
        default:
          // #FF6A3A
          classStatusColor = 'colorStatusPrimary'
          break
      }
      return classStatusColor
    },
    fetchData(params) {
      // change this endpoint
      const endpoint = '/api/v1/admin/withdrawal/list'
      if (params) {
        axioskomsipdev.get(endpoint, { params: { ...params } })
          .then(({ data }) => {
            const parseData = JSON.parse(JSON.stringify(data.data))
            this.rowsTable = parseData
          })
          .catch(e => {
            console.log('error', e)
          })
          .finally(() => {
            this.loadDataAwal = false
          })
      } else {
        axioskomsipdev.get(endpoint)
          .then(({ data }) => {
            const parseData = JSON.parse(JSON.stringify(data.data))
            this.rowsTable = parseData
          })
          .catch(e => {
            console.log('error', e)
          })
          .finally(() => {
            this.loadDataAwal = false
          })
      }

      // this.$nextTick(function () {
      //   console.log('338 :', this.row)
      // })
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
