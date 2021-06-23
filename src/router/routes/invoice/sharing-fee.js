const pageName = {
  singular: 'Sharing Fee',
  plural: 'Sharing Fee',
}

export default [
  {
    path: '/sharing-fee',
    name: 'sharing-fee',
    component: () => import('@/views/pages/invoice/sharing-fee/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'sharing-fee-create',
      routeEdit: 'sharing-fee-edit',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/sharing-fee/create',
    name: 'sharing-fee-create',
    component: () => import('@/views/pages/invoice/sharing-fee/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'sharing-fee',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          route: 'sharing-fee',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sharing-fee/:id/edit',
    name: 'sharing-fee-edit',
    component: () => import('@/views/pages/invoice/sharing-fee/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'sharing-fee',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          route: 'sharing-fee',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
