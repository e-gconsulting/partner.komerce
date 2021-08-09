const pageName = { singular: 'Modul', plural: 'modul' }

export default [
  {
    path: '/kelas/modul',
    name: 'modul',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/Modul.vue'),
    meta: {
      name: pageName,
      routeCreate: 'modul-create',
      routeLesson: 'manage-lesson',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: 'Kelas',
          route: 'kelas',
        },
        {
          text: 'Manage Modul',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/modul/create',
    name: 'modul-create',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/FormModul.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'modul',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: 'Manage Modul',
          route: 'modul',
        },
        {
          text: 'create',
          active: true,
        },
      ],
    },
  },
]
