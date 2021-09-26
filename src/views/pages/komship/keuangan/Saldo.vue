<template>
  <div class="container p-0">
    <h1 class="mb-2 h-text-xl">
      Informasi Saldo
    </h1>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Saldo
              </div>
              <img
                src="@/assets/images/icons/info-circle.svg"
                alt="Info"
              >
            </div>
          </div>
          <div class="card-body h-text-xl pb-0 mb-0">
            {{ formatRupiah(saldo) }}
          </div>
          <div class="card-footer d-flex justify-content-around bg-orange text-white rounded-16 py-9">
            <a class="d-flex flex-column justify-content-center align-items-center">
              <img
                src="@/assets/images/icons/send-square.svg"
                alt="Top Up"
              >
              <p class="h-text-xs mb-0">
                Top Up
              </p>
            </a>
            <a class="d-flex flex-column justify-content-center align-items-center">
              <img
                src="@/assets/images/icons/receive-square.svg"
                alt="Tarik Saldo"
              >
              <p class="h-text-xs mb-0">
                Tarik Saldo
              </p>
            </a>
            <a class="d-flex flex-column justify-content-center align-items-center">
              <img
                src="@/assets/images/icons/document-text.svg"
                alt="Detail"
              >
              <p class="h-text-xs mb-0">
                Detail
              </p>
            </a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Saldo Pending
              </div>
              <img
                src="@/assets/images/icons/info-circle.svg"
                alt="Info"
              >
            </div>
            <img
              src="@/assets/images/icons/arrow-square-right.svg"
              alt="Arrow Right"
            >
          </div>
          <div class="card-body h-text-xl pb-0 mb-0">
            {{ formatRupiah(saldoPending) }}
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Rekening Bank
              </div>
              <img
                src="@/assets/images/icons/info-circle.svg"
                alt="Info"
              >
            </div>
          </div>
          <div class="card-body pb-0 mb-0">
            <p class="h-text-md mt-1 mb-0">
              {{ rekening.nama }}
              <img
                src="@/assets/images/icons/arrow-down-light.svg"
                alt="Arrow Down"
                class="ml-1"
              >
            </p>
            <p class="h-text-xs mb-0">
              {{ `${rekening.bank} - ${rekening.noRek}` }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <div class="card">
          <div class="card-header mb-8 pb-0">
            <div class="h-text-lg">
              Riwayat Penarikan Saldo
            </div>
            <div class="d-flex justify-content-end">
              <b-form-group class="mr-1 mb-0">
                <FlatPickr
                  v-model="dateSaldo"
                  class="form-control"
                  :config="configSaldo"
                />
              </b-form-group>
              <a href="#" class="btn btn-outline-primary">
                Export
              </a>
            </div>
          </div>
          <div class="card-body">
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
              <tbody class="h-text-xs font-weight-bold">
                <tr
                  v-for="riwayat in riwayatPenarikans"
                  :key="riwayatPenarikans.indexOf(riwayat)"
                  :class="'py-1' + (riwayatPenarikans.indexOf(riwayat) != riwayatPenarikans.length-1 ? ' border-bottom' : '')">
                  <th>
                    <p class="mb-0 h-text-dark">{{ riwayat.tanggal }}</p>
                    <p class="mb-0">{{ riwayat.jam }}</p>
                  </th>
                  <td>
                    <p class="mb-0 h-text-dark">{{ riwayat.tujuan.nama }} - {{ riwayat.tujuan.bank }}</p>
                    <p class="mb-0">{{ riwayat.tujuan.noRek }}</p>
                  </td>
                  <td class="h-text-dark">
                    {{ riwayat.status }}
                  </td>
                  <td class="h-text-dark">
                    {{ formatRupiah(riwayat.saldo) }}
                  </td>
                  <td class="h-text-dark">
                    {{ formatRupiah(riwayat.jumlahPenarikan) }}
                  </td>
                  <td class="h-text-dark">
                    {{ riwayat.sisaSaldo == null ? '-' : formatRupiah(riwayat.sisaSaldo) }}
                  </td>
                  <td>
                    Lihat Detail
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormGroup } from 'bootstrap-vue'
import FlatPickr from 'vue-flatpickr-component'

import 'flatpickr/dist/flatpickr.css'

export default {
  components: {
    BFormGroup,
    FlatPickr,
  },
  data() {
    return {
      saldo: 8500000,
      saldoPending: 4200000,
      rekening: {
        nama: 'Hanif Muflihul Anwar',
        bank: 'Mandiri',
        noRek: '********2334',
      },
      dateSaldo: null,
      configSaldo: {
        mode: 'range',
      },
      tableTitles: ['Tanggal', 'Tujuan Penarikan', 'Status', 'Saldo', 'Jumlah Penarikan', 'Sisa Saldo', 'Rincian'],
      riwayatPenarikans: [
        {
          tanggal: '12-08-2021',
          jam: '14.59',
          tujuan: {
            nama: 'Komerce',
            bank: 'Bank Mandiri',
            noRek: '92350923520395',
          },
          status: 'Diajukan',
          saldo: 1500000,
          jumlahPenarikan: 4540000,
          sisaSaldo: null,
        },
        {
          tanggal: '12-08-2021',
          jam: '14.59',
          tujuan: {
            nama: 'Komerce',
            bank: 'Bank Mandiri',
            noRek: '92350923520395',
          },
          status: 'Direview',
          saldo: 1500000,
          jumlahPenarikan: 4540000,
          sisaSaldo: null,
        },
        {
          tanggal: '12-08-2021',
          jam: '14.59',
          tujuan: {
            nama: 'Komerce',
            bank: 'Bank Mandiri',
            noRek: '92350923520395',
          },
          status: 'Disetujui',
          saldo: 1500000,
          jumlahPenarikan: 4540000,
          sisaSaldo: 0,
        },
        {
          tanggal: '12-08-2021',
          jam: '14.59',
          tujuan: {
            nama: 'Komerce',
            bank: 'Bank Mandiri',
            noRek: '92350923520395',
          },
          status: 'Ditolak',
          saldo: 1500000,
          jumlahPenarikan: 4540000,
          sisaSaldo: null,
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
.bg-orange {
  background-color: #ff6a3a !important;
}
.bg-orange2 {
  background-color: #F95031 !important;
}
.card,
.rounded-16 {
  border-radius: 16px !important;
}
.first-card-header-text {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.5px;
  text-align: left;
}
.h-text-xl {
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #222222;
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
.py-9 {
  padding-top: 9px;
  padding-bottom: 9px;
}
.me-8 {
  margin-right: 8px;
}
.mb-8 {
  margin-bottom: 8px;
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
</style>
