export const generateRandomStr = (length = 10) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i + 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
/**
 * Params for date helpers
 * default params returns today
 * @param {String} params - 7d | 30d | firstdateofmonth | lastdateofmonth
 * @returns String
 */
export const dateHelper = (params = '') => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const last7 = new Date()
  last7.setDate(today.getDate() - 6)
  last7.setHours(0, 0, 0, 0)

  const last30 = new Date()
  last30.setDate(today.getDate() - 29)
  last30.setHours(0, 0, 0, 0)

  const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  switch (params.toLowerCase()) {
    case '7d':
      return last7
    case '30d':
      return last30
    case 'firstdateofmonth':
      return firstDateOfMonth
    case 'lastdateofmonth':
      return lastDateOfMonth
    default:
      return today
  }
}
