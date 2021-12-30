<template>
  <b-card>
    <b-row class="justify-content-end">
      <h4 class="mr-3">
        <strong>
          Detail orderan pickup
        </strong>
      </h4>
    </b-row>
    <b-row class="mt-2">
      <b-badge
        variant="light-primary"
        class="ml-1"
      >
        *Ajukan pickup terlebih dahulu untuk mendapatkan label dan nomor resi
      </b-badge>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BBadge,
  },

  data() {
    return {
      selectedOrder: this.$route.params.selected_order,
    }
  },
  mounted() {
    console.log(this.selectedOrder)
  },
}
</script>

<style>

</style>
