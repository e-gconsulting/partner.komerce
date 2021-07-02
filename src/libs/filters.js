import Vue from 'vue'

const rupiah = value => {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
  return formatter.format(value)
}

Vue.filter('rupiah', rupiah)

export default { rupiah }
