export default [
  {
    path: '/pengaturan-akun-komplace',
    name: 'pengaturan-akun-komplace',
    component: () => import('@/views/pages/komplace/PengaturanAkun/PengaturanAkun.vue'),
    meta: {
      name: 'pengaturan-akun-komplace',
      resource: 'Pengaturan Akun Komplace',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan',
          active: true,
        },
      ],
    },
  },
]
