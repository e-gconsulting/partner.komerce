<template>
  <div class="all-pickup-details-main-wrapper">
    <b-button
      class="all-pickup-details-back-btn org-button mb-4"
      @click="onUpdateScreenViewParent"
    >
      <b-icon-chevron-left
        aria-hidden="true"
      />
    </b-button>

    <div class="all-pickup-details-title">Penjemputan</div>

    <section class="add-pickup-input-form-wrapper">
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Alamat"
        label-cols-md="3"
        label-for="input-pickup-address"
      >
        <div
          id="input-pickup-address"
          class="add-pickup-input-address-wrapper"
        >
          <div class="add-pickup-input-address-name-wrapper">
            <div class="add-pickup-input-address-name">{{ items.address_name }}</div>
            <div class="add-pickup-input-address-desc">{{ items.address_detail }}</div>
          </div>
        </div>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Tanggal"
        label-cols-md="3"
        label-for="input-pickup-date"
      >
        <div id="input-pickup-date">{{ items.pickup_date }}</div>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Waktu Jemput"
        label-cols-md="3"
        label-for="input-pickup-time2"
      >
        <div id="input-pickup-time2">{{ items.pickup_time }}</div>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Kendaraan"
        label-cols-md="3"
        label-for="input-pickup-vehicle"
      >
        <div
          id="input-pickup-vehicle"
          class="add-pickup-input-vehicle-btn-wrapper"
        >
          <b-button
            v-if="items.vehicle === 'MOTOR'"
            :class="`vehicle-button-content ${items.vehicle === 'MOTOR' ? 'vehicle-selected white-button mr-1' : 'white-button mr-1'}`"
            @click="() => onChooseVehicle('MOTOR')"
          >
            <img src="@/assets/images/icons/motor.png">
            <span>Motor</span>
          </b-button>
          <b-button
            v-if="items.vehicle === 'MOBIL'"
            :class="`vehicle-button-content ${items.vehicle === 'MOBIL' ? 'vehicle-selected white-button mr-1' : 'white-button mr-1'}`"
            @click="() => onChooseVehicle('MOBIL')"
          >
            <img src="@/assets/images/icons/mobil.png">
            <span>Mobil</span>
          </b-button>
          <b-button
            v-if="items.vehicle === 'TRUK'"
            :class="`vehicle-button-content vehicle-button-content-truk ${items.vehicle === 'TRUK' ? 'vehicle-selected white-button' : 'white-button'}`"
            @click="() => onChooseVehicle('TRUK')"
          >
            <img src="@/assets/images/icons/truk.png">
            <span>Truk</span>
          </b-button>
        </div>
      </b-form-group>

      <add-pickup-table
        :fields="fields"
        :items="itemsArr"
      />
    </section>
  </div>
</template>

<script>
import {
  BButton,
  BFormGroup,
  BIconChevronLeft,
} from 'bootstrap-vue'
import AddPickupTable from './AddPickupTable.vue'

export default {
  components: {
    BButton,
    BFormGroup,
    BIconChevronLeft,
    AddPickupTable,
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
    itemsArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: [
        { key: 'product', label: 'Produk' },
        { key: 'qty', label: 'Jumlah' },
      ],
    }
  },
  methods: {
    onUpdateScreenViewParent() {
      this.$emit('onBackButtonClicked')
    },
  },
}
</script>

<style lang="scss">
  @import 'add-pickup.scss';
  @import 'add-pickup-table.scss';
</style>
