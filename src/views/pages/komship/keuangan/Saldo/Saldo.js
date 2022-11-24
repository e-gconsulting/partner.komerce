import moment from 'moment'
import { mapFields } from 'vuex-map-fields'
import {
  BFormGroup,
  BModal,
  BButton,
  BFormInput,
  BFormSelect,
  BPagination,
  BRow,
  BSpinner,
} from 'bootstrap-vue'
import { mapState, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import DateRangePicker from 'vue2-daterange-picker'
import CodeInput from 'vue-verification-code-input'

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import PopoverInfo from '@/views/components/popover/PopoverInfo.vue'
import {
  today,
  last7,
  last30,
  firstDateOfMonth,
  lastDateOfMonth,
} from '@/store/helpers'

export default {
  components: {
    BFormGroup,
    BModal,
    BFormInput,
    BFormSelect,
    BPagination,
    DateRangePicker,
    PopoverInfo,
    BRow,
    BButton,
    CodeInput,
    BSpinner,
    vSelect,
  },
  data() {
    return {
      picker: {
        startDate: last30,
        endDate: today,
      },
      isVisibility: true,
      locale: {
        format: 'dd/mm/yyyy',
        daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      },
      ranges: {
        '7 Hari Terakhir': [last7, today],
        '30 Hari Terakhir': [last30, today],
        'Bulan Ini': [firstDateOfMonth, today],
      },
      today,
      last7,
      last30,
      firstDateOfMonth,
      lastDateOfMonth,
      user: {},
      tableTitles: [
        'Tanggal',
        'Tujuan Penarikan',
        'Status',
        'Jumlah Penarikan',
        'Rincian',
      ],
      snapToken: '31f5ef26-5121-44e9-97b5-f469039bf6cf',
      modalTitle: null,
      stepNow: 0,
      nominalState: null,
      rekTujuanState: null,
      obj: null,
      status: true,
      visibilityPin: 'number',
      resTarikSaldo: {},

      loadingSubmitTopup: false,
      fieldwidth: '',
      fieldheight: '',
    }
  },
  computed: {
    ...mapFields('saldo', [
      'dateRange',
      'nominalTopUp',
      'selectedRekTujuan',
      'nominal',
      'pin',
    ]),
    ...mapState('saldo', [
      'saldo',
      'saldoPending',
      'table',
      'riwayatPenarikans',
    ]),
    ...mapGetters('saldo', ['rekenings', 'rekening', 'rekTujuanOptions']),
  },
  watch: {
    'table.currentPage': {
      handler() {
        this.$store.dispatch('saldo/getWithdrawalRequest')
      },
    },
    dateRange: {
      handler() {
        this.$store.commit('saldo/UPDATE_CURRENT_PAGE', 1)
        this.$store.dispatch('saldo/getWithdrawalRequest')
      },
      deep: true,
    },
  },
  beforeMount() {
    this.$store.dispatch('saldo/init')
  },
  methods: {
    formatRibuan(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatRupiah(x) {
      return `Rp ${this.formatRibuan(x)}`
    },
    formatRupiahTopup(x) {
      return `${this.formatRibuan(x)}`
    },
    showTopUpModal() {
      this.$bvModal.show('modalTopUp')
      this.changeAttr()
    },
    async topUpSaldo() {
      this.loadingSubmitTopup = true
      try {
        const response = await this.$store.dispatch('saldo/topUpSaldo')
        this.closeModal()
        if (!response.data.status) throw response.data
        window.open(response.data.data.invoice_xendit_url, '_blank').focus()
        this.$refs['modal-after-topup'].show()
        this.loadingSubmitTopup = false
      } catch (e) {
        this.$swal({
          title: '<span class="font-weight-bold h4">Top Up Saldo Gagal</span>',
          text: e.message,
          imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
          showCloseButton: false,
          focusConfirm: true,
          confirmButtonText: 'Oke',
          customClass: {
            confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
            popup: 'mr-2 ml-1',
          },
          buttonsStyling: false,
        })
        this.loadingSubmitTopup = false
      } finally {
        this.$store.commit('saldo/UPDATE_NOMINAL', '')
        this.loadingSubmitTopup = false
      }
    },
    formatDate(d) {
      return moment(d).format('D MMM YYYY')
    },
    formatNumber(n) {
      return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    showModal() {
      this.resetModal()
      this.$bvModal.show('modal-keuangan')
      this.changeAttr()
    },
    async changeAttr() {
      const element = document.getElementsByTagName('body')[0].className

      await (element === 'modal-open')
      document.querySelectorAll('div.modal-content')[0].removeAttribute('tabindex')
    },
    closeModal() {
      this.$bvModal.hide('modalTopUp')
      this.$bvModal.hide('modal-keuangan')
    },
    checkFormValidity(step) {
      let valid = null

      switch (step) {
        case 1:
          valid = this.$refs.form1.checkValidity()
          this.nominalState = valid
          this.rekTujuanState = valid
          break
        case 2:
          valid = this.$refs.form2.checkValidity()
          break
        default:
          break
      }
      return valid
    },
    resetModal() {
      this.stepNow = 0
      this.modalTitle = 'Penarikan Saldo'
      this.nominal = ''
      this.nominalState = null
      this.pin = ''
      this.pinState = null
      this.selectedRekTujuan = null
    },
    modalBack() {
      const nominalBefore = this.nominal
      const rekTujuanBefore = this.selectedRekTujuan
      this.resetModal()
      this.nominal = nominalBefore
      this.selectedRekTujuan = rekTujuanBefore
    },
    async handleSubmit(step) {
      if (!this.checkFormValidity(step)) {
        return
      }

      switch (step) {
        case 1:
          this.$nextTick(() => {
            this.stepNow = 1
            this.modalTitle = 'Verifikasi PIN'
            const mediaQuery = window.matchMedia('(max-width: 768px)')
            if (mediaQuery.matches) {
              this.fieldwidth = '40'
              this.fieldheight = '44'
            } else {
              this.fieldwidth = '50'
              this.fieldheight = '54'
            }
          })
          break
        case 2:
          try {
            const response = await this.$store.dispatch('saldo/checkPin')
            const responseReq = this.$store.dispatch('saldo/withdrawalRequest')
            if (!response.data.data.is_match) {
              throw { message: 'Maaf pin yang anda masukkan salah' } // eslint-disable-line
            }
            responseReq.then(val => {
              const { data } = val
              this.resTarikSaldo = data.data
              this.$nextTick(() => {
                this.stepNow = 2
                this.modalTitle = null
                this.status = data.status
              })
            }).catch(e => {
              if (e.response.status === 400) {
                this.$swal({
                  title:
                    '<span class="font-weight-bold h4">Penarikan Saldo Gagal</span>',
                  text: 'Maaf, kamu tidak bisa melakukan penarikan saldo dikarenakan kamu masih memiliki antrian penarikan yang belum disetujui.',
                  imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
                  showCloseButton: false,
                  focusConfirm: true,
                  confirmButtonText: 'Lihat riwayat penarikan',
                  customClass: {
                    confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
                    popup: 'mr-2 ml-1',
                  },
                  buttonsStyling: false,
                }).then(res => {
                  if (res.isConfirmed) {
                    this.$router.push('keuangan/saldo')
                  }
                })
              }
            })

            this.visibilityPin = 'number'
          } catch (e) {
            this.$swal({
              title:
                '<span class="font-weight-bold h4">Penarikan Saldo Gagal</span>',
              text: e.message,
              imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
              showCloseButton: false,
              focusConfirm: true,
              confirmButtonText: 'Oke',
              customClass: {
                confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
                popup: 'mr-2 ml-1',
              },
              buttonsStyling: false,
            })
          }
          break
        default:
          break
      }
    },
    formatCurrency(blur, el) {
      const input = document.getElementById(el)
      let inputVal = input.value

      if (inputVal === '' || inputVal === 'Rp' || inputVal === 'Rp ') {
        return
      }

      const originalLen = inputVal.length
      let caretPos = input.selectionStart

      if (inputVal.indexOf(',') >= 0) {
        const decimalPos = inputVal.indexOf(',')
        let leftSide = inputVal.substring(0, decimalPos)
        let rightSide = inputVal.substring(decimalPos)

        leftSide = this.formatNumber(leftSide)
        rightSide = this.formatNumber(rightSide)

        if (blur) {
          rightSide += '00'
        }
        rightSide = rightSide.substring(0, 2)
        inputVal = 'Rp ' + leftSide + ',' + rightSide // eslint-disable-line
      } else {
        inputVal = this.formatNumber(inputVal)
        inputVal = 'Rp ' + inputVal // eslint-disable-line

        if (blur) {
          inputVal += ',00'
        }
      }

      input.value = inputVal

      const updatedLen = inputVal.length
      caretPos = updatedLen - originalLen + caretPos
      input.setSelectionRange(caretPos, caretPos)
    },
    stopCarret() {
      const obj = document.getElementById('input2')
      if (obj.value.length > 5) {
        this.setCaretPosition(obj, 0)
      }
    },
    setCaretPosition(elem, caretPos) {
      if (elem != null) {
        if (elem.createTextRange) {
          const range = elem.createTextRange()
          range.move('character', caretPos)
          range.select()
        } else if (elem.selectionStart) {
          elem.focus()
          elem.setSelectionRange(caretPos, caretPos)
        } else {
          elem.focus()
        }
      }
    },
    alertFail() {
      this.$swal({
        title:
          '<span class="font-weight-bold h4">Maaf sedang ada gangguan,<br>coba lagi nanti</span>',
        imageUrl: require('@/assets/images/icons/fail.svg'), // eslint-disable-line
        showCloseButton: false,
        focusConfirm: true,
        confirmButtonText: 'Oke',
        customClass: {
          confirmButton: 'btn bg-orange2 btn-primary rounded-lg',
          popup: 'mr-2 ml-1',
        },
        buttonsStyling: false,
      })
    },
    toggleVisibilityPin() {
      this.isVisibility = !this.isVisibility
    },
    onChange(v) {
      this.pin = v
    },
    onComplete(v) {
      this.pin = v
    },
  },
}
