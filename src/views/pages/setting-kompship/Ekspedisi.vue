<template>
  <b-card>
    <b-row class="d-flex align-items-center">
      <b-col>
        <h5>
          <strong>Pengaturan Ekspedisi</strong>
        </h5>
      </b-col>
      <b-col class="d-flex justify-content-end">
        <b-form-checkbox
          checked="true"
          class="custom-control-primary"
          name="check-button"
          switch
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormCheckbox,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormCheckbox,
  },
}
</script>

<style>

</style>
