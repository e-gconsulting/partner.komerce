<template>
  <b-row>
    <b-col
      cols="6"
      class="wrapper-kompship-register"
    >
      <b-navbar-brand class="ml-4 mt-1">
        <b-img
          src="@core/assets/image/brand.png"
        />
      </b-navbar-brand>
      <b-col
        md="12"
        class="pt-5 mt-3"
      >
        <b-col class="ml-3">
          <h3 class="ml-5 mb-2">
            Daftar
          </h3>
          <b-form
            class="ml-5"
            @submit.prevent
          >
            <b-row>

              <!-- first name -->
              <b-col cols="8">
                <b-form-group
                  label="Nama Lengkap"
                >
                  <b-form-input
                    id="v-first-name"
                    placeholder="Nama Lengkap"
                  />
                </b-form-group>
              </b-col>

              <!-- email -->
              <b-col cols="8">
                <b-form-group
                  label="Email"
                  label-for="v-email"
                >
                  <b-form-input
                    id="v-email"
                    type="email"
                    placeholder="Email"
                  />
                </b-form-group>
              </b-col>

              <!-- password -->
              <b-col cols="8">
                <b-form-group
                  label="Password"
                  label-for="v-password"
                >
                  <b-form-input
                    id="v-password"
                    type="password"
                    placeholder="Password"
                  />
                </b-form-group>
              </b-col>

              <!-- checkbox -->
              <b-col cols="12">
                <b-form-group>
                  <b-form-checkbox
                    id="checkbox-3"
                    name="checkbox-3"
                    value="Remember_me"
                  >
                    Saya setuju dengan syarat dan ketentuan Kompship
                  </b-form-checkbox>
                </b-form-group>
              </b-col>

              <!-- submit -->
              <b-col cols="12">
                <b-col md="6">
                  <div class="demo-inline-spacing">
                    <b-button
                      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      block
                      variant="primary"
                    >
                      Daftar
                    </b-button>
                  </div>
                </b-col>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-col>
    </b-col>
    <b-col
      cols="6"
      class="wrapper-preview-dashboard-kompship p-5 d-flex justify-content-center align-items-center"
    >
      <b-img
        src="@core/assets/image/prev-dash.png"
      />
    </b-col>
  </b-row>
</template>

<script>
import {
  BCol,
  BNavbarBrand,
  BImg,
  BRow,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  // BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCol,
    BNavbarBrand,
    BImg,
    BRow,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    // BCard,
  },
  directives: {
    Ripple,
  },
}
</script>

<style scoped>

[dir] .wrapper-kompship-register {
  background-color: #FFFFFF;
}

[dir] .wrapper-preview-dashboard-kompship {
  background: linear-gradient(147.38deg, rgba(231, 233, 242, 0.76) 0%, rgba(203, 206, 219, 0) 100%);
}

</style>
