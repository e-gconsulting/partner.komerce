<template>
  <b-card-actions
    ref="formCard"
    title="Ranking Provinsi Customer"
    no-actions
    no-body
  >

    <b-row class="d-flex align-items-center">
      <b-col
        md="4"
      >
        <b-list-group class="ml-2">
          <b-list-group-item class="border-0 p-1">
            Jawa Tengah
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1">
            Jawa Timur
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1 d-flex align-items-start">
            Kalimantan Utara
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1">
            Bali
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1">
            Riau
          </b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col
        md="8"
        class="mt-50"
      >
        <div id="chart">
          <vue-apex-charts
            type="bar"
            height="290"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col cols="12">
        <h4 class="ml-2">
          Ranking Kota Customer
        </h4>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-center">
      <b-col
        md="4"
      >
        <b-list-group class="ml-2">
          <b-list-group-item class="border-0 p-1">
            Purbalingga
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1">
            Cilacap
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1 d-flex align-items-start">
            Bengkulu
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1">
            Cirebon
          </b-list-group-item>
          <b-list-group-item class="border-0 p-1">
            Padang
          </b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col
        md="8"
        class="mt-50"
      >
        <div id="chart">
          <vue-apex-charts
            type="bar"
            height="290"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </b-col>
    </b-row>

  </b-card-actions>
</template>

<script>
import {
  BCol,
  BRow,
  BListGroup,
  BListGroupItem,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    BCardActions,
    BCol,
    BRow,
    BListGroup,
    BListGroupItem,
    VueApexCharts,
  },
  data() {
    return {
      selected: 1,

      series: [{
        data: [44, 55, 41, 64, 22],
      }],
      chartOptions: {
        colors: '#34A770',
        chart: {
          type: 'bar',
          height: 290,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff'],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: [1165, 1165, 1165, 1165, 1165],
        },
      },
    }
  },
}
</script>
