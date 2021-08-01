<template>
  <card-table
    :endpoint-get-all="endpointGetAll"
    :endpoint-delete="endpointDelete"
    :fields="fields"
  />
</template>

<script>
import CardTable from '@/views/components/CardTable.vue'
import filters from '@/libs/filters'

export default {
  components: {
    CardTable,
  },
  data() {
    return {
      endpointGetAll: '/talentAdminFee',
      endpointDelete: 'talentAdminFee/:id',
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'position.position_name', label: 'Posisi' },
        { key: 'description', label: 'Deskripsi' },
        {
          key: 'admin_fee',
          label: 'Biaya Standar',
          formatter: val => filters.rupiah(val),
        },
        {
          key: 'admin_fee_discount_type',
          label: 'Type',
          badge: 'success',
        },
      ],
    }
  },
}
</script>
