export default [
  {
    path: '/ajukan-pickup',
    name: 'ajukan-pickup',
    component: () => import('@/views/pages/komship/pickup/refactor/AjukanPickupNew.vue'),
    meta: {
      name: 'ajukan-pickup',
      routeDetailBefore: 'detail-orderan-pickup-before',
      routeDetailAfter: 'history-pickup',
      routeToActiveExpedition: 'kompship-ekspedisi',
      routeToAddressSetting: 'kompship-pickup',
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
      routeDetailHistory: 'history-pickup-detail',
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
    path: '/history-pickup-detail/:order_data_id',
    name: 'history-pickup-detail',
    component: () => import('@/views/pages/komship/pickup/refactor/HistoryPickupDetail.vue'),
    meta: {
      name: 'history-pickup-detail',
      navActiveLink: 'history-pickup',
      routeDetailOrderan: 'detail-orderan-pickup-after',
      routeToHistory: 'history-pickup',
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
    component: () => import('@/views/pages/komship/pickup/refactor/AddPickupDetailsBefore.vue'),
    meta: {
      name: 'detail-orderan-pickup-before',
      navActiveLink: 'ajukan-pickup',
      resource: 'Pickup',
      routeBack: 'ajukan-pickup',
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
