export default [
  {
    path: '/search-gudang',
    name: 'search-gudang',
    component: () => import('@/views/pages/kompack/gudang/SearchGudangku.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/gudangku',
    name: 'gudangku',
    component: () => import('@/views/pages/kompack/gudang/Gudangku'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Ajukan-Inbound',
    name: 'Ajukan-Inbound',
    component: () => import('@/views/pages/kompack/gudang/AjukanInbound'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Riwayat-Inbound',
    name: 'Riwayat-Inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-inbound/riwayat-inbound'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Dikirim-Sendiri',
    name: 'Riwayat-Inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-inbound/DikirimSendiri'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Dikirim-Ekspedisi',
    name: 'Riwayat-Inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-inbound/DikirimEkspedisi'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/Edit-Data-Produk',
    name: 'Riwayat-Inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-inbound/EditData'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
]
