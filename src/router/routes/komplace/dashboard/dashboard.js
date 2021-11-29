export default [
  {
    path: '/dashboard-komplace',
    name: 'dashboard-komplace',
    component: () => import('@/views/pages/komplace/Dashboard/Dashboard.vue'),
    meta: {
      name: 'dashboard-komplace',
      resource: 'Dashboard Komplace',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Dashboard Komplace',
          active: true,
        },
      ],
    },
  },
]
