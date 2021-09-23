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
    path: '/pencairan/upload-bukti-transfer',
    name: 'cod-penarikan-upload-bukti-transfer',
    component: () => import('@/views/pages/pencairan/UploadBuktiTranser'),
    meta: {
      navActiveLink: 'cod-pencairan',
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/pencairan/:slug',
    name: 'cod-rincian-penarikan-saldo',
    component: () => import('@/views/pages/pencairan/RincianPenarikanSaldo'),
    meta: {
      navActiveLink: 'cod-pencairan',
      resource: 'Dashboard',
      action: 'read',
    },
  },
]
