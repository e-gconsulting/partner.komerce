<template>
  <section id="dashboard-home">
    <h5 class="dashboard-title">
      DASHBOARD
    </h5>
    <div>
      <b-alert
        show
        variant="warning"
        class="d-flex justify-content-between align-items-center px-1 wrapper-warning-pemintaan-saldo"
      >
        <span class="text-warning-pemintaan-saldo">
          Anda masih memiliki permintaan penarikan saldo, segera cek sekarang!
        </span>
        <b-button
          variant="gradient-warning"
          class="btn-warning-pemintaan-saldo"
        >
          <span>11</span>
        </b-button>
      </b-alert>

    </div>
    <b-row class="match-height">
      <!-- Ekspedisi -->
      <b-col
        lg="6"
      >
        <b-card
          no-body
          class="card-dashboard"
        >
          <b-row class="mx-0">
            <b-col
              md="12"
              class="dashboard-report-wrapper"
            >
              <div class="d-sm-flex justify-content-between align-items-center mb-3">
                <h4 class="card-title mb-50 mb-sm-0">
                  Perfoma Ekspedisi
                </h4>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center mr-2">
                    <v-select
                      v-model="selectedKurir"
                      :options="optionsKurir"
                      :reduce="x => x.value"
                      label="text"
                      class="select-form"
                    />
                  </div>
                  <div class="d-flex align-items-center">
                    <v-select
                      v-model="selectedBulan"
                      :options="optionsBulan"
                      :reduce="x => x.value"
                      label="text"
                      class="select-form"
                    />
                  </div>
                </div>
              </div>

              <!-- chart -->
              <vue-apex-charts
                id="dashboard-report-chart-1"
                type="area"
                height="350"
                width="100%"
                :options="chartOptionsComputed"
                :series="dashboardReport.subscribersGained.series"
              ></vue-apex-charts>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col
        lg="6"
      >
        <b-card
          no-body
          class="card-dashboard"
        >
          <b-row class="mx-0">
            <b-col
              md="12"
              class="dashboard-report-wrapper"
            >
              <div class="d-sm-flex justify-content-between align-items-center mb-3">
                <h4 class="card-title mb-50 mb-sm-0">
                  Top Ekspedisi
                </h4>
                <div class="d-flex align-items-center">
                  <b-button-group>
                    <b-button
                      variant="outline-primary"
                      @click="choosenFilterTop('cod', 'filterTopEkspedisi')"
                    >
                      COD
                    </b-button>
                    <b-button
                      variant="outline-primary"
                      @click="choosenFilterTop('ncod', 'filterTopEkspedisi')"
                    >
                      Non-COD
                    </b-button>
                  </b-button-group>
                </div>
              </div>
              <div class="tbl-dashboard-top">
                <b-list-group v-if="rows.length > 0">
                  <b-list-group-item
                    v-for="row in rows"
                    :key="row.title"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex justify-content-between">
                      <b-avatar
                        :src="row.avatar || 'https://via.placeholder.com/52x52'"
                        class="mr-1"
                      />
                      <span class="text-top-each-item">{{ row.title.substring(0,5) }}</span>
                    </div>
                    <span class="total-top-each-item">
                      {{ row.body }}
                    </span>
                  </b-list-group-item>
                </b-list-group>
                <span v-else>
                  no data
                </span>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <!-- Partner -->
      <b-col
        lg="6"
      >
        <b-card
          no-body
          class="card-dashboard"
        >
          <b-row class="mx-0">
            <b-col
              md="12"
              class="dashboard-report-wrapper"
            >
              <div class="d-sm-flex justify-content-between align-items-center mb-3">
                <h4 class="card-title mb-50 mb-sm-0">
                  Perfoma Partner
                </h4>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center mr-2">
                    <v-select
                      v-model="selectedKurir"
                      :options="optionsKurir"
                      :reduce="x => x.value"
                      label="text"
                      class="select-form"
                    />
                  </div>
                  <div class="d-flex align-items-center">
                    <v-select
                      v-model="selectedBulan"
                      :options="optionsBulan"
                      :reduce="x => x.value"
                      label="text"
                      class="select-form"
                    />
                  </div>
                </div>
              </div>

              <!-- chart -->
              <vue-apex-charts
                id="dashboard-report-chart-1"
                type="area"
                height="350"
                width="100%"
                :options="chartOptionsComputed"
                :series="dashboardReport.subscribersGained.series"
              ></vue-apex-charts>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col
        lg="6"
      >
        <b-card
          no-body
          class="card-dashboard"
        >
          <b-row class="mx-0">
            <b-col
              md="12"
              class="dashboard-report-wrapper"
            >
              <div class="d-sm-flex justify-content-between align-items-center mb-3">
                <h4 class="card-title mb-50 mb-sm-0">
                  Top Partner
                </h4>
                <div class="d-flex align-items-center">
                  <b-button-group>
                    <b-button
                      variant="outline-primary"
                      @click="choosenFilterTop('cod', 'filterTopPartner')"
                    >
                      COD
                    </b-button>
                    <b-button
                      variant="outline-primary"
                      @click="choosenFilterTop('ncod', 'filterTopPartner')"
                    >
                      Non-COD
                    </b-button>
                  </b-button-group>
                </div>
              </div>
              <div class="tbl-dashboard-top">
                <b-list-group v-if="rows.length > 0">
                  <b-list-group-item
                    v-for="row in rows"
                    :key="row.title"
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex justify-content-between">
                      <b-avatar
                        :src="row.avatar || 'https://via.placeholder.com/52x52'"
                        class="mr-1"
                      />
                      <span class="text-top-each-item">{{ row.title.substring(0,5) }}</span>
                    </div>
                    <span class="total-top-each-item">
                      {{ row.body }}
                    </span>
                  </b-list-group-item>
                </b-list-group>
                <span v-else>
                  no data
                </span>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>

import {
  BAvatar,
  BCard,
  BRow,
  BListGroup,
  BListGroupItem,
  BCol,
  // BFormSelect,
  BButtonGroup,
  BAlert,
  BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
// import { VueGoodTable } from 'vue-good-table'
import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'

import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'
import store from '@/store/index'
import { areaChartOptions } from './chartOptions'

export default {
  components: {
    // VueGoodTable,
    BAvatar,
    BListGroup,
    BListGroupItem,
    BAlert,
    VueApexCharts,
    // BFormSelect,
    BCard,
    BButtonGroup,
    BButton,
    BRow,
    vSelect,
    BCol,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      pageLength: 5,
      file: null,
      dir: false,
      fields: [
        {
          label: '',
          key: 'title',
        },
        {
          label: '',
          key: 'body',
        },
      ],
      rows: [],
      searchTerm: '',
      dashboardReport: {
        subscribersGained: {
          series: [
            {
              name: 'COD',
              data: [28, 40, 36, 52, 38, 60, 55, 28, 40, 36, 52, 38, 60, 55, 28, 40, 36, 52, 38, 60, 55, 28, 40, 36, 52, 38, 60, 55, 22, 44],
            },
            {
              name: 'Non - COD',
              data: [55, 35, 78, 65, 57, 72, 81, 55, 35, 78, 65, 57, 72, 81, 55, 35, 78, 65, 57, 72, 81, 55, 35, 78, 65, 57, 72, 81, 24, 12],
            },
          ],
        },
      },
      filterTopEkspedisi: '',
      filterTopPartner: '',
      selectedKurir: null,
      selectedBulan: null,
      optionsKurir: [
        { value: null, text: 'Select' },
        { value: 'JNE', text: 'JNE' },
        { value: 'JNT', text: 'JNT' },
        { value: 'Sicepat', text: 'Sicepat' },
      ],
      optionsBulan: [
        { value: null, text: 'Select' },
        { value: 'Januari', text: 'Januari' },
        { value: 'Febuari', text: 'Febuari' },
        { value: 'Maret', text: 'Maret' },
        { value: 'April', text: 'April' },
        { value: 'Mei', text: 'Mei' },
        { value: 'Juni', text: 'Juni' },
        { value: 'Juli', text: 'Juli' },
        { value: 'Agustus', text: 'Agustus' },
        { value: 'September', text: 'September' },
        { value: 'Oktober', text: 'Oktober' },
        { value: 'November', text: 'November' },
        { value: 'Desember', text: 'Desember' },
      ],
    }
  },
  computed: {
    chartOptionsComputed() {
      const options = JSON.parse(JSON.stringify(areaChartOptions))
      options.theme.monochrome.color = $themeColors.primary
      return options
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  watch: {
    filterTopEkspedisi: {
      immediate: true,
      handler() {
        this.fetchData('filterTopEkspedisi')
      },
    },
    filterTopPartner: {
      immediate: true,
      handler() {
        this.fetchData('filterTopPartner')
      },
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    kFormatter,
    choosenFilterTop(val, type = '') {
      this[type] = val
    },
    fetchData(params) {
      // change this endpoint
      this.$http.get('https://jsonplaceholder.typicode.com/posts', { params: { q: this[params] } })
        .then(data => {
          const newParseData = data.data.map(x => {
            const dt = {
              title: x.title,
              body: x.body.substring(0, 15),
            }
            return dt
          }).slice(0,10)
          this.rows = newParseData
        })
        .catch(e => {
          console.log('error', e)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
.dashboard-title{
  letter-spacing: 0.5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 150%;
  color: #222222;
}
.tbl-dashboard-top{
  height: 350px;
  padding-bottom: 16px;
  overflow-y: scroll;
}
.card-dashboard{
  padding: 16px 0px;
}
.select-form{
  width: 10rem;
}
.total-top-each-item{
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  font-family: Poppins;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #34A770;
  padding-right: 10px;
  text-align: right;
  display: inline-block;
}
.text-top-each-item{
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #444444;
}
.wrapper-warning-pemintaan-saldo{
  background: #FBA63C !important;
  border-radius: 16px;
  height: 62px;
}
.text-warning-pemintaan-saldo{
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 0.5px;
  color: #FFFFFF;
}
.btn-warning-pemintaan-saldo{
  width: 46px;
  height: 46px;
  padding: 0px;
  // background: #FFFFFF;
  // opacity: 0.4;
  border-radius: 12px;
  & span{
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    color: #FFFFFF;
    letter-spacing: 0.5px;
  }
}
</style>
