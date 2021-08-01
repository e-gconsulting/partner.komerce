<template>
  <b-row class="py-1 pl-2 pr-1" v-b-toggle="[`collapse-${index}`]">
    <b-col md="8">
      <b>{{ item.name }}</b>
    </b-col>
    <b-col md="4" class="text-right">
      <b-button
        tag="router-link"
        :to="{
          name: $route.meta.routeShow,
          params: { id: item.id },
        }"
        variant="outline-info"
        size="sm"
      >
        <feather-icon icon="SettingsIcon" class="mr-50" />
        <span class="align-middle">Manage</span>
      </b-button>
      <feather-icon icon="ChevronDownIcon" class="ml-2 mr-50" />
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
