<template>
  <div class="container p-0">
    <div class="card">
      <div class="card-header align-items-start">
        <div>
          <p class="h-text-lg mb-0">Rincian Penarikan</p>
          <p class="h-text-sm font-weight-normal">{{ dateStart }} - {{ dateEnd }}</p>
        </div>
        <span v-if="statusPenerimaan.toLowerCase() === 'disetujui'" class="font-weight-bold rounded status-success">{{ statusPenerimaan }}</span>
        <span v-else-if="statusPenerimaan.toLowerCase() === 'direview'" class="font-weight-bold rounded status-info">{{ statusPenerimaan }}</span>
        <span v-else-if="statusPenerimaan.toLowerCase() === 'diajukan'" class="font-weight-bold rounded status-warning">{{ statusPenerimaan }}</span>
        <span v-else-if="statusPenerimaan.toLowerCase() === 'ditolak'" class="font-weight-bold rounded status-danger">{{ statusPenerimaan }}</span>
        <span v-else class="font-weight-bold rounded status-danger">{{ statusPenerimaan }}</span>
      </div>
      <div class="card-body px-0">
        <div class="row px-2">
          <div class="col-12 col-md-4">
            <div class="rounded border p-1">
              <p class="h-text-md mb-0">
                <span class="font-weight-normal">Total Saldo: </span>
                <span class="text-orange">{{ formatRupiah(totalSaldo) }}</span>
              </p>
              <p class="h-text-md mb-0">
                <span class="font-weight-normal">Saldo Awal: </span>
                {{ formatRupiah(saldoAwal) }}
              </p>
            </div>
          </div>
          <div class="col-12 col-md-5">
            <div class="rounded border p-1">
              <p class="h-text-md mb-0">
                <span class="font-weight-normal">Nominal Penarikan Saldo: </span>
                {{ formatRupiah(nominalPenarikan) }}
              </p>
              <p class="h-text-md mb-0">
                <span class="font-weight-normal">Sisa Saldo: </span>
                {{ formatRupiah(sisaSaldo) }}
              </p>
            </div>
          </div>
          <table class="table table-borderless mt-3">
            <thead>
              <tr>
                <th
                  v-for="title in tableTitles"
                  :key="title"
                  class="h-text-sm transform-none h-text-dark bg-white h-border-bottom pb-2"
                  scope="col"
                >
                  {{ title }}
                </th>
              </tr>
            </thead>
            <tbody class="h-text-xs">
              <tr
                v-for="rincian in rincianSaldos"
                :key="rincianSaldos.indexOf(rincian)"
                :class="'py-1' + (rincianSaldos.indexOf(rincian) != rincianSaldos.length-1 ? ' border-bottom' : '')">
                <th>
                  <p class="mb-0 h-text-dark">{{ rincian.tanggal }}</p>
                </th>
                <td>
                  <p class="mb-0 h-text-dark font-weight-bold">{{ rincian.jenisOrder == 0 ? 'Transfer Bank' : (rincian.jenisOrder == 1 ? 'COD (Bayar di tempat)' : 'Unknown') }}</p>
                  <p v-if="rincian.retur" class="text-xxs mb-0">Retur</p>
                </td>
                <td class="h-text-dark font-weight-bold">
                  {{ formatRupiah(rincian.nilaiOrder) }}
                </td>
                <td>
                  <p class="mb-0 h-text-dark font-weight-bold">{{ formatRupiah(rincian.ongkir) }}</p>
                  <p v-if="rincian.ongkirTambahan" class="text-xxs mb-0 font-weight-bold">{{ formatRupiah(rincian.ongkirTambahan) }}</p>
                </td>
                <td class="h-text-dark font-weight-bold">
                  {{ rincian.biayaCod !== null ? formatRupiah(rincian.biayaCod) : '-' }}
                </td>
                <td :class="'font-weight-bold ' + (rincian.negative ? 'text-danger' : 'text-success')">
                  {{ (rincian.negative ? '-' : '+') + formatRupiah(rincian.saldo) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <p class="font-weight-bold mb-0">Catatan:</p>
        <p>Penarikan saldo kamu memerlukan review oleh pihak admin, dikarenakan adanya kejanggalan dalam pendapatan kamu.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateStart: '12 Agustus 2021',
      dateEnd: 'Sekarang',
      totalSaldo: 5000000,
      saldoAwal: 3500000,
      nominalPenarikan: 4500000,
      sisaSaldo: 500000,
      statusPenerimaan: 'Disetujui',
      tableTitles: ['Tanggal', 'Jenis Order', 'Nilai Order', 'Ongkos Kirim', 'Biaya COD', 'Saldo'],
      tableHeadInfos: [3, 4],
      rincianSaldos: [
        {
          tanggal: '12-08-2021',
          jenisOrder: 0,
          retur: false,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: null,
          biayaCod: null,
          saldo: 7500,
          negative: true,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 0,
          retur: false,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: null,
          biayaCod: null,
          saldo: 7500,
          negative: true,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 0,
          retur: false,
          nilaiOrder: 100000,
          ongkir: 7500,
          biayaCod: null,
          saldo: 7500,
          negative: true,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 1,
          retur: false,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: null,
          biayaCod: 2500,
          saldo: 89700,
          negative: false,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 1,
          retur: true,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: 3500,
          biayaCod: 2500,
          saldo: 89700,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 0,
          retur: true,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: null,
          biayaCod: null,
          saldo: 7500,
          negative: true,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 1,
          retur: true,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: null,
          biayaCod: 2500,
          saldo: 89700,
          negative: false,
        },
        {
          tanggal: '12-08-2021',
          jenisOrder: 0,
          retur: true,
          nilaiOrder: 100000,
          ongkir: 7500,
          ongkirTambahan: null,
          biayaCod: null,
          saldo: 7500,
          negative: true,
        },
      ],
    }
  },
  methods: {
    formatRibuan(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatRupiah(x) {
      return `Rp ${this.formatRibuan(x)}`
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.container {
  font-family: 'Poppins', sans-serif;
}
.h-text-lg {
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #222222;
}
.h-text-md {
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #222222;
}
.h-text-sm {
  font-size: 16px !important;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
}
.h-text-xs {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.5px;
  text-align: left;
}
.text-xxs {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.5px;
  text-align: left;
}
.text-orange {
  color: #ff6a3a;
}
.h-text-dark {
  color: #222222 !important;
}
.transform-none {
  text-transform: none !important;
}
.h-border-bottom {
  border-bottom: 2px solid #C2C2C2 !important;
}
.text-danger {
  color: #E31A1A;
}
.text-success {
  color: #34A770;
}
.status-success, .status-info,
.status-warning, .status-danger {
  padding: 8px 27px;
}
.status-success {
  background-color: #DCF3EB;
  color: #34A770;
}
.status-info {
  background-color: #DFF3FF;
  color: #08A0F7;
}
.status-warning {
  background-color: #FFF2E2;
  color: #FBA63C;
}
.status-danger {
  background-color: #FFEDED;
  color: #E31A1A;
}
</style>
