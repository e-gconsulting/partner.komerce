const pageName = { singular: 'Produk', plural: 'Produk' }

export default [
  {
    path: '/produk',
    name: 'data-produk',
    component: () => import('@/views/pages/komship/produk/DataProduk.vue'),
    meta: {
      name: pageName,
      routeCreate: 'add-produk',
      routeEdit: 'edit-produk',
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
      routeAllProduk: 'data-produk',
      routeDraftProduk: 'data-produk',
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
    path: '/edit-produk/:product_id',
    name: 'edit-produk',
    component: () => import('@/views/pages/komship/produk/EditProduk.vue'),
    meta: {
      name: pageName,
      resource: 'Produk',
      navActiveLink: 'data-produk',
      routeAllProduk: 'data-produk',
      routeDraftProduk: 'data-produk',
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
    path: '/add-produk-onboarding',
    name: 'add-produk-onboarding',
    component: () => import('@/views/pages/komship/onboarding/AddProdukOnboarding.vue'),
    meta: {
      name: pageName,
      resource: 'Produk',
      routeAllProduk: 'data-produk',
      routeDraftProduk: 'data-produk',
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
