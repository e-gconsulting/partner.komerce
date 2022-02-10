<template>
  <b-card>
    <b-button
      variant="primary"
      tag="router-link"
      :to="{ name: $route.meta.routeBack, params: { selected_order_from_detail: selectedOrder } }"
    >
      <b-icon-chevron-left
        aria-hidden="true"
      />
    </b-button>
    <b-row class="justify-content-end">
      <h4 class="mr-3">
        <strong>
          Detail orderan pickup
        </strong>
      </h4>
    </b-row>
    <b-row class="mt-2 mb-5">
      <b-badge
        variant="light-primary"
        class="ml-1"
      >
        *Ajukan pickup terlebih dahulu untuk mendapatkan label dan nomor resi
      </b-badge>
    </b-row>

    <b-row>
      <b-table
        :fields="fields"
        :items="items"
      >
        <template #cell(date_order)="data">
          <h5>
            <strong>
              {{ data.item.order_date }}
            </strong>
          </h5>
          <p>
            {{ data.item.shipping }}
          </p>
        </template>
        <template #cell(pelanggan)="data">
          <h5>
            <strong>
              {{ data.item.customer_name }}
            </strong>
          </h5>
        </template>
        <template #cell(product)="data">
          <div
            v-for="(itemsProduct, index) in data.item.product"
            :key="index+1"
          >
            <b-row>
              <b-container
                fluid
                class="d-flex"
              >
                <div>
                  <b-avatar
                    variant="light-primary"
                    square
                    size="50px"
                  />
                </div>
                <div class="ml-1">
                  <p><strong>{{ itemsProduct.product_name }}</strong></p>
                  <p class="text-primary">
                    <strong>{{ itemsProduct.variant_name }}</strong>
                  </p>
                </div>
              </b-container>
            </b-row>
          </div>
        </template>
        <template #cell(address)="data">
          <h5>
            <strong>
              {{ data.item.district }}
            </strong>
          </h5>
          <p>
            {{ data.item.detail_address }}
          </p>
        </template>
        <template #cell(resi)="data">
          {{ data.item.airway_bill !== null ? data.item.airway_bill : '-' }}
        </template>
      </b-table>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BBadge,
  BTable,
  BContainer,
  BAvatar,
  BIconChevronLeft,
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BBadge,
    BTable,
    BContainer,
    BAvatar,
    BIconChevronLeft,
    BButton,
  },

  data() {
    return {
      selectedOrder: this.$route.params.selected_order,

      items: [],
      fields: [
        {
          key: 'date_order',
          label: 'Tanggal Order',
        },
        {
          key: 'pelanggan',
          label: 'Pelanggan',
        },
        {
          key: 'product',
          label: 'Produk',
        },
        {
          key: 'address',
          label: 'Alamat',
        },
        {
          key: 'resi',
          label: 'resi',
        },
      ],
    }
  },
  mounted() {
    this.items = this.selectedOrder
  },
}
</script>

<style>

</style>
