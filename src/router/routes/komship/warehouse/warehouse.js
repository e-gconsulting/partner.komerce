const pageName = { singular: 'Pickup', plural: 'pickup' }

export default [
  {
    path: '/gudangku',
    name: 'gudangku',
    component: () => import('@/views/pages/komship/warehouse/OwnWarehouse.vue'),
    meta: {
      name: pageName.singular,
      routeEdit: 'edit-pickup',
      routeAdd: 'add-pickup',
      resource: 'Gudang Komship',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/detail-gudang-kompack/:id',
    name: 'detail-gudang-kompack',
    component: () => import('@/views/pages/komship/warehouse/DetailGudangKompack.vue'),
    meta: {
      resource: 'Gudang Komship',
      action: 'manage',
    },
  },
  {
    path: '/detail-gudang-kompack/:id/pengeluaran-barang',
    name: 'pengeluaran-barang',
    component: () => import('@/views/pages/komship/warehouse/penarikan-barang/listpenarikan.vue'),
    meta: {
      resource: 'Gudang Komship',
      action: 'manage',
    },
  },
  {
    path: '/tambah-produk-gudang-kompack/:id',
    name: 'tambah-produk-gudang-kompack',
    component: () => import('@/views/pages/komship/warehouse/TambahProdukKompack.vue'),
    meta: {
      resource: 'Gudang Komship',
      action: 'manage',
    },
  },
]
