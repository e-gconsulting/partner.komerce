<template>
  <div class="container p-0">
    <div class="card">
      <div class="card-header align-items-start">
        <b-row>
          <div
            class="wrapper-handle-back cursor-pointer"
            @click="goBack"
          >
            <feather-icon
              icon="ChevronLeftIcon"
              size="25"
            />
          </div>
          <div class="ml-2">
            <p class="h-text-lg mb-0">
              Rincian Penarikan Saldo
            </p>
            <p class="h-text-sm font-weight-normal text-black">
              {{ lastWithDrawal }} - {{ `${withdrawalDate}` }}
            </p>
          </div>
        </b-row>
        <span
          v-if="statusPenerimaan.toLowerCase() === 'completed'"
          class="font-weight-bold rounded status-success"
        >Disetujui</span>
        <span
          v-else-if="statusPenerimaan.toLowerCase() === 'on_review'"
          class="font-weight-bold rounded status-warning"
        >Sedang Direview</span>
        <span
          v-else-if="statusPenerimaan.toLowerCase() === 'requested'"
          class="font-weight-bold rounded status-warning"
        >Perlu Disetujui</span>
        <span
          v-else-if="statusPenerimaan.toLowerCase() === 'canceled'"
          class="font-weight-bold rounded status-danger"
        >Dibatalkan</span>
        <span
          v-else-if="statusPenerimaan.toLowerCase() === 'rejected'"
          class="font-weight-bold rounded status-danger"
        >Ditolak</span>
        <span
          v-else
          class="font-weight-bold rounded status-danger"
        >Dibatalkan</span>
        <b-row class="w-full mb-1">
          <b-col
            cols="2"
            style="max-width:13%;"
          >
            <span class="text-black">
              Waktu Request
            </span>
          </b-col>
          <b-col cols="6">
            <span class="text-black">
              <strong>
                : {{ withdrawalDate }}
              </strong>
            </span>
          </b-col>
        </b-row>
        <b-row class="w-full mb-1">
          <b-col
            cols="2"
            style="max-width:13%;"
          >
            <span class="text-black">
              Nama
            </span>
          </b-col>
          <b-col cols="6">
            <span class="text-black">
              <strong>
                : {{ bankAccountName }}
              </strong>
            </span>
          </b-col>
        </b-row>
        <b-row class="w-full mb-1">
          <b-col
            cols="2"
            style="max-width:13%;"
          >
            <span class="text-black">
              Nama bank
            </span>
          </b-col>
          <b-col cols="6">
            <span class="text-black">
              <strong>
                : {{ bankName }}
              </strong>
            </span>
          </b-col>
        </b-row>
        <b-row class="w-full mb-1">
          <b-col
            cols="2"
            style="max-width:13%;"
          >
            <span class="text-black">
              No Rekening
            </span>
          </b-col>
          <b-col cols="6">
            <span class="text-black">
              <strong>
                : {{ bankAccountNo }}
              </strong>
            </span>
          </b-col>
        </b-row>
      </div>
      <b-row class="mx-1 mb-2">
        <b-col
          cols="4"
        >
          <div
            class="p-1"
            style="background: #FFFFFF;
box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
border-radius: 8px;"
          >
            Saldo Terkini
            <h3 class="text-primary mt-1">
              <strong>
                Rp{{ formatNumber(currentBalance) }}
              </strong>
            </h3>
          </div>
        </b-col>
        <b-col
          cols="4"
        >
          <div
            class="p-1"
            style="background: #FFFFFF;
box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
border-radius: 8px;"
          >
            Request Penarikan
            <h3 class="text-success mt-1">
              <strong>
                Rp{{ formatNumber(nominalWithdrawal) }}
              </strong>
            </h3>
          </div>
        </b-col>
        <b-col
          cols="4"
        >
          <div
            class="p-1"
            style="background: #FFFFFF;
box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
border-radius: 8px;"
          >
            Sisanya Jika Disetujui
            <h3 class="text-info mt-1">
              <strong>
                Rp{{ formatNumber(balanceAfterAproval) }}
              </strong>
            </h3>
          </div>
        </b-col>
      </b-row>

      <b-row class="mx-1 mb-2">
        <b-col cols="12">
          <div class="d-flex mb-1 align-items-center">
            <b-img
              class="mr-50"
              src="https://storage.googleapis.com/komerce/assets/icons/edit.svg"
            />
            <span>Catatan</span>
          </div>
          <b-textarea
            :value="notes == null || notes == '' ? 'Tidak ada catatan': notes"
            rows="3"
            disabled
            style="background: white; border-radius: 16px;"
          />
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
          :items="listWithdrawalItem"
          :fields="fields"
        >
          <template #head(shipping_cost)="data">
            <span class="d-flex">{{ data.label }}
              <img
                id="ongkosKirim"
                src="@/assets/images/icons/info-circle-dark.svg"
                class="w-5 h-5"
                style="margin-left:5px;cursor:pointer;"
              >
            </span>
            <b-tooltip
              target="ongkosKirim"
              triggers="hover"
            >
              Ongkos kirim dari orderan.
            </b-tooltip>
          </template>
          <template #head(service_fee)="data">
            <span class="d-flex">{{ data.label }}
              <img
                id="biayaCOD"
                src="@/assets/images/icons/info-circle-dark.svg"
                class="w-5 h-5"
                style="margin-left:5px;cursor:pointer;"
              >
            </span>
            <b-tooltip
              target="biayaCOD"
              triggers="hover"
            >
              Biaya COD dari orderan yang menggunakan layanan COD.
            </b-tooltip>
          </template>
          <template #cell(date_transaction)="data">
            <div class="d-flex flex-column">
              <span class="text-black">
                {{ moment(new Date(data.item.created_at)).format('DD MMMM YYYY') }}
              </span>
              <small class="text-black">
                {{ moment(new Date(data.item.created_at)).format('HH:MM') }} WIB
              </small>
            </div>
          </template>
          <template #cell(transaction_type)="data">
            <div
              v-if="data.item.description === 'topup'"
              class="font-medium text-black"
            >
              Top UP Saldo
            </div>
            <div v-else-if="data.item.description === 'withdrawal'">
              Penarikan Saldo
            </div>
            <div v-else-if="data.item.description === 'shopping'">
              <div class="text-black text-md font-medium">
                Belanja
              </div>
              <div class="text-xs text-secondary font-medium">
                Keperluan talent
              </div>
            </div>
            <div v-else-if="data.item.description === 'orderku_done'">
              <div class="text-black text-md font-medium">
                Orderan COD
              </div>
              <div class="text-xs text-secondary font-medium">
                Diterima
              </div>
              <b-row>
                <img
                  :src="data.item.shipping_logo"
                  width="70"
                >
                <img
                  :id="`${data.index}-infoSaldo`"
                  src="@/assets/images/icons/info-circle.svg"
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
                      src="@/assets/images/icons/icons-copy.svg"
                    >
                  </b-button>
                </b-row>
              </b-popover>
            </div>
            <div v-else-if="data.item.description === 'orderku_ongkir'">
              <div class="text-black text-md font-medium">
                Orderan Non COD
              </div>
              <div class="text-xs text-secondary font-medium">
                Ongkir
              </div>
              <b-row>
                <img
                  :src="data.item.shipping_logo"
                  width="70"
                >
                <img
                  :id="`${data.index}-infoSaldo`"
                  src="@/assets/images/icons/info-circle.svg"
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
                      src="@/assets/images/icons/icons-copy.svg"
                    >
                  </b-button>
                </b-row>
              </b-popover>
            </div>
            <div v-else-if="data.item.description === 'orderku_cancel'">
              <div class="text-black text-md font-medium">
                Orderan Non COD
              </div>
              <div class="text-xs text-secondary font-medium">
                Dibatalkan
              </div>
              <b-row>
                <img
                  :src="data.item.shipping_logo"
                  width="70"
                >
                <img
                  :id="`${data.index}-infoSaldo`"
                  src="@/assets/images/icons/info-circle.svg"
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
                      src="@/assets/images/icons/icons-copy.svg"
                    >
                  </b-button>
                </b-row>
              </b-popover>
            </div>
            <div v-else-if="data.item.description === 'orderku_retur (payment_method COD)'">
              <div class="text-black text-md font-medium">
                Orderan COD
              </div>
              <div class="text-xs text-secondary font-medium">
                Retur
              </div>
            </div>
            <div v-else-if="data.item.description === 'orderku_retur (payment_method Bank Transfer)'">
              <div class="text-black text-md font-medium">
                Orderan Non COD
              </div>
              <div class="text-xs text-secondary font-medium text-black">
                Retur
              </div>
              <b-row>
                <img
                  :src="data.item.shipping_logo"
                  width="70"
                >
                <img
                  :id="`${data.index}-infoSaldo`"
                  src="@/assets/images/icons/info-circle.svg"
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
                      src="@/assets/images/icons/icons-copy.svg"
                    >
                  </b-button>
                </b-row>
              </b-popover>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell(amount)="data">
            <span
              v-if="parseInt(data.item.nominal) < 0"
              class="
                    text-primary font-semibold"
            >
              -Rp {{ formatNumber(data.item.nominal) }}
            </span>
            <span
              v-else
              class="text-success font-semibold"
            >
              +Rp {{ formatNumber(data.item.nominal) }}
            </span>
          </template>
          <template #cell(saldo)="data">
            <span class="font-semibold text-black">
              Rp {{ formatNumber(data.item.saldo) }}
            </span>
          </template>
          <template #cell(action)="data">
            <p
              v-if="
                data.item.description === 'topup' || data.item.description === 'withdrawal' || data.item.description === 'shopping' || typeof data.item.order_id=== undefined
              "
            >
              -
            </p>
            <a
              v-else
              :href="'/data-order/detail-order/' + data.item.order_id"
              class="text-info"
            >
              Lihat Detail
            </a>
          </template>
        </b-table>
      </b-overlay>
      <div
        class="card-body"
        style="padding: 14px;"
      >
        <b-row
          style="background: #F8F8F8; height: 80px;"
          class="align-items-center justify-content-between mb-2"
        >
          <h1 class="text-black ml-2">
            <strong>
              Saldo Awal :
            </strong>
          </h1>
          <h1 class="text-primary mr-2">
            <strong>
              Rp{{ formatNumber(beginningBalance) }}
            </strong>
          </h1>
        </b-row>
        <b-row class="d-flex justify-between align-items-center">
          <b-col>
            <b-row class="ml-1 mb-50">
              <span class="mr-1 text-black">List per halaman:</span>
            </b-row>
            <b-row class="ml-1">
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
            </b-row>
          </b-col>
          <b-pagination
            v-model="currentPage"
            size="md"
            class="float-right mr-2"
            :total-rows="totalRows"
            :per-page="perPage"
            first-number
            last-number
          />
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
  BTable, BButton, BPagination, BOverlay, BTooltip,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import moment from 'moment'

export default {
  components: {
    BTable, BButton, BPagination, BOverlay, BTooltip,

  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'date_transaction', label: 'Tanggal', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'transaction_type', label: 'Jenis Transaksi', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'amount', label: 'Jumlah', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'saldo', label: 'Saldo', thClass: 'align-middle', tdClass: 'align-top',
        },
        {
          key: 'action', label: '', thClass: 'align-middle', tdClass: 'align-top',
        },
      ],
      loadTable: false,
      tableTitles: [
        'Tanggal',
        'Jenis Order',
        'Nilai Orders',
        'Ongkos Kirim',
        'Biaya COD',
        'Saldo',
      ],
      tableHeadInfos: [3, 4],
      startDate: null,
      endDate: null,
      pageOptions: [20, 50, 100, 200, 400],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
      totalRows: 0,
      list: [],
      id: this.$route.params.id,

      balanceAfterAproval: 0,
      bankAccountName: '',
      bankAccountNo: '',
      bankName: '',
      beginningBalance: 0,
      currentBalance: 0,
      joinDate: '',
      lastWithDrawal: '',
      lastWithDrawalId: '',
      nominalWithdrawal: 0,
      withdrawalDate: '',
      timeWithdrawal: '',
      moment,
      listWithdrawalItem: [],
    }
  },
  computed: {
    ...mapState('saldoPenarikan', [
      'dateStart',
      'dateEnd',
      'timeEnd',
      'totalSaldo',
      'nominalPenarikan',
      'statusPenerimaan',
      'rincianSaldos',
      'notes',
      'previous_request_withdrawal_date',
      'next_request_withdrawal_date',
      'previous_request_withdrawal_time',
      'list_item_rincian_penarikan',
      'table',
    ]),
    ...mapState('dashboard', ['profile']),
    ...mapGetters('saldoPenarikan', ['sisaSaldo']),
  },
  watch: {
    currentPage: {
      handler() {
        const params = {
          withdrawal_id: Number(this.id),
          total_per_page: this.perPage,
          page: this.currentPage,
        }
        this.$http_komship.get(`/v2/partner/withdrawal/detail/list/${this.$store.state.auth.userData.id}`, {
          params,
        })
          .then(response => {
            const { data } = response.data.data
            this.totalRows = response.data.data.total
            this.listWithdrawalItem = data
          })
      },
    },
  },
  beforeMount() {
    this.loadTable = true
    this.$store.commit('saldoPenarikan/UPDATE_ID', this.$route.params.id)
    this.$store.dispatch('saldoPenarikan/init')
    setTimeout(() => {
      this.loadTable = false
    }, 1500)
  },
  async mounted() {
    await this.fetchWithdrawal()
  },
  methods: {
    formatNumber: value => (`${value}`).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    moments(date) {
      const validDate = moment(date)
      if (validDate.isValid()) {
        return moment(date).format('DD-MM-YYYY')
      }
      return ''
    },
    indoDate(string) {
      const newString = string.toLowerCase()
      if (newString.indexOf('january')) {
        return string.replace('January', 'Januari')
      } if (newString.indexOf('february')) {
        return string.replace('February', 'Februari')
      } if (newString.indexOf('march')) {
        return string.replace('March', 'Maret')
      } if (newString.indexOf('april')) {
        return string.replace('April', 'April')
      } if (newString.indexOf('may')) {
        return string.replace('May', 'Mei')
      } if (newString.indexOf('june')) {
        return string.replace('June', 'Juni')
      } if (newString.indexOf('july')) {
        return string.replace('July', 'Juli')
      } if (newString.indexOf('august')) {
        return string.replace('August', 'Agustus')
      } if (newString.indexOf('september')) {
        return string.replace('September', 'September')
      } if (newString.indexOf('october')) {
        return string.replace('October', 'Oktober')
      } if (newString.indexOf('november')) {
        return string.replace('November', 'November')
      } if (newString.indexOf('december')) {
        return string.replace('December', 'Desember')
      }
      return string
    },
    formatRibuan(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatRupiah(x) {
      if (x === '-') return x
      return `Rp ${this.formatRibuan(x)}`
    },
    fetchKmPoint() {

    },
    setPage(totalPage) {
      this.perPage = totalPage
      const params = {
        withdrawal_id: Number(this.id),
        total_per_page: this.perPage,
        page: this.currentPage,
      }
      this.$http_komship.get(`/v2/partner/withdrawal/detail/list/${this.$store.state.auth.userData.id}`, {
        params,
      })
        .then(response => {
          const { data } = response.data.data
          this.listWithdrawalItem = data
          this.totalRows = response.data.data.total
        })
    },
    goBack() {
      window.history.back()
    },
    fetchWithdrawal() {
      this.$http_komship.get(`/v2/partner/withdrawal/detail/${this.id}`)
        .then(response => {
          const { data } = response.data
          this.balanceAfterAproval = data.balance_after_approval
          this.bankAccountName = data.bank_account_name
          this.bankName = data.bank_name
          this.beginningBalance = data.beginning_balance
          this.currentBalance = data.current_balance
          this.nominalWithdrawal = data.withdrawal_nominal
          this.bankAccountNo = data.bank_account_no
          this.lastWithDrawal = moment(new Date(data.last_withdrawal_date)).format('DD MMMM')
          this.withdrawalDate = data.withdrawal_date
          const date = moment(new Date(data.withdrawal_date)).format('DD MMMM YYYY')
          const hours = moment(new Date(data.withdrawal_date)).format('HH:MM')
          this.withdrawalDate = `${date} (${hours} WIB)`
        })
      const params = {
        withdrawal_id: Number(this.id),
        total_per_page: this.perPage,
        page: this.currentPage,
      }
      this.$http_komship.get(`/v2/partner/withdrawal/detail/list/${this.$store.state.auth.userData.id}`, {
        params,
      })
        .then(response => {
          const { data } = response.data.data
          this.listWithdrawalItem = data
          this.totalRows = response.data.data.total
        })
    },
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
  border-bottom: 2px solid #c2c2c2 !important;
}
.text-danger {
  color: #e31a1a;
}
.text-success {
  color: #34a770;
}
.status-success,
.status-info,
.status-warning,
.status-danger {
  padding: 8px 27px;
}
.status-success {
  background-color: #dcf3eb;
  color: #34a770;
}
.status-info {
  background-color: #dff3ff;
  color: #08a0f7;
}
.status-warning {
  background-color: #fff2e2;
  color: #fba63c;
}
.status-danger {
  background-color: #ffeded;
  color: #e31a1a;
}
.wrapper-handle-back {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  background-color: #F95031;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
}
.wrapper-handle-back:hover {
  background-color: #fa2f0b;
}
</style>
