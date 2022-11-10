<template>
  <b-row>
    <b-col
      lg="6"
      class="bg-white min-h-screen"
    >
      <div class="ml-1 m-2 max-w-[120px]">
        <b-img
          src="@/assets/images/logo/komerce-logo.svg"
          style="width:100%;height:100%;"
        />
      </div>
      <form-register
        v-if="registersuccess === false && registerexisting === false"
        @submit-register="registersuccess = true"
        @submit-existing="registerexisting = true"
      />
      <verify-register v-if="registersuccess === true" />
      <success-verify v-if="registerexisting === true" />
    </b-col>
    <b-col
      lg="6"
      class="p-0 bg-kompack-register bg-no-repeat bg-center bg-cover"
      :class="`bg-[url('${require('@/assets/images/pages/bg-kompack-register.svg')}')]`"
    />
  </b-row>
</template>
<script>
const FormRegister = () => import('./FormRegister.vue')
const VerifyRegister = () => import('./VerifyRegister.vue')
const SuccessVerify = () => import('./SuccessVerify.vue')

export default {
  components: { FormRegister, VerifyRegister, SuccessVerify },

  data() {
    return {
      registersuccess: false,
      registerexisting: false,
    }
  },
}
</script>
<style lang="scss" src="./RegisterKompack.scss" />
