export default [
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('@/views/pages/komplace/Monitoring/Monitoring.vue'),
    meta: {
      name: 'monitoring',
      resource: 'Monitoring',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Monitoring',
          active: true,
        },
      ],
    },
  },
]
