export default [
    {
      path: '/kompack-search-gudang',
      name: 'kompack-search-gudang',
      component: () => import('@/views/pages/kompack/partner/gudang/searchgudang/searchgudang'),
      meta: {
        resource: 'Kompack-Partner',
        action: 'manage',
      },
    },
    {
      path: '/kompack-gudangku',
      name: 'kompack-gudangku',
      component: () => import('@/views/pages/kompack/partner/gudang/gudangku/gudangku'),
      meta: {
        resource: 'Kompack-Partner',
        action: 'manage',
      },
    },
  ]
  