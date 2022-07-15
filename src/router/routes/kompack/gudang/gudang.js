export default [
  {
    path: '/search-gudang',
    name: 'search-gudang',
    component: () => import('@/views/pages/kompack/gudang/searchgudang.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/gudangku',
    name: 'gudangku',
    component: () => import('@/views/pages/kompack/gudang/gudangku'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Ajukan-Inbound',
    name: 'gudangku',
    component: () => import('@/views/pages/kompack/gudang/AjukanInbound'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Riwayat-Inbound',
    name: 'gudangku',
    component: () => import('@/views/pages/kompack/partner/gudang/gudangku/gudangku'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
]
