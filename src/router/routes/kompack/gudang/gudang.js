export default [
  {
    path: '/search-gudang',
    name: 'search-gudang',
    component: () => import('@/views/pages/kompack/gudang/SearchGudangku.vue'),
    meta: {
      resource: 'Cari Gudang',
      action: 'manage',
    },
  },
  {
    path: '/search-gudang/detail/:id',
    name: 'detail-gudang-search',
    component: () => import('@/views/pages/kompack/gudang/DetailSearchGudang.vue'),
    meta: {
      resource: 'Cari Gudang',
      action: 'manage',
    },
  },
  {
    path: '/search-gudang/detail/submission/:id',
    name: 'detail-gudang-search',
    component: () => import('@/views/pages/kompack/gudang/AjukanBerlanggananGudang.vue'),
    meta: {
      resource: 'Cari Gudang',
      action: 'manage',
    },
  },
  {
    path: '/ajukan-inbound',
    name: 'ajukan-inbound',
    component: () => import('@/views/pages/kompack/gudang/ajukan-inbound/ajukaninbound.vue'),
    meta: {
      resource: 'Ajukan Inbound',
      action: 'manage',
    },
  },
  {
    path: '/riwayat-pengajuan',
    name: 'riwayat-pengajuan',
    component: () => import('@/views/pages/kompack/gudang/riwayat-pengajuan/RiwayatPengajuan'),
    meta: {
      resource: 'Riwayat Pengajuan',
      action: 'manage',
    },
  },
  {
    path: '/detail-riwayat-inbound/:id',
    name: 'detail-riwayat-inbound',
    component: () => import('@/views/pages/kompack/gudang/riwayat-pengajuan/DetailInbound'),
    meta: {
      resource: 'Riwayat Pengajuan',
      action: 'manage',
    },
  },
  {
    path: '/detail-riwayat-tambah-product/:id',
    name: 'detail-riwayat-tambah-product',
    component: () => import('@/views/pages/kompack/gudang/riwayat-pengajuan/DetailTambahProduct'),
    meta: {
      resource: 'Riwayat Pengajuan',
      action: 'manage',
    },
  },
  {
    path: '/detail-riwayat-berlangganan/:id',
    name: 'detail-riwayat-berlangganan',
    component: () => import('@/views/pages/kompack/gudang/riwayat-pengajuan/DetailBerlangganan'),
    meta: {
      resource: 'Riwayat Pengajuan',
      action: 'manage',
    },
  },
]
