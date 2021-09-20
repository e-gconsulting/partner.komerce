const pageName = { singular: 'Wishlist', plural: 'Wishlist' }

export default [
  {
    path: '/komship-wishlist',
    name: 'komship-wishlist',
    component: () => import('@/views/pages/wishlist/List.vue'),
    meta: {
      name: pageName,
      routeShow: 'komship-talent-pools-show',
      resource: 'Komship Wishlist',
      action: 'manage',
    },
  },
]
