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
    name: 'ajukan-inbound',
    component: () => import('@/views/pages/kompack/gudang/AjukanInbound'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Riwayat-Inbound',
    name: 'riwayat-inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-inbound'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
]
