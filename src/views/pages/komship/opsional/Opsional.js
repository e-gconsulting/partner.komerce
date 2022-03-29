export default {
  data() {
    return {
      profile: [],
      quickTypeValue: null,
      isGetting: false,
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      this.$http_komship.post('v1/my-profile')
        .then(res => {
          this.profile = res.data.data
          this.quickTypeValue = res.data.data.partner_is_allowed_edit
          this.isGetting = true
        })
        .catch(err => {
          console.log(err)
          this.isGetting = true
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
