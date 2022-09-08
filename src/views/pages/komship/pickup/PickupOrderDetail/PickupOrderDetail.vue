<template>
  <b-card>
    <b-row class="mb-2 px-1">
      <b-button
        variant="primary"
        class="rounded-lg"
        size="sm"
        :to="{ name: 'ajukan-pickup' }"
      >
        <b-icon-chevron-left />
      </b-button>
      <span class="font-bold text-[24px] ml-2 my-auto">
        Detail Orderan Pickup
      </span>
    </b-row>
    <b-alert
      variant="primary"
      class="p-1"
      show
      dismissible
    >
      *Ajukan pickup terlebih dahulu untuk mendapatkan label dan nomor resi
    </b-alert>
    <b-table
      hover
      striped
      show-empty
      empty-text="Tidak ada data untuk ditampilkan."
      :fields="fieldOrder"
      :items="itemOrder"
    >
      <template #cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(order_date)="data">
        <span class="font-bold">{{ data.item.order_date.slice(0, 10) }}</span><br>
        <span>{{ data.item.order_date.slice(11, -3) }}</span>
      </template>
      <template #cell(product)="data">
        <div v-if="data.item.product[0]">
          <div class="d-flex">
            <div v-if="data.item.product[0].product_image === null">
              <img
                class="w-[50px] h-[50px]"
                :src="imageNull"
              >
            </div>
            <div v-else>
              <img
                class="w-[50px] h-[50px]"
                :src="data.item.product[0].product_image"
                @error="setImageDefault"
              >
            </div>
            <div
              class="ml-1 w-[70%]"
            >
              <span class="font-bold">{{ data.item.product[0].product_name }}</span><br>
              <span
                v-if="data.item.product[0].variant_name !== '0'"
                class="text-primary"
              >{{ data.item.product[0].variant_name }}</span>
            </div>
            <div
              class="ml-1 font-bold w-[10%]"
            >
              x{{ data.item.product[0].qty }}
            </div>
          </div>
          <div v-if="data.item.product.length > 1">
            <b-collapse :id="'collapse-'+data.item.order_id">
              <div
                v-for="item in data.item.product.slice(1)"
                :key="item.order_id"
                class="d-flex mt-1"
              >
                <div v-if="item.product_image === null">
                  <img
                    class="w-[50px] h-[50px]"
                    :src="imageNull"
                  >
                </div>
                <div v-else>
                  <img
                    class="w-[50px] h-[50px]"
                    :src="item.product_image"
                    @error="setImageDefault"
                  >
                </div>
                <div class="ml-1 w-[70%]">
                  <span class="font-bold">{{ item.product_name }}</span><br>
                  <span class="text-primary">{{ item.variant_name }}</span>
                </div>
                <div class="ml-1 font-bold w-[10%]">
                  x{{ item.qty }}
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
        <div
          v-if="data.item.product.length > 1"
          class="d-flex justify-content-end mt-1 mb-1"
        >
          <b-button
            v-b-toggle="'collapse-'+data.item.order_id"
            class="buttonCollapse relative p-0"
            variant="none"
            size="sm"
          >
            <span class="when-open">Tutup <b-icon-chevron-up /></span>
            <span class="when-closed">{{ data.item.product.length - 1 }} Produk lainnya <b-icon-chevron-down /></span>
          </b-button>
        </div>
      </template>
      <template #cell(airway_bill)="data">
        <span v-if="data.item.airway_bill === null">
          &mdash;
        </span>
      </template>
    </b-table>
  </b-card>
</template>
<script>
import imageNull from '@/assets/images/avatars/image-null.png'

export default {
  data() {
    return {
      fieldOrder: [
        {
          key: 'no', label: 'No', thClass: 'text-center', tdClass: 'text-center align-top',
        },
        { key: 'order_date', label: 'Tanggal Order', tdClass: 'align-top' },
        { key: 'customer_name', label: 'Pelanggan', tdClass: 'align-top' },
        { key: 'product', label: 'Produk', tdClass: 'align-top' },
        { key: 'detail_address', label: 'Alamat', tdClass: 'align-top' },
        {
          key: 'airway_bill', label: 'Resi', thClass: 'text-center', tdClass: 'align-top text-center',
        },
      ],
      itemOrder: [],
    }
  },
  mounted() {
    this.getOrderPickup()
  },
  methods: {
    getOrderPickup() {
      if (localStorage.getItem('pickupOrder')) {
        try {
          this.itemOrder = JSON.parse(
            localStorage.getItem('pickupOrder'),
          )
        } catch (e) {
          this.$router.push('/ajukan-pickup')
          localStorage.removeItem('pickupOrder')
        }
      } else {
        this.$router.push('/ajukan-pickup')
      }
    },
    setImageDefault(e) {
      e.target.src = imageNull
    },
  },
}
</script>
<style lang="scss">
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
