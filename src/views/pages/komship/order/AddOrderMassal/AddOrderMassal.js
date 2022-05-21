/* eslint-disable no-plusplus */
import jspreadsheet from 'jspreadsheet-ce'
import axios from 'axios'

export default {
  data() {
    return {
      dataSheets: [],
      sourceAddress: null,
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
            type: 'dropdown', title: 'Produk', width: 200,
          },
          {
            type: 'dropdown', title: 'Variasi Spesifik', width: 300,
          },
          { type: 'text', title: 'Kuantitas' },
          {
            type: 'dropdown', title: 'Metode pembayaran', width: 200,
          },
          {
            type: 'dropdown', title: 'Ekspedisi',
          },
          {
            type: 'numeric', title: 'Nilai Pembayaran', mask: 'Rp #.##,00', decimal: ',',
          },
        ],
      })
    },
  },
}
