const pageName = {
  singular: 'Biaya Admin',
  plural: 'Biaya Admin',
}

export default [
  {
    path: '/admin-fee',
    name: 'admin-fee',
    component: () => import('@/views/pages/invoice/admin-fee/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'admin-fee-create',
      routeEdit: 'admin-fee-edit',
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
    path: '/admin-fee/create',
    name: 'admin-fee-create',
    component: () => import('@/views/pages/invoice/admin-fee/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'admin-fee',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          route: 'admin-fee',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/admin-fee/:id/edit',
    name: 'admin-fee-edit',
    component: () => import('@/views/pages/invoice/admin-fee/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'admin-fee',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          route: 'admin-fee',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
