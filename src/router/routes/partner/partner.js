const pageName = { singular: 'Partner', plural: 'Partners' }

export default [
  {
    path: '/partners',
    name: 'partners',
    component: () => import('@/views/pages/partner/partner/Index.vue'),
    meta: {
      name: pageName,
      routeCreate: 'partners-create',
      routeEdit: 'partners-edit',
      resource: 'Partner',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Partner',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/partners/create',
    name: 'partners-create',
    component: () => import('@/views/pages/partner/partner/FormCard.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'partners',
      resource: 'Partner',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Partner',
        },
        {
          text: pageName.plural,
          route: 'partners',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/partners/:id/edit',
    name: 'partners-edit',
    component: () => import('@/views/pages/partner/partner/FormCard.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'partners',
      resource: 'Partner',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Partner',
        },
        {
          text: pageName.plural,
          route: 'partners',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
