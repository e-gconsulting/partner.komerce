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
      routeDetailOrder: 'detail-order',
      navActiveLink: 'ticketing-user',
      resource: 'Produk',
      action: 'manage',
    },
  },
  {
    path: '/data-order/detail-order/:order_id',
    name: 'detail-order',
    component: () => import('@/views/pages/komship/order/DataOrder/DetailOrder.vue'),
    meta: {
      navActiveLink: 'data-order',
      editOrder: 'edit-order',
      routeToDataOrder: 'data-order',
      name: 'detail-order',
      resource: 'Order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Detail Order',
          active: true,
        },
      ],
    },
  },
]
