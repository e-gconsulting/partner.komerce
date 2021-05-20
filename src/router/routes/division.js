const pageName = { singular: 'Divisi', plural: 'Divisi' }

export default [
  {
    path: '/divisions',
    name: 'divisions',
    component: () => import('@/views/pages/division/List.vue'),
    meta: {
      name: pageName,
      resource: 'Division',
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
