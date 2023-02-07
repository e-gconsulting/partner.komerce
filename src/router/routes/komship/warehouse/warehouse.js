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
    path: '/penarikan-barang',
    name: 'penarikan-barang',
    component: () => import(
      '@/views/pages/komship/warehouse/penarikan-barang/PenarikanBarang.vue'
    ),
    meta: {
      resource: 'Gudang Komship',
      action: 'manage',
    },
  },
  {
    path: '/ajukan-penarikan-barang',
    name: 'ajukan-penarikan-barang',
    component: () => import(
      '@/views/pages/komship/warehouse/penarikan-barang/AjukanPenarikan.vue'
    ),
    meta: {
      resource: 'Gudang Komship',
      action: 'manage',
    },
  },
  {
    path: '/penarikan-barang/detail/:id',
    name: 'detail-penarikan-barang',
    component: () => import('@/views/pages/komship/warehouse/penarikan-barang/Detail.vue'),
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
