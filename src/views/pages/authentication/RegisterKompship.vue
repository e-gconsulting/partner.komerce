<template>
  <b-col>
    <b-navbar
      variant="faded"
      type="light"
    >
      <b-navbar-brand>
        <b-img
          src="@core/assets/image/brand.png"
        />
      </b-navbar-brand>
    </b-navbar>
  </b-col>
</template>

<script>
import {
  BCol,
  BNavbar,
  BNavbarBrand,
  BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCol, BNavbar, BNavbarBrand, BImg,
  },
}
</script>

<style>

</style>
