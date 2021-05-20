const pageName = { singular: 'Skill', plural: 'Skills' }

export default [
  {
    path: '/skills',
    name: 'skills',
    component: () => import('@/views/pages/training/skill/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'skills-create',
      routeEdit: 'skills-edit',
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
    path: '/skills/create',
    name: 'skills-create',
    component: () => import('@/views/pages/training/skill/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'skills',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'skills',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/skills/:id/edit',
    name: 'skills-edit',
    component: () => import('@/views/pages/training/skill/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'skills',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'skills',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
