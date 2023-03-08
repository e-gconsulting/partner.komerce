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
  {
    path: '/opsional-feature/pickup-label',
    name: 'pickup-label',
    component: () => import('@/views/pages/komship/opsional/custom-label/customLabel.vue'),
    meta: {
      name: 'pickup-label',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
]
