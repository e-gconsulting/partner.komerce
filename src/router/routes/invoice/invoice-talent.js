const pageName = {
  singular: 'Invoice Gaji Talent',
  plural: 'Invoice Gaji Talent',
}

export default [
  {
    path: '/invoice-talent',
    name: 'invoice-talent',
    component: () => import('@/views/pages/invoice/invoice-talent/Index.vue'),
    meta: {
      name: pageName,
      routeShow: 'invoice-talent-show',
      routeCreate: 'invoice-talent-create',
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
    path: '/invoice-talent/show/:id',
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
  {
    path: '/invoice-talent/create',
    name: 'invoice-talent-create',
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
          text: 'Create',
          active: true,
        },
      ],
    },
  },
]
