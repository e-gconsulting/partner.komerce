<template>
  <div class="add-pickup-popup-print-wrapper">
    <b-modal
      id="modal-8"
      hide-footer
      hide-header
      centered
    >
      <b-icon-x-circle
        class="close-button-on-popup-pickup"
        @click="handleClosePopUp"
      />

      <div class="title-on-popup-pickup mt-2 mb-2">
        Pilih Bentuk Print Label
      </div>

      <section class="add-pickup-popup-print-options-wrapper">
        <add-pickup-print-panel
          :is-selected="selectedOptions === 1"
          :panel-amount="1"
          :title="'1 Label / Halaman'"
          :sub-title="'Direkomendasikan kertas A4'"
          @onChose="() => handleChosePrintOption(1)"
        />

        <add-pickup-print-panel
          :is-selected="selectedOptions === 2"
          :panel-amount="2"
          :title="'2 Label / Halaman'"
          :sub-title="'Direkomendasikan kertas A4'"
          @onChose="() => handleChosePrintOption(2)"
        />

        <add-pickup-print-panel
          :is-selected="selectedOptions === 4"
          :panel-amount="4"
          :title="'4 Label / Halaman'"
          :sub-title="'Direkomendasikan kertas A4'"
          @onChose="() => handleChosePrintOption(4)"
        />

        <add-pickup-print-panel
          :is-selected="selectedOptions === 100"
          :panel-amount="100"
          :title="'10 cm x 10cm'"
          :sub-title="'Printer Thermal'"
          @onChose="() => handleChosePrintOption(100)"
        />

        <add-pickup-print-panel
          :is-selected="selectedOptions === 150"
          :panel-amount="150"
          :title="'10 cm x 15cm'"
          :sub-title="'Printer Thermal'"
          @onChose="() => handleChosePrintOption(150)"
        />
      </section>

      <b-row class="justify-content-end pb-2 wrapper__handle__print__label">
        <b-button
          variant="primary"
          class="mr-3 py-1 px-3"
          @click="handleSubmit"
        >
          Print
        </b-button>
      </b-row>

      <b-row class="justify-content-end pb-2 wrapper__handle__print__label__mobile">
        <b-button
          variant="primary"
          class="mr-3 py-1 px-3"
          @click="handleSubmitMobile"
        >
          Print
        </b-button>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import {
  BModal,
  BButton,
  BIconXCircle,
  BRow,
} from 'bootstrap-vue'
import AddPickupPrintPanel from './AddPickupPrintPanel.vue'

export default {
  components: {
    BModal,
    BButton,
    BIconXCircle,
    AddPickupPrintPanel,
    BRow,
  },
  props: {
    selectedOption: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectedOptions: this.selectedOption,
    }
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-8')
    },
    handleClosePopUp() {
      this.handleHidePopup()
    },
    handleSubmit() {
      this.handleHidePopup()
      this.$emit('onSubmitOption', this.selectedOptions)
    },
    handleSubmitMobile() {
      this.handleHidePopup()
      this.$emit('onSubmitOptionMobile', this.selectedOptions)
    },
    handleHidePopup() {
      this.$root.$emit('bv::hide::modal', 'modal-8')
    },
    handleChosePrintOption(value) {
      if (value) this.selectedOptions = value
      this.$emit('onChangeOption', this.selectedOptions)
    },
  },
}
</script>

<style>
  #modal-8 .modal-dialog {
    max-width: 70vw;
  }
  .add-pickup-popup-print-options-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media only screen and (max-width: 990px) {
    #modal-8 .modal-dialog {
      max-width: 100vw;
    }
  }

    @media only screen and (min-width: 601px) {
      [dir] .wrapper__handle__print__label__mobile {
        display: none!important;
      }
    }

  @media only screen and (max-width: 600px) {
    [dir] .wrapper__handle__print__label {
      display: none!important;
    }
  }

</style>
