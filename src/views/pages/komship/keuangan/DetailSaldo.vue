<template>
  <b-card>
    <b-row class="justify-content-between mb-2 mr-1">
      <b-col>
        <h2 class="font-bold mb-2">
          Rincian Saldo
        </h2>
      </b-col>
      <b-col
        cols="2"
        class="text-end mr-1"
      >
        <b-button
          variant="primary"
          @click="$bvModal.show('download-rincian-saldo')"
        >
          Download
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1 mr-1">
      <b-col
        cols="12"
        md="6"
        class="mb-1"
      >
        <div
          style="border: 1px solid #e2e2e2; border-radius: 8px"
          class="text-xl px-1 py-2 sm:w-80"
        >
          Saldo:
          <span
            class="text-primary font-bold"
          >{{ totalSaldo >= 0 ? '' : '-' }} Rp
            {{ formatNumber(totalSaldo) }}</span>
        </div>
      </b-col>
      <b-col
        cols="12"
        md="6"
      >
        <b-row class="justify-content-end mr-1">
          <div class="mr-1  my-[8px]">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" />
              </b-input-group-prepend>
              <b-form-input
                v-model="searchResi"
                placeholder="No Resi"
                @input="handleSearchResi"
              />
            </b-input-group>
          </div>
          <div class="align-self-center">
            <b-button
              variant="primary"
              style="border-radius: 12px; padding: 7px"
              @click="setDropdown"
            >
              <b-img
                class="w-7"
                src="https://storage.googleapis.com/komerce/assets/komerce-icon/Putih/filter-search.svg"
              />
              <div
                class="wrapper-notification-count"
              >
                <span class="text-white font-semibold">{{ lengthFilter.length + 1 }}</span>
              </div>
            </b-button>
            <ul
              v-if="dropdownFilter === true"
              class="dropdown-list-menu text-black font-medium text-[12px] pb-1"
            >
              <li class="py-1 px-1 border-b-2">
                Filter
              </li>
              <li class="py-1 px-1">
                <div
                  id="popoverTransactionType"
                  type="button"
                >
                  Jenis Transaksi
                </div>
                <b-popover
                  target="popoverTransactionType"
                  triggers="hover focus"
                  placement="left"
                >
                  <div>
                    <b-form-checkbox
                      v-model="isAllChecked"
                      class="my-1 text-black text-[12px]"
                      @change="CeklistAll"
                    >
                      Semua
                    </b-form-checkbox>
                    <b-form-checkbox
                      v-for="item in ListFilterType"
                      :key="item.value"
                      v-model="item.selected"
                      class="my-1 text-black text-[12px]"
                      @change="getSelectedFilter"
                    >
                      {{ item.label }}
                    </b-form-checkbox>
                  </div>
                </b-popover>
              </li>
              <li
                type="button"
                class="py-1 px-1"
              >
                <date-range-picker
                  ref="picker"
                  v-model="dateRange"
                  :locale-data="locale"
                  :ranges="ranges"
                  :opens="'left'"
                  class="w-100"
                  control-container-class="border-0"
                >
                  <template
                    v-slot:input="picker"
                    style="min-width: 350px"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center text-black text-[12px]"
                    >
                      <div
                        class="mr-1"
                      >
                        <span
                          v-if="formatDate(picker.startDate) === formatDate(last7)"
                        >Tanggal (7 Hari Terakhir)</span>
                        <span
                          v-else-if="formatDate(picker.startDate) === formatDate(last30)"
                        >Tanggal (30 Hari Terakhir)</span>
                        <span
                          v-else-if="formatDate(picker.startDate) === formatDate(last60)"
                        >Tanggal (60 Hari Terakhir)</span>
                        <span
                          v-else-if="formatDate(picker.startDate) === formatDate(firstDateOfMonth) && formatDate(picker.endDate) === formatDate(today)"
                        >Bulan Ini</span>
                        <span
                          v-else-if="formatDate(picker.startDate) === formatDate(today) && formatDate(picker.endDate) === formatDate(today)"
                        >Custom Tanggal</span>
                        <span
                          v-else
                        >Custom Tanggal</span>
                      </div>
                    </div>
                  </template>
                </date-range-picker>
              </li>
              <div class="mt-2 mx-1">
                <b-button
                  size="sm"
                  variant="outline-primary"
                  class="mr-2"
                  @click="ResetFilter()"
                >
                  Reset
                </b-button>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="fetchData()"
                >
                  Simpan
                </b-button>
              </div>
            </ul>
          </div>
        </b-row>
      </b-col>
    </b-row>
    <b-overlay
      variant="light"
      :show="loadTable"
      spinner-variant="primary"
      blur="0"
      opacity=".5"
      rounded="sm"
    >
      <b-table
        responsive
        show-empty
        empty-text="Tidak ada data untuk ditampilkan."
        :items="items"
        :fields="fields"
      >
        <template #cell(date_transaction)="data">
          <span>{{ moment(data.item.date_transaction) }}</span><br>
          <span class="text-muted">{{
            momentTime(data.item.date_transaction)
          }}</span>
        </template>
        <template #cell(transaction_type)="data">
          <span v-if="data.item.transaction_type === 'topup' && data.item.claim_retur === null">
            Top Up Saldo
          </span>
          <span v-if="data.item.transaction_type === 'shopping'">
            Belanja (<span class="text-muted">Keperluan Talent</span>)
          </span>
          <span v-if="data.item.transaction_type === 'withdrawal'">
            Penarikan Saldo
          </span>
          <span
            v-if="data.item.transaction_type === 'kompoints'"
            class="text-black"
          >
            Rewards Kompoints
          </span>
          <span v-if="data.item.transaction_type === 'orderku_done'">
            Orderan COD (
            <span
              v-if="data.item.order_status !== 'Hilang' && data.item.order_status !== 'Rusak'"
              class="text-success"
            >Diterima</span>
            <span
              v-if="data.item.order_status === 'Hilang'"
              class="text-muted"
            >Ganti Rugi Paket Hilang</span>
            <span
              v-if="data.item.order_status === 'Rusak'"
              class="text-muted"
            >Ganti Rugi Paket Rusak</span>
            )
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="https://storage.googleapis.com/komerce/assets/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'orderku_cancel'">
            Orderan Non COD (<span class="text-muted">Cancel</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="https://storage.googleapis.com/komerce/assets/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'orderku_ongkir'">
            Orderan Non COD (<span class="text-muted">Ongkir</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="https://storage.googleapis.com/komerce/assets/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.transaction_type === 'orderku_retur' &&
                data.item.payment_method === 'COD'
            "
          >
            Orderan COD (<span class="text-danger">Retur</span>)
            <b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="https://storage.googleapis.com/komerce/assets/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.transaction_type === 'orderku_retur' &&
                data.item.payment_method === 'BANK TRANSFER'
            "
          >
            Orderan Non COD (<span class="text-danger">Retur</span>)<b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="https://storage.googleapis.com/komerce/assets/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.cnote }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.cnote)"
                >
                  <img
                    id="infoSaldo"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span
            v-if="
              data.item.claim_retur !== null
            "
          >
            Orderan COD (<span class="text-muted">Claim Retur</span>)<b-row>
              <img
                :src="data.item.shipment_image_path"
                width="70"
              >
              <img
                :id="`${data.index}-infoSaldo`"
                src="https://storage.googleapis.com/komerce/assets/icons/info-circle.svg"
              >
            </b-row>
            <b-popover
              triggers="hover"
              :target="`${data.index}-infoSaldo`"
              placement="bottomleft"
            >
              <b-row class="px-2 align-items-center">
                <span class="text-black">
                  <strong>
                    Nomor Resi
                  </strong>
                  :
                </span>
                <span class="text-black mr-1">{{ data.item.claim_retur.no_resi }}</span>
                <b-button
                  class="btn-icon"
                  size="sm"
                  variant="flat-dark"
                  @click="copyResi(data.item.claim_retur.no_resi)"
                >
                  <img
                    id="infoSaldo"
                    src="https://storage.googleapis.com/komerce/assets/komerce-icon/Hitam/copy.svg"
                  >
                </b-button>
              </b-row>
            </b-popover>
          </span>
          <span v-if="data.item.transaction_type === 'cancel_fulfillment_fee'">
            Pembatalan Fulfillment
          </span>
          <span v-if="data.item.transaction_type === 'payment_fulfillment_fee'">
            Biaya Fulfillment
          </span>
          <span v-if="data.item.transaction_type === 'outbound_fee'">
            Penarikan Barang
          </span>
          <span v-if="data.item.transaction_type === 'outbound_cancel'">
            Pembatalan Penarikan Barang
          </span>
        </template>
        <template #cell(amount)="data">
          <span
            v-if="data.item.amount.charAt(0) === '+'"
            class="text-success"
          >
            +Rp {{ formatNumber(data.item.amount) }}
          </span>
          <span
            v-if="data.item.amount.charAt(0) === '-'"
            class="text-primary"
          >
            -Rp {{ formatNumber(data.item.amount) }}
          </span>
          <div
            v-if="data.item.amount_kompoint"
            class="d-flex align-items-center mt-50"
          >
            <div v-if="data.item.amount_kompoint !== 0">
              <span
                v-if="data.item.amount_kompoint.charAt(0) === '-'"
                class="text-primary mr-50"
              >
                -Rp {{ formatNumber(data.item.amount_kompoint) }}
              </span>
              <img
                style="width: 24px"
                src="https://storage.googleapis.com/komerce/assets/icons/Kompoints.svg"
              >
            </div>
          </div>
        </template>
        <template #cell(saldo)="data">
          {{ data.item.saldo >= 0 ? '' : '-' }}Rp
          {{ formatNumber(data.item.saldo) }}
          <div
            v-if="data.item.kompoint_status === true"
            class="d-flex align-items-center mt-50"
          >

            <img
              style="width: 24px"
              src="https://storage.googleapis.com/komerce/assets/icons/Kompoints.svg"
            >
            <span
              class="text-[#CC9212] ml-50"
            >
              {{ formatNumber(data.item.kompoint) }}
            </span>
          </div>
        </template>
        <template #cell(action)="data">
          <b-button
            v-if="Array.isArray(data.item.order_id) && data.item.outbound_id === 0"
            variant="none"
            class="button-detail d-flex text-info justify-center"
            :to="{
              name: 'detail-orderan-pickup',
              query: { order_id: data.item.order_id.join(',') },
            }"
            target="_blank"
          >
            Lihat Detail
          </b-button>
          <b-button
            v-if="data.item.order_id !== 0 && !Array.isArray(data.item.order_id)"
            variant="none"
            class="button-detail d-flex text-info justify-center"
            :to="{
              name: 'detail-order',
              params: { order_id: data.item.order_id },
            }"
            target="_blank"
          >
            Lihat Detail
          </b-button>
          <b-button
            v-if="data.item.outbound_id !== 0 && data.item.order_id === 0"
            variant="none"
            class="button-detail d-flex text-info justify-center"
            :to="{
              name: 'detail-penarikan-barang',
              params: { id: data.item.outbound_id },
            }"
            target="_blank"
          >
            Lihat Detail
          </b-button>
          <div
            v-if="data.item.order_id === 0 && data.item.outbound_id === 0"
            class="text-center"
          >
            -
          </div>
        </template>
      </b-table>
      <div class="d-flex justify-between align-middle">
        <div>
          <span class="mr-1">List per halaman</span>
          <b-button
            v-for="page in pageOptions"
            :key="page"
            :variant="page === perPage ? 'primary' : 'light'"
            size="sm"
            class="btnPage"
            @click="setPage(page)"
          >
            {{ page }}
          </b-button>
        </div>
        <b-pagination
          v-model="currentPage"
          size="md"
          class="float-right mr-2"
          :total-rows="totalItems"
          :per-page="perPage"
          first-number
          last-number
        />
      </div>
    </b-overlay>

    <!-- Modal Download Rincian Saldo -->
    <b-modal
      id="download-rincian-saldo"
      size="lg"
      centered
      hide-header
      hide-footer
    >
      <b-card class="p-3 m-0 bg-white">
        <div class="text-black text-20-bold mb-1">
          Download Rincian Saldo
        </div>
        <div class="text-black text-lg mb-2">
          Kustomisasi rincian saldo yang ingin kamu download
        </div>
        <div class="text-black text-lg mb-1">
          Pilih Rentang
        </div>
        <div>
          <date-range-picker
            ref="picker"
            v-model="dateRangeFilter"
            :locale-data="locale"
            :ranges="rangesDownload"
            :opens="'left'"
            class="w-100"
          >
            <template
              style="min-width: 350px"
            >
              <div
                class="d-flex justify-content-between align-items-center w-100 pt-50"
              >
                <div>
                  <img
                    src="https://storage.googleapis.com/komerce/assets/icons/date-picker-icon.svg"
                  >
                </div>
              </div>
            </template>
          </date-range-picker>
        </div>
        <hr class="mt-5">
        <b-row class="align-items-end">
          <b-col cols="6">
            <div
              v-if="percentageDownload !== 0"
              class=""
            >
              <div>
                <b-row class="text-start mb-1">
                  <span class="text-black">Sedang memuat File</span>
                </b-row>
                <div class="">
                  <b-progress
                    :value="percentageDownload"
                    max="100"
                    variant=""
                    style="min-width: 225px; height: 15px;"
                  />
                  <span>{{ percentageDownload }}%</span>
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <b-row class="justify-content-between">
              <b-col cols="4">
                <b-button
                  variant="outline-primary"
                  @click="closeDownloadSaldo"
                >
                  Batal
                </b-button>
              </b-col>
              <b-col>
                <b-button
                  variant="primary"
                  @click="downloadSaldo"
                >
                  <b-spinner
                    v-if="loadingButtonPrintLabel === true"
                    class="mr-1"
                    small
                    variant="light"
                  />
                  Download
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-modal>
  </b-card>
</template>
<script>
import {
  BCard,
  BRow,
  BCol,
  BFormSelect,
  BTable,
  BButton,
  BPagination,
  BOverlay,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'
import {
  today,
  last7,
  last30,
  last60,
  kompackDate,
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BPagination,
    BOverlay,
    DateRangePicker,
  },
  data() {
    return {
      selectedFilter: '7 Hari Terakhir',
      optionsFilter: [
        '7 Hari Terakhir',
        '1 Bulan Terakhir',
        '3 Bulan Terakhir',
        'Custom',
      ],
      items: [],
      fields: [
        {
          key: 'date_transaction',
          label: 'Tanggal',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'transaction_type',
          label: 'Jenis Transaksi',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'amount',
          label: 'Jumlah',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'saldo',
          label: 'Saldo',
          thClass: 'align-middle',
          tdClass: 'align-top',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      loadTable: false,
      startDate: null,
      endDate: null,
      pageOptions: [20, 50],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
      searchResi: '',
      // Date range picker
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        '60 Hari Terakhir': [last60, today],
        'Bulan Ini': [firstDateOfMonth, today],
        'Custom Tanggal': [today, today],
      },
      rangesDownload: {
        'Custom Tanggal': [null, null],
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        '60 Hari Terakhir': [last60, today],
        'Real Time': [kompackDate, today],
      },
      today,
      last7,
      last60,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,
      dateRange: {
        startDate: last7,
        endDate: today,
      },
      dateRangeFilter: {
        startDate: last7,
        endDate: today,
      },
      titleCustomDate: null,
      // download
      percentageDownload: 0,
      loadingButtonPrintLabel: false,
      ListFilterType: [
        { value: 1, label: 'Orderan COD Diterima', selected: false },
        { value: 2, label: 'Ongkir Non-COD', selected: false },
        { value: 3, label: 'Ongkir Non-COD Dibatalkan', selected: false },
        { value: 4, label: 'Tarik Saldo', selected: false },
        { value: 5, label: 'Top-up Saldo', selected: false },
        { value: 6, label: 'Retur COD', selected: false },
        { value: 7, label: 'Claim Retur Diterima', selected: false },
        { value: 8, label: 'Ganti Rugi Paket Hilang', selected: false },
        { value: 9, label: 'Ganti Rugi Paket Rusak', selected: false },
        { value: 10, label: 'Belanja Talent Komtim', selected: false },
        { value: 11, label: 'Pengembalian Dana Komtim', selected: false },
      ],
      dropdownFilter: false,
      lengthFilter: [],
      isAllChecked: false,
    }
  },
  computed: {
    ...mapState('saldoDetail', ['totalSaldo']),
  },
  watch: {
    currentPage: {
      handler(value) {
        this.fetchData().catch(error => {
          console.error(error)
        })
      },
    },
  },
  mounted() {
    this.fetchData().catch(error => {
      console.error(error)
    })
  },
  beforeMount() {
    this.$store.dispatch('saldoDetail/init')
  },
  methods: {
    formatNumber: value => `${value}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moment(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY')
      }
      return ''
    },
    momentTime(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('HH:mm')
      }
      return ''
    },
    getDate() {
      const todays = new Date()
      this.endDate = `${todays.getFullYear()}-${todays.getMonth()
        + 1}-${todays.getDate()}`
      if (this.selectedFilter === '7 Hari Terakhir') {
        const last = new Date(todays.getTime() - 7 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '1 Bulan Terakhir') {
        const last = new Date(todays.getTime() - 30 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      } else if (this.selectedFilter === '3 Bulan Terakhir') {
        const last = new Date(todays.getTime() - 90 * 24 * 60 * 60 * 1000)
        this.startDate = `${last.getFullYear()}-${last.getMonth()
          + 1}-${last.getDate()}`
      }
    },
    async fetchData() {
      this.loadTable = true
      this.lengthFilter = []
      this.ListFilterType.forEach(item => {
        if (item.selected === true) {
          this.lengthFilter.push(item.value)
        }
      })
      let valueFilter = ''
      if (this.isAllChecked === true || this.lengthFilter.length < 1 || this.lengthFilter.length > 10) {
        valueFilter = 0
      } else {
        valueFilter = this.lengthFilter.join()
      }
      this.items = await this.$http_komship
        .get('v2/partner/order-transaction-balance', {
          params: {
            start_date: moment(this.dateRange.startDate).format('YYYY-MM-DD'),
            end_date: moment(this.dateRange.endDate).format('YYYY-MM-DD'),
            page: this.currentPage,
            limits: this.perPage,
            search: this.searchResi,
            filter: valueFilter,
          },
        })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          this.dropdownFilter = false
          return data.data
        })
        .catch(error => {
          // handle error
        })
    },
    async setPage(totalPage) {
      this.perPage = totalPage
      if (this.currentPage === 1) {
        this.fetchData()
      } else {
        this.currentPage = 1
      }
    },
    // eslint-disable-next-line func-names
    handleSearchResi: _.debounce(async function () {
      this.loadTable = true
      this.items = await this.$http_komship
        .get('v1/partner/order-transaction-balance', {
          params: {
            search: this.searchResi,
          },
        })
        .then(res => {
          const { data } = res.data
          this.totalItems = data.total
          this.loadTable = false
          return data.data
        })
        .catch(error => {
          // handle error
        })
    }, 1000),
    copyResi(data) {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(data)
      /* Alert the copied text */
      this.$toast({
        component: ToastificationContent,
        props: {
          title: ` Resi ${data} berhasil dicopy`,
          icon: 'AlertCircleIcon',
          variant: 'warning',
        },
      }, 1000)
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    setCustomDate() {
      this.titleCustomDate = 'Custom Tanggal'
    },
    removeCustomDate() {
      this.titleCustomDate = null
    },
    closeDownloadSaldo() {
      this.loadingButtonPrintLabel = false
      this.percentageDownload = 0
      this.$bvModal.hide('download-rincian-saldo')
    },
    downloadSaldo() {
      const self = this
      this.loadingButtonPrintLabel = true
      let percent = null
      percent = setInterval(() => {
        if (self.percentageDownload < 100) self.percentageDownload += 1
        if (self.percentageDownload === 90) self.percentageDownload -= 1
      }, 500)
      this.$http_komship
        .get('v1/partner/print/transaction-balance', {
          params: {
            start_date: moment(this.dateRangeFilter.startDate).format('YYYY-MM-DD'),
            end_date: moment(this.dateRangeFilter.endDate).format('YYYY-MM-DD'),
          },
        })
        .then(response => {
          try {
            const decodedData = atob(response.data.data)
            const data = new Uint8Array(decodedData.length)
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < decodedData.length; i++) {
              data[i] = decodedData.charCodeAt(i)
            }
            let result = null
            result = `Rincian_Saldo_komship_${this.$moment(this.dateRangeFilter.startDate).format('YYYY-MM-DD')}_${this.$moment(this.dateRangeFilter.endDate).format('YYYY-MM-DD')}`
            this.percentageDownload = 100
            clearInterval(percent)
            const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
            const objectUrl = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = objectUrl
            a.download = `${result}.xlsx`
            document.body.appendChild(a)
            a.click()
            a.remove()
            this.loadingButtonPrintLabel = false
            setTimeout(() => {
              this.loadingButtonPrintLabel = 0
              this.percentageDownload = 0
              this.$bvModal.hide('download-rincian-saldo')
            }, 1000)
          } catch (e) {
            this.percentageDownload = 0
            this.loadingButtonPrintLabel = false
            clearInterval(percent)
          }
        }).catch(() => {
          this.loadingButtonPrintLabel = false
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'Gagal print label, silahkan coba lagi!',
              variant: 'danger',
            },
          })
          clearInterval(percent)
          this.percentageDownload = 0
          this.isDownloadActive = false
        })
      this.percentageDownload = 0
    },
    setDropdown() {
      this.dropdownFilter = !this.dropdownFilter
    },
    ResetFilter() {
      // eslint-disable-next-line no-param-reassign
      this.ListFilterType.forEach(item => { item.selected = false })
      this.dateRange = {
        startDate: this.last7,
        endDate: this.today,
      }
      this.lengthFilter = ''
      this.isAllChecked = false
      this.fetchData()
    },
    CeklistAll() {
      if (this.isAllChecked === true) {
        this.ListFilterType.forEach(item => {
        // eslint-disable-next-line no-param-reassign
          item.selected = true
        })
      } else {
        this.ListFilterType.forEach(item => {
        // eslint-disable-next-line no-param-reassign
          item.selected = false
        })
      }
    },
    getSelectedFilter() {
      this.ListFilterType.forEach(item => {
        if (item.selected === false) {
          this.isAllChecked = false
        }
      })
    },
  },
}
</script>
<style scoped>
.btnPage {
  padding: 4px 7px;
  margin-right: 5px;
}
.modal-body-custom {
  padding: 0px !important
}
.modal-body {
  padding: 0px !important
}
.wrapper-notification-count {
  background: #F95031;
  height: 24px;
  min-width: 28px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  position:absolute;
  top: -10px;
  right: 20px;
}
.dropdown-list-menu {
  right: 5%;
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-list-menu li:hover {
  background-color: #FCD4BE;
}
</style>
