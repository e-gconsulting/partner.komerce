export default [
  {
    path: '/keuangan/penghasilan',
    name: 'penghasilan',
    component: () => import('@/views/pages/komship/keuangan/Penghasilan'),
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
      routeToRincianSaldo: 'saldo-detail',
      routeToOrder: 'data-order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Saldo',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keuangan/saldo/detail',
    name: 'saldo-detail',
    component: () => import('@/views/pages/komship/keuangan/DetailSaldo.vue'),
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
  {
    path: '/keuangan/saldo/rincian/:id',
    name: 'rincian-penarikan',
    component: () => import('@/views/pages/komship/keuangan/RincianPenarikan.vue'),
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
