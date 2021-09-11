const pageName = { singular: 'Customer', plural: 'Customer' }

export default [
  {
    path: '/info-customer',
    name: 'info-customer',
    component: () => import('@/views/pages/customer/InfoCustomer.vue'),
    meta: {
      name: pageName,
      routeDetail: 'detail-customer',
      resource: 'Position',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/data-customer',
    name: 'data-customer',
    component: () => import('@/views/pages/customer/DataCustomer.vue'),
    meta: {
      name: pageName,
      resource: 'Position',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/info-customer/detail-customer',
    name: 'detail-customer',
    component: () => import('@/views/pages/customer/DetailCustomer.vue'),
    meta: {
      name: pageName,
      resource: 'Position',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
        },
        {
          text: 'Detail Customer',
          active: true,
        },
      ],
    },
  },
]
