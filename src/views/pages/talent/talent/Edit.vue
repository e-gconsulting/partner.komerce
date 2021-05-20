<template>
  <div class="pb-1">
    <b-card-actions
      ref="formCard"
      :title="`Edit ${$route.meta.name.singular}`"
      no-actions
      no-body
    >
      <b-tabs
        v-model="tabIndex"
        fill
      >
        <b-tab
          title="Detail Profil"
          lazy
        >
          <b-card-body class="p-0">
            <form-content
              @on-submit="onSubmit"
            />
          </b-card-body>
        </b-tab>
        <b-tab
          title="Kuesioner"
          lazy
        >
          <b-card-body class="pt-1">
            <form-questionnaire />
          </b-card-body>
        </b-tab>
        <b-tab
          title="Pengalaman"
          lazy
        >
          <b-card-body class="p-0">
            <experience />
          </b-card-body>
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
import FormQuestionnaire from './questionnaire/Form.vue'
import Experience from './experience/Form.vue'

export default {
  components: {
    BCardActions,
    BCardBody,
    BTabs,
    BTab,
    FormContent,
    FormQuestionnaire,
    Experience,
  },
  data() {
    return {
      // eslint-disable-next-line no-nested-ternary
      tabIndex: this.$route.query.tab === 'experience' ? 2 : (this.$route.query.tab === 'questionnaire' ? 1 : 0),
    }
  },
  watch: {
    tabIndex(newValue) {
      // eslint-disable-next-line no-nested-ternary
      const tab = newValue === 2 ? 'experience' : (newValue === 1 ? 'questionnaire' : 'profile')
      this.$router.replace({ query: { tab } }).catch(() => {})
    },
  },
  methods: {
    onSubmit(data) {
      const { status } = data.data.talent
      let tab = 'candidate'

      if (status === 'hired') tab = 'hired'
      else if (status === 'non job') tab = 'non-job'

      this.$router.push({ name: this.$route.meta.navActiveLink, query: { tab } })
    },
  },
}
</script>
