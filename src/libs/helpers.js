import Vue from 'vue'
import moment from 'moment'

moment.locale('id')

export const generateRandomStr = (length = 10) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i + 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const kirimEmailConfig = {
  token: process.env.VUE_APP_KIRIMEMAIL_TOKEN,
  username: process.env.VUE_APP_KIRIMEMAIL_USERNAME,
}
export const NoSpace = e => {
  const charCode = e.which ? e.which : e.keyCode
  if (charCode === 32) {
    e.preventDefault()
  }
  return true
}
export const isNumber = evt => {
  const charCode = evt.which ? evt.which : evt.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 48) {
    evt.preventDefault()
  }
  return true
}
export const isAlphabet = e => {
  const char = String.fromCharCode(e.keyCode)
  if (/^[A-Za-z]+$/.test(char)) {
    return true
  }
  if (/\s/.test(char)) {
    return true
  }
  e.preventDefault()
  return false
}
Vue.prototype.$moment = moment
