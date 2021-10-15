const pageName = { singular: 'Kelas', plural: 'Kelas' }

export default [
  {
    path: '/kelas',
    name: 'kelas',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'kelas-create',
      routeModul: 'modul',
      routeEdit: 'kelas-edit',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/create',
    name: 'kelas-create',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/Form.vue'),
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
          text: pageName.plural,
          route: 'kelas',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/edit/:class_id',
    name: 'kelas-edit',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/EditKelas.vue'),
    meta: {
      name: 'Kelas Edit',
      navActiveLink: 'kelas',
      resource: 'Training',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'kelas',
        },
        {
          text: 'Edit Kelas',
          active: true,
        },
      ],
    },
  },
]
