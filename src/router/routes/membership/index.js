export default [
  {
    path: '/data-partner',
    name: 'cod-data-partner',
    component: () => import('@/views/pages/membership/data-partner/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/arsip-partner',
    name: 'cod-arsip-partner',
    component: () => import('@/views/pages/membership/arsip-partner/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/data-layanan',
    name: 'cod-data-layanan',
    component: () => import('@/views/pages/membership/data-layanan/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
]
