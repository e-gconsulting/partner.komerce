const pageName = {
  singular: 'Assign Team Lead Office',
  plural: 'Assign Team Lead Office',
}

export default [
  {
    path: '/assignment/team-lead-office',
    name: 'assignment-team-lead-office',
    component: () =>
      /* eslint-disable implicit-arrow-linebreak */
      import('@/views/pages/assignment/team-lead-office/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'assignment-team-lead-office-create',
      routeShow: 'assignment-team-lead-office-show',
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
    path: '/assignment/team-lead-office/create',
    name: 'assignment-team-lead-office-create',
    component: () =>
      import('@/views/pages/assignment/team-lead-office/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-team-lead-office',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-team-lead-office',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/assignment-team-lead-office/:id/show',
    name: 'assignment-team-lead-office-show',
    component: () =>
      import('@/views/pages/assignment/team-lead-office/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-team-lead-office',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-team-lead-office',
        },
        {
          text: 'Show',
          active: true,
        },
      ],
    },
  },
]
