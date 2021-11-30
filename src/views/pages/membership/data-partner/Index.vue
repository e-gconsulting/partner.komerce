<template>
  <section id="cod-pendapatan">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-body>
          <div class="wrapper__performa">
            <h3
              class="text-24-bold"
              style="color: #222222;"
            >
              Validasi Partner
            </h3>
          </div>
          <list-partner />
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
  BCard,
  BSpinner,
  BCardBody,
} from 'bootstrap-vue'
import ListPartner from './ListPartner.vue'

export default {
  components: {
    BCard,
    BSpinner,
    BCardBody,
    ListPartner,
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
  },
  methods: {
    //
  },
}
</script>

<style lang="scss" scoped>
.wrapper__performa{
  display: flex;
}
@media screen and (max-width: 1000px) {
  .wrapper__performa{
    display: grid;
    justify-content: center;
    text-align: center;
  }
}
</style>
