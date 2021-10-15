const pageName = { singular: 'Customer', plural: 'Customer' }

export default [
  {
    path: '/info-customer',
    name: 'info-customer',
    component: () => import('@/views/pages/komship/customer/InfoCustomer.vue'),
    meta: {
      name: pageName,
      routeDetail: 'detail-customer',
      navActiveLink: 'info-customer',
      resource: 'Customer',
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
    component: () => import('@/views/pages/komship/customer/DataCustomer.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'data-customer',
      resource: 'Customer',
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
    component: () => import('@/views/pages/komship/customer/DetailCustomer.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'info-customer',
      routeDetailOrder: 'detail-order',
      resource: 'Customer',
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
  {
    path: '/detail-order',
    name: 'detail-order',
    component: () => import('@/views/pages/komship/customer/DetailOrder.vue'),
    meta: {
      name: 'Detail Order',
      navActiveLink: 'info-customer',
      resource: 'Customer',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
        },
        {
          text: 'Detail order',
          active: true,
        },
      ],
    },
  },
]
