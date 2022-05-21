/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import jspreadsheet from 'jspreadsheet-ce'
import axios from 'axios'

const regexNumber = /^\d+$/

export default {
  data() {
    return {
      dataSheets: [],
      sourceAddress: null,
      sourcePayment: null,
      sourceProduct: null,
      sourceVariant: null,
      filterVariant: null,
    }
  },
  mounted() {
    this.getDataSheets()
  },
  methods: {
    getDataSheets() {
      axios.get('https://3ac4-36-73-34-130.ap.ngrok.io/api/v1/order/sheet/drop-down')
        .then(res => {
          const { data } = JSON.parse(JSON.stringify(res.data))
          this.sourceAddress = data.addresses
          this.sourcePayment = data.payment_method
          this.sourceProduct = data.products
          const { variant } = data
          this.sourceVariant = ['-']
          if (variant) {
            const dataVariant = variant.filter(item => item.variant !== '-')
            for (let x = 0; x < dataVariant.length; x++) {
              this.sourceVariant.push(...dataVariant[x].variant)
            }
          }
          this.filterVariant = (instance, cell, c, r, source) => {
            const value = instance.jexcel.getValueFromCoords(c - 1, r)
            const dataVariant = variant.find(item => item.product_name === value)
            if (dataVariant) {
              return dataVariant.variant
            }
            return source
          }
          this.getTable()
        })
        .catch(err => console.log(err))
    },
    getTable() {
      jspreadsheet(document.getElementById('spreadsheet'), {
        data: this.dataSheets,
        minDimensions: [11, 200],
        tableHeight: '440px',
        tableOverflow: true,
        defaultColWidth: 150,
        columns: [
          { type: 'calendar', title: 'Tanggal Order' },
          {
            type: 'dropdown', title: 'Kirim Dari', source: this.sourceAddress,
          },
          { type: 'text', title: 'Nama Pembeli' },
          { type: 'numeric', title: 'Nomor HP' },
          { type: 'text', title: 'Kode Pos' },
          { type: 'text', title: 'Alamat Detail', width: 250 },
          {
            type: 'dropdown', title: 'Produk', width: 200, source: this.sourceProduct,
          },
          {
            type: 'dropdown', title: 'Variasi Spesifik', width: 300, source: this.sourceVariant, filter: this.filterVariant,
          },
          { type: 'text', title: 'Kuantitas' },
          {
            type: 'dropdown', title: 'Metode pembayaran', width: 200, source: this.sourcePayment,
          },
          {
            type: 'dropdown', title: 'Ekspedisi',
          },
          {
            type: 'numeric', title: 'Nilai Pembayaran', mask: 'Rp #.##,00', decimal: ',',
          },
        ],
        onchange(instance, cell, col, row, val) {
          if (col === '6') {
            const columnName = jspreadsheet.getColumnNameFromId(['7', row])
            instance.jexcel.setValue(columnName, '')
          } else if (col === '3') {
            if (!regexNumber.test(val)) {
              const columnName = jspreadsheet.getColumnNameFromId(['3', row])
              instance.jexcel.setValue(columnName, '')
              alert('Nomor HP harus angka')
            }
          } else if (col === '4') {
            if (!regexNumber.test(val)) {
              const columnName = jspreadsheet.getColumnNameFromId(['4', row])
              instance.jexcel.setValue(columnName, '')
              alert('Kode Pos harus angka')
            } else if (val.length !== 5) {
              alert('Kode Pos harus benar')
            }
          } else if (col === '8') {
            if (!regexNumber.test(val)) {
              const columnName = jspreadsheet.getColumnNameFromId(['8', row])
              instance.jexcel.setValue(columnName, '')
              alert('Kuantitas harus angka')
            }
          }
        },
      })
    },
  },
}
