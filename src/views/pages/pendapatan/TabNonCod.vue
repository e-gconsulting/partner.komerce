<template>
  <div class="wrappertab__content">
    <div
      class="d-flex justify-content-end"
    >
      <div class="mr-1">
        <flat-pickr
          v-model="rangeDate"
          class="form-control"
          :config="{ mode: 'range'}"
        />
      </div>
      <v-select
        v-model="selected"
        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        label="title"
        :options="option"
        style="width: 180px;"
      />
    </div>
    <div class="mt-2">
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
        <!-- <template #cell(transreturn)="data">
          <b>
            {{ data.item.trans }}
          </b>
          <br>
          <span class="text-secondary">
            {{ data.item.trans_return }}
          </span>
        </template> -->
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner
              class="align-middle"
            />
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {
  // BBadge,
  BTable,
  BSpinner,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    // BBadge,
    BTable,
    BSpinner,
    vSelect,
    flatPickr,
  },
  data() {
    return {
      rangeDate: '2021-09-01 to ',
      selected: { title: 'JNE' },
      option: [{ title: 'JNE' }, { title: 'JNT' }, { title: 'SiCepat' }],
      isLoadTable: false,
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      items: [
        {
          id: 1,
          name: 'Skylar Korsgaard',
          city: 'Yogyakarta',
          ongkir_cost: 'Rp 27.000.000',
          cod_cost: 'Rp 10.000.000',
          ongkir_profit: 'Rp 9.000.000',
          cod_profit: 'Rp 3.000.000',
        },
        {
          id: 2,
          name: 'Kaylynn Dorwart',
          city: 'Jakarta',
          ongkir_cost: 'Rp 27.000.000',
          cod_cost: 'Rp 10.000.000',
          ongkir_profit: 'Rp 9.000.000',
          cod_profit: 'Rp 3.000.000',
        },
      ],
      fields: [
        {
          key: 'name',
          label: 'Nama',
          sortable: true,
        },
        {
          key: 'city',
          label: 'Kota',
          sortable: true,
        },
        // A virtual column made up from two fields
        // {
        //   key: 'transreturn',
        //   label: 'Transaksi',
        // },
        {
          key: 'ongkir_cost',
          label: 'Nilai Ongkir',
          sortable: true,
        },
        {
          key: 'cod_cost',
          label: 'Nilai COD',
          sortable: true,
        },
        {
          key: 'ongkir_profit',
          label: 'Profit Ongkir',
          sortable: true,
        },
        {
          key: 'cod_profit',
          label: 'Profit COD',
          sortable: true,
        },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  watch: {
    rangeDate: {
      handler(val) {
        console.log(val)
      },
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  created() {
    this.fetchData()
    // check data from API when there is withdrawal pending/process in api
    // get data for series performa expedisi and performa partner
    // get data for select option kurir
    // get data for select option bulan or just hardcode
  },
  methods: {
    async fetchData() {
      // change this endpoint
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss" scoped>
.wrappertab__content{
  display: grid;
}
</style>
