const pageName = { singular: 'Dashboard', plural: 'Dashboard Kampus Komerce' }

export default [
  {
    path: '/dashboard-kampus-komerce',
    name: 'dashboard-kampus-komerce',
    component: () => import('@/views/pages/training/kampus-komerce/dashboard/Index.vue'),
    meta: {
      name: pageName,
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
]
