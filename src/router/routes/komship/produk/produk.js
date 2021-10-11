const pageName = { singular: 'Produk', plural: 'Produk' }

export default [
  {
    path: '/produk',
    name: 'data-produk',
    component: () => import('@/views/pages/komship/produk/DataProduk.vue'),
    meta: {
      name: pageName,
      routeCreate: 'add-produk',
      routeEdit: 'add-produk',
      resource: 'Produk',
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
    path: '/add-produk',
    name: 'add-produk',
    component: () => import('@/views/pages/komship/produk/AddProduk.vue'),
    meta: {
      name: pageName,
      resource: 'Produk',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
]
