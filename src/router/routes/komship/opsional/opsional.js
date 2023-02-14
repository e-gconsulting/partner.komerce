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
    path: '/opsional-feature/dashboard-whatsapp',
    name: 'dashboard-whatsapp',
    component: () => import('@/views/pages/komship/opsional/wa-notif/dashboard/dashboard.vue'),
    meta: {
      name: 'dashboard-whatsapp',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
]
