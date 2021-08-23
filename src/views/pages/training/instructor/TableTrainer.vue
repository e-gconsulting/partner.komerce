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
      endpointGetAll: '/instructure',
      endpointDelete: '/instructure/:id',
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Nama' },
        { key: 'skill.name', label: 'Skill' },
      ],
    }
  },
  mounted() {
    this.$http.get('/lms/trainer').then(response => {
      const { data } = response
      console.log(data)
    })
    this.$http.get('/lms/trainer/4').then(response => {
      const { data } = response.data
      console.log(data[0])
    })
  },
}
</script>
