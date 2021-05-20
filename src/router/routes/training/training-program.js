const pageName = { singular: 'Training Program', plural: 'Training Programs' }

export default [
  {
    path: '/training-programs',
    name: 'training-programs',
    component: () => import('@/views/pages/training/training-program/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'training-programs-create',
      routeEdit: 'training-programs-edit',
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
    path: '/training-programs/create',
    name: 'training-programs-create',
    component: () => import('@/views/pages/training/training-program/Create.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'training-programs',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'training-programs',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/training-programs/:id/edit',
    name: 'training-programs-edit',
    component: () => import('@/views/pages/training/training-program/Edit.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'training-programs',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'training-programs',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/training-programs/:id/participant',
    name: 'training-programs-participant',
    component: () => import('@/views/pages/training/training-program/Participant.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'training-programs',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'training-programs',
        },
        {
          text: 'Participant',
          active: true,
        },
      ],
    },
  },
]
