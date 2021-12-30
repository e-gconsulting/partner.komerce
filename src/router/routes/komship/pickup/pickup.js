export default [
  {
    path: '/ajukan-pickup',
    name: 'ajukan-pickup',
    component: () => import('@/views/pages/komship/pickup/refactor/AjukanPickup.vue'),
    meta: {
      name: 'ajukan-pickup',
      routeDetailBefore: 'detail-orderan-pickup-before',
      resource: 'Pickup',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Ajukan Pickup',
          active: true,
        },
      ],
    },
  },
  {
    path: '/history-pickup',
    name: 'history-pickup',
    component: () => import('@/views/pages/komship/pickup/HistoryPickup.vue'),
    meta: {
      name: 'history-pickup',
      resource: 'Pickup',
      action: 'manage',
      breadcrumb: [
        {
          text: 'History Pickup',
          active: true,
        },
      ],
    },
  },
  {
    path: '/detail-orderan-pickup',
    name: 'detail-orderan-pickup-before',
    component: () => import('@/views/pages/komship/pickup/refactor/AddPickupDetails.vue'),
    meta: {
      name: 'detail-orderan-pickup-before',
      resource: 'Pickup',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Detail Orderan Pickup',
          active: true,
        },
      ],
    },
  },
]
