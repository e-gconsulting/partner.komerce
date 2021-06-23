const pageName = {
  singular: 'Assignment Team Lead',
  plural: 'Assignment Team Lead',
}

export default [
  {
    path: '/assignment/team-lead',
    name: 'assignment-team-lead',
    component: () => import('@/views/pages/assignment/partner/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'assignment-team-lead-create',
      routeEdit: 'assignment-team-lead-edit',
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
    path: '/assignment-team-lead/create',
    name: 'assignment-team-lead-create',
    component: () => import('@/views/pages/assignment/partner/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-team-lead',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-team-lead',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/assignment-team-lead/:id/edit',
    name: 'assignment-team-lead-edit',
    component: () => import('@/views/pages/assignment/partner/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-team-lead',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-team-lead',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
