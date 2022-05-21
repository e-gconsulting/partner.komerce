import jspreadsheet from 'jspreadsheet-ce'

export default {
  data() {
    return {
      dataSheets: [],
    }
  },
  mounted() {
    this.getTable()
  },
  methods: {
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
            type: 'dropdown', title: 'Kirim Dari',
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
