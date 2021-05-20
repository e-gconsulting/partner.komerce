const pageName = { singular: 'Sektor Bisnis', plural: 'Sektor Bisnis' }

export default [
  {
    path: '/business-categories',
    name: 'business-categories',
    component: () => import('@/views/pages/partner/business-category/List.vue'),
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
