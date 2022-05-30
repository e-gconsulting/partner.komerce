/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import jspreadsheet from 'jspreadsheet-ce'
import axios from 'axios'
import { toInteger } from 'lodash'
import moment from 'moment'

const regexNumber = /^\d+$/

export default {
  data() {
    return {
      dataSheets: [],
      sourceAddress: null,
      sourcePayment: null,
      sourceProduct: null,
      sourceVariant: null,
      sourceShipment: null,
      filterVariant: null,
      table: null,
      jumlahBaris: 200,
      selectedTable: null,
      lastUpdated: null,
    }
  },
  mounted() {
    this.getDataSheet()
  },
  methods: {
    getDataSheet() {
      setTimeout(async () => {
        await this.$http_komship.get('/v1/order/sheet/data')
          .then(res => {
            const { data } = res.data
            this.dataSheets = data
            this.getDropdownSheet()
            if (data !== []) {
              this.getLastUpdated()
            }
          })
          .catch(err => console.log(err))
      }, 800)
    },
    getDropdownSheet() {
      setTimeout(async () => {
        await this.$http_komship.get('/v1/order/sheet/drop-down')
          .then(res => {
            const { data } = JSON.parse(JSON.stringify(res.data))
            this.sourceAddress = data.addresses
            this.sourcePayment = data.payment_method
            this.sourceProduct = data.products
            this.sourceShipment = data.shipments
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
      }, 800)
    },
    getTable() {
      const getSelectedTable = data => {
        this.selectedTable = data
      }
      const popup = message => this.$swal({
        title: 'Upss., belum tepat nih..',
        text: message,
        confirmButtonText: 'Oke',
        confirmButtonClass: 'btn btn-primary',
      })
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
            type: 'dropdown', title: 'Ekspedisi', source: this.sourceShipment,
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
            if (!regexNumber.test(val) || val.length < 10 || val.length > 13) {
              const columnName = jspreadsheet.getColumnNameFromId(['3', row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan Nomor HP pembeli dengan benar yaa..')
            }
          } else if (col === '4') {
            if (!regexNumber.test(val) || val < 22311 || val > 80362) {
              const columnName = jspreadsheet.getColumnNameFromId(['4', row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan Kode Pos alamat pembeli dengan benar yaa..')
            }
          } else if (col === '8') {
            if (!regexNumber.test(val) || val.length < 1 || val.length > 1000) {
              const columnName = jspreadsheet.getColumnNameFromId(['8', row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan jumlah kuantitas produk antara 1 - 1000 yaa..')
            }
          } else if (col === '2') {
            if (val.length < 3 || val.length > 30) {
              const columnName = jspreadsheet.getColumnNameFromId(['2', row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan Nama pembeli dengan benar yaa..')
            }
          } else if (col === '5') {
            if (val.length < 11 || val.length > 85) {
              const columnName = jspreadsheet.getColumnNameFromId(['5', row])
              instance.jexcel.setValue(columnName, '')
              popup('Alamat pembelinya diisi dengan detail dan jelas yaa..')
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
    async getLastUpdated() {
      setTimeout(async () => {
        await this.$http_komship.get('/v1/order/sheet/last-update')
          .then(res => {
            const { link } = res.data
            const date = moment(link.updated_at).format('YYYY-MM-DD')
            if (date === moment().format('YYYY-MM-DD')) {
              const time = moment(link.updated_at).format('HH:mm')
              this.lastUpdated = `pada pukul ${time}`
            } else {
              const date1 = new Date(link.updated_at)
              const date2 = new Date()
              const diffDays = date2.getDate() - date1.getDate()
              this.lastUpdated = `${diffDays} hari yang lalu`
            }
          })
      }, 800)
    },
    submitSheets(method) {
      const json = this.table.getJson()
      const data = json.map(items => ({
        order_date: items[0],
        address: items[1],
        customer_name: items[2],
        customer_phone_number: items[3],
        zip_code: items[4],
        customer_address: items[5],
        product: items[6],
        variant: items[7],
        qty: items[8],
        payment_method: items[9],
        expedition: items[10],
        grandtotal: items[11],
      }))
      if (method === 'save') {
        setTimeout(async () => {
          await this.$http_komship.post('/v1/order/sheet/save-submit', {
            options: 'save',
            data,
          })
            .then(this.getLastUpdated)
            .catch(err => console.log(err))
        }, 800)
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
        || items.grandtotal !== '',
        )
        console.log(dataSubmit)
      }
    },
  },
}
