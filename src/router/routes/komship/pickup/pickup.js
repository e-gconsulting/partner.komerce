export default [
  {
    path: '/ajukan-pickup',
    name: 'ajukan-pickup',
    component: () => import('@/views/pages/komship/pickup/AjukanPickup.vue'),
    meta: {
      name: 'ajukan-pickup',
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
]
