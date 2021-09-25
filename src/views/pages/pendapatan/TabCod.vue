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
        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
        <!-- A virtual composite column -->
        <template #cell(transreturn)="data">
          <b>
            {{ data.item.trans }}
          </b>
          <br>
          <span class="text-secondary">
            {{ data.item.trans_return }}
          </span>
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
    </div>
  </div>
</template>

<script>
import {
  BBadge,
  BTable,
  BSpinner,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BBadge,
    BTable,
    BSpinner,
    vSelect,
    flatPickr,
  },
  data() {
    return {
      rangeDate: '2021-09-01 to 2021-09-03',
      selected: { title: 'JNE' },
      option: [{ title: 'JNE' }, { title: 'JNT' }, { title: 'SiCepat' }],
      isLoadTable: false,
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
      fields: [
        {
          key: 'id',
          label: 'Id',
        },
        {
          key: 'tgl',
          label: 'Tanggal',
          sortable: true,
        },
        // A virtual column made up from two fields
        {
          key: 'transreturn',
          label: 'Transaksi',
        },
        {
          key: 'nom_trans',
          label: 'Nilai Transaksi',
        },
        {
          key: 'ongkir',
          label: 'Ongkos Kirim',
        },
        {
          key: 'cod_cost',
          label: 'Biaya COD',
        },
        {
          key: 'saldo',
          label: 'Saldo',
        },
      ],
      items: [
        {
          id: 1,
          tgl: '12-08-2021',
          trans: 'Transfer Bank',
          trans_return: 'Return',
          nom_trans: 'Rp100.000',
          ongkir: 'Rp7.500',
          ongkir_return: 'Rp3.500',
          cod_cost: 'Rp2.500',
          saldo: '+Rp89.700',
        },
        {
          id: 2,
          tgl: '12-02-2022',
          trans: 'Transfer Bank',
          trans_return: 'Return',
          nom_trans: 'Rp100.000',
          ongkir: 'Rp7.500',
          ongkir_return: 'Rp3.500',
          cod_cost: 'Rp2.500',
          saldo: '-Rp7.500',
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
