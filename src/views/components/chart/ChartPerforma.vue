<template>
  <VueApexcharts
    width="650"
    type="area"
    :options="options"
    :series="seriesProp"
  ></VueApexcharts>
</template>

<script>
import VueApexcharts from 'vue-apexcharts'

export default {
  name: 'ChartPerformaApex',
  components: {
    VueApexcharts,
  },
  props: {
    categoriesProp: {
      type: Array,
    },
    seriesProp: {
      type: Array,
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: `vuechart-${Date.now()}`,
          toolbar: {
            show: false,
          },
        },
        fill: {
          colors: ['#08A0F7', '#34A770', '#F95031'],
        },
        colors: ['#08A0F7', '#34A770', '#F95031'],
        xaxis: {
          categories: this.categoriesProp,
          tooltip: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
      },
    }
  },
}
</script>
