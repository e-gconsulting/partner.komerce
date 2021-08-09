<template>
  <b-row>
    <b-col
      md="6"
    >
      <h4>Admin Marketplace</h4>
      <b-row class="mt-2">
        <b-col>
          <span>Student</span>
        </b-col>
        <b-col>
          <h5 class="text-danger">
            2.000
          </h5>
        </b-col>
      </b-row>
      <b-row class="mt-50">
        <b-col>
          <span>Lulus</span>
        </b-col>
        <b-col>
          <h5 class="text-danger ml-50">
            7.50
          </h5>
        </b-col>
      </b-row>
    </b-col>

    <b-col md="6">
      <div id="chart">
        <vue-apex-charts
          type="radialBar"
          height="190"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BRow,
    BCol,
    VueApexCharts,
  },
  data() {
    return {
      series: [15],
      colors: ['#ff0000'],
      chartOptions: {
        chart: {
          height: 185,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '60%',
              background: '#FFF',
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15,
              },
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: '#979797',
                fontSize: '10px',
              },
              value: {
                color: '#ff0000',
                fontSize: '28px',
                show: true,
              },
            },
          },
        },
        fill: {
          type: 'colors',
          colors: ['#ff0000'],
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Progress Student'],
      },
    }
  },
}
</script>

<style>

</style>
