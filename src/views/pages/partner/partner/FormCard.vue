<template>
  <b-card-actions
    :title="`${editMode ? 'Ubah' : 'Tambah'} ${$route.meta.name.singular}`"
    no-actions
    no-body
  >
    <partner-form />
  </b-card-actions>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import PartnerForm from './Form.vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.id'

export default {
  components: {
    BCardActions,
    PartnerForm,
  },
  computed: {
    id() {
      if (this.editProfileMode) return this.$store.state.auth.userData.id
      if (this.showDetailMode) return this.partnerId
      return this.$route.params.id || this.$route.query.id
    },
    editProfileMode() {
      return this.$route.name === 'partner-profile'
    },
    showDetailMode() {
      return this.partnerId
    },
    editMode() {
      return this.id !== undefined
    },
  },
}
</script>
