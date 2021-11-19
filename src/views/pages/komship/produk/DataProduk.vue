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
          title="Semua"
          lazy
        >
          <all-produk />
        </b-tab>
        <b-tab
          title="Draft"
          lazy
        >
          <draft-produk />
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
import AllProduk from './AllProduk.vue'
import DraftProduk from './DraftProduk.vue'

export default {
  components: {
    BCardActions,
    BTabs,
    BTab,
    AllProduk,
    DraftProduk,
  },
  data() {
    const tabs = ['semua', 'draft']
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
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
* {
  font-family: Poppins;
}
</style>
