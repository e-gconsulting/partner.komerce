<template>
  <div>
    <select v-model="row.row">
      <option
        v-for="item in itemData"
        :key="item"
        :value="item"
      >
        {{ item.code }}
      </option>
    </select>
    <input
      v-model="row.row.description"
      type="text"
      placeholder="Text"
    >
    <input
      v-model="row.row.unitprice"
      type="text"
      placeholder="value"
    >
    <button @click="remove">
      X
    </button>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Array,
      required: true,
    },
    row: {
      type: Array,
      required: true,
    },
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
  },

}
</script>

<style>

</style>
