const pageName = { singular: 'Modul', plural: 'modul' }

export default [
  {
    path: '/kelas/modul/:class_id',
    name: 'modul',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/Modul.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'kelas',
      routeCreate: 'modul-create',
      routeEdit: 'module-edit',
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
    path: '/kelas/modul/create/:class_id',
    name: 'modul-create',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/FormModul.vue'),
    meta: {
      name: pageName.plural,
      navActiveLink: 'kelas',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: 'Manage Modul',
        },
        {
          text: 'create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/modul/edit/:module_id',
    name: 'module-edit',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/EditModule.vue'),
    meta: {
      name: 'modul',
      navActiveLink: 'kelas',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: 'Manage Modul',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
