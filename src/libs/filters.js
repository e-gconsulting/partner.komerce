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

const date = value => {
  const mydate = new Date(value)
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  return `${days[mydate.getDay()]}, ${mydate.getDate()} ${months[mydate.getMonth()]}  ${mydate.getFullYear()}`
}

Vue.filter('rupiah', rupiah)
Vue.filter('date', date)

export default { rupiah, date }
