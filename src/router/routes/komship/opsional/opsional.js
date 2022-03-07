export default [
  {
    path: '/opsional-feature',
    name: 'opsional-feature',
    component: () => import('@/views/pages/komship/opsional'),
    meta: {
      name: 'opsional-feature',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
]
