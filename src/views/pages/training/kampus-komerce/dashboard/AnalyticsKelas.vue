<template>
  <b-col cols="12">
    <b-card>
      <vue-apex-charts
        type="area"
        height="400"
        :options="options"
        :series="series"
      />
    </b-card>
  </b-col>
</template>

<script>
import {
  BCard,
  BCol,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BCard,
    BCol,
    VueApexCharts,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    startDate: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    endDate: {
      type: String,
    },
  },
  data() {
    return {

      series: [
        {
          data: [],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
          fontSize: '14px',
          fontFamily: 'Montserrat',
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm',
            },
          },
        },
        yaxis: {
          min: 0,
        },
        fill: {
          opacity: 0.1,
          type: 'solid',
        },
        tooltip: {
          shared: false,
          custom({
            series, seriesIndex, dataPointIndex, w,
          }) {
            const seriesName = w.globals.seriesNames[seriesIndex]
            const currentValue = series[seriesIndex][dataPointIndex]
            const hasPrevious = dataPointIndex > 0 && series[seriesIndex][dataPointIndex - 1] != null
            const previousValue = hasPrevious ? series[seriesIndex][dataPointIndex - 1] : 0
            const progress = Math.round((currentValue * 100) / previousValue) - 100
            const isIncreased = progress >= 0

            return `<div class="px-1 py-75">
              <div class="row">
                <div class="col">
                  <div class="mb-25"><small class="text-muted">${seriesName}</small></div>
                  <div class="font-weight-bolder text-dark mb-0 h4">${currentValue || '-'}</div>
                </div>
                ${hasPrevious && progress !== 0 ? `<div class="col-auto d-flex align-items-end">
                  <span class="badge badge-light-secondary"><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12px"
                    height="12px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="${isIncreased ? 'text-success' : 'text-danger'} align-middle feather ${isIncreased ? 'feather-arrow-down' : 'feather-arrow-up'}"
                  ><polyline points="12 5 12 19" /><polyline
                    points="${isIncreased ? '5 12 12 5 19 12' : '19 12 12 19 5 12'}" /></svg><span
                    class="font-weight-bolder align-middle"> ${progress}%</span></span>
                </div>` : ''}
              </div>
            </div>`
          },
        },
        colors: ['#479696', '#F0C631'],
      },
    }
  },
  methods: {
    loadChart() {
      return this.$http.get('/lms/dashboard', {
        start_date: this.startDate,
        end_date: this.endDate,
      })
        .then(async response => {
          const { data } = response.data
          console.log(data.cart[0].lines)

          this.series = [
            {
              name: 'Daftar Kelas',
              data: this.getValues(data.cart[0].lines.join),
            },
            {
              name: 'Jumlah Student Lulus',
              data: this.getValues(data.cart[0].lines.finish),
            },
          ]
        })
    },
    getValues(data) {
      const results = data.map(item => ({ x: item.date, y: item.total }))

      if (results.map(item => item.x).indexOf(this.startDate) === -1) {
        results.unshift({ x: this.startDate, y: null })
      }

      if (results.map(item => item.x).indexOf(this.endDate) === -1) {
        results.push({ x: this.endDate, y: null })
      }

      return results
    },
    numberFormat(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    getIsoDate(date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate()).toString().padStart(2, '0')

      return `${date.getFullYear()}-${month}-${day}`
    },
  },
}
</script>
