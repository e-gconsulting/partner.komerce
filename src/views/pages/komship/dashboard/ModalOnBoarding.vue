<template>
  <b-modal
    id="ModalOnBoarding"
    ref="ModalOnBoarding"
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
      this.disabledOnboardingMulai = false
      this.$http_komship
        .put('/v1/partner/onboarding/update', {})
        .then(resp => {
          if (resp.data.code === 200 && resp.data.status === 'success') {
            this.loadingOnboarding = false
            this.$bvModal.hide('ModalOnBoarding')
          }
        })
        .catch(() => {
          this.disabledOnboardingMulai = false
        })
    },
  },
}
</script>
