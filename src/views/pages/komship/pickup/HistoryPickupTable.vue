<template>
  <section :class="'view-all-pickup-table-wrapper'">
    <b-table
      :ref="tableRefName"
      :items="items"
      :fields="fields"
      class="view-all-pickup-table"
      responsive
    >

      <template #cell(order_date)="dateData">
        <div class="view-all-pickup-date-text">
          <div class="date-wrapper">{{ getDate(dateData.value) }}</div>
          <div class="time-wrapper grey-text">{{ getTime(dateData.value) }}</div>
        </div>
      </template>

      <template #cell(pickup_date)="dateData">
        <div class="view-all-pickup-date-text">
          <div class="date-wrapper">{{ getDate(dateData.value) }}</div>
          <div class="time-wrapper grey-text">{{ getTime(dateData.value) }}</div>
        </div>
      </template>

      <template #cell(button)="buttonData">
        <div
          class="view-all-pickup-button blue-text"
          @click="() => handleShowDetail(buttonData.item)"
        >
          Lihat detail...
        </div>
      </template>

    </b-table>
  </section>
</template>

<script>
import {
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
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
  // mounted() {
  //   // this.setStartValue()
  // },
  methods: {
    getDate(dateVal) {
      if (dateVal) {
        let today = dateVal.split(' ')
        let month = today[1]
        const monthArr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        month = (monthArr.indexOf(month) + 1) > 9 ? (monthArr.indexOf(month) + 1) : `0${(monthArr.indexOf(month) + 1)}`
        today = `${today[0]}-${month}-${today[2]}`
        return today
      }
      return dateVal
    },
    getTime(dateVal) {
      if (dateVal) {
        const today = dateVal.split(' ')
        let time = today[3].split(':')
        time = `${time[0]}.${time[1]}`
        return time
      }
      return dateVal
    },
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
