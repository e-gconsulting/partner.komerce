<template>
  <canvas
    ref="myChart"
    width="500"
    height="400"
  />
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'ChartPerforma',
  mounted() {
    const ctx = this.$refs.myChart.getContext('2d')

    const redGrad = ctx.createLinearGradient(0, 300, 0, 500)
    redGrad.addColorStop(0, 'rgba(255, 99, 132, 0.1)')
    redGrad.addColorStop(1, 'rgba(100, 100, 0, 0)')

    const blueGrad = ctx.createLinearGradient(100, 0, 0, 300)
    blueGrad.addColorStop(0, 'rgba(54, 162, 235, 0.1)')
    blueGrad.addColorStop(1, 'rgba(100, 100, 0, 0)')

    const greenGrad = ctx.createLinearGradient(0, 0, 0, 100)
    greenGrad.addColorStop(0, 'rgba(75, 192, 192, 0.1)')
    greenGrad.addColorStop(1, 'rgba(100, 100, 0, 0)')

    new Chart(this.$refs.myChart, { // eslint-disable-line
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [
          {
            label: 'Leads',
            borderColor: '#08A0F7',
            backgroundColor: '#08A0F7',
            fill: false,
            data: [60, 55, 75, 25, 70, 12, 76],
            pointRadius: 0,
          },
          {
            label: 'Order',
            borderColor: '#34A770',
            backgroundColor: '#34A770',
            fill: false,
            data: [30, 70, 45, 75, 45, 67, 87],
            pointRadius: 0,
          },
          {
            label: 'Pcs',
            borderColor: '#F95031',
            backgroundColor: '#F95031',
            fill: false,
            data: [12, 45, 76, 41, 89, 54, 76],
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
              },
            },
          ],
        },
        tooltips: {
          intersect: false,
          backgroundColor: '#fff',
          titleFontColor: '#000',
          bodyFontColor: '#000',
          displayColors: false,
          titleFontStyle: 'normal',
          bodyFontStyle: 'bold',
          bodyFontSize: 14,
        },
        legend: {
          position: 'bottom',
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
