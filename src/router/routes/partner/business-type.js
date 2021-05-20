const pageName = { singular: 'Tipe Bisnis', plural: 'Tipe Bisnis' }

export default [
  {
    path: '/business-types',
    name: 'business-types',
    component: () => import('@/views/pages/partner/business-type/List.vue'),
    meta: {
      name: pageName,
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
]
