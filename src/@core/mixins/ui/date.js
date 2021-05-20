export const dateFormat = {
  methods: {
    dateFormat(dateString, format) {
      // eslint-disable-next-line global-require
      const formatter = require('dateformat')
      return formatter(Date.parse(dateString), format)
    },
  },
}

export const _ = null
