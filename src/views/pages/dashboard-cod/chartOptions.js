// import { $themeColors } from '@themeConfig'

export const areaChartOptions = {
  chart: {
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 0.2,
      stops: [0, 80, 100],
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
  xaxis: {
    type: 'numeric',
    tickAmount: 14,
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    decimalsInFloat: 0,
    labels: {
      show: true,
      formatter: val => `${val.toFixed(0)}`,
    },
    min: 1,
    max: 30,
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      formatter: val => `${val} Jt`,
    },
  },
  tooltip: {
    x: { show: false },
  },
  color: ['#08A0F7', '#34A770'],
}

export const lineChartOptions = {
  //
}
