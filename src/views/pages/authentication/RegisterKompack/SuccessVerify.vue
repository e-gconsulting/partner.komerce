<template>
  <div
    class="absolute m-0 top-2/4 w-100 text-center text-[#222222]"
    style="transform:translateY(-100%)"
  >
    <div class="Success-Verify">
      <img
        src="@/assets/images/icons/SuccessCircle.svg"
        alt="Success"
      >
    </div>
    <h1 class="text-[24px] font-bold my-2">
      Selamat Layanan Kompack Telah Aktif
    </h1>
    <button
      class="btn-success-verify w-4/6 py-1"
    >
      <router-link
        to="login"
        class="text-[16px] font-semibold"
        style="color: #FFFFFF"
      >
        Masuk
      </router-link>
    </button>
  </div>
</template>
