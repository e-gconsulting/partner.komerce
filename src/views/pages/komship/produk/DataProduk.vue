<template>
  <div class="pb-1">
    <b-card
      ref="formCard"
      :title="$route.meta.name.singular"
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
    </b-card>
  </div>
</template>

<script>
import {
  BTabs, BTab, BCard,
} from 'bootstrap-vue'
import AllProduk from './AllProduk.vue'
import DraftProduk from './DraftProduk.vue'

export default {
  components: {
    BTabs,
    BTab,
    AllProduk,
    DraftProduk,
    BCard,
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
