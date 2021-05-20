const pageName = { singular: 'Wishlist', plural: 'Wishlist' }

export default [
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('@/views/pages/wishlist/List.vue'),
    meta: {
      name: pageName,
      routeShow: 'talent-pools-show',
      resource: 'Wishlist',
      action: 'manage',
    },
  },
]
