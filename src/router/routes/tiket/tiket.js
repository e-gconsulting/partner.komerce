export default [
  {
    path: '/tiket',
    name: 'tiket',
    component: () => import('@/views/pages/tiket/Tiket.vue'),
    meta: {
      resource: 'Tiket',
      toDetail: 'tiket-detail',
      action: 'manage',
    },
  },
  {
    path: '/tiket/detail/:id',
    name: 'tiket-detail',
    component: () => import('@/views/pages/tiket/DetailTiket.vue'),
    meta: {
      name: 'TiketDetail',
      resource: 'Tiket',
      action: 'manage',
    },
  },
  {
    path: '/tiket/detail/order/:id',
    name: 'tiket-detail',
    component: () => import('@/views/pages/tiket/DetailOrder.vue'),
    meta: {
      name: 'TiketDetail',
      resource: 'Tiket',
      action: 'manage',
    },
  },
]
