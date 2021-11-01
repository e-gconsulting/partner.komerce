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
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BCard,
  BOverlay,
} from 'bootstrap-vue'
import ProvinceBar from './ProvinceData.vue'
import CityBar from './CityData.vue'

export default {
  components: {
    BCard,
    BOverlay,
    ProvinceBar,
    CityBar,
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
