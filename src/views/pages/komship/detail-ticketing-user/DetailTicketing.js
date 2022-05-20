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
      messages: [
        {
          role: 'user',
          name: 'candra bangor',
          message: 'Jenis Tiket : Jadwal Ulang Pengiriman, Deskripsi : Mohon untuk diantarkan ulang',
          time: '10 April 2022 | 13.40',
        },
        {
          role: 'mitra',
          name: 'candra maung',
          message: 'Akan dieskalasi ke cabang terkait',
          time: '10 April 2022 | 13.40',
        },
      ],
      chatItem: '',
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
    storeChat() {
      const formData = new FormData()
      formData.append('message', this.chatItem)
      formData.append('ticket_id', Number(this.ticketId))
      this.$http_komship.post('/v1/ticket-partner/store-chat', formData)
        .then(response => {
          console.log(response)
        }).catch(err => {
          console.log(err)
        })
    },
  },
}
