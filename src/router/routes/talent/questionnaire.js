const pageName = { singular: 'Kuesioner', plural: 'Kuesioner' }

export default [
  {
    path: '/questionnaires',
    name: 'questionnaires',
    component: () => import('@/views/pages/talent/questionnaire/List.vue'),
    meta: {
      name: pageName,
      resource: 'Talent',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Talent',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
]
