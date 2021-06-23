const pageName = { singular: 'Sharing Fee', plural: 'Sharing Fee' }

export default [
  {
    path: '/sharing-fee',
    name: 'sharing-fee',
    component: () => import('@/views/pages/invoice/sharing-fee/List.vue'),
    meta: {
      name: pageName,
      resource: 'Invoice',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
]
