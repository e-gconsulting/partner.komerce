const pickupRequest = () => import('@/views/pages/komship/pickup/PickupRequest')
const PickupOrderDetail = () => import('@/views/pages/komship/pickup/PickupOrderDetail')
const HistoryPickup = () => import('@/views/pages/komship/pickup/HistoryPickup/HistoryPickup.vue')
const HistoryPickupDetail = () => import('@/views/pages/komship/pickup/HistoryPickupDetail/HistoryPickupDetail.vue')

const pickupRoute = [
  {
    path: '/ajukan-pickup',
    name: 'ajukan-pickup',
    component: pickupRequest,
    props: true,
    meta: {
      name: 'ajukan-pickup',
      action: 'manage',
      resource: 'Pickup',
    },
  },
  {
    path: '/detail-orderan-pickup',
    name: 'detail-orderan-pickup',
    component: PickupOrderDetail,
    props: true,
    meta: {
      name: 'detail-orderan-pickup',
      resource: 'Pickup',
      action: 'manage',
    },
  },
  {
    path: '/detail-orderan-pickup/:order_data_id',
    name: 'detail-orderan-pickup/:order_data_id',
    component: PickupOrderDetail,
    props: true,
    meta: {
      name: 'detail-orderan-pickup/:order_data_id',
      resource: 'Pickup',
      action: 'manage',
    },
  },
  {
    path: '/history-pickup',
    name: 'history-pickup',
    component: HistoryPickup,
    meta: {
      name: 'history-pickup',
      routeDetailHistory: 'history-pickup/detail',
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
    path: '/history-pickup/detail/:order_data_id',
    name: 'history-pickup/detail',
    component: HistoryPickupDetail,
    props: true,
    meta: {
      name: 'history-pickup/detail',
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

export default pickupRoute
