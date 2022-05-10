export default [
  {
    path: '/ticketing',
    name: 'ticketing-user',
    component: () => import('@/views/pages/komship/ticketing-user/Ticketing.vue'),
    meta: {
      name: 'ticketing-user',
      resource: 'Produk',
      action: 'manage',
    },
  },
]
