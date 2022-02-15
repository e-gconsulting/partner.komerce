export default [
  {
    path: '/dashboard-komship',
    name: 'dashboard-komship',
    component: () => import('@/views/pages/komship/dashboard'),
    meta: {
      name: 'dashboard-komship',
      routeToOrder: 'data-order',
      routeToTopCustomer: 'info-customer',
      routeToDataProduct: 'data-produk',
      routeToRincianSaldo: 'saldo-detail',
      resource: 'Dashboard Komship',
      action: 'read',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
  {
    path: '/data-order',
    name: 'data-order',
    component: () => import('@/views/pages/komship/order/DataOrder/Index.vue'),
    meta: {
      name: 'data-order',
      resource: 'Order',
      routeDetail: 'detail-order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Data Order',
          active: true,
        },
      ],
    },
  },
]
