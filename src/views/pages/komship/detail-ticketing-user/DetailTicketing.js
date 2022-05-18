import fire from '@/fire'

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
    }
  },

  mounted() {
    this.fetchDetailTicket()
    console.log(fire)
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
          this.loadingDataDetail = false
        })
        .catch(err => {
          console.log(err)
          this.loadingDataDetail = false
        })
    },
  },
}
