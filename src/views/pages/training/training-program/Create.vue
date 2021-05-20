<template>
  <b-card-actions
    ref="formCard"
    :title="`Tambah ${$route.meta.name.singular}`"
    no-actions
  >
    <form-content />
  </b-card-actions>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import FormContent from './Form.vue'

export default {
  components: {
    BCardActions,
    FormContent,
  },
}
</script>
