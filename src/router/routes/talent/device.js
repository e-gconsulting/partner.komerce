const pageName = { singular: 'Device', plural: 'Devices' }

export default [
  {
    path: '/devices',
    name: 'devices',
    component: () => import('@/views/pages/talent/device/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'devices-create',
      routeEdit: 'devices-edit',
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
    path: '/devices/create',
    name: 'devices-create',
    component: () => import('@/views/pages/talent/device/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'devices',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          route: 'devices',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/devices/:id/edit',
    name: 'devices-edit',
    component: () => import('@/views/pages/talent/device/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'devices',
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          route: 'devices',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
