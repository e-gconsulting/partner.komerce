/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import jspreadsheet from 'jspreadsheet-ce'
import { toInteger } from 'lodash'
import moment from 'moment'
import iconWarning from '@/assets/images/icons/warning.svg'
import iconNonShipping from '@/assets/images/icons/non-shipping.svg'
import iconNonCOD from '@/assets/images/icons/non-cod.svg'
import iconSuccess from '@/assets/images/icons/success.svg'

const regexNumber = /^\d+$/
const regexOnlyNumber = /\B(?=(\d{3})+(?!\d))/g

export default {
  data() {
    return {
      dataSheets: [],
      dataSubmit: [],
      dataSplit: [],
      sourceAddress: null,
      sourcePayment: null,
      sourceProduct: null,
      sourceVariant: null,
      sourceShipment: null,
      allVariant: null,
      filterVariant: null,
      table: null,
      columnNumber: null,
      jumlahBaris: 200,
      selectedTable: null,
      lastUpdated: null,
      loadingDraft: false,
      loadingSubmit: false,
      saldo: null,
      totalOrder: null,
      submitProgress: 0,
      submitProgressStatus: true,
      disableSubmit: false,
    }
  },
  async mounted() {
    this.$refs.loadingPage.show()
    await this.checkExpedition()
    await this.checkSaldo()
    await this.getProfile()
    await this.getDraft()
  },
  created() {
    const { beforeWindowUnload } = this
    window.addEventListener('beforeunload', beforeWindowUnload)
  },
  beforeDestroy() {
    const { beforeWindowUnload } = this
    window.removeEventListener('beforeunload', beforeWindowUnload)
  },
  methods: {
    formatCurrency: value => `${value}`.replace(/\D/g, '').replace(regexOnlyNumber, '.'),
    confirmLeave() {
      return window.confirm
    },
    confirmStayInDirtyForm() {
      return !this.confirmLeave()
    },
    beforeWindowUnload(e) {
      if (this.confirmStayInDirtyForm()) {
        e.preventDefault()
        e.returnValue = ''
      }
    },
    async checkSaldo() {
      await this.$http_komship.get('v1/dashboard/partner/balanceSummary')
        .then(res => {
          const { data } = res.data
          this.saldo = data.balance
        })
    },
    async checkExpedition() {
      await this.$http_komship
        .get('/v1/partner/shipment/not-active')
        .then(res => {
          const { data } = res.data
          const result = data.filter(items => items.is_active === 1)
          if (result.length < 1) {
            this.$refs.loadingPage.hide()
            this.$swal({
              title:
                '<span class="font-weight-bold h4">Mohon Maaf, Ekspedisi Belum Diaktifkan.</span>',
              imageUrl: iconWarning,
              allowOutsideClick: false,
              confirmButtonText: 'Aktifkan Ekspedisi',
              confirmButtonClass: 'btn btn-primary',
            }).then(then => {
              if (then.isConfirmed) {
                this.$router.push('/setting-kompship/ekspedisi')
              }
            })
          }
        })
    },
    async getProfile() {
      await this.$http_komship.post('v1/my-profile')
        .then(result => {
          const { data } = result.data
          this.profile = data
        })
        .catch(err => console.error(err))
    },
    async getDraft() {
      await this.$http_komship.get('/v1/order/sheet/data')
        .then(result => {
          const { data } = result.data
          if (this.profile.partner_is_order_notes) {
            this.dataSheets = data.map(items => ({
              order_date: items.order_date,
              address: items.address,
              customer_name: items.customer_name,
              customer_phone_number: items.customer_phone_number,
              zip_code: `${items.zip_code}`,
              customer_address: items.customer_address,
              product: items.product,
              variant: items.variant,
              order_notes: items.order_notes,
              qty: `${items.qty}`,
              payment_method: items.payment_method,
              expedition: items.expedition,
              grandtotal: `${items.grandtotal}`,
            }))
          } else {
            this.dataSheets = data.map(items => ({
              order_date: items.order_date,
              address: items.address,
              customer_name: items.customer_name,
              customer_phone_number: items.customer_phone_number,
              zip_code: `${items.zip_code}`,
              customer_address: items.customer_address,
              product: items.product,
              variant: items.variant,
              qty: `${items.qty}`,
              payment_method: items.payment_method,
              expedition: items.expedition,
              grandtotal: `${items.grandtotal}`,
            }))
          }
          this.getDropdownSheet()
          this.getLastUpdated()
        })
        .catch(err => console.log(err))
    },
    async getDropdownSheet() {
      await this.$http_komship.get('/v1/order/sheet/drop-down')
        .then(res => {
          const { data } = JSON.parse(JSON.stringify(res.data))
          this.sourceAddress = data.addresses
          this.sourcePayment = data.payment_method
          this.sourceProduct = data.products
          this.sourceShipment = data.shipments
          this.allVariant = data.variant
          const { variant } = data
          this.sourceVariant = ['-']
          if (data.addresses.length === 0) {
            this.$swal({
              title: '<span class="font-weight-bold h4">Tambahkan alamat Pick Up untuk melanjutan kegiatan tambah order.</span>',
              imageUrl: iconWarning,
              allowOutsideClick: false,
              confirmButtonText: 'Tambahkan Alamat Pick Up',
              confirmButtonClass: 'btn btn-primary',
            }).then(response => {
              if (response.isConfirmed) {
                this.$router.push('setting-kompship/pickup')
              }
            })
          }
          if (data.products.length === 0) {
            this.$swal({
              title: '<span class="font-weight-bold h4">Sebelum lanjut membuat order, tambahkan produk yang akan kamu jual dahulu ya,</span>',
              imageUrl: iconWarning,
              allowOutsideClick: false,
              confirmButtonText: 'Tambahkan Produk',
              confirmButtonClass: 'btn btn-primary',
            }).then(response => {
              if (response.isConfirmed) {
                this.$router.push('add-produk')
              }
            })
          }
          if (variant) {
            const dataVariant = variant.filter(item => item.variant !== '-')
            for (let x = 0; x < dataVariant.length; x += 1) {
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
      const { profile } = this
      const { saldo } = this
      const { allVariant } = this
      let columnTable
      const getSelectedTable = data => {
        this.selectedTable = data
      }
      const popup = message => this.$swal({
        html: `<span style="font-weight:600;font-size:20px">Upss., belum tepat nih..</span><br><span style="font-size:14px">${message}</span>`,
        confirmButtonText: 'Oke',
        confirmButtonClass: 'btn btn-primary rounded-lg',
        customClass: {
          actions: 'd-flex p-0 justify-content-end',
          content: 'text-left p-0',
        },
      })
      this.columnNumber = ({
        order_date: 0,
        address: 1,
        customer_name: 2,
        customer_phone_number: 3,
        zip_code: 4,
        customer_address: 5,
        product: 6,
        variant: 7,
        order_notes: profile.partner_is_order_notes ? 8 : null,
        qty: profile.partner_is_order_notes ? 9 : 8,
        payment_method: profile.partner_is_order_notes ? 10 : 9,
        expedition: profile.partner_is_order_notes ? 11 : 10,
        grandtotal: profile.partner_is_order_notes ? 12 : 11,
      })
      const { columnNumber } = this
      if (profile.partner_is_order_notes) {
        columnTable = [
          {
            type: 'calendar',
            title: 'Tanggal Order',
            options: {
              format: 'YYYY-MM-DD',
              months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
              weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
              weekdays_short: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
              textDone: 'SELESAI',
              textReset: 'HAPUS',
              textUpdate: 'OK',
            },
          },
          {
            type: 'dropdown', title: 'Kirim Dari', source: this.sourceAddress,
          },
          { type: 'text', title: 'Nama Pembeli' },
          { type: 'text', title: 'Nomor HP' },
          { type: 'text', title: 'Kode Pos' },
          { type: 'text', title: 'Alamat Detail', width: 250 },
          {
            type: 'dropdown', title: 'Produk', width: 200, source: this.sourceProduct,
          },
          {
            type: 'dropdown', title: 'Variasi Spesifik', width: 300, source: this.sourceVariant, filter: this.filterVariant,
          },
          { type: 'text', title: 'Catatan Order' },
          { type: 'text', title: 'Kuantitas' },
          {
            type: 'dropdown', title: 'Metode pembayaran', width: 200, source: this.sourcePayment,
          },
          {
            type: 'dropdown', title: 'Ekspedisi', source: this.sourceShipment,
          },
          {
            type: 'text', title: 'Nilai Pembayaran', mask: 'Rp #.##', decimal: ',',
          },
        ]
      } else {
        columnTable = [
          {
            type: 'calendar',
            title: 'Tanggal Order',
            options: {
              format: 'YYYY-MM-DD',
              months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
              weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
              weekdays_short: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
              textDone: 'SELESAI',
              textReset: 'HAPUS',
              textUpdate: 'OK',
            },
          },
          {
            type: 'dropdown', title: 'Kirim Dari', source: this.sourceAddress,
          },
          { type: 'text', title: 'Nama Pembeli' },
          { type: 'text', title: 'Nomor HP' },
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
            type: 'text', title: 'Nilai Pembayaran', mask: 'Rp #.##', decimal: ',',
          },
        ]
      }
      const popupSaldo = () => this.$swal({
        html: '<span style="font-size:22px;font-weight:800">Saldo Belum Mencukupi</span><br><span style="font-size:16px">Kamu harus mengisi saldo dulu ya, sebelum membuat order dengan metode Transfer Bank</span>',
        imageUrl: iconWarning,
        confirmButtonText: 'Top up Saldo',
        confirmButtonClass: 'btn btn-primary rounded-lg',
        showCancelButton: true,
        cancelButtonText: 'Kembali',
        cancelButtonColor: '#FFFFFF',
        cancelButtonClass: 'btn btn-outline-primary text-primary',
      }).then(async response => {
        if (response.isConfirmed) {
          await this.saveSheets()
          this.$router.push('dashboard-komship')
        }
      })
      this.table = jspreadsheet(document.getElementById('spreadsheet'), {
        data: this.dataSheets,
        minDimensions: [11, 200],
        tableHeight: '60vh',
        tableOverflow: true,
        autoIncrement: false,
        defaultColWidth: 150,
        columns: columnTable,
        contextMenu(obj, x, y, e) {
          const items = []
          if (y !== null) {
            if (obj.options.allowInsertRow === true) {
              items.push({
                title: 'Sisipkan 1 baris baru di atasnya',
                onclick() {
                  obj.insertRow(1, toInteger(y), 1)
                },
              })
              items.push({
                title: 'Sisipkan 1 baris baru di bawahnya',
                onclick() {
                  obj.insertRow(1, toInteger(y))
                },
              })
            }
            if (obj.options.allowDeleteRow === true) {
              items.push({
                title: 'Hapus baris yang terpilih',
                onclick() {
                  obj.deleteRow(obj.getSelectedRows().length ? undefined : toInteger(y))
                },
              })
            }
            items.push({ type: 'line' })
            items.push({
              title: obj.options.text.copy,
              shortcut: 'Ctrl + C',
              onclick() {
                obj.copy(true)
              },
            })
            if (navigator && navigator.clipboard) {
              items.push({
                title: obj.options.text.paste,
                shortcut: 'Ctrl + V',
                onclick() {
                  if (obj.selectedCell) {
                    navigator.clipboard.readText().then(text => {
                      if (text) {
                        obj.paste(obj.selectedCell[0], obj.selectedCell[1], text)
                      }
                    })
                  }
                },
              })
            }
            if (obj.options.allowExport) {
              items.push({
                title: obj.options.text.saveAs,
                shortcut: 'Ctrl + S',
                onclick() {
                  obj.download()
                },
              })
            }
          }
          return items
        },
        onchange(instance, cell, col, row, val) {
          if (col === `${columnNumber.customer_name}`) {
            if (val.length < 3 || val.length > 30) {
              const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.customer_name}`, row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan Nama pembeli dengan benar yaa..')
            }
          } else if (col === `${columnNumber.customer_phone_number}`) {
            const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.customer_phone_number}`, row])
            let phoneNumber = val.replace(/\D/g, '').replace(regexOnlyNumber, '')
            if (phoneNumber.charAt(0) === '6' && phoneNumber.charAt(1) === '2') {
              phoneNumber = `0${phoneNumber.substring(2)}`
            } else if (phoneNumber.charAt(0) !== '0') {
              phoneNumber = `0${phoneNumber}`
            }
            if (phoneNumber.length < 10 || phoneNumber.length > 13) {
              popup('Masukkan Nomor HP pembeli dengan benar yaa..')
              instance.jexcel.setValue(columnName, '')
            } else {
              instance.jexcel.setValue(columnName, phoneNumber)
            }
          } else if (col === `${columnNumber.zip_code}`) {
            if (!regexNumber.test(val) || val < 10110 || val > 99974) {
              const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.zip_code}`, row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan Kode Pos alamat pembeli dengan benar yaa..')
            }
          } else if (col === `${columnNumber.customer_address}`) {
            if (val.length < 11 || val.length > 185) {
              const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.customer_address}`, row])
              instance.jexcel.setValue(columnName, '')
              popup('Alamat pembelinya diisi dengan detail dan jelas yaa..')
            }
          } else if (col === `${columnNumber.product}`) {
            const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.variant}`, row])
            const source = allVariant.find(items => items.product_name === val)
            if (source.variant.length > 1) {
              instance.jexcel.setValue(columnName, '')
            } else {
              instance.jexcel.setValue(columnName, '-')
            }
          } else if (col === `${columnNumber.qty}`) {
            if (!regexNumber.test(val) || toInteger(val) < 1 || toInteger(val) > 1000) {
              const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.qty}`, row])
              instance.jexcel.setValue(columnName, '')
              popup('Masukkan jumlah kuantitas produk antara 1 - 1000 yaa..')
            }
          } else if (col === `${columnNumber.payment_method}`) {
            if (val === 'BANK TRANSFER' && saldo <= 0) {
              popupSaldo()
              const columnName = jspreadsheet.getColumnNameFromId([`${columnNumber.payment_method}`, row])
              instance.jexcel.setValue(columnName, '')
            }
          }
        },
        onselection(instance, col, row, cell, val) {
          const data = {
            instance, cell, col, row, val,
          }
          getSelectedTable(data)
        },
        onbeforepaste(instance, val, col, row, cell) {
          let pasteData = ''
          const rowSplit = val.split('\n')
          for (let index = 0; index < rowSplit.length; index += 1) {
            const columnSplit = rowSplit[index].split('\t')
            const getRow = toInteger(row) + index
            for (let i = 0; i < columnSplit.length; i += 1) {
              let valueColumn
              const getCol = toInteger(col) + i
              if (getCol === columnNumber.customer_name) {
                valueColumn = columnSplit[i]
                if (valueColumn !== '') {
                  if (valueColumn.length < 3 || valueColumn.length > 30) {
                    const columnName = jspreadsheet.getColumnNameFromId([`${getCol}`, `${getRow}`])
                    instance.jexcel.setComments(columnName, 'Nama pembeli belum benar, masukkan minimal 3 - 30 karakter ya')
                  }
                }
              } else if (getCol === columnNumber.customer_phone_number) {
                let phoneNumber = columnSplit[i].replace(/\D/g, '').replace(regexOnlyNumber, '')
                if (phoneNumber.charAt(0) === '6' && phoneNumber.charAt(1) === '2') {
                  phoneNumber = `0${phoneNumber.substring(2)}`
                } else if (phoneNumber.charAt(0) !== '0' && phoneNumber !== '') {
                  phoneNumber = `0${phoneNumber}`
                }
                valueColumn = phoneNumber
                if (valueColumn !== '') {
                  if (valueColumn.length < 10 || valueColumn.length > 13) {
                    const columnName = jspreadsheet.getColumnNameFromId([`${getCol}`, `${getRow}`])
                    instance.jexcel.setComments(columnName, 'Masukkan Nomor HP pembeli dengan benar yaa.. (hanya angka)')
                  }
                }
              } else if (getCol === columnNumber.zip_code) {
                valueColumn = columnSplit[i].replace(/\D/g, '').replace(regexOnlyNumber, '')
                if (valueColumn !== '') {
                  if (toInteger(valueColumn) < 10110 || toInteger(valueColumn) > 99974) {
                    const columnName = jspreadsheet.getColumnNameFromId([`${getCol}`, `${getRow}`])
                    instance.jexcel.setComments(columnName, 'Kode Pos belum tepat nih, masukkan kode Pos antara 10110 sampai 99974 ya')
                  }
                }
              } else if (getCol === columnNumber.customer_address) {
                valueColumn = columnSplit[i]
                if (valueColumn !== '') {
                  if (valueColumn.length < 11 || valueColumn.length > 185) {
                    const columnName = jspreadsheet.getColumnNameFromId([`${getCol}`, `${getRow}`])
                    instance.jexcel.setComments(columnName, 'Alamat detail belum tepat, masukkan minimal 11 karakter - 185 karakter ya')
                  }
                }
              } else if (getCol === columnNumber.qty) {
                valueColumn = columnSplit[i].replace(/\D/g, '').replace(regexOnlyNumber, '')
                if (valueColumn !== '') {
                  if (toInteger(valueColumn) < 1 || toInteger(valueColumn) > 1000) {
                    const columnName = jspreadsheet.getColumnNameFromId([`${getCol}`, `${getRow}`])
                    instance.jexcel.setComments(columnName, 'Kuantitas belum tepat, masukkan angka antara 1-1000 ya')
                  }
                }
              } else {
                valueColumn = columnSplit[i]
              }
              if (i === columnSplit.length - 1) {
                pasteData += `${valueColumn}\n`
              } else {
                pasteData += `${valueColumn}\t`
              }
            }
          }
          return pasteData
        },
      })
      this.$refs.loadingPage.hide()
    },
    addRows() {
      const rows = toInteger(this.jumlahBaris)
      this.table.insertRow(rows)
    },
    resetTable() {
      this.$swal({
        title: '<span class="font-weight-bold h4">Yakin mau menghapus semua data di Speredsheet kamu?</span>',
        imageUrl: iconWarning,
        showCancelButton: true,
        confirmButtonText: 'Reset',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonText: 'Batal',
        cancelButtonClass: 'btn btn-outline-primary bg-white text-primary',
      }).then(result => {
        if (result.isConfirmed) {
          this.table.setData([])
        }
      })
    },
    async getLastUpdated() {
      await this.$http_komship.get('/v1/order/sheet/last-update')
        .then(result => {
          const { link } = result.data
          const date = moment(link.updated_at).format('YYYY-MM-DD')
          if (date === moment().format('YYYY-MM-DD')) {
            const time = moment(link.updated_at).format('HH:mm')
            this.lastUpdated = `pada pukul ${time}, hari ini`
          } else {
            const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            const day = moment(link.updated_at).format('DD')
            const month = moment(link.updated_at).format('M')
            const year = moment(link.updated_at).format('YYYY')
            const time = moment(link.updated_at).format('HH.mm')
            this.lastUpdated = `pada pukul ${time}, ${day} ${monthName[month - 1]} ${year}`
          }
          this.loadingDraft = false
        })
        .catch(this.loadingDraft = false)
    },
    getSheetsData() {
      const sheets = this.table.getJson()
      const { columnNumber } = this
      let rowNumber = 1
      this.dataSheets = sheets.map(items => ({
        order_date: items[columnNumber.order_date] || items.order_date || '',
        address: items[columnNumber.address] || items.address || '',
        customer_name: items[columnNumber.customer_name] || items.customer_name || '',
        customer_phone_number: items[columnNumber.customer_phone_number] || items.customer_phone_number || '',
        zip_code: items[columnNumber.zip_code] || items.zip_code || '',
        customer_address: items[columnNumber.customer_address] || items.customer_address || '',
        product: items[columnNumber.product] || items.product || '',
        variant: items[columnNumber.variant] || items.variant || '',
        order_notes: items[columnNumber.order_notes] || items.order_notes || '',
        qty: items[columnNumber.qty] || items.qty || '',
        payment_method: items[columnNumber.payment_method] || items.payment_method || '',
        expedition: items[columnNumber.expedition] || items.expedition || '',
        grandtotal: items[columnNumber.grandtotal] || items.grandtotal || '',
        row: rowNumber++,
      }))
    },
    async saveSheets() {
      this.loadingDraft = true
      this.getSheetsData()
      await this.$http_komship.post('/v1/order/sheet/save-submit', {
        options: 'save',
        data: this.dataSheets,
      })
        .then(() => {
          this.loadingDraft = false
          this.getLastUpdated()
        })
        .catch(this.loadingDraft = false)
    },
    handleSubmitError(response) {
      const popup = (html, imageUrl, confirmButtonText, showCancelButton, redirect) => this.$swal({
        html,
        imageUrl,
        confirmButtonText,
        showCancelButton,
        confirmButtonClass: 'btn btn-primary rounded-lg',
        cancelButtonText: 'Kembali',
        cancelButtonColor: '#FFFFFF',
        cancelButtonClass: 'btn btn-outline-primary text-primary',
      }).then(result => {
        if (result.isConfirmed && redirect) {
          this.$router.push('dashboard-komship')
        } else {
          window.location.reload()
        }
      })
      if (response.message === "There's error in your input" && response.validation_error.length >= 1) {
        const html = `<ul><li class="text-primary">
        <span style="color: black">Beberapa data order kurang tepat<br>
        <span class="text-sm">Identifikasi teratas :<br>Data "baris ke ${response.validation_error}" tidak sesuai format</span>
        </span></li></ul>`
        const imageUrl = iconWarning
        const confirmButtonText = 'Perbaiki'
        const showCancelButton = false
        const redirect = false
        popup(html, imageUrl, confirmButtonText, showCancelButton, redirect)
      } else if (response.message === "There's error in your input" && response.cod_error.length >= 1) {
        const html = `<ul><li class="text-primary">
        <span style="color: black">Beberapa data order kurang tepat<br>
        <span class="text-sm">Identifikasi teratas :<br>Data "baris ke ${response.cod_error}" diluar jangkauan wilayah COD atau Kode Pos belum tepat</span>
        </span></li></ul>`
        const imageUrl = iconNonCOD
        const confirmButtonText = 'Perbaiki'
        const showCancelButton = false
        const redirect = false
        popup(html, imageUrl, confirmButtonText, showCancelButton, redirect)
      } else if (response.message === 'Your balance is not enough') {
        const html = `<span style="font-size:22px;font-weight:800">Upps.. Saldo Belum Mencukupi</span><br>
          <span style="font-size:16px">Kamu harus mempunyai saldo lebih dari **Rp. ${this.formatCurrency(response.data)}** ya, sesuai dengan nilai total ongkir atas orderan yang diinput.</span>`
        const imageUrl = iconWarning
        const confirmButtonText = 'Top up Saldo'
        const showCancelButton = true
        const redirect = true
        popup(html, imageUrl, confirmButtonText, showCancelButton, redirect)
      } else if (response.message === "There's error in shipping" && response.error_data !== []) {
        const html = `<ul><li class="text-primary">
        <span style="color: black">Beberapa data order kurang tepat<br>
        <span class="text-sm">Identifikasi teratas :<br>Data "baris ke ${response.error_data}" alamat tujuannya diluar jangkauan ekspedisi yang dipilih, mohon pilih ekspedisi lainnya</span>
        </span></li></ul>`
        const imageUrl = iconNonShipping
        const confirmButtonText = 'Perbaiki'
        const showCancelButton = false
        const redirect = false
        popup(html, imageUrl, confirmButtonText, showCancelButton, redirect)
      } else {
        const html = `<span style="font-size:16px">Maaf ada kesalahan teknis pada line ${response.line}. Harap cek kembali orderan anda</span>`
        const imageUrl = iconWarning
        const confirmButtonText = 'Cek'
        const showCancelButton = false
        const redirect = false
        popup(html, imageUrl, confirmButtonText, showCancelButton, redirect)
      }
    },
    getDataSubmit() {
      const dataFilter = this.dataSheets.filter(
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
      this.dataSubmit = dataFilter.map(items => ({
        order_date: items.order_date !== '' ? moment(items.order_date).format('YYYY-MM-DD') : '',
        address: items.address,
        customer_name: items.customer_name,
        customer_phone_number: items.customer_phone_number,
        zip_code: items.zip_code !== '' ? toInteger(items.zip_code) : '',
        customer_address: items.customer_address,
        product: items.product,
        variant: items.variant,
        order_notes: items.order_notes,
        qty: items.qty ? toInteger(items.qty) : '',
        payment_method: items.payment_method,
        expedition: items.expedition,
        grandtotal: items.grandtotal !== '' ? toInteger(items.grandtotal) : '',
        row: items.row,
      }))
    },
    splitDataSubmit() {
      this.getSheetsData()
      this.getDataSubmit()
      this.dataSplit = []
      let splitOrder = []
      for (let index = 0; index < this.dataSubmit.length; index += 1) {
        if (this.dataSubmit[index].order_date !== '') {
          if (splitOrder.length > 0) {
            this.dataSplit.push(splitOrder)
          }
          splitOrder = []
          if (index === this.dataSubmit.length - 1) {
            splitOrder.push(this.dataSubmit[index])
            this.dataSplit.push(splitOrder)
          } else {
            splitOrder.push(this.dataSubmit[index])
          }
        } else if (index === this.dataSubmit.length - 1) {
          splitOrder.push(this.dataSubmit[index])
          this.dataSplit.push(splitOrder)
        } else {
          splitOrder.push(this.dataSubmit[index])
        }
      }
    },
    onSubmitSheets() {
      this.disableSubmit = true
      this.$swal({
        title: '<span class="font-weight-bold h4">Semua data yang kamu masukan di Speadsheet akan menjadi Order</span>',
        imageUrl: iconWarning,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonText: 'Batal',
        cancelButtonClass: 'btn btn-outline-primary bg-white text-primary',
      }).then(async result => {
        if (result.isConfirmed) {
          await this.saveSheets()
          this.submitSheets()
        } else {
          this.disableSubmit = false
        }
      }).catch(() => {
        this.disableSubmit = false
      })
    },
    async submitSheets() {
      this.splitDataSubmit()
      this.totalOrder = this.dataSplit.length
      this.submitProgress = null
      this.submitProgressStatus = true
      this.$refs.loadingSubmit.show()
      let uploadOrder = 0
      for (let index = 0; index < this.dataSplit.length; index += 1) {
        try {
          const submit = await this.$http_komship.post('/v1/order/sheet/save-submit', {
            options: 'submit',
            data: this.dataSplit[index],
          })
          if (submit.data.code === 200) {
            const count = submit.data.data
            uploadOrder += count
            this.submitProgress = Math.floor((uploadOrder * 100) / this.totalOrder)
            if (index === this.dataSplit.length - 1) {
              this.$refs.loadingSubmit.hide()
              this.$swal({
                title: `<span class="font-weight-bold h4">${this.totalOrder} order berhasil ditambahkan</span>`,
                imageUrl: iconSuccess,
                confirmButtonText: 'Lihat Data Order',
                confirmButtonClass: 'btn btn-primary',
              }).then(response => {
                if (response.isConfirmed) {
                  this.$router.push('data-order')
                } else {
                  window.location.reload()
                }
              })
            }
          }
        } catch (error) {
          const { data } = error.response
          if (!data) {
            this.submitProgressStatus = false
          } else {
            this.$refs.loadingSubmit.hide()
            this.handleSubmitError(data)
          }
          break
        }
      }
    },
  },
}
