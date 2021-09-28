<template>
  <div class="container p-0">
    <h1 class="mb-2 h-text-xl">
      Informasi Penghasilan
    </h1>
    <div class="d-flex justify-content-between">
      <div class="d-block" style="width: 29.5%">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="d-flex align-items-center">
              <div class="first-card-header-text me-8 mb-0">
                Cashback
              </div>
            </div>
          </div>
          <div class="card-body pb-0 mb-0">
            <div class="h-text-xl pb-0 mb-0">
              {{ formatRupiah(cashback) }}
            </div>
            <p class="mb-0">
              Total cashback yang kamu dapatkan semenjak menggunakan Komship
            </p>
          </div>
        </div>
      </div>
      <div class="d-block" style="width: 21.5%">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="first-card-header-text me-8 mb-0">
              Penghasilan
              <div class="d-flex align-items-center">
                <p class="mb-0 mr-1">7 Hari Terakhir</p>
                <img
                  src="@/assets/images/icons/info-circle.svg"
                  alt="Info"
                >
              </div>
            </div>
          </div>
          <div class="card-body h-text-lg pb-0 mt-2 mb-0">
            {{ formatRupiah(penghasilan7Hari) }}
          </div>
        </div>
      </div>
      <div class="d-block" style="width: 21.5%">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="first-card-header-text me-8 mb-0">
              Penghasilan
              <div class="d-flex align-items-center">
                <p class="mb-0 mr-1">30 Hari Terakhir</p>
                <img
                  src="@/assets/images/icons/info-circle.svg"
                  alt="Info"
                >
              </div>
            </div>
          </div>
          <div class="card-body h-text-lg pb-0 mt-2 mb-0">
            {{ formatRupiah(penghasilan30Hari) }}
          </div>
        </div>
      </div>
      <div class="d-block" style="width: 21.5%">
        <div class="card h-100">
          <div class="card-header mb-8 pb-0">
            <div class="first-card-header-text me-8 mb-0">
              Penghasilan
              <div class="d-flex align-items-center">
                <p class="mb-0 mr-1">Total</p>
                <img
                  src="@/assets/images/icons/info-circle.svg"
                  alt="Info"
                >
              </div>
            </div>
          </div>
          <div class="card-body h-text-lg pb-0 mt-2 mb-0">
            {{ formatRupiah(penghasilanTotal) }}
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="h-text-lg">
              Rincian Penghasilan
            </div>
            <div class="d-flex justify-content-end w-50">
              <b-form-group class="w-25 mb-0 mr-1">
                <v-select
                  v-model="selectedPenghasilan"
                  label="Kompship"
                  dir="ltr"
                  :options="optionsPenghasilan"
                  :clearable="false"
                />
              </b-form-group>
              <div class="dropdown w-50 mb-0">
                <b-dropdown id="dropdown-1" ref="dropdown" variant="outline-secondary" dropright class="rounded w-100" no-caret>
                  <template #button-content>
                    <span>{{ customDate }}</span>
                  </template>
                  <div class="d-flex flex-nowrap">
                    <div>
                      <b-dropdown-item v-for="val in dropDownValues" :key="val.value" :active="selectedCstDate === val.value ? true : null">
                        <b-form>
                          <div @click.stop="selectCstDate(val.value)">{{ val.text }}</div>
                        </b-form>
                      </b-dropdown-item>
                    </div>
                    <div class="border-left">
                      <flat-pickr
                        v-model="customDate"
                        :config="cstDateCfg"
                      />
                      <p v-if="err" class="small text-danger ml-2">Silahkan memilih tanggal</p>
                      <div class="text-right mt-3">
                        <button class="btn btn-secondary" @click="closeDropdown(true)">Cancel</button>
                        <button class="btn btn-success mx-1" @click="closeDropdown(false)">Apply</button>
                      </div>
                    </div>
                  </div>
                </b-dropdown>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-md-6 pr-0">
                <p class="h-text-xl">COD</p>
                <ChartPenghasilan :height="300"/>
              </div>
              <div class="col-12 col-md-6 row px-0">
                <div class="col-12 h-5-5"></div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Orderan COD
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ dataCod.orderan }}%
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Orderan Sukses
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ dataCod.sukses }}%
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Orderan Retur
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ dataCod.retur }}%
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Penghasilan Kotor
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text text-orange">
                      {{ formatRupiah(dataCod.pKotor) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Penghasilan Bersih
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text text-blue">
                      {{ formatRupiah(dataCod.pBersih) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Cashback Ongkos Kirim
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataCod.cashbackOngkir) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Ongkos Kirim
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataCod.ongkir) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Ongkos Kirim Bersih
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataCod.ongkirBersih) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Biaya COD
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataCod.biayaCod) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-md-6 pr-0">
                <p class="h-text-xl">Transfer</p>
                <ChartPenghasilan :height="300"/>
              </div>
              <div class="col-12 col-md-6 row px-0">
                <div class="col-12 h-5-5"></div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Orderan Transfer Bank
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ dataTransfer.orderan }}%
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Orderan Sukses
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ dataTransfer.sukses }}%
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Orderan Retur
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ dataTransfer.retur }}%
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Penghasilan Kotor
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text text-orange">
                      {{ formatRupiah(dataTransfer.pKotor) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Penghasilan Bersih
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text text-blue">
                      {{ formatRupiah(dataTransfer.pBersih) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Cashback Ongkos Kirim
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataTransfer.cashbackOngkir) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Ongkos Kirim
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataTransfer.ongkir) }}
                    </div>
                  </div>
                </div>
                <div class="col-4 pr-0 h-color-dark mb-1">
                  <div class="border rounded-16 h-100 p-1">
                    <div class="d-flex flex-nowrap">
                      <div class="info-card-header-text">
                        Ongkos Kirim Bersih
                      </div>
                      <img
                        src="@/assets/images/icons/info-circle.svg"
                        alt="Info"
                        class="ml-1"
                      >
                    </div>
                    <div class="info-card-body-text">
                      {{ formatRupiah(dataTransfer.ongkirBersih) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormGroup, BDropdown, BDropdownItem } from 'bootstrap-vue'
import vSelect from 'vue-select'
import FlatPickr from 'vue-flatpickr-component'
import ChartPenghasilan from '../../../components/chart/ChartPenghasilan.vue'

import 'flatpickr/dist/flatpickr.css'

export default {
  components: {
    BFormGroup,
    BDropdown,
    BDropdownItem,
    vSelect,
    FlatPickr,
    ChartPenghasilan,
  },
  data() {
    return {
      cashback: 4460000,
      penghasilan7Hari: 400200100,
      penghasilan30Hari: 4200000,
      penghasilanTotal: 4200000,
      selectedPenghasilan: 'Kompship',
      optionsPenghasilan: ['Kompship'],
      dataCod: {
        orderan: 70,
        sukses: 75,
        retur: 25,
        pKotor: 199666000,
        pBersih: 199666000,
        cashbackOngkir: 199666000,
        ongkir: 199666000,
        ongkirBersih: 199666000,
        biayaCod: 199666000,
      },
      dataTransfer: {
        orderan: 70,
        sukses: 75,
        retur: 25,
        pKotor: 199666000,
        pBersih: 199666000,
        cashbackOngkir: 199666000,
        ongkir: 199666000,
        ongkirBersih: 199666000,
        biayaCod: 199666000,
      },
      dropDownValues: [
        { text: '7 Hari Terakhir', value: -7 },
        { text: '30 Hari Terakhir', value: -30 },
        { text: 'Bulan ini', value: 30 },
      ],
      selectedCstDateBefore: -7,
      selectedCstDate: -7,
      customDate: null,
      dateNow: null,
      cstDateCfg: {
        mode: 'range',
        inline: true,
        altFormat: 'M j, Y',
        altInput: true,
        altInputClass: 'd-none',
      },
      err: false,
    }
  },
  mounted() {
    this.dateNow = new Date()
    this.customDate = `${this.formatDate(this.dateNow.setDate(this.dateNow.getDate() - 7))} to ${this.formatDate(Date.now())}`
  },
  methods: {
    formatRibuan(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatRupiah(x) {
      return `Rp ${this.formatRibuan(x)}`
    },
    selectCstDate(val) {
      this.dateNow = new Date()
      this.selectedCstDateBefore = this.selectedCstDate
      this.selectedCstDate = val
      this.customDate = `${this.formatDate(this.dateNow.setDate(this.dateNow.getDate() + val))} to ${this.formatDate(Date.now())}`
    },
    closeDropdown(batal) {
      this.err = false
      this.dateNow = new Date()

      if (batal) {
        this.customDate = `${this.formatDate(this.dateNow.setDate(this.dateNow.getDate() + this.selectedCstDateBefore))} to ${this.formatDate(Date.now())}`
        this.selectedCstDate = this.selectedCstDateBefore
        this.$refs.dropdown.hide(true)
      } else if (this.customDate) {
        this.$refs.dropdown.hide(true)
      } else {
        this.err = true
      }
    },
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1) // eslint-disable-line
      let day = '' + d.getDate() // eslint-disable-line
      const year = d.getFullYear()

      if (month.length < 2) {
          month = '0' + month // eslint-disable-line
      }
      if (day.length < 2) {
          day = '0' + day // eslint-disable-line
      }

      return [year, month, day].join('-')
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.container {
  font-family: 'Poppins', sans-serif;
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
.first-card-header-text {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #828282;
}
.first-card-header-text p {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
}
.info-card-header-text {
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
}
.info-card-body-text {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.5px;
  text-align: left;
}
.card,
.rounded-16 {
  border-radius: 16px !important;
}
.h-color-dark {
  color: #222222;
}
.text-orange {
  color: #FBA63C;
}
.text-blue {
  color: #08A0F7;
}
.h-5-5 {
  height: 5.5em;
}
.flatpickr-calendar {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
