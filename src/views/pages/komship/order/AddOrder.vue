<template>
  <b-card
    class="add-order-main-wrapper"
  >
    <add-order-input
      v-if="screens === 'input'"
      :date-text="dateText"
      :screens="screens"
      :list-selected="listSelected"
      :profile="profile"
      :disable-submit-button-status="disableSubmitButtonStatus"
      @onUpdateDate="updateDateText"
      @onUpdateScreenView="updateScreenView"
      @onUpdateSelectedItems="updateSelectedItems"
      @onUpdateSubmitButtonStatus="handleUpdateSubmitButtonStatus"
    />

    <add-order-detail
      v-if="screens === 'details'"
      :date-text="dateText"
      :screens="screens"
      :list-selected="listSelected"
      :profile="profile"
      @onBoardingShow="handlePublishButton"
      @onUpdateDate="updateDateText"
      @onUpdateScreenView="updateScreenView"
    />

    <onboarding
      ref="onboardingElement"
      :current-stage="4"
    />
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
// import useJwt from '@/auth/jwt/useJwt'
// import axios2 from '../setting-kompship/baseUrl'
import AddOrderInput from './AddOrderInput.vue'
import AddOrderDetail from './AddOrderDetail.vue'
import Onboarding from '../onboarding/Onboarding.vue'

export default {
  components: {
    BCard,
    AddOrderInput,
    AddOrderDetail,
    Onboarding,
  },
  data() {
    return {
      dateText: '',
      profile: {},
      test2: {},
      listSelected: [],
      screens: 'input',
      loading: false,
      disableSubmitButtonStatus: true,
      // listProduct: [],
    }
  },
  mounted() {
    this.reload()
    this.checkExpedition()
  },
  methods: {
    async checkExpedition() {
      await this.$http_komship.get('v1/partner/shipment', {
        params: { is_komship: 1 },
      })
        .then(res => {
          const { data } = res.data
          if (data[0].is_active === 0) {
            this.$swal({
              title: '<span class="font-weight-bold h4">Aktifkan minimal 1 ekspedisi untuk melanjutkan proses Pick Up.</span>',
              imageUrl: require('@/assets/images/icons/warning.svg'), // eslint-disable-line
              confirmButtonText: 'Aktifkan Ekspedisi',
              confirmButtonClass: 'btn btn-primary',
            }).then(isConfirm => {
              if (isConfirm.value === true) {
                this.$router.push('/setting-kompship/ekspedisi')
              }
            })
          }
        })
    },
    async reload() {
      this.loading = true
      await this.getProfile()
      this.loading = false
    },
    updateDateText(dateVal) {
      if (dateVal) this.dateText = dateVal
    },
    updateSelectedItems(newListSelected) {
      if (newListSelected) this.listSelected = newListSelected
    },
    updateScreenView(value) {
      if (value) this.screens = value
    },
    handlePublishButton() {
      if (this.profile.is_onboarding) this.$refs.onboardingElement.showModal()
    },
    handleUpdateSubmitButtonStatus(value) {
      this.disableSubmitButtonStatus = value
    },
    getProfile() {
      return this.$http_komship.post('v1/my-profile').then(response => {
        const { data } = response.data
        this.profile = data
      }).catch(() => {
        // handle error
      })
    },
    getListProductByPartner() {
      const partnerId = this.profile.partner_id
      return this.$http_komship.get(`v1/partner-product/${partnerId}`).then(response => {
        const { data } = response.data
        this.listProduct = data
      }).catch(() => {
        // handle error
      })
    },
  },
}
</script>

<style lang="scss">
  @import '~@core/scss/vue/libs/vue-select.scss';
  @import 'add-order.scss';
</style>
