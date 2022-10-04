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
        v-if="registersuccess === false"
        @submit-register="registersuccess = $event"
      />
      <verify-register v-else />
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

export default {
  components: { FormRegister, VerifyRegister },
  data() {
    return {
      registersuccess: false,
    }
  },
}
</script>
<style lang="scss" src="./RegisterKompack.scss" />
