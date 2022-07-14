export default [
  {
    path: '/kompack/partner/menubaru',
    name: 'kompack-partner-menubaru',
    component: () => import('@/views/pages/kompack/partner/Menubaru'),
    meta: {
      resource: 'Kompack Partner',
      action: 'manage',
    },
  },
  {
    path: '/kompack/partner/searchgudang',
    name: 'kompack-partner-searchgudang',
    component: () => import('@/views/pages/kompack/partner/searchgudang'),
    meta: {
      resource: 'Kompack Partner',
      action: 'manage',
    },
  },
  {
    path: '/kompack/partner/gudangku',
    name: 'kompack-partner-gudangku',
    component: () => import('@/views/pages/kompack/partner/gudangku'),
    meta: {
      resource: 'Kompack Partner',
      action: 'manage',
    },
  },
]
