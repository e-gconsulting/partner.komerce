const pageName = { singular: 'Profile', plural: 'profile' }

export default [
  {
    path: '/setting-kompship/profile',
    name: 'kompship-profile',
    component: () => import('@/views/pages/setting-kompship/Profile.vue'),
    meta: {
      name: pageName.singular,
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
