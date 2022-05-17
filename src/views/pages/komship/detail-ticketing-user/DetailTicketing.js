export default {
  components: {},
  data() {
    return {
      ticketId: this.$route.params.ticket_id,

      ticketStatus: '',
      orderStatus: '',
      ticketNo: '',
      noResi: '',
      ekspedisi: '',
      seller: '',
      ticketType: '',
      customerName: '',
      description: '',
      file: null,
    }
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
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
