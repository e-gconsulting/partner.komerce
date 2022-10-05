<template>
  <b-card style="min-height:85vh">
    <h3 class="text-[20px] font-semibold">
      Gudangku
    </h3>
    <div
      class="absolute left-1/2 top-1/2 text-center"
      style="transform: translateX(-50%) translateY(-50%)"
    >
      <b-img
        v-b-modal="'warehouse-options'"
        src="@/assets/images/icons/add-circle.svg"
        class="m-auto mb-1"
        role="button"
      />
      <p class="text-[#222222] text-[16px] font-semibold mb-1">
        Tambah Gudang
      </p>
      <p class="text-[#C2C2C2] text-[12px] max-w-[540px]">
        Kamu belum memiliki alamat atau gudang yang terdaftar. Silahkan daftarkan alamat/gudang untuk alamat penjemputan
      </p>
    </div>
    <b-modal
      id="warehouse-options"
      hide-header
      hide-footer
      centered
    >
      <div class="py-1">
        <h2 class="text-[20px] text-center font-semibold mb-2">
          Tambahkan Gudang
        </h2>
        <b-row>
          <b-col cols="6">
            <b-card
              class="border-primary"
              role="button"
              style="height:180px"
              @click="selectWarehouse('ownWarehouse')"
            >
              <b-img
                src="@/assets/images/banner/private-warehouse.svg"
                class="m-auto"
              /><br>
              <p class="text-[16px] text-[#626262] text-center">
                Gudang Pribadi
              </p>
            </b-card>
          </b-col>
          <b-col cols="6">
            <b-card
              class="border-primary"
              role="button"
              style="height:180px"
              @click="selectWarehouse('partnerWarehouse')"
            >
              <b-img
                src="@/assets/images/banner/kompack-warehouse.svg"
                class="m-auto grayscale"
              /><br>
              <p class="text-[14px] text-[#626262] text-center d-flex">
                Mitra Gudang&nbsp;
                <b-img
                  src="@/assets/images/logo/kompack-logo.svg"
                  class="m-auto grayscale"
                  style="height:14px"
                />
              </p>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </b-card>
</template>
<script>
export default {
  methods: {
    selectWarehouse(option) {
      if (option === 'ownWarehouse') return this.$router.push('/gudang-pribadi')
      window.open('https://kompack.id/', '_blank')
      return true
    },
  },
}
</script>
