<template>
  <div
    class="absolute m-0 top-2/4 w-100 text-center text-[#222222]"
    style="transform:translateY(-100%)"
  >
    <h1 class="text-[#222222] text-[30px] font-semibold mb-1">
      Periksa Email Anda
    </h1>
    <p class="text-[16px] font-medium mb-2">
      Silahkan verifikasi melalui email yang telah kami kirimkan
    </p>
    <router-link
      :to="{name:'auth-login'}"
      class="text-[16px] font-semibold"
    >
      Masuk
    </router-link>
  </div>
</template>
