export default {
  data() {
    return {
      profile: [],
      quickTypeValue: true,
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$http_komship.post('v1/my-profile')
        .then(res => {
          this.profile = res.data.data
          this.quickTypeValue = res.data.data.partner_is_allowed_edit
        })
    },
    quickType() {
      this.$http.post(`/user/partner/setting/isAllowedEdit/${this.profile.partner_id}`, { is_allowed_edit: this.quickTypeValue })
        .then(res => {
          if (res.data.code === 200) {
            this.getProfile()
          }
        })
    },
  },
}
