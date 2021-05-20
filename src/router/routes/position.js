const pageName = { singular: 'Posisi', plural: 'Posisi' }

export default [
  {
    path: '/positions',
    name: 'positions',
    component: () => import('@/views/pages/position/List.vue'),
    meta: {
      name: pageName,
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
