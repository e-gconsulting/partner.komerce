/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import PopupLacakResi from '@core/components/popup-lacak-resi/PopupLacakResi.vue'
import PopoverInfo from '@/views/components/popover/PopoverInfo.vue'
import {
  getMessaging,
  getToken,
  onMessage,
} from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import moment from 'moment'

window.onload = () => {
  const theElement = document.getElementById('chatFocusing')
  const scrollToBottom = node => {
    // eslint-disable-next-line no-param-reassign
    node.scrollTop = node.scrollHeight
  }
  scrollToBottom(theElement)
}

const firebaseConfig = {
  apiKey: 'AIzaSyCPYJYeP-9_G3S5MOV_-8QPDSmxF8dj84g',
  authDomain: 'komship-ticketing.firebaseapp.com',
  projectId: 'komship-ticketing',
  storageBucket: 'komship-ticketing.appspot.com',
  messagingSenderId: '669211426801',
  appId: '1:669211426801:web:55bca3d2dac7238b298e50',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging()

export default {
  components: {
    PopoverInfo,
    PopupLacakResi,
  },
  data() {
    return {
      ticketId: this.$route.params.ticket_id,
      loadingDataDetail: true,

      ticketStatus: 0,
      orderStatus: '',
      ticketNo: '',
      noResi: '',
      ekspedisi: '',
      seller: '',
      ticketType: '',
      customerName: '',
      description: '',
      files: [],

      // Chat
      loadingDataChat: false,
      messages: [],
      chatItem: '',
      fcmToken: '',
      fileChat: null,
      chatFileMode: false,
      imageFileChat: null,
      imageInitialFile: null,
      imageFile: null,
      itemsImageInitialFile: [],

      // cancel ticket
      loadingCancelTicket: false,

      userId: JSON.parse(localStorage.userData),
      detailOrderMode: false,
      orderId: 0,

      visible: false,

      orderData: [],
      itemAwb: [],
      listAwb: '',
      moment,

      transactionValue: '',
      isLoading: false,
    }
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  created() {
    this.receiveMessage()
  },
  async mounted() {
    this.fetchDataFirebase()
    this.fetchDetailTicket()
    const theElement = document.getElementById('chatFocusing')
    if (theElement !== null) {
      const scrollToBottom = node => {
      // eslint-disable-next-line no-param-reassign
        node.scrollTop = node.scrollHeight
      }
      scrollToBottom(theElement)
    }
    this.readChat()
    console.log(this.$route)
  },
  methods: {
    fetchDetailTicket() {
      this.$http_komship.get(`v1/ticket-partner/detail/${this.ticketId}`)
        .then(response => {
          const { data } = response.data
          this.ticketStatus = data.ticket_status
          this.orderStatus = data.order_status
          this.ticketNo = data.ticket_no
          this.ticketType = data.ticket_type
          this.customerName = data.customer_name
          this.description = data.description
          this.seller = data.partner_name
          this.ekspedisi = data.shipping
          this.noResi = data.no_resi
          this.files = data.file
          this.messages = data.history_ticket
          this.orderId = data.order_id
          this.loadingDataDetail = false
          this.fetchDataResi()
          setTimeout(() => {
            const theElement = document.getElementById('chatFocusing')
            const scrollToBottom = node => {
              // eslint-disable-next-line no-param-reassign
              node.scrollTop = node.scrollHeight
            }
            scrollToBottom(theElement)
          }, 500)
        })
        .catch(err => {
          console.log(err)
          this.loadingDataDetail = false
        })
    },
    storeChat() {
      Notification.requestPermission().then(permission => {
        if (!('permission' in Notification)) {
          Notification.permission = permission
        }
        if (permission === 'granted') {
          this.loadingDataChat = true
          const formData = new FormData()
          if (this.chatItem) formData.append('message', this.chatItem)
          formData.append('ticket_id', Number(this.ticketId))
          if (this.itemsImageInitialFile.length > 1) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.itemsImageInitialFile.length; i++) {
              formData.append('file[]', this.itemsImageInitialFile[i])
            }
          } else {
            formData.append('file[]', this.itemsImageInitialFile[0])
          }
          this.$http_komship.post('/v1/ticket-partner/store-chat', formData)
            .then(() => {
              fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'key=AAAAm9Ab__E:APA91bF7K9M9Adw_2DbHcySgjESrZjV_i6QCURNX4TaHwo8ah3VX1j3e_DJb3CV7cdEtgIXkfTAHrNqvuAwMElQMnflI6z0_E1BcAX9OPfIVCZ4ewiOq1N2dhHWYcsBQ7Nu4nFFQF8-2',
                },
                body: JSON.stringify({
                  to: this.fcmToken,
                }),
              })
                .then(() => {
                  this.chatItem = ''
                  this.itemsImageInitialFile = []
                  this.loadingDataChat = false
                  this.chatFileMode = false
                })
                .catch(err => {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Failure',
                      icon: 'AlertCircleIcon',
                      text: err,
                      variant: 'danger',
                    },
                  }, 2000)
                  this.loadingDataChat = false
                })
            }).catch(err => {
              this.loadingDataChat = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
            })
        } else {
          this.loadingDataChat = true
          const formData = new FormData()
          if (this.chatItem) formData.append('message', this.chatItem)
          formData.append('ticket_id', Number(this.ticketId))
          if (this.itemsImageInitialFile.length > 1) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.itemsImageInitialFile.length; i++) {
              formData.append('file[]', this.itemsImageInitialFile[i])
            }
          } else {
            formData.append('file[]', this.itemsImageInitialFile[0])
          }
          this.$http_komship.post('/v1/ticket-partner/store-chat', formData)
            .then(() => {
              this.chatItem = ''
              this.itemsImageInitialFile = []
              this.loadingDataChat = false
              this.chatFileMode = false
              this.fetchDetailTicket()
            }).catch(err => {
              this.loadingDataChat = false
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Failure',
                  icon: 'AlertCircleIcon',
                  text: err,
                  variant: 'danger',
                },
              }, 2000)
            })
        }
      })
    },
    statusTicketVariant(data) {
      let resultVariant = ''
      if (data === 1) {
        resultVariant = 'light-primary'
      } else if (data === 2) {
        resultVariant = 'light-warning'
      } else if (data === 3) {
        resultVariant = 'light-success'
      } else if (data === 4) {
        resultVariant = 'light-secondary'
      }
      return resultVariant
    },
    orderStatusVariant(data) {
      let result = ''
      if (data === 'Diajukan') {
        result = 'light-primary'
      } else if (data === 'Dipacking') {
        result = 'light-info'
      } else if (data === 'Dikirim') {
        result = 'light-warning'
      } else if (data === 'Diterima') {
        result = 'light-success'
      } else if (data === 'Retur') {
        result = 'light-danger'
      } else if (data === 'Batal') {
        result = 'light-dark'
      }
      return result
    },
    convertTicketStatus(data) {
      let result = ''
      if (data === 0) {
        result = 'Perlu Tindak Lanjut'
      } else if (data === 1) {
        result = 'Belum Diproses'
      } else if (data === 2) {
        result = 'Sedang Diproses'
      } else if (data === 3) {
        result = 'Selesai'
      } else if (data === 4) {
        result = 'Batal'
      }
      return result
    },
    fetchDataFirebase() {
      Notification.requestPermission().then(permission => {
        if (!('permission' in Notification)) {
          Notification.permission = permission
        }
        // you got permission !
      }, rejection => {
        // handle rejection here.
      })
      getToken(messaging, { vapidKey: 'BLZr38POWZ6vwjTUx4v2vlPHK-3fiI-DMPY18tAbu1dpchDiAYMyR7l2PE3WbH5hOM55X2zBR_C-5BLrpUA1-ZM' }).then(currentToken => {
        if (currentToken) {
          this.fcmToken = currentToken
          Notification.requestPermission().then(permission => {
            if (permission === 'denied' || permission === 'default') {
              this.$refs['modal-alert-notification'].show()
            }
            if (!('permission' in Notification)) {
              Notification.permission = permission
            }
          })
          this.$http
            .post('/user/update-fcm-token', {
              user_id: this.userId.id,
              fcm_token: currentToken,
            })
        } else {
          console.log('No registration token available. Request permission to generate one.')
        }
      }).catch(err => {
        this.$refs['modal-alert-notification'].show()
      })
    },
    fileUrl: file => (file ? URL.createObjectURL(file) : null),
    receiveMessage() {
      try {
        onMessage(messaging, payload => {
          this.loadingDataChat = true
          this.fetchDetailTicket()
          this.fetchDataFirebase()
          setTimeout(() => {
            this.loadingDataChat = false
          }, 300)
        })
      } catch (err) {
        console.log('err receive', err)
        setTimeout(() => {
          this.loadingDataChat = false
        }, 300)
      }
    },
    handleCloseAlertCancel() {
      this.$refs['alert-cancel-ticket'].hide()
    },
    cancelTicket() {
      this.$refs['alert-cancel-ticket'].show()
    },
    submitCancelTicket() {
      this.loadingCancelTicket = true
      this.$http_komship.delete(`/v1/ticket-partner/cancel/${this.ticketId}`)
        .then(() => {
          this.fetchDetailTicket()
          this.loadingCancelTicket = false
          this.$refs['alert-cancel-ticket'].hide()
        }).catch(err => {
          console.log(err)
          this.loadingCancelTicket = false
        })
    },
    copyTicket(data) {
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(data)

      /* Alert the copied text */
      this.$toast({
        component: ToastificationContent,
        props: {
          title: `Nomor Ticket ${data} berhasil dicopy`,
          icon: 'AlertCircleIcon',
          variant: 'warning',
        },
      }, 1000)
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
    onChangeFile(event) {
      event.target.files.forEach(this.myFile)
    },
    myFile(data) {
      this.itemsImageInitialFile.push(data)
    },
    putFileChat(event) {
      event.target.files.forEach(this.myFile)
      this.chatFileMode = true
    },
    addFileChat(event) {
      event.target.files.forEach(this.myFile)
    },
    removeFileChat(data) {
      const findIndexObj = this.itemsImageInitialFile.findIndex(items => items.name === data.name)
      this.itemsImageInitialFile.splice(findIndexObj, 1)
      if (this.itemsImageInitialFile.length === 0) {
        this.chatFileMode = false
      }
    },
    disableButtonCancel(data) {
      let result = false
      if (data === 3) {
        result = true
      } else if (data === 4) {
        result = true
      }
      return result
    },
    getValueFile(value) {
      return value.replaceAll('/', '/ ')
    },
    handleDetailOrder() {
      this.detailOrderMode = true
    },
    updateDetailOrderMode() {
      this.detailOrderMode = false
    },
    handleCloseAlert() {
      this.$refs['modal-alert-notification'].hide()
    },
    getMessageChat(chat) {
      const urlify = text => {
        const urlRegex = /(https?:\/\/[^\s]+)/g
        return text.replace(urlRegex, url => `<a href="${url}" target="_blank" class="text-white">${url}</a>`)
      }
      const link = urlify(chat)
      return link
    },
    readChat() {
      const formData = new FormData()
      formData.append('ticket_id', this.ticketId)
      formData.append('user_id', this.userId.partner_detail.id)
      this.$http_komship.post('/v1/ticket-partner/chat/read-all', formData).then(() => {}).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
      })
    },
    handleSubmitChat(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()
        if (this.chatItem !== '') {
          this.storeChat()
        }
      }
    },
    async fetchDataResi() {
      try {
        const order = await this.$http_komship.get(`v1/order/${this.userId.partner_detail.id}/detail/${this.orderId}`)
        const { data } = await order.data
        this.transactionValue = data.old_grandtotal
        this.orderData = await data
        this.getHistoryPackage()
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.loadingDetailOrder = false
      }
    },
    async getHistoryPackage() {
      this.isLoading = true
      const body = {
        data: this.orderData.airway_bill,
      }
      await this.$http_komship.post('v2/bulk-check-awb', body).then(res => {
        const { data } = res.data
        this.itemAwb = data.history
        this.isLoading = false
        this.getElementAwb()
      }).catch(err => {
        this.isLoading = false
      })
    },
    getElementAwb() {
      const formatDate = date => {
        const monthName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const day = moment(date).format('DD')
        const month = moment(date).format('M')
        const year = moment(date).format('YYYY')
        const time = moment(date).format('HH.mm')
        return `${day} ${monthName[month - 1]} ${year} - ${time}`
      }
      this.listAwb = ''
      this.itemAwb.forEach(items => {
        this.listAwb += '<div class="icon-awb d-inline-block">'
        if (items.status === 'Pickup') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-pickup.svg')}">`
        } else if (items.status === 'Process') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-kirim.svg')}">`
        } else if (items.status === 'Problem') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-problem.svg')}">`
        } else if (items.status === 'Delivered') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-terima.svg')}">`
        } else if (items.status === 'Retur') {
          this.listAwb += `<img src="${require('@/assets/images/icons/resi-retur.svg')}">`
        }
        this.listAwb += '</div>'
        this.listAwb += '<div style="font-size: 16px;display: inline-block;">'
        this.listAwb += `<span>${formatDate(items.date)}</span><br>`
        this.listAwb += `<span class="font-bold">${items.desc}</span>`
        this.listAwb += '</div><br>'
        if (items.send_wa === 1) {
          if (items.type === 'sending') {
            this.listAwb += '<div class="d-flex relative p-1" style="margin-left:50px;border:1px solid #E2E2E2;border-radius:4px;margin-bottom:-50px;max-width:400px">'
            this.listAwb += `<img src="${require('@/assets/images/icons/whatsapp-notif.svg')}">`
            this.listAwb += '<span class="my-auto" style="margin-left:6px">Pemberitahuan pemberangkatan telah terkirim ke WA Pelanggan</span>'
            this.listAwb += '</div>'
          }
          if (items.type === 'arrived') {
            this.listAwb += '<div class="d-flex relative p-1" style="margin-left:50px;border:1px solid #E2E2E2;border-radius:4px;margin-bottom:-50px;max-width:400px">'
            this.listAwb += `<img src="${require('@/assets/images/icons/whatsapp-notif.svg')}">`
            this.listAwb += '<span class="my-auto" style="margin-left:6px">Info paket COD hampir sampai telah terkirim ke WA Pelanggan</span>'
            this.listAwb += '</div>'
          }
        }
      })
    },
    formatRibuan(x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return x
    },
    formatRupiah(x) {
      return `Rp ${this.formatRibuan(x)}`
    },
    goBack() {
      window.close()
    },
  },
}
