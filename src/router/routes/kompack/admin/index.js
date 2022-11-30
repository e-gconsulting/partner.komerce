export default [
  {
    path: '/kompack-data-mitra-gudang',
    name: 'kompack-data-mitra-gudang',
    component: () => import('@/views/pages/kompack/admin/mitragudang/listdatamitragudang'),
    meta: {
      resource: 'Kompack-Admin',
      action: 'manage',
    },
  },
  {
    path: '/kompack-tambah-list-data-mitra-gudang',
    name: 'kompack-tambah-list-data-mitra-gudang',
    component: () => import('@/views/pages/kompack/admin/mitragudang/tambahlistdatamitragudang'),
    meta: {
      navActiveLink: 'kompack-data-mitra-gudang',
      resource: 'Kompack-Admin',
      action: 'manage',
    },
  },
  {
    path: '/kompack-rincian-mitra-gudang/:id',
    name: 'kompack-rincian-mitra-gudang',
    component: () => import('@/views/pages/kompack/admin/mitragudang/rincianmitragudang'),
    meta: {
      navActiveLink: 'kompack-data-mitra-gudang',
      resource: 'Kompack-Admin',
      action: 'manage',
    },
  },
  {
    path: '/kompack-rincian-mitra-gudang/:id/information',
    name: 'kompack-rincian-mitra-gudang-information',
    component: () => import('@/views/pages/kompack/admin/mitragudang/rincianinfomitragudang'),
    meta: {
      navActiveLink: 'kompack-data-mitra-gudang',
      resource: 'Kompack-Admin',
      action: 'manage',
    },
  },
  {
    path: '/kompack-fulfillment-service',
    name: 'kompack-fulfillment-service',
    component: () => import('@/views/pages/kompack/admin/fulfillment/service'),
    meta: {
      resource: 'Kompack-Admin',
      action: 'manage',
    },
  },
  {
    path: '/kompack-fulfillment-riwayat-pengajuan',
    name: 'kompack-fulfillment-riwayat-pengajuan',
    component: () => import('@/views/pages/kompack/admin/fulfillment/riwayatpengajuan'),
    meta: {
      resource: 'Kompack-Admin',
      action: 'manage',
    },
  },
]
