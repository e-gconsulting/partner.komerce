const pageName = { singular: 'Ekspedisi', plural: 'Ekspedisi' }

export default [
  {
    path: '/setting-kompship/ekspedisi',
    name: 'kompship-ekspedisi',
    component: () => import('@/views/pages/setting-kompship/Ekspedisi.vue'),
    meta: {
      name: pageName.singular,
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
]
