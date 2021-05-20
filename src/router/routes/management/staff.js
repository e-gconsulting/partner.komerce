const pageName = { singular: 'Staff', plural: 'Staff' }

export default [
  {
    path: '/staffs',
    name: 'staffs',
    component: () => import('@/views/pages/management/staff/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'staffs-create',
      routeEdit: 'staffs-edit',
      resource: 'Management',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Management',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/staffs/create',
    name: 'staffs-create',
    component: () => import('@/views/pages/management/staff/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'staffs',
      resource: 'Management',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Management',
        },
        {
          text: pageName.plural,
          route: 'staffs',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/staffs/:id/edit',
    name: 'staffs-edit',
    component: () => import('@/views/pages/management/staff/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'staffs',
      resource: 'Management',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Management',
        },
        {
          text: pageName.plural,
          route: 'staffs',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
