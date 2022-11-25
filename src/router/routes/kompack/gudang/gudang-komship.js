export default [
  {
    path: '/gudangku',
    name: 'gudangku-komship',
    component: () => import('@/views/pages/komship/warehouse/OwnWarehouse.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },

]
