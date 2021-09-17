<template>
  <section id="dashboard-analytics">
    <b-row class="match-height mb-md-1">
      <b-col>
        <h3 class="mb-50 mb-md-1">
          Dashboard
        </h3>
        <div>
          <b-alert
            v-if="alertshow"
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
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="6">
        <b-card no-body>
          <b-card-header>
            <b-row style="width: 100%;">
              <b-col
                md="12"
                class="dashboard-report-wrapper"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="card-title mb-50 mb-sm-0">
                    Perfoma Ekspedisi
                  </h4>
                  <b-button
                    variant="outline"
                    class="button-custom"
                  >
                    <feather-icon
                      icon="ChevronRightIcon"
                    />
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-card-header>

          <b-card-body>
            <b-row class="select-form">
              <b-col
                md="3"
              />
              <b-col
                md="3"
              />
              <b-col
                md="3"
              >
                <b-form-select
                  v-model="selectedKurir"
                  :options="optionsKurir"
                />
              </b-col>
              <b-col
                md="3"
              >
                <b-form-select
                  v-model="selectedBulan"
                  :options="optionsBulan"
                />
              </b-col>
            </b-row>
            <div style="transform: translateY(-35px);">
              <vue-apex-charts
                type="area"
                height="400"
                :options="chartOptionsComputed"
                :series="dashboardReport.subscribersGained.series"
              />
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card no-body>
          <b-card-header>
            <div
              class="d-flex justify-content-between align-items-center"
              style="width: 100%;"
            >
              <h4 class="card-title mb-50 mb-sm-0">
                Top Ekspedisi
              </h4>
              <div class="d-flex align-items-center justify-content-end">
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
          </b-card-header>
          <b-card-body>
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
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <b-card no-body>
          <b-card-header>
            <b-row style="width: 100%;">
              <b-col
                md="12"
                class="dashboard-report-wrapper"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <h4 class="card-title mb-50 mb-sm-0">
                    Perfoma Partner
                  </h4>
                  <b-button
                    variant="outline"
                    class="button-custom"
                  >
                    <feather-icon
                      icon="ChevronRightIcon"
                    />
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </b-card-header>

          <b-card-body>
            <b-row class="select-form">
              <b-col
                md="3"
              />
              <b-col
                md="3"
              />
              <b-col
                md="3"
              >
                <b-form-select
                  v-model="selectedKurir"
                  :options="optionsKurir"
                />
              </b-col>
              <b-col
                md="3"
              >
                <b-form-select
                  v-model="selectedBulan"
                  :options="optionsBulan"
                />
              </b-col>
            </b-row>
            <div style="transform: translateY(-35px);">
              <vue-apex-charts
                type="area"
                height="400"
                :options="chartOptionsComputed"
                :series="dashboardReport.subscribersGained.series"
              />
            </div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col lg="6">
        <b-card no-body>
          <b-card-header>
            <div
              class="d-flex justify-content-between align-items-center"
              style="width: 100%;"
            >
              <h4 class="card-title mb-50 mb-sm-0">
                Top Partner
              </h4>
              <div class="d-flex align-items-center justify-content-end">
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
          </b-card-header>
          <b-card-body>
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
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  // BFormRow,
  BButton,
  BButtonGroup,
  BRow,
  BCol,
  BFormSelect,
  BCard,
  BCardHeader,
  BCardBody,
  BAlert,
  // BCardTitle,
  // BCardSubTitle,
  BListGroup,
  BListGroupItem,
  BAvatar,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'

import { kFormatter } from '@core/utils/filter'
import store from '@/store/index'
import { $themeColors } from '@themeConfig'
import { areaChartOptions } from './chartOptions'
// import flatPickr from 'vue-flatpickr-component'
// import AnalyticsTalent from './AnalyticsTalent.vue'
// import AnalyticsPartner from './AnalyticsPartner.vue'
// import AnalyticsOffice from './AnalyticsOffice.vue'

export default {
  components: {
    BAlert,
    BButton,
    BButtonGroup,
    // BFormRow,
    VueApexCharts,
    BRow,
    BCol,
    BCardHeader,
    BCardBody,
    // BCardTitle,
    // BCardSubTitle,
    BAvatar,
    BListGroup,
    BListGroupItem,
    // vSelect,
    // AnalyticsPartner,
    // AnalyticsTalent,
    BFormSelect,
    // flatPickr,
    // AnalyticsOffice,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      customDate: null,
      range: 2,
      total: -1,
      dir: false,
      alertshow: false,
      items: [],
      rangeOptions: [
        { text: 'Hari ini', value: 0 },
        { text: 'Kemarin', value: 1 },
        { text: 'Minggu ini', value: 2 },
        { text: 'Bulan ini', value: 3 },
        { text: 'Tahun ini', value: 4 },
        { text: 'Kustom', value: 5 },
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
  mounted() {
    //
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
          })
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
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
<style lang="scss" scoped>
.dashboard-report-wrapper{
  padding-right: 0;
}
.button-custom{
  padding: 0;
  margin: 0;
  display: grid;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border: 1.5px solid #222222;
}
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
  position: relative;
  z-index: 10000;
  @media screen  {
    //
  }
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
