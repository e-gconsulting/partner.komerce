export default [
  {
    path: '/pencairan',
    name: 'cod-pencairan',
    component: () => import('@/views/pages/pencairan/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/pencairan/:slug',
    name: 'cod-rincian-penarikan-saldo',
    component: () => import('@/views/pages/pencairan/RincianPenarikanSaldo'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
]
