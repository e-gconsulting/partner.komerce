const pageName = { singular: 'Kurikulum', plural: 'Kurikulum' }

export default [
  {
    path: '/curriculums',
    name: 'curriculums',
    component: () => import('@/views/pages/training/curriculum/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'curriculums-create',
      routeEdit: 'curriculums-edit',
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
    path: '/curriculums/create',
    name: 'curriculums-create',
    component: () => import('@/views/pages/training/curriculum/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'curriculums',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'curriculums',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/curriculums/:id/edit',
    name: 'curriculums-edit',
    component: () => import('@/views/pages/training/curriculum/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'curriculums',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'curriculums',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
