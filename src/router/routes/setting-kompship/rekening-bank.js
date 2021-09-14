const pageName = { singular: 'Rekening Bank', plural: 'Rekening Bank' }

export default [
  {
    path: '/setting-kompship/rekening-bank',
    name: 'kompship-rekening-bank',
    component: () => import('@/views/pages/setting-kompship/RekeningBank.vue'),
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
