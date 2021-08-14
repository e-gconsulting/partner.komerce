const pageName = {
  singular: 'Assign Team Lead',
  plural: 'Assign Team Lead',
}

export default [
  {
    path: '/assignment/team-lead',
    name: 'assignment-team-lead',
    component: () => import('@/views/pages/assignment/team-lead/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'assignment-team-lead-create',
      routeShow: 'assignment-team-lead-show',
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
    path: '/assignment/team-lead/create',
    name: 'assignment-team-lead-create',
    component: () => import('@/views/pages/assignment/team-lead/Form.vue'),
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
    path: '/assignment-team-lead/:id/show',
    name: 'assignment-team-lead-show',
    component: () => import('@/views/pages/assignment/team-lead/Form.vue'),
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
          text: 'Show',
          active: true,
        },
      ],
    },
  },
]
