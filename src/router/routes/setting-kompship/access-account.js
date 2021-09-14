const pageName = { singular: 'Profile', plural: 'profile' }

export default [
  {
    path: '/setting-kompship/akses-akun',
    name: 'kompship-akses-akun',
    component: () => import('@/views/pages/setting-kompship/AccessAccount.vue'),
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
