import Vue from 'vue'

Vue.filter('rupiah', value => {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
  return formatter.format(value)
})
