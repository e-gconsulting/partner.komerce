const pageName = { singular: 'Profile', plural: 'Profile' }

export default [
  {
    path: '/partner/profile',
    name: 'partner-profile',
    component: () => import('@/views/pages/partner/partner/FormCard.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'profile',
      resource: 'PartnerProfile',
      action: 'manage',
    },
  },
]
