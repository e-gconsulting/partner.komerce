const pageName = { singular: 'Lesson', plural: 'Lesson' }

export default [
  {
    path: '/kelas/modul/lesson/:module_id',
    name: 'manage-lesson',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/Lesson.vue'),
    meta: {
      name: pageName,
      routeCreate: 'create-lesson',
      routeEdit: 'lesson-edit',
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
        },
        {
          text: 'Manage Lesson',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/modul/lesson/create',
    name: 'create-lesson',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/FormLesson.vue'),
    meta: {
      name: pageName,
      routeAddQuiz: 'add-quiz',
      resource: 'Training',
      navActiveLink: 'lesson',
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
          route: 'modul',
        },
        {
          text: 'Manage Lesson',
          route: 'manage-lesson',
        },
        {
          text: 'Add Lesson',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/modul/lesson/create/quiz',
    name: 'add-quiz',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/AddQuiz.vue'),
    meta: {
      name: 'Quiz',
      resource: 'Training',
      action: 'Manage',
      navActiveLink: 'quiz',
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
        },
        {
          text: 'Manage Lesson',
        },
        {
          text: 'Add Lesson',
          active: true,
        },
      ],
    },
  },
  {
    path: '/kelas/modul/lesson/edit/:lesson_id',
    name: 'lesson-edit',
    component: () => import('@/views/pages/training/kampus-komerce/kelas/EditLesson.vue'),
    meta: {
      name: pageName,
      routeAddQuiz: 'add-quiz',
      resource: 'Training',
      navActiveLink: 'lesson',
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
        },
        {
          text: 'Manage Lesson',
        },
        {
          text: 'Edit Lesson',
          active: true,
        },
      ],
    },
  },
]
