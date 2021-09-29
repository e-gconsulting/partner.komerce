<template>
  <section id="cod-data-partner-detail">
    <div v-if="!loadDataAwal">
      <b-card no-body>
        <b-card-body>
          <div class="d-flex align-items-center">
            <b-button
              variant="primary"
              size="sm"
              class="mr-50 btn-custom"
              @click="$router.go(-1)"
            >
              <feather-icon
                size="2x"
                icon="ChevronLeftIcon"
              />
            </b-button>
            <h4
              class="text-24-bold"
              style="color: #222222;"
            >
              Rincian Penarikan Saldo
            </h4>
          </div>
          <div class="d-flex justify-content-end">
            <b-button
              variant="primary"
              size="sm"
              class="mr-50 btn-custom btn-custom--edit"
              @click="$router.go(-1)"
            >Edit
            </b-button>
          </div>

          <div>
            <h3
              class="text-24-bold"
              style="font-size:20px;color:#222222;"
            >
              Informasi Pengguna
            </h3>
            <b-row>
              <b-col md="3">
                <span>
                  Nama
                </span>
              </b-col>
              <b-col md="8">
                <input
                  placeholder="Nama"
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <span>
                  Nama
                </span>
              </b-col>
              <b-col md="8">
                <input
                  placeholder="Nama"
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <span>
                  Nama
                </span>
              </b-col>
              <b-col md="8">
                <input
                  placeholder="Nama"
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <span>
                  Nama
                </span>
              </b-col>
              <b-col md="8">
                <input
                  placeholder="Nama"
                >
              </b-col>
            </b-row>
          </div>

          <div>
            <h4
              class="text-24-bold"
              style="color: #222222;"
            >
              Informasi Membership Pengguna
            </h4>
          </div>

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
  BRow,
  BCol,
  BButton,
  BCard,
  BSpinner,
  // BFormInput,
  BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BCard,
    BSpinner,
    BCardBody,
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
.btn-custom{
  border-radius: 16px;
  width: 56px;
  height: 56px;

  &--edit{
    width: 178px;
    height: 56px;
    border-radius: 12px;
  }
}
</style>
