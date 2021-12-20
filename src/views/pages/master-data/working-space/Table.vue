<template>
  <card-table
    keyword-key="office_name"
    get-all-method="post"
    delete-method="get"
    :endpoint-get-all="endpointGetAll"
    :endpoint-delete="endpointDelete"
    :fields="fields"
  />
</template>

<script>
import CardTable from '@/views/components/CardTable.vue'
// import CardTable from './CardTable.vue'

export default {
  components: {
    CardTable,
  },
  data() {
    return {
      endpointGetAll: '/office/pagination',
      endpointDelete: 'office/delete/:id',
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'office_name', label: 'Nama' },
        { key: 'capacity', label: 'Kapasitas' },
      ],
    }
  },
}
</script>
