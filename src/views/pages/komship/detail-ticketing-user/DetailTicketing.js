/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  VBToggle,
  BProgress,
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
import axios from 'axios'

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
    BProgress,
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

      visible: true,

      orderData: [],
      itemAwb: [],
      listAwb: '',
      moment,

      transactionValue: '',
      isLoading: false,

      stars: [
        {
          value: 1,
          active: false,
        },
        {
          value: 2,
          active: false,
        },
        {
          value: 3,
          active: false,
        },
        {
          value: 4,
          active: false,
        },
        {
          value: 5,
          active: false,
        },
      ],
      ratingUser: null,
      dateRating: null,

      itemButtonWaCustomer: require('@/assets/images/icons/wa-notactive.svg'),
      customerPhone: '',

      fileProv: [],
      percentageUpload: [],

      isUploading: false,
      request: null,

      claimReturItem: null,
      claimReturStatus: null,

      dateClaimRetur: null,

      buttonClaimRetur: false,
      infoClaimRetur: false,

      infoLinkClaimRetur: null,
      isDisableSubmitClaimRetur: true,
      notesRejectRetur: null,
      claimReturIsActive: false,
      active_Priority: false,
      statusPriority: 0,
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
  },
  methods: {
    fetchDetailTicket() {
      this.infoClaimRetur = false
      this.$http_komship.get(`v1/ticket-partner/detail/${this.ticketId}`)
        .then(async response => {
          const { data } = response.data
          this.claimReturItem = data.claim_retur
          if (this.claimReturItem?.status_claim === 0) {
            this.claimReturStatus = 'Claim on Review'
          } else if (this.claimReturItem?.status_claim === 1) {
            this.claimReturStatus = 'Claim Sukses'
          } else if (this.claimReturItem?.status_claim === 2) {
            this.claimReturStatus = 'Claim Ditolak'
          }
          if (data.order_status === 'Retur' || data.order_status === 'Diterima') {
            if (data.payment_method === 'COD' && this.claimReturItem === null) {
              this.buttonClaimRetur = true
            }
          }
          if (data.payment_method === 'COD') this.claimReturIsActive = true
          if (data.ticket_claim_retur !== 0) this.infoClaimRetur = true
          if (this.claimReturItem?.notes) this.notesRejectRetur = this.claimReturItem.notes
          if (data.status_priority === 1) this.active_Priority = true
          this.dateClaimRetur = data.claim_retur?.created_at
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
          this.orderId = await data.order_id
          this.loadingDataDetail = false
          this.ratingUser = data.rating_user
          this.statusPriority = data.status_priority
          console.log(this.statusPriority)
          if (data.rating_user !== null) this.previewRating(data.rating_user.rating)
          this.dateRating = data.date_updated
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
          this.loadingDataDetail = false
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
    orderStatusTextVariant(data) {
      let result = ''
      if (data === 'Diajukan') {
        result = 'text-primary ml-1'
      } else if (data === 'Dipacking') {
        result = 'text-info ml-1'
      } else if (data === 'Dikirim') {
        result = 'text-warning ml-1'
      } else if (data === 'Diterima') {
        result = 'text-success ml-1'
      } else if (data === 'Retur') {
        result = 'text-danger ml-1'
      } else if (data === 'Batal') {
        result = 'text-dark ml-1'
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
              this.changeAttr()
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
        this.changeAttr()
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
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
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
    previewRating(data) {
      const findIndexRating = this.stars.findIndex(item => item.value === data)
      this.stars.forEach((item, index) => {
        if (index <= findIndexRating) {
          this.stars[index].active = true
        }
      })
    },
    resetRating() {
      this.stars = [
        {
          value: 1,
          active: false,
        },
        {
          value: 2,
          active: false,
        },
        {
          value: 3,
          active: false,
        },
        {
          value: 4,
          active: false,
        },
        {
          value: 5,
          active: false,
        },
      ]
    },
    submitRating(data) {
      const formData = new FormData()
      formData.append('ticket_id', this.ticketId)
      formData.append('user_id', this.userId.partner_detail.id)
      formData.append('rating', data)
      this.$http_komship.post('/v1/ticket-partner/rating/store', formData)
        .then(response => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Success',
              icon: 'CheckIcon',
              text: 'berhasil submit review',
              variant: 'success',
            },
          }, 2000)
          this.fetchDetailTicket()
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
        })
    },
    applyValueTransaction(data) {
      this.transactionValue = data
    },
    handleHoverButtonWa() {
      this.itemButtonWaCustomer = require('@/assets/images/icons/wa-active.svg')
    },
    handleLeaveHoverButtonWa() {
      this.itemButtonWaCustomer = require('@/assets/images/icons/wa-notactive.svg')
    },
    handleClickWaCustomer() {
      if (this.customerPhone.charAt(0) === '0') {
        window.open(`https://api.whatsapp.com/send?phone=62${this.customerPhone.slice(1, this.customerPhone)}`, '_blank')
      } else if (this.customerPhone.charAt(0) === '6' && this.customerPhone.charAt(1) === '2') {
        window.open(`https://api.whatsapp.com/send?phone=${this.customerPhone}`, '_blank')
      } else {
        window.open(`https://api.whatsapp.com/send?phone=62${this.customerPhone}`, '_blank')
      }
    },
    fetchCustomerPhone(data) {
      this.customerPhone = data
    },
    openPopupClaimRetur() {
      this.$refs['popup-claim-retur'].show()
    },
    closePopupClaimRetur() {
      this.isDisableSubmitClaimRetur = true
      this.fileProv = []
      this.$refs['popup-claim-retur'].hide()
    },
    async uploadFile(e) {
      this.isDisableSubmitClaimRetur = true
      if (e.target.files.length > 1) {
        const filterFile = Array.from(e.target.files).filter(item => item.type === 'image/png' || item.type === 'image/jpg' || item.type === 'image/jpeg2000' || item.type === 'image/jpeg')
        const filterSizeFile = Array.from(filterFile).filter(item => Math.round(item.size / 1024) < 2048)
        this.fileProv = filterSizeFile
        await this.$http_komship.post(`/v1/ticket-partner/claim-retur/store/${this.ticketId}`).then(response => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fileProv.length; i++) {
            Object.assign(this.fileProv[i], { claimReturId: response.data.data.claim_retur })
            Object.assign(this.fileProv[i], { isUploaded: false })
          }
        }).catch(err => {
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
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.fileProv.length; i++) {
          const formData = new FormData()
          Object.assign(this.fileProv[i], { progressBar: true })
          this.$forceUpdate()
          formData.append('file', this.fileProv[i])
          formData.append('claim_retur_id', this.fileProv[i].claimReturId)
          this.$http_komship.post('/v1/ticket-partner/claim-retur/upload/image-temp', formData).then(response => {
            this.fileProv[i].progressBar = false
            Object.assign(this.fileProv[i], { returImageId: response.data.data.retur_image_id })
            this.isDisableSubmitClaimRetur = false
            this.fileProv[i].isUploaded = true
            this.$forceUpdate()
          }).catch(err => {
            this.fileProv[i].progressBar = false
            this.$forceUpdate()
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
      }
      if (e.target.files.length === 1) {
        if (Math.round(e.target.files[0].size / 1024) < 2048) {
          const filterFile = Array.from(e.target.files).filter(item => item.type === 'image/png' || item.type === 'image/jpg' || item.type === 'image/jpeg2000' || item.type === 'image/jpeg')
          const filterSizeFile = Array.from(filterFile).filter(item => Math.round(item.size / 1024) < 2048)
          this.fileProv = filterSizeFile
          await this.$http_komship.post(`/v1/ticket-partner/claim-retur/store/${this.ticketId}`).then(response => {
          // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.fileProv.length; i++) {
              Object.assign(this.fileProv[i], { claimReturId: response.data.data.claim_retur })
              Object.assign(this.fileProv[i], { isUploaded: false })
            }
          }).catch(err => {
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
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fileProv.length; i++) {
            const formData = new FormData()
            Object.assign(this.fileProv[i], { progressBar: true })
            this.$forceUpdate()
            formData.append('file', this.fileProv[i])
            formData.append('claim_retur_id', this.fileProv[i].claimReturId)
            this.$http_komship.post('/v1/ticket-partner/claim-retur/upload/image-temp', formData).then(response => {
              this.fileProv[i].progressBar = false
              Object.assign(this.fileProv[i], { returImageId: response.data.data.retur_image_id })
              this.isDisableSubmitClaimRetur = false
              this.fileProv[i].isUploaded = true
              this.$forceUpdate()
            }).catch(err => {
              this.fileProv[i].progressBar = false
              this.$forceUpdate()
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
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'File Max 2MB',
              variant: 'danger',
            },
          }, 2000)
        }
      }
    },
    async uploadFileAgain(e) {
      this.isDisableSubmitClaimRetur = true
      if (e.target.files.length > 1) {
        const filterFile = Array.from(e.target.files).filter(item => item.type === 'image/png' || item.type === 'image/jpg' || item.type === 'image/jpeg2000' || item.type === 'image/jpeg')
        const filterSizeFile = Array.from(filterFile).filter(item => Math.round(item.size / 1024) < 2048)
        this.fileProv = Array.from(this.fileProv).concat(Array.from(filterSizeFile))
        await this.$http_komship.post(`/v1/ticket-partner/claim-retur/store/${this.ticketId}`).then(response => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fileProv.length; i++) {
            Object.assign(this.fileProv[i], { claimReturId: response.data.data.claim_retur })
            if (!this.fileProv[i].isUploaded) Object.assign(this.fileProv[i], { isUploaded: false })
          }
        }).catch(err => {
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
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.fileProv.length; i++) {
          const formData = new FormData()
          Object.assign(this.fileProv[i], { progressBar: true })
          this.$forceUpdate()
          formData.append('file', this.fileProv[i])
          formData.append('claim_retur_id', this.fileProv[i].claimReturId)
          this.$http_komship.post('/v1/ticket-partner/claim-retur/upload/image-temp', formData).then(response => {
            this.fileProv[i].progressBar = false
            Object.assign(this.fileProv[i], { returImageId: response.data.data.retur_image_id })
            this.isDisableSubmitClaimRetur = false
            this.fileProv[i].isUploaded = true
            this.$forceUpdate()
          }).catch(err => {
            this.fileProv[i].progressBar = false
            this.$forceUpdate()
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
      }
      if (e.target.files.length === 1) {
        if (Math.round(e.target.files[0].size / 1024) < 2048) {
          const filterFile = Array.from(e.target.files).filter(item => item.type === 'image/png' || item.type === 'image/jpg' || item.type === 'image/jpeg2000' || item.type === 'image/jpeg')
          const filterSizeFile = Array.from(filterFile).filter(item => Math.round(item.size / 1024) < 2048)
          this.fileProv = Array.from(this.fileProv).concat(Array.from(filterSizeFile))
          await this.$http_komship.post(`/v1/ticket-partner/claim-retur/store/${this.ticketId}`).then(response => {
          // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.fileProv.length; i++) {
              Object.assign(this.fileProv[i], { claimReturId: response.data.data.claim_retur })
              if (!this.fileProv[i].isUploaded) Object.assign(this.fileProv[i], { isUploaded: false })
            }
          }).catch(err => {
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
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fileProv.length; i++) {
            const formData = new FormData()
            Object.assign(this.fileProv[i], { progressBar: true })
            this.$forceUpdate()
            formData.append('file', this.fileProv[i])
            formData.append('claim_retur_id', this.fileProv[i].claimReturId)
            this.$http_komship.post('/v1/ticket-partner/claim-retur/upload/image-temp', formData).then(response => {
              this.fileProv[i].progressBar = false
              Object.assign(this.fileProv[i], { returImageId: response.data.data.retur_image_id })
              this.isDisableSubmitClaimRetur = false
              this.fileProv[i].isUploaded = true
              this.$forceUpdate()
            }).catch(err => {
              this.fileProv[i].progressBar = false
              this.$forceUpdate()
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
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'File Max 2MB',
              variant: 'danger',
            },
          }, 2000)
        }
      }
    },
    async dragFile(e) {
      this.isDisableSubmitClaimRetur = true
      if (e.dataTransfer.files.length > 1) {
        const filterFile = Array.from(e.dataTransfer.files).filter(item => item.type === 'image/png' || item.type === 'image/jpg' || item.type === 'image/jpeg2000' || item.type === 'image/jpeg')
        const filterSizeFile = Array.from(filterFile).filter(item => Math.round(item.size / 1024) < 2048)
        this.fileProv = filterSizeFile
        await this.$http_komship.post(`/v1/ticket-partner/claim-retur/store/${this.ticketId}`).then(response => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fileProv.length; i++) {
            Object.assign(this.fileProv[i], { claimReturId: response.data.data.claim_retur })
          }
        }).catch(err => {
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
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.fileProv.length; i++) {
          const formData = new FormData()
          Object.assign(this.fileProv[i], { progressBar: true })
          this.$forceUpdate()
          formData.append('file', this.fileProv[i])
          formData.append('claim_retur_id', this.fileProv[i].claimReturId)
          this.$http_komship.post('/v1/ticket-partner/claim-retur/upload/image-temp', formData).then(response => {
            this.fileProv[i].progressBar = false
            Object.assign(this.fileProv[i], { returImageId: response.data.data.retur_image_id })
            this.isDisableSubmitClaimRetur = false
            this.$forceUpdate()
          }).catch(err => {
            this.fileProv[i].progressBar = false
            this.$forceUpdate()
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
      }
      if (e.dataTransfer.files.length === 1) {
        if (Math.round(e.dataTransfer.files[0].size / 1024) < 2048) {
          const filterFile = Array.from(e.dataTransfer.files).filter(item => item.type === 'image/png' || item.type === 'image/jpg' || item.type === 'image/jpeg2000' || item.type === 'image/jpeg')
          const filterSizeFile = Array.from(filterFile).filter(item => Math.round(item.size / 1024) < 2048)
          this.fileProv = filterSizeFile
          await this.$http_komship.post(`/v1/ticket-partner/claim-retur/store/${this.ticketId}`).then(response => {
          // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.fileProv.length; i++) {
              Object.assign(this.fileProv[i], { claimReturId: response.data.data.claim_retur })
            }
          }).catch(err => {
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
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.fileProv.length; i++) {
            const formData = new FormData()
            Object.assign(this.fileProv[i], { progressBar: true })
            this.$forceUpdate()
            formData.append('file', this.fileProv[i])
            formData.append('claim_retur_id', this.fileProv[i].claimReturId)
            this.$http_komship.post('/v1/ticket-partner/claim-retur/upload/image-temp', formData).then(response => {
              this.fileProv[i].progressBar = false
              Object.assign(this.fileProv[i], { returImageId: response.data.data.retur_image_id })
              this.isDisableSubmitClaimRetur = false
              this.$forceUpdate()
            }).catch(err => {
              this.fileProv[i].progressBar = false
              this.$forceUpdate()
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
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: 'File Max 2MB',
              variant: 'danger',
            },
          }, 2000)
        }
      }
    },
    deleteProvePreview(data) {
      this.isDisableSubmitClaimRetur = true
      const findIndexFile = Array.from(this.fileProv).findIndex(file => file.name === data.name)
      this.fileProv = Array.from(this.fileProv)
      this.fileProv[findIndexFile].progressBar = true
      this.$http_komship.delete(`/v1/ticket-partner/claim-retur/delete/image/${data.returImageId}`).then(response => {
        this.fileProv.splice(findIndexFile, 1)
        this.isDisableSubmitClaimRetur = false
        this.$forceUpdate()
      }).catch(err => {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Failure',
            icon: 'AlertCircleIcon',
            text: err,
            variant: 'danger',
          },
        }, 2000)
        this.fileProv[findIndexFile].progressBar = false
        this.$forceUpdate()
      })
    },
    handleBackPopupClaimRetur() {
      this.$refs['popup-have-submitted-retur-claim'].hide()
    },
    nextSuccessReturClaim() {
      this.isDisableSubmitClaimRetur = true
      this.fetchDetailTicket()
      this.$refs['popup-success-claim-retur'].hide()
    },
    returStatusVariant(data) {
      let result = ''
      if (data === 'Claim on Review') {
        result = 'text-warning mr-50'
      } else if (data === 'Claim Sukses') {
        result = 'text-success mr-50'
      } else if (data === 'Claim Ditolak') {
        result = 'text-danger mr-50'
      }
      return result
    },
    submitClaimRetur() {
      this.isUploading = true
      this.$http_komship.put(`/v1/ticket-partner/claim-retur/update/${this.ticketId}`).then(response => {
        this.$refs['popup-success-claim-retur'].show()
        this.$refs['popup-claim-retur'].hide()
        this.fileProv = []
        this.isUploading = false
      }).catch(err => {
        if (err.response?.data?.code === 1009) {
          this.$refs['popup-have-submitted-retur-claim'].show()
          this.$refs['popup-claim-retur'].hide()
          this.fileProv = []
          this.isUploading = false
        } else {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Failure',
              icon: 'AlertCircleIcon',
              text: err,
              variant: 'danger',
            },
          }, 2000)
        }
      })
    },
    getLinkOnNotes(chat) {
      const urlify = text => {
        const urlRegex = /(https?:\/\/[^\s]+)/g
        return text.replace(urlRegex, url => `<a href="${url}" target="_blank" class="text-info">${url}</a>`)
      }
      const link = urlify(chat)
      return link
    },
    async changeAttr() {
      const element = document.getElementsByTagName('body')[0].className

      await (element === 'modal-open')
      document.querySelectorAll('div.modal-content')[0].removeAttribute('tabindex')
    },
    activePriority() {
      this.active_Priority = !this.active_Priority
      if (this.active_Priority === true) {
        this.$http_komship.post(`/v1/ticket-partner/set-priority/${this.ticketId}`, { status_priority: 1 })
          .then(() => {
            this.$toast({
              method: 'POST',
              body: JSON.stringify({
                to: this.fcmToken,
              }),
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Custom Label berhasil diaktifkan',
                variant: 'success',
              },
            }, 2000)
          }).catch(err => {
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
        this.$http_komship.post(`/v1/ticket-partner/set-priority/${this.ticketId}`, { status_priority: 0 })
          .then(() => {
            this({
              method: 'POST',
              body: JSON.stringify({
                to: this.fcmToken,
              }),
            }, 2000)
          })
      }
    },
  },
}
