<template>
  <div class="pb-1">
    <b-card-actions
      ref="formCard"
      :title="`Ubah ${$route.meta.name.singular}`"
      no-actions
      no-body
    >
      <b-tabs
        v-model="tabIndex"
        fill
      >
        <b-tab
          title="Detail"
          lazy
        >
          <b-card-body class="p-0">
            <form-content />
          </b-card-body>
        </b-tab>
        <b-tab
          title="Partisipan"
          lazy
        >
          <participant />
        </b-tab>
      </b-tabs>
    </b-card-actions>
  </div>
</template>

<script>
import {
  BTabs, BTab, BCardBody,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import FormContent from './Form.vue'
import Participant from './Participant.vue'

export default {
  components: {
    BCardActions,
    BCardBody,
    BTabs,
    BTab,
    FormContent,
    Participant,
  },
  data() {
    return {
      tabIndex: this.$route.query.tab === 'participant' ? 1 : 0,
    }
  },
  watch: {
    tabIndex(newValue) {
      const tab = newValue === 1 ? 'participant' : 'detail'
      this.$router.replace({ query: { tab } }).catch(() => {})
    },
  },
}
</script>
