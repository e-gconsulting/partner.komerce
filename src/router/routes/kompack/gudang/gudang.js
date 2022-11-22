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
    path: '/ajukan-inbound',
    name: 'ajukan-inbound',
    component: () => import('@/views/pages/kompack/gudang/ajukan-inbound/AjukanInbound.vue'),
    meta: {
      resource: 'Gudang',
      action: 'manage',
    },
  },
  {
    path: '/tambah-produk',
    name: 'tambah-produk',
    component: () => import('@/views/pages/kompack/gudang/ajukan-inbound/TambahProduk.vue'),
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
