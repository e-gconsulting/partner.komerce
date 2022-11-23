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
    path: '/search-gudang/detail/:id',
    name: 'detail-gudang-search',
    component: () => import('@/views/pages/kompack/gudang/DetailSearchGudang.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/search-gudang/detail/submission/:id',
    name: 'detail-gudang-search',
    component: () => import('@/views/pages/kompack/gudang/AjukanBerlanggananGudang.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/gudangku-kompack',
    name: 'gudangku-kompack',
    component: () => import('@/views/pages/kompack/gudang/gudangku/PrivateWarehouse.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/gudangku-kompack',
    name: 'gudangku-kompack',
    component: () => import('@/views/pages/kompack/gudang/gudangku//MitraWarehouse.vue'),
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
    path: '/riwayat-pengajuan',
    name: 'riwayat-pengajuan',
    component: () => import('@/views/pages/kompack/gudang/riwayat-pengajuan/RiwayatPengajuan'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/detail-inbound/:id',
    name: 'detail-inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-pengajuan/DetailInbound'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
]
