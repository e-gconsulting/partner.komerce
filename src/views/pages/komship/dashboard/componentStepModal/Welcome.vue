<template>
  <div
    v-if="stepped === 1"
    class="modalOnboarding welcome step1"
  >
    <div class="modalOnboarding__step1--greeting">
      <h5 class="modalOnboarding__step1--title my-0 text-black">
        Halo, Partner!
        <br>
        Selamat datang di Komship!
      </h5>
      <p class="modalOnboarding__step1--subtitle mt-1 mb-1">
        Untuk membantumu lebih mengenal Komship dan segera merasakan
        kemudahannya, yuk baca artikel singkat ini untuk mengenal fitur pokok
        Komship
      </p>
    </div>
    <img
      src="@/assets/images/svg/imgstep1.svg"
      style="margin: auto;"
      alt="imgstep1"
    >
    <div class="modalOnboarding__step1--wrapperNavStep">
      <b-button
        variant="contained-primary"
        class="modalOnboarding__step1--navBtn"
        @click="step(2)"
      >
        <div class="my-0 mr-1 modalOnboarding__step1--navBtnText">
          Mulai Membaca
        </div>
        <img
          src="@/assets/images/svg/arrow-right.svg"
          alt=""
        >
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepOne',
  props: {
    stepped: {
      type: Number,
      required: true,
    },
    step: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang src='../ModalOnBoarding.scss'/>
