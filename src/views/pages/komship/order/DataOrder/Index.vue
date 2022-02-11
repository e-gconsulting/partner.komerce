<template>
  <b-card>
    <div class="d-flex justify-between mb-2">
      <h3 class="font-bold">
        Data Order
      </h3>
      <div>
        <b-button
          v-if="tabIndex === 1"
          variant="primary"
          size="sm"
          class="mr-1"
        >
          Ajukan Pickup
        </b-button>
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
        lazy
      >
        <template slot="title">
          <b-badge
            class="mr-1"
            variant="primary"
            pill
          >
            {{ totalSent }}
          </b-badge>
          Perlu Dikirim
        </template>
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
  BCard, BTabs, BTab, BDropdown, BDropdownItem, BButton, BBadge,
} from 'bootstrap-vue'
import All from './List/All.vue'
import Sent from './List/Sent.vue'
import Send from './List/Send.vue'
import Received from './List/Received.vue'
import Retur from './List/Retur.vue'

export default {
  components: {
    BCard, BTabs, BTab, BDropdown, BDropdownItem, All, Sent, Send, Received, Retur, BButton, BBadge,
  },
  data() {
    const tabs = ['semua', 'perlu-dikirim', 'dikirim', 'diterima', 'retur']
    return {
      tabIndex: tabs.indexOf(this.$route.query.tab),
      tabs,
      profile: null,
      totalSent: null,
    }
  },
  watch: {
    tabIndex(newValue) {
      const tab = this.tabs[newValue]
      this.$router.replace({ query: { tab } }).catch(() => {})
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const profile = await this.$http_komship.post('v1/my-profile')
      const dataProfile = await profile.data.data
      this.profile = await dataProfile
      await this.$http_komship.get(`v1/order/${this.profile.partner_id}`)
        .then(res => {
          const { data } = res.data
          this.totalSent = data.total
          return this.totalSent
        })
        .catch(err => console.log(err))
    },
  },
}
</script>
