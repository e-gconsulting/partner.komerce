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
    name: 'koneksi-wa',
    component: () => import('@/views/pages/komship/opsional/wa-notif/koneksi.vue'),
    meta: {
      name: 'koneksi-wa',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
  {
    path: '/opsional-feature/order-notification',
    name: 'dashboard-whatsapp',
    component: () => import('@/views/pages/komship/opsional/wa-notif/dashboard/dashboard.vue'),
    meta: {
      name: 'dashboard-whatsapp',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
]
