<template>
  <div
    class="app-content content"
    :class="[{'show-overlay': $store.state.app.shallShowOverlay}, $route.meta.contentClass]"
  >
    <div class="content-overlay" />
    <div class="header-navbar-shadow" />
    <div
      class="content-wrapper"
      :class="contentWidth === 'boxed' ? 'container p-0' : null"
    >
      <slot
        v-if="isAdmin"
        name="breadcrumb"
      >
        <app-breadcrumb />
      </slot>
      <div class="content-body">
        <b-alert
          v-height-fade
          :show="this.$store.state.auth.userData.is_komship !== 1"
          dismissible
          fade
          variant="primary"
        >
          <div class="alert-body">
            <feather-icon
              class="mr-25"
              icon="AlertCircleIcon"
            />
            <span class="mx-25">Harap lengkapi profil Anda terlebih dahulu.</span>
            <b-link
              class="font-weight-bolder"
              :to="{ name: 'partner-profile' }"
            >
              <u>Lengkapi Profil</u>
            </b-link>
          </div>
        </b-alert>
        <transition
          :name="routerTransition"
          mode="out-in"
        >
          <slot />
        </transition>
      </div>
      <b-button
        v-if="$route.meta.routeCreate"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        v-b-tooltip.hover.left="'Tambah Baru'"
        variant="primary"
        class="btn-icon btn-floating rounded-circle"
        size="lg"
        :to="{ name: $route.meta.routeCreate }"
      >
        <feather-icon
          icon="PlusIcon"
          size="16"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BButton, VBTooltip, BAlert, BLink,
} from 'bootstrap-vue'
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import useAppConfig from '@core/app-config/useAppConfig'
import Ripple from 'vue-ripple-directive'
import { heightFade } from '@core/directives/animations'

export default {
  directives: {
    'b-tooltip': VBTooltip,
    heightFade,
    Ripple,
  },
  components: {
    AppBreadcrumb, BButton, BAlert, BLink,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig()

    return {
      routerTransition, contentWidth,
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.auth.userData.role_name.toUpperCase() === 'ADMIN'
    },
    partnerProfileIncomplete() {
      return this.$store.state.auth.userData.role_name.toUpperCase() === 'PARTNER' && !this.$store.state.auth.userData.nik
    },
  },
}
</script>

<style>

</style>
