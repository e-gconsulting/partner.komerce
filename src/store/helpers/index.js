import Vue from 'vue'
import moment from 'moment'

const axiosKomship = partnerId => {
  const axios = Vue.prototype.$http_komship
  axios.defaults.params = { partner_id: partnerId }
  return axios
}
const axiosKompack = () => Vue.prototype.$http_kompack

const kompackDate = new Date('2021-01-01')

const today = new Date()
today.setHours(0, 0, 0, 0)

const last7 = new Date()
last7.setDate(today.getDate() - 6)
last7.setHours(0, 0, 0, 0)

const last30 = new Date()
last30.setDate(today.getDate() - 29)
last30.setHours(0, 0, 0, 0)

const last60 = new Date()
last60.setDate(today.getDate() - 59)
last60.setHours(0, 0, 0, 0)

const last90 = new Date()
last90.setDate(today.getDate() - 89)
last90.setHours(0, 0, 0, 0)

const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

const ranges = {
  'Real Time': [today, today],
  '7 Hari Terakhir': [last7, today],
  '30 Hari Terakhir': [last30, today],
  '1 Bulan Terakhir': [last30, today],
  '2 Bulan Terakhir': [last60, today],
  '3 Bulan Terakhir': [last90, today],
  'Bulan Ini': [firstDateOfMonth, today],
  'Custom Tanggal': [null, null],
}

const penghasilanValue = {
  Kompship: 1,
  'Non Kompship': 0,
}

const paymentMethods = {
  COD: 'COD',
  'Transfer Bank': 'BANK TRANSFER',
}

const formatYmd = date => moment(date).format('YYYY-MM-DD')

const hideAccount = account => {
  if (!account) return ''
  const { length } = account
  return Array(length - 4).join('*') + account.slice(-4)
}

const getDates = (start, end) => {
  const arr = []
  for (
    let dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(moment(new Date(dt)).format('YYYY-MM-DD'))
  }
  return arr
}

export {
  axiosKomship,
  axiosKompack,
  kompackDate,
  today,
  last7,
  last30,
  last60,
  last90,
  firstDateOfMonth,
  lastDateOfMonth,
  ranges,
  penghasilanValue,
  formatYmd,
  hideAccount,
  paymentMethods,
  getDates,
}
