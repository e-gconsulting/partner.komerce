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
                @click="handleImportExcelDaerahCOD"
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
                dropleft
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
                    v-model="filterDropdown.kota"
                    label="Kota / Kabupaten"
                    label-for="dropdown-form-kota"
                    @submit.stop.prevent
                  >
                    <b-form-input
                      id="dropdown-form-kota"
                      size="lg"
                      placeholder="Masukkan Kota / Kabupaten"
                    />
                  </b-form-group>
                  <b-form-group
                    v-model="filterDropdown.camat"
                    label="Kecamatan"
                    label-for="dropdown-form-camat"
                    @submit.stop.prevent
                  >
                    <b-form-input
                      id="dropdown-form-camat"
                      size="lg"
                      placeholder="Masukkan Kecamatan"
                    />
                  </b-form-group>
                  <b-form-group
                    v-model="filterDropdown.kodepos"
                    label="Kodepos"
                    label-for="dropdown-form-kodepos"
                    @submit.stop.prevent
                  >
                    <b-form-input
                      id="dropdown-form-kodepos"
                      size="lg"
                      placeholder="Masukkan Kodepos"
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
                    <b-th>Provinsi</b-th>
                    <b-th>Kabupaten</b-th>
                    <b-th>Kecamatan</b-th>
                    <b-th>Kelurahan</b-th>
                    <b-th>Kodepos</b-th>
                    <b-th />
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
                        {{ row.province }}
                      </span>
                    </b-td>
                    <b-td>
                      {{ row.kabupaten }}
                    </b-td>
                    <b-td>
                      {{ row.kecamatan }}
                    </b-td>
                    <b-td>
                      {{ row.kelurahan }}
                    </b-td>
                    <b-td>{{ row.zipcode }}</b-td>
                    <b-td>
                      <b-button
                        variant="primar-flat"
                        size="sm"
                        @click="deleteItem(row)"
                      >
                        <feather-icon
                          icon="TrashIcon"
                        />
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
              <div
                v-if="rowsTable.length === 0"
                class="text-center"
              >
                <span>
                  Sepertinya kamu belum menambahkan daerah yang tidak memiliki akses COD, Yuk mulai tambahkan sekarang!
                </span>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
      <b-modal
        id="modal-delete-daerah"
        ref="modal-delete-daerah"
        centered
        hide-header
        hide-header-close
        hide-footer
        size="md"
        no-stacking
      >
        <div class="text-center">
          <div class="py-1 delete-daerah-wrapper">
            <span
              class="text-20-bold"
              style="color: #222222;"
            >
              Hapus Wilayah Dari Daftar
            </span>
            <span
              class="text-16-normal mb-3 mt-1"
              style="color: #222222;"
            >
              Apakah kamu yakin untuk menghapus data wilayah tersebut dari daftar tanpa akses COD?
            </span>
            <div class="d-flex justify-content-center">
              <b-button
                variant="outline-primary"
                class="btn-custom-modal-delete mr-1 text-center"
                style="border-color: unset;"
                @click="handleTidakModal"
              >
                Batal
              </b-button>
              <b-button
                variant="primary"
                class="btn-custom-modal-delete text-center"
                @click="handleOkModal"
              >
                Lanjutkan
              </b-button>
            </div>
          </div>
        </div>
      </b-modal>
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
  BModal,
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
    BModal,
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
        kota: '',
        camat: '',
        kodepos: '',
      },
      rowsTable: [
        {
          id: 1,
          province: 'Jawa Tengah',
          kabupaten: 'Purbalingga',
          kecamatan: 'Padamara',
          kelurahan: 'Padamara',
          zipcode: 123451,
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
    handleImportExcelDaerahCOD() {
      this.$router.push('/biaya-ekspedisi/daerah-tanpa-akses/upload')
    },
    onClickResetFilterDropdown() {
      //
    },
    onClickTerapkanFilterDropdown() {
      // Close the dropdown and (by passing true) return focus to the toggle button
      this.$refs.dropdownFilter.hide(true)
    },
    deleteItem(row) {
      this.$bvModal.show('modal-delete-daerah')
      console.log(row)
    },
    handleOkModal() {
      // calling api
      this.$bvModal.hide('modal-delete-daerah')
    },
    handleTidakModal() {
      this.$bvModal.hide('modal-delete-daerah')
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
text-20{
  width: 671px;
  height: 60px;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #222222;
  text-align: center;
}
.delete-daerah-wrapper{
  display: grid;
}
</style>
