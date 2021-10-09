<template>
  <canvas
    ref="myChart"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Chart } from 'chart.js'

export default {
  name: 'ChartPenghasilan',
  props: {
    width: {
      default: 500,
    },
    height: {
      default: 350,
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs.myChart, {
      type: 'line',
      data: {
        labels: [
          'Senin',
          'Selasa',
          'Rabu',
          'Kamis',
          "Jum'at",
          'Sabtu',
          'Minggu',
        ],
        datasets: [
          {
            label: 'Penghasilan Bersih',
            backgroundColor: '#08A0F7',
            data: [
              3000000, 7000000, 4500000, 7500000, 4500000, 6780000, 8790000,
            ],
            lineTension: 0,
            pointRadius: 0,
          },
          {
            label: 'Penghasilan Kotor',
            backgroundColor: '#FBA63C',
            data: [
              6000000, 5500000, 7500000, 2500000, 7000000, 1220000, 7690000,
            ],
            lineTension: 0,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: value => {
                  let formatedVal = 0

                  if (Math.abs(Number(value)) >= 1.0e9) {
                    formatedVal = `${Math.abs(Number(value)) / 1.0e9} Mn`
                  } else if (Math.abs(Number(value)) >= 1.0e6) {
                    formatedVal = `${Math.abs(Number(value)) / 1.0e6} Jt`
                  } else if (Math.abs(Number(value)) >= 1.0e3) {
                    formatedVal = `${Math.abs(Number(value)) / 1.0e3} Rb`
                  } else {
                    formatedVal = Math.abs(Number(value))
                  }
                  return `${formatedVal}`
                },
              },
              stacked: true,
            },
          ],
        },
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              return `${data.datasets[tooltipItem.datasetIndex].label}: Rp ${tooltipItem.yLabel}`
            },
          },
          intersect: false,
          backgroundColor: '#fff',
          titleFontColor: '#6b6b6b',
          bodyFontColor: '#000',
          displayColors: false,
          titleFontStyle: 'normal',
          bodyFontStyle: 'bold',
          bodyFontSize: 14,
        },
        legend: {
          align: 'start',
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
        },
      },
    })
  },
}
</script>
