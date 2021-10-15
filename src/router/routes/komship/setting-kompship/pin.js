export default [
  {
    path: '/setting-kompship/pin',
    name: 'kompship-pin',
    component: () => import('@/views/pages/komship/setting-kompship/Pin.vue'),
    meta: {
      name: 'PIN',
      resource: 'Setting Komship',
      breadcrumb: [
        {
          text: 'Pengaturan',
        },
        {
          text: 'PIN',
          active: true,
        },
      ],
    },
  },
]
