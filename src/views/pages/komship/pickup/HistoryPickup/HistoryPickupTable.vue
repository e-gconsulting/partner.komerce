<template>
  <section :class="'view-all-pickup-table-wrapper'">
    <b-table
      :ref="tableRefName"
      :items="items"
      :fields="fields"
      class="view-all-pickup-table"
      responsive
    >
      <template #cell(date_submission)="data">
        {{ data.item.date_submission }}<br>
        <span class="d-flex text-secondary font-normal">
          <img
            v-if="data.item.warehouse_type === 'Mitra Kompack'"
            src="https://storage.googleapis.com/komerce/assets/svg/logo_kompack.svg"
            class="mr-[5px]"
          >
          <img
            v-else
            src="@/assets/images/icons/warehouse.svg"
            class="mr-[5px] w-5"
          >
          {{ data.item.warehouse }}
        </span>
      </template>

      <template #cell(order_date)="dateData">
        <div class="view-all-pickup-date-text">
          <div class="date-wrapper">
            {{ dateData.value }}
          </div>
          <div class="time-wrapper grey-text">
            {{ dateData.item.time_submission }}
          </div>
        </div>
      </template>

      <template #cell(pickup_date)="dateData">
        <div class="view-all-pickup-date-text">
          <div class="date-wrapper">
            {{ dateData.value }}
          </div>
          <div class="time-wrapper grey-text">
            {{ dateData.item.pickup_time }}
          </div>
        </div>
      </template>

      <template #cell(button)="data">
        <b-button
          variant="flat-info"
          class="btn-icon"
          tag="router-link"
          :to="{ name: $route.meta.routeDetailHistory, params: { order_data_id: data.item.id } }"
        >
          Lihat detail...
        </b-button>
      </template>

    </b-table>
  </section>
</template>

<script>
import {
  BTable,
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
  },
  props: {
    tableRefName: {
      type: String,
      default: 'tableOne',
    },
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    }
  },
  methods: {
    handleShowDetail(val) {
      if (val) {
        this.$emit('onDetailsClicked', 'details', val)
      }
    },
    refreshTable() {
      this.$refs[this.tableRefName].refresh()
    },
  },
}

</script>
