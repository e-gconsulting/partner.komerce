import {
  BRow,
  BCol,
  BCard,
  BButton,
  BFormGroup,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import VSelect from 'vue-select'
import moment from 'moment'
import {
  firstDateOfMonth,
  lastDateOfMonth,
  formatYmd,
} from '@/store/helpers'
import filtersLibs from '@/libs/filters'

const typeOfCallingApi = {
  chart: {
    ekspedisi: 'ekspedisi',
    partner: 'partner',
  },
  toplist: {
    ekspedisi: 'ekspedisi',
    partner: 'partner',
  },
}

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    VueApexCharts,
    BFormGroup,
    VSelect,
  },
  data() {
    return {
      series: [
        {
          name: 'COD',
          data: [300000, 600000, 900000, 2000000, 3000000, 5000000, 6000000],
        },
        {
          name: 'Non - COD',
          data: [500000, 800000, 1000000, 5000000, 7000000, 10000000, 14000000],
        },
        {
          name: 'Total',
          data: [800000, 1400000, 1900000, 7000000, 10000000, 15000000, 20000000],
        },
      ],
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
          },
        },
        stroke: {
          curve: 'smooth',
        },
        yaxis: {
          labels: {
            style: {
              colors: '#8e8da4',
            },
            offsetX: 0,
            formatter: val => `${val.toFixed(0) / 1000000} Jt`,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 14,
          min: moment().startOf('month').valueOf(),
          max: moment().endOf('month').valueOf(),
          // min: moment('2022-04-01').valueOf(),
          // max: moment('2022-04-30').valueOf(),
          categories: ['2022-03-01T00:00:00.000', '2022-03-02T01:30:00.000', '2022-03-03T02:30:00.000', '2022-03-04T03:30:00.000', '2022-03-05T04:30:00.000', '2022-03-15T05:30:00.000', '2022-03-19T06:30:00.000'],
          labels: {
            formatter: (val, timestamp) => moment(new Date(timestamp)).format('DD'),
          },
        },
        tooltip: {
          // intersect: true,
          custom: ({
            series,
            seriesIndex,
            dataPointIndex,
            w,
          }) => `
            <div class="d-grid p-1 rounded">
              <p class="my-0 text-blue-600">${w.globals.seriesNames[2]}</span> <span class="text-black"> ${filtersLibs.rupiah(series[2][dataPointIndex])}</p>
              <br/>
              <p class="my-0 text-green-600">${w.globals.seriesNames[1]}</span><span class="text-black"> ${filtersLibs.rupiah(series[1][dataPointIndex])}</p>
              <br/>
              <p class="my-0 text-warning">${w.globals.seriesNames[0]}</span><span class="text-black"> ${filtersLibs.rupiah(series[0][dataPointIndex])}</p>
            </div>
            `,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        colors: ['orange', 'green', 'blue'],
      },
      selectedTopOngkirEkspedisi: {
        name: 'COD',
        value: '1',
      },
      optionTopOngkirEkspedisi: [
        {
          name: 'COD & Non COD',
          value: 0,
        },
        {
          name: 'COD',
          value: 1,
        },
        {
          name: 'Non-COD',
          value: 2,
        },
      ],
      datachart: {
        expedisi: [],
        partner: [],
      },
      datatoplist: {
        ekspedisi: [
          {
            shipping: 'JNE',
            shipping_cost: 22000,
          },
        ],
        partner: [
          {
            partner_name: 'iiskun',
            transaction_cod: 112000,
          },
        ],
      },
    }
  },
  mounted() {
    // this.fetchDataTop(typeOfCallingApi.toplist.ekspedisi)
    // this.fetchDataTop(typeOfCallingApi.toplist.partner)
  },
  methods: {
    fetchDataTop(type = '') {
      let endpoint = ''
      switch (type.toLowerCase()) {
        case typeOfCallingApi.toplist.partner:
          endpoint = '/dashboard/topPartnerTransaction'
          break
        case typeOfCallingApi.toplist.ekspedisi:
          endpoint = 'dashboardTopShippingExpeditors'
          break
        default:
          break
      }
      this.$http_komship.get(`/v1/admin/${endpoint}`)
        .then(res => {
          console.log('response data: ', res)
        })
        .catch(e => console.log('error', e))
    },
    fetchDataChart(type = '') {
      // payment_option 1: COD, 2: non COD, 3: total(cod dan non-cod)
      // start_date => awal bulan tgl 1 00:00 contoh 2022-02-01T00:00:00
      // end_date => skrng 23:59 contoh 2022-02-28 23:59:59
      let endpoint = ''
      switch (type.toLowerCase()) {
        case typeOfCallingApi.toplist.partner:
          endpoint = 'topPartnerTransaction'
          break
        case typeOfCallingApi.toplist.ekspedisi:
          endpoint = 'TopShippingExpeditors'
          break
        default:
          break
      }
      this.$http_komship.get(`/v1/admin/dashboard/${endpoint}`)
        .then(res => {
          console.log('response data: ', res)
        })
        .catch(e => console.log('error', e))
    },
    formatCurrency(dt) {
      return filtersLibs.rupiah(dt)
    },
  },
}
