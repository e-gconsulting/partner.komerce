const pageName = { singular: 'Student', plural: 'Student' }

export default [
  {
    path: '/student',
    name: 'student',
    component: () => import('@/views/pages/training/kampus-komerce/student/Index.vue'),
    meta: {
      name: pageName,
      routeEdit: 'detail-student-lulus',
      routeDetail: 'detail-gabung-kelas',
      navActiveLink: 'student',
      action: 'manage',
      resource: 'Training',
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
    path: '/student/lulus/detail/:student_id',
    name: 'detail-student-lulus',
    component: () => import('@/views/pages/training/kampus-komerce/student/DetailStudent.vue'),
    meta: {
      name: 'Detail',
      navActiveLink: 'student',
      action: 'manage',
      resource: 'Training',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'student',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/student/gabung-kelas/detail/:student_id',
    name: 'detail-gabung-kelas',
    component: () => import('@/views/pages/training/kampus-komerce/student/DetailGabungKelas.vue'),
    meta: {
      name: 'Detail',
      navActiveLink: 'student',
      action: 'manage',
      resource: 'Training',
      breadcrumb: [
        {
          text: 'Training',
        },
        {
          text: pageName.plural,
          route: 'student',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
