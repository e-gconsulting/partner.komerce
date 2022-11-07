<template>
  <div>
    <b-row
      v-if="stepOnboarding === 0"
      class="h-screen bg-[#FAFAFA] justify-content-center"
    >
      <b-col
        class="text-center mt-5"
        cols="8"
      >
        <h1
          style="font-size: 32px;"
          class="text-black mb-2"
        >
          <strong>
            Halo, Partner!
            <br>
            Selamat datang di Komship!
          </strong>
        </h1>
        <span class="text-black">
          Untuk membantumu lebih mengenal Komship dan segera merasakan <br> kemudahannya, yuk baca artikel singkat ini untuk mengenal fitur pokok Komship
        </span>
      </b-col>
      <b-col
        class="d-flex justify-content-center"
        cols="8"
      >
        <b-img src="@/assets/images/NewOnboarding/vector-dashboard.svg" />
      </b-col>
      <b-col
        class="d-flex justify-content-end"
        cols="8"
      >
        <div>
          <b-button
            variant="primary"
            class="d-flex align-items-center justify-content-center btn-icon mr-5"
            @click="handleNextStepOnboarding"
          >
            Mulai Membaca <b-img
              src="@/assets/images/NewOnboarding/arrow-right.svg"
              class="ml-50"
            />
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row
      v-if="stepOnboarding >= 1"
      class="h-screen bg-[#FAFAFA]"
    >
      <b-col
        cols="12"
      >
        <div class="header">

          <!--Content before waves-->
          <div class="inner-header flex">
            <b-row
              v-for="(item, index) in stepItem"
              :key="index+1"
              class="justify-content-center align-items-center"
            >
              <div style="position: relative;">
                <span
                  v-if="stepOnboarding === item.value"
                  class="text-white"
                  style="position: absolute;
                  top: 50%;
                  left: 50%;
                  z-index: 9;
                  transform: translate(-50%, -50%);"
                >{{ item.value }}</span>
                <b-img
                  v-if="stepOnboarding > item.value"
                  src="@/assets/images/NewOnboarding/tick-circle.svg"
                  style="position: absolute;
                  top: 50%;
                  left: 50%;
                  z-index: 9;
                  transform: translate(-50%, -50%);"
                />
                <div>
                  <b-img
                    v-if="stepOnboarding >= item.value"
                    src="@/assets/images/NewOnboarding/wrapper__stepper.svg"
                  />
                  <b-img
                    v-if="stepOnboarding < item.value"
                    src="@/assets/images/NewOnboarding/wrapper__stepper__inactive.svg"
                  />
                </div>
              </div>
              <span
                v-if="index !== stepItem.length - 1"
                :style="stepOnboarding <= item.value ? 'width: 130px; height: 2px; background: #E2E2E2;' : 'width: 130px; height: 2px; background: #F95031;'"
              />
            </b-row>
          </div>
          <b-img
            v-if="stepOnboarding + 1 === 2"
            src="@/assets/images/svg/imgstep2.svg"
            class="wrapper__image__stepper"
          />
          <b-img
            v-if="stepOnboarding + 1 === 3"
            src="@/assets/images/svg/imgstep3.svg"
            class="wrapper__image__stepper"
          />
          <b-img
            v-if="stepOnboarding + 1 === 4"
            src="@/assets/images/svg/imgstep4.svg"
            class="wrapper__image__stepper"
          />
          <b-img
            v-if="stepOnboarding + 1 === 5"
            src="@/assets/images/svg/imgstep5.svg"
            class="wrapper__image__stepper"
          />
          <b-img
            v-if="stepOnboarding + 1 === 6"
            src="@/assets/images/svg/imgstep6.svg"
            class="wrapper__image__stepper"
          />

          <!--Waves Container-->
          <div>
            <svg
              class="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shape-rendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g class="parallax">
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(255,255,255,0.7"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.3)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="7"
                  fill="#fff"
                />
              </g>
            </svg>
          </div>
          <!--Waves end-->

        </div>
        <!--Header ends-->
      </b-col>
      <b-col
        class="ml-[15rem]"
        cols="7"
      >
        <h1 class="text-black mb-1">
          <strong>
            Pengaturan
          </strong>
        </h1>
        <span
          class="text-black"
          style="font-size: 15px;"
        >
          kamu bisa langsung lengkapi data-data di menu pengaturan seperti <strong><i>data profile</i></strong>, <strong><i>alamat pickup</i></strong>, <strong><i>aktifkan ekspedisi</i></strong>, <strong><i>rekening bank</i></strong>, dll data tersebut <strong><i>wajib diisi</i></strong> serta merta agar proses seperti menambahkan order atau <strong><i>menarik penghasilan</i></strong> lancar kedepannya.
        </span>
      </b-col>
      <b-col
        class="d-flex justify-content-end"
        cols="11"
      >
        <div class="d-flex justify-content-end">
          <div>
            <b-img
              src="@/assets/images/NewOnboarding/arrow-circle-left.svg"
              class="cursor-pointer"
              @click="handlePrevStepOnboarding"
            />
          </div>
          <div>
            <b-img
              src="@/assets/images/NewOnboarding/arrow-circle-right.svg"
              class="cursor-pointer"
              @click="handleNextStepOnboarding"
            />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepOnboarding: 0,
      stepItem: [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
        {
          value: 4,
        },
        {
          value: 5,
        },
      ],
    }
  },
  methods: {
    handleNextStepOnboarding() {
      this.stepOnboarding += 1
    },
    handlePrevStepOnboarding() {
      this.stepOnboarding -= 1
    },
  },
}
</script>

<style scoped>

[dir] .wrapper__stepper__class {
    background-image: url('../../../../../assets/images/svg/background1.svg');
}

[dir] .wrapper__image__stepper {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 9;
    transform: translate(-50%, -50%);
}

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgb(255, 239, 239) 0%, rgb(255, 219, 219) 100%);
  color:white;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  height:20vh;
  width:100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}

</style>
