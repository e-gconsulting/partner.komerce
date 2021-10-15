const pageName = { singular: 'Ekspedisi', plural: 'Ekspedisi' }

export default [
  {
    path: '/setting-kompship/ekspedisi',
    name: 'kompship-ekspedisi',
    component: () => import('@/views/pages/komship/setting-kompship/Ekspedisi.vue'),
    meta: {
      name: pageName.singular,
      resource: 'Setting Komship',
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
