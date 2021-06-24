const pageName = {
  singular: 'Invoice Admin',
  plural: 'Invoice Admin',
}

export default [
  {
    path: '/invoice-admin',
    name: 'invoice-admin',
    component: () => import('@/views/pages/invoice/invoice-admin/Table.vue'),
    meta: {
      name: pageName,
      routeShow: 'invoice-admin-detail',
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
    path: '/invoice-admin/:id',
    name: 'invoice-admin-show',
    component: () => import('@/views/pages/invoice/invoice-admin/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'invoice-admin',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          route: 'invoice-admin',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
