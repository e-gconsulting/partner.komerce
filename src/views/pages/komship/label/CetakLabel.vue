<template>
  <div class="w-full h-full">
    <div class="flex flex-col space-y-4 border border-black">
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-1 flex flex-col space-x-1">
          <barcode
            value="value-to-render"
            format="CODE39"
            width="194"
            height="70"
          >
            Show this if the rendering fails.
          </barcode>
        </div>
        <div class="col-span-1">
          Logo Expedisi
        </div>
        <div class="col-span-1">
          Logo Kommerce
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="col-span-1 flex flex-col space-y-1">
          <h3 class="text-lg text-black flex center">
            PENGIRIM
          </h3>
          <div class="flex flex-row space-x-2">
            <feather-icon icon="user-icon" />
            <div class="text-base text-black font-light">
              Wahyu
            </div>
          </div>
        </div>
        <div class="col-span-1">
          sadasd
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VueBarcode from 'vue-barcode'

export default {
  components: {
    barcode: VueBarcode,
  },
}
</script>

<style>

</style>
