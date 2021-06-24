const pageName = {
  singular: 'Invoice Talent',
  plural: 'Invoice Talent',
}

export default [
  {
    path: '/invoice-talent',
    name: 'invoice-talent',
    component: () => import('@/views/pages/invoice/invoice-talent/Table.vue'),
    meta: {
      name: pageName,
      routeShow: 'invoice-talent-detail',
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
    path: '/invoice-talent/:id',
    name: 'invoice-talent-show',
    component: () => import('@/views/pages/invoice/invoice-talent/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'invoice-talent',
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Invoice',
        },
        {
          text: pageName.plural,
          route: 'invoice-talent',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
