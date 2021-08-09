const pageName = { singular: 'Trainer', plural: 'Trainer' }

export default [
  {
    path: '/instructors',
    name: 'instructors',
    component: () => import('@/views/pages/training/instructor/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'instructors-create',
      routeEdit: 'instructors-edit',
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
    path: '/instructors/create',
    name: 'instructors-create',
    component: () => import('@/views/pages/training/instructor/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'instructors',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'instructors',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/instructors/:id/edit',
    name: 'instructors-edit',
    component: () => import('@/views/pages/training/instructor/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'instructors',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'instructors',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
