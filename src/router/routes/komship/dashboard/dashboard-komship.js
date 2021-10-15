export default [
  {
    path: '/dashboard-komship',
    name: 'dashboard-komship',
    component: () => import('@/views/pages/komship/dashboard/DashboardKomship.vue'),
    meta: {
      name: 'dashboard-komship',
      resource: 'Dashboard Komship',
      action: 'read',
      breadcrumb: [
        {
          text: 'Dashboard',
          active: true,
        },
      ],
    },
  },
]
