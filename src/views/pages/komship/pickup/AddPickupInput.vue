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
          <div
            v-if="!isEditAddress"
            class="add-pickup-input-address-name-wrapper"
          >
            <div class="add-pickup-input-address-name">{{ addressText }}</div>
            <div class="add-pickup-input-address-desc">{{ addressDetailText }}</div>
          </div>
          <div
            v-else
            class="add-pickup-input-address-name-wrapper"
          >
            <b-form-input
              v-model="addressText"
              type="text"
              class="add-pickup-input-address-input"
            />
            <b-form-input
              v-model="addressDetailText"
              type="text"
              class="add-pickup-input-address-input add-pickup-input-address-input-details"
            />
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
        >
          <template v-slot:button-content>
            <img src="@/assets/images/icons/date-picker-icon.svg">
          </template>
        </b-form-datepicker>
      </b-form-group>
      <b-form-group
        class="add-pickup-input-label add-pickup-time-picker mb-2"
        label="Waktu Jemput"
        label-cols-md="3"
        label-for="input-pickup-time"
      >
        <b-input-group>
          <b-form-input
            id="input-pickup-time"
            v-model="timeValueText"
            type="text"
            placeholder="09 : 00"
          />
          <b-input-group-append>
            <b-form-timepicker
              ref="dt1"
              v-model="timeValue"
              button-only
              right
              aria-controls="example-input"
              locale="en"
              :hour12="false"
              @context="onChangeTime"
            >
              <template v-slot:button-content>
                <b-icon-chevron-expand aria-hidden="true" />
              </template>
            </b-form-timepicker>
          </b-input-group-append>
        </b-input-group>
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
            v-if="profile && profile.vehicle && profile.vehicle.indexOf('MOTOR') > -1"
            :class="chosenVehicle === 'MOTOR' ? 'vehicle-selected white-button mr-1' : 'vehicle-button mr-1'"
            @click="() => onChooseVehicle('MOTOR')"
          >
            <b-icon-bicycle aria-hidden="true" />
            <span>Motor</span>
          </b-button>
          <b-button
            v-if="profile && profile.vehicle && profile.vehicle.indexOf('MOBIL') > -1"
            :class="chosenVehicle === 'MOBIL' ? 'vehicle-selected white-button mr-1' : 'vehicle-button mr-1'"
            @click="() => onChooseVehicle('MOBIL')"
          >
            <b-icon-truck-flatbed aria-hidden="true" />
            <span>Mobil</span>
          </b-button>
          <b-button
            v-if="profile && profile.vehicle && profile.vehicle.indexOf('TRUK') > -1"
            :class="chosenVehicle === 'TRUK' ? 'vehicle-selected white-button' : 'vehicle-button'"
            @click="() => onChooseVehicle('TRUK')"
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
        :class="`org-button ${selectedOrder.length === 0 ? 'add-pickup-submit-button-disabled' : ''}`"
        :disabled="selectedOrder.length === 0"
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
          <img src="@/assets/images/icons/success.svg">
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
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BFormTimepicker,
  BButton,
  BBadge,
  BModal,
  BIconBicycle,
  BIconTruckFlatbed,
  BIconTruck,
  BIconPencilSquare,
  BIconChevronExpand,
} from 'bootstrap-vue'
import AddPickupTable from './AddPickupTable.vue'
import AddPickupPopup from './AddPickupPopup.vue'

export default {
  components: {
    BCardTitle,
    BFormGroup,
    BFormDatepicker,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BFormTimepicker,
    BButton,
    BBadge,
    BModal,
    BIconBicycle,
    BIconTruckFlatbed,
    BIconTruck,
    BIconPencilSquare,
    BIconChevronExpand,
    AddPickupTable,
    AddPickupPopup,
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
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
      isEditAddress: false,
      addressText: 'Gudang XYZ',
      addressDetailText: 'Jalan Raya Melebar penuh dengan sabar Aamiin',
      timeValue: '09:00',
      timeValueText: '09 : 00',
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
      if (ctx && ctx.formatted) this.timeValueText = this.getTimeFormatted(ctx.formatted)
    },
    getTimeFormatted(timeText) {
      if (timeText) {
        const splitTime = timeText.split(':')
        return `${splitTime[0]} : ${splitTime[1]}`
      }
      return timeText
    },
    onEditAddress(events) {
      if (events) this.isEditAddress = !this.isEditAddress
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
