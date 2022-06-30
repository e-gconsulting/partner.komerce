<template>
  <v-stepper v-model="data">
    <v-stepper-header>
      <v-stepper-step
        :complete="data > 1"
        step="1"
      />
      <v-divider v-bind="data > 1 && {class: 'activeDivider'}" />

      <v-stepper-step
        :complete="data > 2"
        step="2"
      >
        2
      </v-stepper-step>
      <v-divider v-bind="data > 2 && {class: 'activeDivider'}" />

      <v-stepper-step
        :complete="data > 3"
        step="3"
      >
        3
      </v-stepper-step>
      <v-divider v-bind="data > 2 && {class: 'activeDivider'}" />

      <v-stepper-step
        :complete="data > 4"
        step="4"
      >
        4
      </v-stepper-step>
      <v-divider v-bind="data > 4 && {class: 'activeDivider'}" />

      <v-stepper-step step="5">
        5
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        step="1"
        class="step2"
      >
        <StepOne :data="data" />
        <div class="modalOnboarding__step1--wrapperNavStep">
          <b-icon-arrow-right-circle @click="data = 2" />
        </div>
      </v-stepper-content>

      <v-stepper-content
        step="2"
        class="step3"
      >
        <StepTwo />
        <div class="modalOnboarding__step1--wrapperNavStep">
          <b-icon-arrow-left-circle @click="data = 1" />
          <b-icon-arrow-right-circle @click="data = 3" />
        </div>
      </v-stepper-content>

      <v-stepper-content
        step="3"
        class="step4"
      >
        <StepThree />
        <div class="modalOnboarding__step1--wrapperNavStep">
          <b-icon-arrow-left-circle @click="data = 2" />
          <b-icon-arrow-right-circle @click="data = 4" />
        </div>
      </v-stepper-content>

      <v-stepper-content
        step="4"
        class="step5"
      >
        <StepFour />
        <div class="modalOnboarding__step1--wrapperNavStep">
          <b-icon-arrow-left-circle @click="data = 3" />
          <b-icon-arrow-right-circle @click="data = 5" />
        </div>
      </v-stepper-content>

      <v-stepper-content
        step="5"
        class="step6"
      >
        <StepFive />
        <div class="modalOnboarding__step1--wrapperNavStep">
          <b-icon-arrow-left-circle @click="data = 4" />
          <b-icon-arrow-right-circle @click="handle('endsteponboarding')" />
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import StepOne from './StepOne.vue'
import StepTwo from './StepTwo.vue'
import StepThree from './StepThree.vue'
import StepFour from './StepFour.vue'
import StepFive from './StepFive.vue'

export default {
  name: 'Stepper',
  components: {
    StepOne, StepTwo, StepThree, StepFour, StepFive,
  },
  props: {
    data: {
      type: Number,
      required: true,
    },
    handle: {
      type: Function,
      required: true,
    },
  },
}
</script>
<style lang="css" src="vuetify/dist/vuetify.min.css" scoped />
