<template>
  <card-table
    :endpoint-get-all="endpointGetAll"
    :endpoint-delete="endpointDelete"
    :fields="fields"
  />
</template>

<script>
import CardTable from '@/views/components/CardTable.vue'

export default {
  components: {
    CardTable,
  },
  data() {
    return {
      endpointGetAll: '/operationalOffice',
      endpointDelete: 'operationalOffice/:id',
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Nama' },
      ],
    }
  },
}
</script>
