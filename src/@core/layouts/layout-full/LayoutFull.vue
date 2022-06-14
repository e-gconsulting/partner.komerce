<template>
  <div id="background">
    <div :class="contentWidth === 'boxed' ? 'container p-0 ml-0 container-verified' : null">
      <router-view />
    </div>
  </div>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'

export default {
  setup() {
    const { contentWidth } = useAppConfig()
    return { contentWidth }
  },

}
</script>

<style scoped>
  [dir] .container-verified {
    max-width: 100% !important;
  }
</style>
