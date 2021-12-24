export default [
  {
    path: '/cetak-label',
    name: 'cetak-label',
    component: () => import('@/views/pages/komship/label/CetakLabel.vue'),
    meta: {
      resource: 'cetak-label',
      action: 'read',
    },
  },
]
