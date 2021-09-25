<template>
  <section id="cod-pendapatan">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-body>
          asdsad
        </b-card-body>
      </b-card>
    </div>

    <div
      v-else
      class="text-center"
    >
      <b-spinner
        variant="primary"
        label="Text Centered"
      />
    </div>
  </section>
</template>

<script>
import {
  // BRow,
  // BCol,
  BCard,
  // BButton,
  BSpinner,
  BCardBody,
  // BListGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    // BRow,
    // BCol,
    BCard,
    // BAlert,
    // BButton,
    // BAvatar,
    BSpinner,
    BCardBody,
    // BListGroup,
    // BFormSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      loadDataAwal: true,
    }
  },
  computed: {
    //
  },
  watch: {
    //
  },
  mounted() {
    //
  },
  created() {
    setTimeout(() => {
      this.loadDataAwal = false
    }, 1000)
    this.fetchData()
    // check data from API when there is withdrawal pending/process in api
    // get data for series performa expedisi and performa partner
    // get data for select option kurir
    // get data for select option bulan or just hardcode
  },
  methods: {
    async fetchData() {
      // change this endpoint
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
