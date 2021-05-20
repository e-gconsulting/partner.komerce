<template>
  <div class="pb-1">
    <b-card-actions
      ref="formCard"
      :title="$route.meta.name.singular"
      no-actions
      no-body
    >
      <b-tabs
        v-model="tabIndex"
        fill
      >
        <b-tab
          title="Registered"
          lazy
        >
          <registered />
        </b-tab>
        <b-tab
          title="Active"
          lazy
        >
          <active />
        </b-tab>
        <b-tab
          title="Pause"
          lazy
        >
          <pause />
        </b-tab>
        <b-tab
          title="Off"
          lazy
        >
          <off />
        </b-tab>
      </b-tabs>
    </b-card-actions>
  </div>
</template>

<script>
import {
  BTabs, BTab,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import Registered from './Registered.vue'
import Active from './Active.vue'
import Pause from './Pause.vue'
import Off from './Off.vue'

export default {
  components: {
    BCardActions,
    BTabs,
    BTab,

    Registered,
    Active,
    Pause,
    Off,
  },
  data() {
    const tabs = ['registered', 'active', 'pause', 'off']
    return {
      tabIndex: tabs.indexOf(this.$route.query.tab),
      tabs,
    }
  },
  watch: {
    tabIndex(newValue) {
      const tab = this.tabs[newValue]
      this.$router.replace({ query: { tab } }).catch(() => {})
    },
  },
}
</script>
