const pageName = { singular: 'Talent pool', plural: 'Talent pool' }

export default [
  {
    path: '/komship/talent-pools',
    name: 'komship-talent-pools',
    component: () => import('@/views/pages/komship/hiring/talent-pool/List.vue'),
    meta: {
      name: pageName,
      routeShow: 'talent-pools-show',
      resource: 'Komship TalentPool',
      action: 'manage',
    },
  },
  {
    path: '/komship/talent-pools/:id',
    name: 'komship-talent-pools-show',
    component: () => import('@/views/pages/komship/hiring/talent-pool/Show.vue'),
    meta: {
      name: pageName,
      resource: 'DetailTalent',
      action: 'manage',
    },
  },
]
