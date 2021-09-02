const pageName = { singular: 'Student', plural: 'Student' }

export default [
  {
    path: '/student/lulus/detail/:student_id',
    name: 'detail-lulus',
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
]
