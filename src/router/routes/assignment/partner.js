const pageName = {
  singular: 'Assignment Partner',
  plural: 'Assignment Partner',
}

export default [
  {
    path: '/assignment/partner',
    name: 'assignment-partner',
    component: () => import('@/views/pages/assignment/partner/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'assignment-partner-create',
      routeEdit: 'assignment-partner-edit',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/assignment-partner/create',
    name: 'assignment-partner-create',
    component: () => import('@/views/pages/assignment/partner/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-partner',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-partner',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/assignment-partner/:id/edit',
    name: 'assignment-partner-edit',
    component: () => import('@/views/pages/assignment/partner/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-partner',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-partner',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
