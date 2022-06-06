<template>
  <b-modal
    id="modal-onboarding"
    ref="modal-onboarding"
    no-close-on-esc
    no-close-on-backdrop
    hide-header-close
    hide-footer
    hide-header
    size="lg"
  >
    <Welcome
      :stepped="stepped"
      :step="handleStepOnboard"
    />
    <Stepper
      v-if="stepped !== 1"
      :data="dataSteps"
      :handle="handleStepOnboard"
    />
  </b-modal>
</template>

<script>
import useJwt from '@/auth/jwt/useJwt'
import Welcome from './componentStepModal/Welcome.vue'
import Stepper from './componentStepModal/Stepper.vue'

export default {
  name: 'ModalOnBoarding',
  components: {
    Welcome,
    Stepper,
  },
  data() {
    return {
      stepped: 1,
      dataSteps: 1,
      disabledOnboardingMulai: false,
    }
  },
  mounted() {
    this.$http_komship
      .post('v1/my-profile', {
        headers: { Authorization: `Bearer ${useJwt.getToken()}` },
      })
      .then(response => {
        const { data } = response.data
        if (data) {
          if (!data.is_onboarding) {
            this.$bvModal.show('modal-onboarding')
          } else {
            this.loadingOnboarding = false
            this.$bvModal.show('modal-onboarding')
          }
        }
      })
  },
  methods: {
    handleStepOnboard(params) {
      switch (params) {
        case 'endsteponboarding':
          this.updateProfileOnBoarding()
          break
        default:
          this.stepped = params
          break
      }
    },
    updateProfileOnBoarding() {
      this.disabledOnboardingMulai = true
      this.$http_komship
        .put('/v1/partner/onboarding/update', {})
        .then(resp => {
          if (resp.data.code === 200 && resp.data.status === 'success') {
            this.loadingOnboarding = false
            this.$bvModal.hide('modal-onboarding')
          }
        })
        .catch(() => {
          this.disabledOnboardingMulai = false
        })
    },
  },

}
</script>
<style lang scoped src='./ModalOnBoarding.scss'/>
