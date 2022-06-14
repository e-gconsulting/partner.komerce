export default [
  {
    path: '/ticketing',
    name: 'ticketing-user',
    component: () => import('@/views/pages/komship/ticketing-user/Ticketing.vue'),
    meta: {
      name: 'ticketing-user',
      routeToDetail: 'detail-ticketing-user',
      resource: 'Produk',
      action: 'manage',
    },
  },
  {
    path: '/ticketing/detail/:ticket_id',
    name: 'detail-ticketing-detail-order',
    component: () => import('@/views/pages/komship/detail-ticketing-user/DetailTicketing.vue'),
    meta: {
      name: 'detail-ticketing-user',
      routeTicket: 'ticketing-user',
      routeToDetailOrder: 'detail-ticketing-detail-order',
      navActiveLink: 'ticketing-user',
      resource: 'Produk',
      action: 'manage',
    },
  },
]
