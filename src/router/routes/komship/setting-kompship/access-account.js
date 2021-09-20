const pageName = { singular: 'Profile', plural: 'profile' }

export default [
  {
    path: '/setting-kompship/akses-akun',
    name: 'kompship-akses-akun',
    component: () => import('@/views/pages/komship/setting-kompship/AccessAccount.vue'),
    meta: {
      name: pageName.singular,
      resource: 'Setting Komship',
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
