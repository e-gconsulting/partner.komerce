const pageName = { singular: 'Talent', plural: 'Daftar Talent' }

export default [
  {
    path: '/talents',
    name: 'talents',
    component: () => import('@/views/pages/talent/talent/Index.vue'),
    meta: {
      name: pageName,
      routeCreate: 'talents-create',
      routeEdit: 'talents-edit',
      routeEditResign: 'talents-resign-edit',
      routeResign: 'talents-resign',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/talents/create',
    name: 'talents-create',
    component: () => import('@/views/pages/talent/talent/Create.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'talents',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          route: 'talents',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/talents/:id/edit',
    name: 'talents-edit',
    component: () => import('@/views/pages/talent/talent/Edit.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'talents',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          route: 'talents',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/talents/resign/:id/edit',
    name: 'talents-resign-edit',
    component: () => import('@/views/pages/talent/talent/EditResign.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'talents',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          route: 'talents',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/talents/resign/:id',
    name: 'talents-resign',
    component: () => import('@/views/pages/talent/talent/Resign.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'talents',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          route: 'talents',
        },
        {
          text: 'Resign',
          active: true,
        },
      ],
    },
  },
]
