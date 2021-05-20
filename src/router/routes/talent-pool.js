const pageName = { singular: 'Talent pool', plural: 'Talent pool' }

export default [
  {
    path: '/talent-pools',
    name: 'talent-pools',
    component: () => import('@/views/pages/talent-pool/List.vue'),
    meta: {
      name: pageName,
      routeShow: 'talent-pools-show',
      resource: 'TalentPool',
      action: 'manage',
    },
  },
  {
    path: '/talent-pools/:id',
    name: 'talent-pools-show',
    component: () => import('@/views/pages/talent-pool/Show.vue'),
    meta: {
      name: pageName,
      resource: 'DetailTalent',
      action: 'manage',
    },
  },
]
