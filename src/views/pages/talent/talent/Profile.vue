<template>
  <div class="pb-1">
    <b-card-actions
      ref="formCard"
      title="Ubah Profile"
      no-actions
      no-body
    >
      <form-content
        @on-submit="onSubmit"
      />
    </b-card-actions>
  </div>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import FormContent from './Form.vue'

export default {
  components: {
    BCardActions,
    FormContent,
  },
  methods: {
    onSubmit() {
      this.$router.push({ name: 'talent-home' })
    },
  },
}
</script>
