export default [
  {
    path: '/data-order',
    name: 'data-order',
    component: () => import('@/views/pages/komship/order/DataOrder.vue'),
    meta: {
      name: 'data-order',
      resource: 'Order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Data Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/add-order',
    name: 'add-order',
    component: () => import('@/views/pages/komship/order/AddOrder.vue'),
    meta: {
      name: 'add-order',
      resource: 'Order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Add Order',
          active: true,
        },
      ],
    },
  },
]