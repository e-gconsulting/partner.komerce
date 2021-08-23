<template>
  <b-row>
    <b-col
      md="6"
    >
      <h4>Admin Marketplace</h4>
      <b-col
        cols="12"
        class="mt-1 p-0"
      >
        <b-form-group
          label="Student"
          label-cols-md="6"
          class="mb-0"
        >
          <h5 class="text-danger mt-50">
            2.500
          </h5>
        </b-form-group>
      </b-col>
      <b-col
        cols="12"
        class="p-0"
      >
        <b-form-group
          label="Lulus"
          label-cols-md="6"
        >
          <h5 class="text-danger mt-50">
            1.200
          </h5>
        </b-form-group>
      </b-col>
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
  BFormGroup,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BRow,
    BCol,
    VueApexCharts,
    BFormGroup,
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
