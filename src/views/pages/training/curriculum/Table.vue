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
      endpointGetAll: '/curriculum',
      endpointDelete: '/curriculum/:id',
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Nama' },
        {
          key: 'level',
          label: 'Level',
          sortable: false,
          badge: [
            { basic: 'Dasar', specific: 'Spesifik', mature: 'Pematangan' },
            { basic: 'light-success', specific: 'light-warning', mature: 'light-danger' },
          ],
        },
        { key: 'passing_grade', label: 'Passing Grade' },
        { key: 'skill.name', label: 'Skill' },
      ],
    }
  },
}
</script>
