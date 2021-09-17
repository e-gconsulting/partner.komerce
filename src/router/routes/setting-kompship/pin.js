export default [
  {
    path: '/setting-kompship/pin',
    name: 'kompship-pin',
    component: () => import('@/views/pages/setting-kompship/Pin.vue'),
    meta: {
      name: 'PIN',
      resource: 'Position',
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
