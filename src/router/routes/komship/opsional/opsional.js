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
    path: '/opsional-feature/koneksi-wa',
    name: 'opsional-feature',
    component: () => import('@/views/pages/komship/opsional/wa-notif/koneksi.vue'),
    meta: {
      name: 'opsional-feature',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
]
