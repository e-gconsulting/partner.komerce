<template>
  <section id="cod-data-partner-detail">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-body>
          <div class="d-flex align-items-center">
            <b-button
              variant="primary"
              size="sm"
              class="mr-2 btn-custom"
              @click="$router.go(-1)"
            >
              <feather-icon
                size="2x"
                icon="ChevronLeftIcon"
              />
            </b-button>
            <h4
              class="text-32-bold"
            >
              Daerah Tanpa Akses COD
            </h4>
          </div>

          <b-row>
            <b-col lg="3" />
            <b-col lg="3" />
            <b-col lg="3">
              <b-button
                block
                variant="outline-primary"
                class="btn-custom--editakseslayanan"
              >
                Import Excel / CSV
              </b-button>
            </b-col>
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
                  style="height: 56px;"
                />
              </b-input-group>
              <b-dropdown
                id="dropdown-search-tbl"
                ref="dropdownFilter"
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
  BTableSimple,
  BThead,
  BTbody,
  BTh,
  BTr,
  BTd,
  BInputGroup,
  BInputGroupPrepend,
  BDropdown,
  BDropdownForm,
  BFormInput,
  BFormGroup,
  BFormSelect,
  BButton,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BTableSimple,
    BThead,
    BTbody,
    BTh,
    BTr,
    BTd,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownForm,
    BFormInput,
    BFormGroup,
    BFormSelect,
    BButton,
    BCard,
    BSpinner,
    BCardBody,
  },
  data() {
    return {
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
    //
  },
  mounted() {
    //
  },
  created() {
    setTimeout(() => {
      this.loadDataAwal = false
    }, 1000)
  },
  methods: {
    onClickResetFilterDropdown() {
      //
    },
    onClickTerapkanFilterDropdown() {
      // Close the dropdown and (by passing true) return focus to the toggle button
      this.$refs.dropdownFilter.hide(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-custom{
  border-radius: 16px;
  width: 56px;
  height: 56px;

  &--edit{
    width: 178px;
    height: 56px;
    border-radius: 12px;
  }
  &--editakseslayanan{
    height: 56px;

    &btn{
      width: 178px;
      height: 56px;
    }
  }
}
.text-32-bold{
  font-weight: 600;
  font-size: 32px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #222222;
}
</style>
