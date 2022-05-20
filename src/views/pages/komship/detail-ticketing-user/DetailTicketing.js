/* eslint-disable import/no-unresolved */
import firebase from '@/fire'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const messaging = getMessaging()
getToken(messaging, { vapidKey: 'BLZr38POWZ6vwjTUx4v2vlPHK-3fiI-DMPY18tAbu1dpchDiAYMyR7l2PE3WbH5hOM55X2zBR_C-5BLrpUA1-ZM' }).then(currentToken => {
  if (currentToken) {
    console.log(currentToken)
    this.receiveMessage()
    this.$toast({
      component: ToastificationContent,
      props: {
        title: 'Message',
        icon: 'AlertCircleIcon',
        text: 'You have a message',
        variant: 'danger',
      },
    }, 2000)
  } else {
    console.log('No registration token available. Request permission to generate one.')
  }
}).catch(err => {
  console.log('An error occurred while retrieving token. ', err)
})

export default {
  components: {},
  data() {
    return {
      ticketId: this.$route.params.ticket_id,
      loadingDataDetail: true,

      ticketStatus: '',
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
      messages: [],
      chatItem: '',
    }
  },
  watch: {
    messages(newMessage, oldMessage) {
      if (newMessage.length !== oldMessage.length) {
        this.receiveMessage()
      }
    },
  },
  created() {
    this.receiveMessage()
  },
  mounted() {
    this.fetchDetailTicket()
  },
  methods: {
    fetchDetailTicket() {
      this.$http_komship.get(`v1/ticket-partner/detail/${this.ticketId}`)
        .then(response => {
          const { data } = response.data
          console.log(data)
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
          this.loadingDataDetail = false
        })
        .catch(err => {
          console.log(err)
          this.loadingDataDetail = false
        })
    },
    storeChat() {
      const formData = new FormData()
      formData.append('message', this.chatItem)
      formData.append('ticket_id', Number(this.ticketId))
      this.$http_komship.post('/v1/ticket-partner/store-chat', formData)
        .then(response => {
          console.log(response)
          this.fetchDetailTicket()
        }).catch(err => {
          console.log(err)
        })
    },
    receiveMessage() {
      onMessage(messaging, payload => {
        console.log('Message received. ', payload)
        // ..
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Message',
            icon: 'AlertCircleIcon',
            text: 'You have a message Pak',
            variant: 'danger',
          },
        }, 2000)
      })
    },
    statusTicketVariant(data) {
      let resultVariant = ''
      if (data === 'Belum diproses') {
        resultVariant = 'light-primary'
      } else if (data === 'Sedang diproses') {
        resultVariant = 'light-warning'
      } else if (data === 'Selesai') {
        resultVariant = 'light-success'
      } else if (data === 'Dikirim') {
        resultVariant = 'light-info'
      } else if (data === 'Dibatalkan') {
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
    fetchDataFirebase() {

    },
  },
}
