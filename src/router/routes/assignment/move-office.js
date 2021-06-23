const pageName = {
  singular: 'Assignment Pindah Kantor',
  plural: 'Assignment Pindah Kantor',
}

export default [
  {
    path: '/assignment/move-office',
    name: 'assignment-move-office',
    component: () => import('@/views/pages/assignment/partner/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'assignment-move-office-create',
      routeEdit: 'assignment-move-office-edit',
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
    path: '/assignment-move-office/create',
    name: 'assignment-move-office-create',
    component: () => import('@/views/pages/assignment/partner/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-move-office',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-move-office',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/assignment-move-office/:id/edit',
    name: 'assignment-move-office-edit',
    component: () => import('@/views/pages/assignment/partner/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'assignment-move-office',
      resource: 'Assignment',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Assignment',
        },
        {
          text: pageName.plural,
          route: 'assignment-move-office',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
