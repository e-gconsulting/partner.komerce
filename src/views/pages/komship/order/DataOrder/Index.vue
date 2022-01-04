<template>
  <b-card>
    <div class="d-flex justify-between mb-2">
      <h3 class="font-bold">
        Data Order
      </h3>
      <b-dropdown
        id="dropdown-1"
        variant="outline-primary"
        size="sm"
        right
        text="Export"
      >
        <b-dropdown-item>Export Excel</b-dropdown-item>
        <b-dropdown-item>Export CSV</b-dropdown-item>
      </b-dropdown>
    </div>
    <b-tabs
      v-model="tabIndex"
      fill
    >
      <b-tab
        title="Semua"
        lazy
      >
        <all />
      </b-tab>
      <b-tab
        title="Perlu Dikirim"
        lazy
      >
        <sent />
      </b-tab>
      <b-tab
        title="Dikirim"
        lazy
      >
        <send />
      </b-tab>
      <b-tab
        title="Diterima"
        lazy
      >
        <received />
      </b-tab>
      <b-tab
        title="Retur"
        lazy
      >
        <retur />
      </b-tab>
    </b-tabs>
  </b-card>
</template>
<script>
import {
  BCard, BTabs, BTab, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import All from './List/All.vue'
import Sent from './List/Sent.vue'
import Send from './List/Send.vue'
import Received from './List/Received.vue'
import Retur from './List/Retur.vue'

export default {
  components: {
    BCard, BTabs, BTab, BDropdown, BDropdownItem, All, Sent, Send, Received, Retur,
  },
  data() {
    const tabs = ['semua', 'perlu-dikirim', 'dikirim', 'diterima', 'retur']
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
