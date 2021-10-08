<template>
  <div class="add-pickup-input-main-wrapper">
    <b-card-title class="mb-4">Pengajuan Pickup</b-card-title>
    <div class="add-pickup-input-title mb-4">Penjemputan</div>
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
          <div
            class="add-pickup-input-address-icon"
            @click="onEditAddress"
          >
            <b-icon-pencil-square aria-hidden="true" />
          </div>
        </div>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Tanggal"
        label-cols-md="3"
        label-for="input-pickup-date"
      >
        <div class="add-pickup-input-date-label">{{ dateLabel }}</div>
        <b-form-datepicker
          id="input-pickup-date"
          ref="dp1"
          v-model="dateValue"
          class="add-pickup-date-button"
          button-only
          @context="onChangeDate"
        />
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label mb-2"
        label="Waktu Jemput"
        label-cols-md="3"
        label-for="input-pickup-time"
      >
        <b-time
          id="input-pickup-time"
          ref="dt1"
          v-model="timeValue"
          locale="en"
          @context="onChangeTime"
        />
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
            :class="chosenVehicle === 'bike' ? 'vehicle-selected white-button mr-1' : 'white-button mr-1'"
            @click="() => onChooseVehicle('bike')"
          >
            <b-icon-bicycle aria-hidden="true" />
            <span>Motor</span>
          </b-button>
          <b-button
            :class="chosenVehicle === 'car' ? 'vehicle-selected white-button mr-1' : 'white-button mr-1'"
            @click="() => onChooseVehicle('car')"
          >
            <b-icon-truck-flatbed aria-hidden="true" />
            <span>Mobil</span>
          </b-button>
          <b-button
            :class="chosenVehicle === 'truck' ? 'vehicle-selected white-button' : 'white-button'"
            @click="() => onChooseVehicle('truck')"
          >
            <b-icon-truck aria-hidden="true" />
            <span>Truk</span>
          </b-button>
        </div>
      </b-form-group>

      <add-pickup-table
        :fields="fields"
        :items="selectedOrder"
        @onChooseOrder="onChooseOrder"
        @onDetailView="handleOpenDetailView"
      />

      <div class="add-pickup-input-notice-notif">
        <b-badge variant="light-danger">*Pastikan produk yang kamu masukan sudah tepat sebelum di ajukan</b-badge>
      </div>
    </section>

    <section class="add-pickup-input-submit-wrapper">
      <b-button
        class="white-button mr-1"
        @click="onResetForm"
      >
        Batal
      </b-button>
      <b-button
        :class="`org-button ${this.selectedOrder.length === 0 ? 'add-pickup-submit-button-disabled' : ''}`"
        :disabled="this.selectedOrder.length === 0"
        @click="onSubmitForm"
      >
        Ajukan Pickup
      </b-button>
    </section>

    <add-pickup-popup
      ref="addPickupPopUP"
      :selected-orders="selectedOrder"
      :data-orders="dataOrder"
      @onSelectOrder="onSelectOrder"
    />

    <b-modal
      id="modal-7"
      ref="modalAddPickupPopUp"
      hide-footer
      hide-header
      centered
      @hide="handleSubmitPopUpSuccess"
    >
      <div class="modal-add-pickup-popup-success">
        <div class="image-wrapper">
          <img src="https://s3-ap-southeast-1.amazonaws.com/www.theedgeproperty.com.sg/images/search_mobile.png">
        </div>
        <div class="text-wrapper mb-3">Pengajuan Pickup Berhasil</div>
        <b-button
          class="org-button"
          @click="handleSubmitPopUpSuccess"
        >
          Oke
        </b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import {
  BCardTitle,
  BFormGroup,
  BFormDatepicker,
  BTime,
  BButton,
  BBadge,
  BModal,
  BIconBicycle,
  BIconTruckFlatbed,
  BIconTruck,
  BIconPencilSquare,
} from 'bootstrap-vue'
import AddPickupTable from './AddPickupTable.vue'
import AddPickupPopup from './AddPickupPopup.vue'

export default {
  components: {
    BCardTitle,
    BFormGroup,
    BFormDatepicker,
    BTime,
    BButton,
    BBadge,
    BModal,
    BIconBicycle,
    BIconTruckFlatbed,
    BIconTruck,
    BIconPencilSquare,
    AddPickupTable,
    AddPickupPopup,
  },
  props: {
    dataOrder: {
      type: Array,
      default: () => [],
    },
    listSelected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedOrder: this.listSelected,
      dateValue: this.dateText,
      dateLabel: '',
      timeValue: '',
      chosenVehicle: '',
      fields: [
        { key: 'product', label: 'Produk' },
        { key: 'qty', label: 'Jumlah' },
      ],
      items: [],
    }
  },
  methods: {
    changeDate(dateString) {
      if (dateString && dateString !== '') {
        let today = new Date(dateString)
        const dd = today.getDate()
        const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const mm = today.getMonth()
        const yyyy = today.getFullYear()
        today = `${dd} ${monthArr[mm]} ${yyyy}`
        return today
      }
      return dateString
    },
    onChangeDate(ctx) {
      if (ctx && ctx.activeYMD) {
        this.dateLabel = this.changeDate(ctx.activeYMD)
        // this.$emit('onUpdateDate', ctx.activeYMD)
      }
    },
    onChangeTime(ctx) {
      if (ctx) console.log('onChangeTime', ctx)
    },
    onEditAddress(events) {
      console.log('onEditAddress', events)
    },
    onChooseVehicle(vehicle) {
      if (vehicle) this.chosenVehicle = vehicle
    },
    onChooseOrder() {
      console.log('onChooseOrder', this.$refs.addPickupPopUP)
      this.$refs.addPickupPopUP.showModal()
      // this.$emit('onShowPopUp', productId, selectedDataVariation)
    },
    onResetForm() {
      console.log('onResetForm')
      this.selectedOrder = []
    },
    onSubmitForm() {
      console.log('onSubmitForm')
      this.$root.$emit('bv::show::modal', 'modal-7')
    },
    handleSubmitPopUpSuccess() {
      console.log('handleSubmitPopUpSuccess')
      this.$root.$emit('bv::hide::modal', 'modal-7')
    },
    onSelectOrder(arrValue) {
      if (arrValue) this.selectedOrder = arrValue
    },
    handleOpenDetailView() {
      console.log('handleOpenDetailView')
      this.$emit('onSubmitInputForm', this.selectedOrder)
    },
  },
}
</script>
