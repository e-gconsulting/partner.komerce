export default [
  {
    path: '/biaya-ekspedisi',
    name: 'cod-biaya-ekspedisi',
    component: () => import('@/views/pages/ekspedisi/biaya/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/performa-ekspedisi',
    name: 'cod-performa-ekspedisi',
    component: () => import('@/views/pages/ekspedisi/performa/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
]
