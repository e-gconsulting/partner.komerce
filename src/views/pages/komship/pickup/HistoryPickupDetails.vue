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
            <div class="add-pickup-input-address-name">Gudang XYZ</div>
            <div class="add-pickup-input-address-desc">Jalan Raya Melebar penuh dengan sabar Aamiin</div>
          </div>
        </div>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Tanggal"
        label-cols-md="3"
        label-for="input-pickup-date"
      >
        <div id="input-pickup-date">{{ getDate(items.pickup_date) }}</div>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Waktu Jemput"
        label-cols-md="3"
        label-for="input-pickup-time2"
      >
        <div id="input-pickup-time2">{{ getTime(items.pickup_date) }}</div>
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
            v-if="items.vehicle === 'Motor'"
            :class="items.vehicle === 'Motor' ? 'vehicle-selected white-button mr-1' : 'white-button mr-1'"
            @click="() => onChooseVehicle('bike')"
          >
            <b-icon-bicycle aria-hidden="true" />
            <span>Motor</span>
          </b-button>
          <b-button
            v-if="items.vehicle === 'Mobil'"
            :class="items.vehicle === 'Mobil' ? 'vehicle-selected white-button mr-1' : 'white-button mr-1'"
            @click="() => onChooseVehicle('car')"
          >
            <b-icon-truck-flatbed aria-hidden="true" />
            <span>Mobil</span>
          </b-button>
          <b-button
            v-if="items.vehicle === 'Truk'"
            :class="items.vehicle === 'Truk' ? 'vehicle-selected white-button' : 'white-button'"
            @click="() => onChooseVehicle('truck')"
          >
            <b-icon-truck aria-hidden="true" />
            <span>Truk</span>
          </b-button>
        </div>
      </b-form-group>

      <add-pickup-table
        :fields="fields"
        :items="itemsArr"
        @onDetailView="handleOpenDetailView"
      />
    </section>
  </div>
</template>

<script>
import {
  BButton,
  BFormGroup,
  BIconChevronLeft,
  BIconBicycle,
  BIconTruckFlatbed,
  BIconTruck,
} from 'bootstrap-vue'
import AddPickupTable from './AddPickupTable.vue'

export default {
  components: {
    BButton,
    BFormGroup,
    BIconChevronLeft,
    BIconBicycle,
    BIconTruckFlatbed,
    BIconTruck,
    AddPickupTable,
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      itemsArr: [this.items],
      fields: [
        { key: 'product', label: 'Produk' },
        { key: 'qty', label: 'Jumlah' },
      ],
    }
  },
  mounted() {
    console.log('Selected items', this.items)
  },
  methods: {
    getDate(dateVal) {
      if (dateVal) {
        let today = dateVal.split(' ')
        let month = today[1]
        const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        month = (monthArr.indexOf(month) + 1) > 9 ? (monthArr.indexOf(month) + 1) : `0${(monthArr.indexOf(month) + 1)}`
        today = `${today[0]} ${month} ${today[2]}`
        return today
      }
      return dateVal
    },
    getTime(dateVal) {
      if (dateVal) {
        const today = dateVal.split(' ')
        let time = today[3].split(':')
        time = `${time[0]}:${time[1]}`
        return time
      }
      return dateVal
    },
    onUpdateScreenViewParent() {
      this.$emit('onBackButtonClicked')
    },
    handleOpenDetailView() {
      console.log('handleOpenDetailView')
    },
  },
}
</script>

<style lang="scss">
  @import 'add-pickup.scss';
  @import 'add-pickup-table.scss';
</style>
