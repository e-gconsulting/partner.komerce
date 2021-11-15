<template>
  <b-overlay
    variant="light"
    :show="loading"
    spinner-variant="primary"
    blur="0"
    opacity=".5"
    rounded="sm"
  >
    <b-card>
      <province-bar />
      <city-bar />
      <ProgressBar
        bar-color="#dc720f"
        val="60"
        text="60%"
        size="medium"
      />
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BCard,
  BOverlay,
} from 'bootstrap-vue'
import ProgressBar from 'vue-simple-progress'
import ProvinceBar from './ProvinceData.vue'
import CityBar from './CityData.vue'

export default {
  components: {
    BCard,
    BOverlay,
    ProvinceBar,
    CityBar,
    ProgressBar,
  },
  data() {
    return {
      loading: false,
    }
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
@import '~@core/scss/vue/libs/vue-flatpicker.scss';
</style>
