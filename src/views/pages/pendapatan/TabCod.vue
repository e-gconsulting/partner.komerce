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
import axioskomsipdev from '@/libs/axioskomsipdev'

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
      payment_method: 'COD',
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
          cod_cost: '-',
          ongkir_profit: 'Rp 9.000.000',
          cod_profit: '-',
        },
        {
          id: 2,
          name: 'Kaylynn Dorwart',
          city: 'Jakarta',
          ongkir_cost: 'Rp 27.000.000',
          cod_cost: '-',
          ongkir_profit: 'Rp 9.000.000',
          cod_profit: '-',
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
        // calling api
        if (val.indexOf('to') !== -1) {
          const [startDate, endDate] = val.split(' to ')
          console.log({ startDate, endDate })
          this.fetchData({ start_date: startDate, end_date: endDate })
        } else {
          console.log(val)
          this.fetchData({ start_date: val, end_date: val })
        }
      },
    },
    selected: {
      handler(val) {
        console.log(val.title)
        this.fetchData({ shipping: val.title })
      },
    },
  },
  mounted() {
    // Set the initial number of items
    // items set after calling api
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
    fetchData(params) {
      console.log('params fetch data: ', params)
      const endpoint = '/api/v1/admin/finance/income'
      let getData = null
      if (params) {
        getData = axioskomsipdev.get(endpoint, { params: { ...params, payment_method: this.payment_method } })
      } else {
        getData = axioskomsipdev.get(endpoint)
      }

      getData.then(({ data }) => {
        /*
          "data": {
            "profit": {
              "total_shipping_profit": 200000,
              "total_cod_profit": 300000
            },
            "incomes": [
              {
                "partner_name": "Tatausahaku",
                "district": "Purbalingga",
                "shipping_cost": 1000000,
                "grandtotal": 20000000,
                "shipping_profit": 250000,
                "net_profit": 1900000
              },
              {
                "partner_name": "Tatausahamu",
                "district": "Jakarta",
                "shipping_cost": 1000000,
                "grandtotal": 20000000,
                "shipping_profit": 250000,
                "net_profit": 1900000
              }
            ]
          }
        */
        const parseData = JSON.parse(JSON.stringify(data.data))
        this.items = parseData.incomes
        this.$emit('totalCodFunc', parseData.profit.total_shipping_profit)
        this.$emit('totalOngkirFunc', parseData.profit.total_cod)
        this.totalRows = parseData.length
      })
        .catch(e => {
          console.log('error', e)
        })
        .finally(() => {
          this.loadDataAwal = false
        })
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
