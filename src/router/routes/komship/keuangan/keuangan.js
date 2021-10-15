export default [
  {
    path: '/keuangan/penghasilan',
    name: 'penghasilan',
    component: () => import('@/views/pages/komship/keuangan/Penghasilan.vue'),
    meta: {
      name: 'penghasilan',
      resource: 'Keuangan',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Penghasilan',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keuangan/saldo',
    name: 'saldo',
    component: () => import('@/views/pages/komship/keuangan/Saldo.vue'),
    meta: {
      name: 'saldo',
      resource: 'Keuangan',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Saldo',
          active: true,
        },
      ],
    },
  },
]
