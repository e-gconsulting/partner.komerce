<template>
  <b-card class="container py-1 min-h-[80vh]">
    <h3 class="font-bold text-[24px] text-[#222222] mb-1">
      Aplikasiku
    </h3>
    <p class="font-normal text-[#626262] text-[14px] mb-1">
      Aplikasimu yang saat ini terdata aktif digunakan. Bisa jadi beberapa aplikasi dari ekosistem Komerce masih akan rilis beberapa waktu kedepan dan belum bisa kamu aktifkan/daftarkan.
    </p>
    <div v-if="profile !== null">
      <b-row
        class="mb-1"
        style="box-shadow: 2px 4px 18px rgba(251, 188, 5, 0.12)"
      >
        <b-col
          cols="12"
          class="d-flex justify-content-between p-2 mx-0"
        >
          <img
            src="@/assets/images/logo/komship-logo.svg"
            class="h-[28px]"
            :class="!isKomship ? 'grayscale' : ''"
          >
          <b-form-checkbox
            v-model="isKomship"
            switch
            disabled
          />
        </b-col>
      </b-row>
      <b-row
        class="mb-1"
        style="box-shadow: 2px 4px 18px rgba(66, 133, 244, 0.12)"
      >
        <b-col
          cols="12"
          class="d-flex justify-content-between p-2 mx-0"
        >
          <img
            src="@/assets/images/logo/kompack-logo.svg"
            class="h-[28px]"
            :class="!isKompack ? 'grayscale' : ''"
          >
          <b-form-checkbox
            v-model="isKompack"
            switch
            disabled
          />
        </b-col>
      </b-row>
      <b-row
        class="mb-1"
        style="box-shadow: 2px 4px 18px rgba(52, 168, 83, 0.12)"
      >
        <b-col
          cols="12"
          class="d-flex justify-content-between p-2 mx-0"
        >
          <img
            src="@/assets/images/logo/komtim-logo.svg"
            class="h-[30px]"
            :class="!isKomtim ? 'grayscale' : ''"
          >
          <b-form-checkbox
            v-b-tooltip.hover
            switch
            disabled
            title="Segera Rilis"
          />
        </b-col>
      </b-row>
      <b-row
        class="mb-1"
        style="box-shadow: 0px 4px 18px rgba(248, 50, 10, 0.12)"
      >
        <b-col
          cols="12"
          class="d-flex justify-content-between p-2 mx-0"
        >
          <img
            src="@/assets/images/logo/komchat-logo.svg"
            class="h-[25px]"
            :class="!isKomchat ? 'grayscale' : ''"
          >
          <b-form-checkbox
            v-b-tooltip.hover
            switch
            disabled
            title="Segera Rilis"
          />
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isKomship: false,
      isKompack: false,
      isKomtim: false,
      isKomchat: false,
    }
  },
  computed: {
    ...mapState('dashboard', ['profile']),
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    async getProfile() {
      this.isKomship = this.profile.is_komship === 1
      this.isKompack = this.$store.state.auth.userData.is_kompack === 1
    },
  },
}
</script>
