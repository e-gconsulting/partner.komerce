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
          title="Kandidat Talent"
          lazy
        >
          <candidate />
        </b-tab>
        <b-tab
          title="Hired"
          lazy
        >
          <hired />
        </b-tab>
        <b-tab
          title="Non-Job"
          lazy
        >
          <non-job />
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
import Candidate from './Candidate.vue'
import Hired from './Hired.vue'
import NonJob from './NonJob.vue'

export default {
  components: {
    BCardActions,
    BTabs,
    BTab,
    Candidate,
    Hired,
    NonJob,
  },
  data() {
    const tabs = ['candidate', 'hired', 'non-job']
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
