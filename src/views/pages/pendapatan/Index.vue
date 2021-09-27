<template>
  <section id="cod-pendapatan">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-body>
          <div class="wrapper__performa">
            <h3
              class="text-24-bold"
              style="color: #222222;"
            >
              Performa Partner
            </h3>
            <div class="wrapper__total">
              <div
                class="container__total mr-1"
              >
                <span
                  class="text__total-label"
                  style="color: #828282;font-size: 20px;font-weight: 500;"
                >
                  Total Profit Ongkir
                </span>
                <span
                  class="text__total"
                >
                  Rp 54.000.000
                </span>
              </div>
              <div
                class="container__total"
              >
                <span
                  class="text__total-label"
                  style="color: #828282;font-size: 20px;font-weight: 500;"
                >
                  Total Profit COD
                </span>
                <span
                  class="text__total"
                >
                  Rp 19.000.000
                </span>
              </div>
            </div>
          </div>
          <b-tabs
            content-class="mt-1"
            class="mt-1"
            active-nav-item-class="font-weight-bold text-danger"
            active-tab-class="font-weight-bold text-danger"
            justified
          >
            <!-- This tabs content will always be mounted -->
            <b-tab
              title="COD"
            >
              <tab-cod />
            </b-tab>

            <!-- and will be un-mounted when hidden -->
            <b-tab
              title="Non - COD"
              lazy
            >
              <tab-non-cod />
            </b-tab>
            <!-- and will be un-mounted when hidden -->
            <b-tab
              title="Keduanya"
              lazy
            >
              <tab-keduanya />
            </b-tab>
          </b-tabs>
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
  // BRow,
  BTab,
  BTabs,
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'
import TabCod from './TabCod.vue'
import TabNonCod from './TabNonCod.vue'
import TabKeduanya from './TabKeduanya.vue'

export default {
  components: {
    // BRow,
    // BBadge,
    BTab,
    BTabs,
    BCard,
    // BTable,
    BSpinner,
    BCardBody,
    TabCod,
    TabNonCod,
    TabKeduanya,
  },
  data() {
    return {
      loadDataAwal: true,
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
    //
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style lang="scss" scoped>
.wrapper__performa{
  display: flex;
  justify-content: space-between;
}
.wrapper__total{
  display: flex;
}
.container__total{
  width: 320px;
  height: 133px;
  display: grid;
  padding: 24px;
  border: 1px solid #828282;
  border-radius: 16px;
}
.text__total{
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 150%;
  align-items: center;
  letter-spacing: 0.5px;
  color: #222222;

  &-label{
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    align-items: center;
    letter-spacing: 0.5px;
    color: #828282;
  }
}
@media screen and (max-width: 1000px) {
  .wrapper__performa{
    display: grid;
    justify-content: center;
    text-align: center;
  }
  .wrapper__total{
    display: grid;
    grid-row-gap: 1rem;
  }
}
</style>
