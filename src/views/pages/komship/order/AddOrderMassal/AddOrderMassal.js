/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import jspreadsheet from 'jspreadsheet-ce'
import axios from 'axios'
import { toInteger } from 'lodash'

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
      table: null,
      jumlahBaris: 200,
      selectedTable: null,
    }
  },
  mounted() {
    // this.getDataSheets()
    this.getTable()
  },
  methods: {
    // getDataSheets() {
    //   setTimeout(async () => {
    //     await axios.get('https://3ac4-36-73-34-130.ap.ngrok.io/api/v1/order/sheet/drop-down')
    //       .then(res => {
    //         const { data } = JSON.parse(JSON.stringify(res.data))
    //         this.sourceAddress = data.addresses
    //         this.sourcePayment = data.payment_method
    //         this.sourceProduct = data.products
    //         const { variant } = data
    //         this.sourceVariant = ['-']
    //         if (variant) {
    //           const dataVariant = variant.filter(item => item.variant !== '-')
    //           for (let x = 0; x < dataVariant.length; x++) {
    //             this.sourceVariant.push(...dataVariant[x].variant)
    //           }
    //         }
    //         this.filterVariant = (instance, cell, c, r, source) => {
    //           const value = instance.jexcel.getValueFromCoords(c - 1, r)
    //           const dataVariant = variant.find(item => item.product_name === value)
    //           if (dataVariant) {
    //             return dataVariant.variant
    //           }
    //           return source
    //         }
    //         this.getTable()
    //       })
    //       .catch(err => console.log(err))
    //   }, 800)
    // },
    getTable() {
      const getSelectedTable = data => {
        this.selectedTable = data
      }
      this.table = jspreadsheet(document.getElementById('spreadsheet'), {
        data: this.dataSheets,
        minDimensions: [11, 200],
        tableHeight: '440px',
        tableOverflow: true,
        defaultColWidth: 150,
        columns: [
          { type: 'calendar', title: 'Tanggal Order', options: { format: 'YYYY-MM-DD' } },
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
        onselection(instance, col, row, cell, val) {
          const data = {
            instance, cell, col, row, val,
          }
          getSelectedTable(data)
        },
      })
    },
    addRows() {
      const rows = toInteger(this.jumlahBaris)
      this.table.insertRow(rows)
    },
    removeRows() {
      const totalSelect = this.selectedTable.val - this.selectedTable.row + 1
      this.table.deleteRow(this.selectedTable.row, totalSelect)
    },
    submitSheets(method) {
      const json = this.table.getJson()
      const data = json.map(items => ({
        order_date: items[0] === '' ? null : items[0],
        address: items[1] === '' ? null : items[1],
        customer_name: items[2] === '' ? null : items[2],
        customer_phone_number: items[3] === '' ? null : items[3],
        zip_code: items[4] === '' ? null : items[4],
        customer_address: items[5] === '' ? null : items[5],
        product: items[6] === '' ? null : items[6],
        variant: items[7] === '' ? null : items[7],
        qty: items[8] === '' ? null : items[8],
        payment_method: items[9] === '' ? null : items[9],
        expedition: items[10] === '' ? null : items[10],
        grandtotal: items[11] === '' ? null : items[11],
      }))
      if (method === 'save') {
        console.log(data)
      } else if (method === 'submit') {
        const dataSubmit = data.filter(
          items => items.order_date
        || items.address
        || items.customer_name
        || items.customer_phone_number
        || items.zip_code
        || items.customer_address
        || items.product
        || items.variant
        || items.qty
        || items.payment_method
        || items.expedition
        || items.grandtotal !== null,
        )
        console.log(dataSubmit)
      }
    },
  },
}
