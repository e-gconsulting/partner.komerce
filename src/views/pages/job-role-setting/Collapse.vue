<template>
  <b-row class="py-1 pl-2 pr-1">
    <b-col md="8">
      <b v-b-toggle="[`collapse-${index}`]">{{ item.name }}</b>
    </b-col>
    <b-col md="4" class="text-right">
      <b-button
        tag="router-link"
        :to="{
          name: $route.meta.routeShow,
          params: { id: item.id },
        }"
        class="btn-icon"
        variant="outline-info"
        size="sm"
      >
        Manage
      </b-button>
    </b-col>
    <b-col md="12" v-if="item.childrens.length > 0">
      <b-collapse :id="`collapse-${index}`" class="mt-2">
        <Collapse
          v-for="(item, index2) in item.childrens"
          :key="index2"
          :index="`${index}-${index2}`"
          :item="item"
        />
      </b-collapse>
    </b-col>
    <b-col md="12">
      <hr />
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCollapse, VBToggle, BButton,
} from 'bootstrap-vue'

export default {
  directives: {
    'b-toggle': VBToggle,
  },
  components: {
    BRow,
    BCol,
    BCollapse,
    BButton,
    Collapse: () => import('./Collapse.vue'),
  },
  props: {
    index: String,
    item: Object,
  },
}
</script>

<style>
</style>
