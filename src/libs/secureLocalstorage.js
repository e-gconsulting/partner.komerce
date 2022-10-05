/* eslint-disable consistent-return */
import isNull from 'lodash/isNull'
import isEmpty from 'lodash/isEmpty'
import encryption from './encryption'

const secureLocalStorage = {
  getItem: name => {
    const data = localStorage.getItem(encryption.encryptWithMD5(name))
    let state
    if (!isEmpty(data)) {
      const result = encryption.decryptWithAES(data)
      try {
        state = JSON.parse(result)
      } catch (error) {
        state = result
      }

      return state
    }
  },
  setItem: (name, data) => localStorage.setItem(
    encryption.encryptWithMD5(name),
    isNull(data) ? data : encryption.encryptWithAES(data),
  ),
  clearItem: name => localStorage.removeItem(name),
}

export default secureLocalStorage
