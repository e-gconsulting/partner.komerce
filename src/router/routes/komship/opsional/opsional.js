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
  {
    path: '/opsional-feature/template-notification-cod',
    name: 'template-notification-cod',
    component: () => import('@/views/pages/komship/opsional/wa-notif/template-notifikasi/templateCOD.vue'),
    meta: {
      name: 'template-notification-cod',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
  {
    path: '/opsional-feature/template-notification-pickup',
    name: 'template-notification-pickup',
    component: () => import('@/views/pages/komship/opsional/wa-notif/template-notifikasi/templatePickup.vue'),
    meta: {
      name: 'template-notification-pickup',
      resource: 'Fitur Pendukung',
      action: 'manage',
    },
  },
]
