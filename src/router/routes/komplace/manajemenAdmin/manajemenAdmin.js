export default [
  {
    path: '/manajemen-admin',
    name: 'manajemen-admin',
    component: () => import('@/views/pages/komplace/ManajemenAdmin/ManajemenAdmin.vue'),
    meta: {
      name: 'manajemen-admin',
      resource: 'Manajemen Admin',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Manajemen Admin',
          active: true,
        },
      ],
    },
  },
]
