const pageName = { singular: 'Produk', plural: 'Produk' }

export default [
  {
    path: '/produk',
    name: 'data-produk',
    component: () => import('@/views/pages/produk/DataProduk.vue'),
    meta: {
      name: pageName,
      routeCreate: 'add-produk',
      resource: 'Position',
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
    component: () => import('@/views/pages/produk/AddProduk.vue'),
    meta: {
      name: pageName,
      resource: 'Position',
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
