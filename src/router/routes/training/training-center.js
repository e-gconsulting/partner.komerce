const pageName = { singular: 'Training Center', plural: 'Training Centers' }

export default [
  {
    path: '/training-centers',
    name: 'training-centers',
    component: () => import('@/views/pages/training/training-center/List.vue'),
    meta: {
      name: pageName,
      routeCreate: 'training-centers-create',
      routeEdit: 'training-centers-edit',
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
  {
    path: '/training-centers/create',
    name: 'training-centers-create',
    component: () => import('@/views/pages/training/training-center/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'training-centers',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'training-centers',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/training-centers/:id/edit',
    name: 'training-centers-edit',
    component: () => import('@/views/pages/training/training-center/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'training-centers',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'training-centers',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
