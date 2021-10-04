export default [
  {
    title: 'Training',
    icon: 'BookOpenIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Skill',
        icon: 'CrosshairIcon',
        route: 'skills',
        resource: 'Training',
        action: 'manage',
      },
      {
        title: 'Kurikulum',
        icon: 'FileTextIcon',
        route: 'curriculums',
        resource: 'Training',
        action: 'manage',
      },
      {
        title: 'Training Center',
        icon: 'MapPinIcon',
        route: 'training-centers',
        resource: 'Training',
        action: 'manage',
      },
      {
        title: 'Instruktur',
        icon: 'UserCheckIcon',
        route: 'instructors',
        resource: 'Training',
        action: 'manage',
      },
      {
        title: 'Training Program',
        icon: 'CalendarIcon',
        route: 'training-programs',
        resource: 'Training',
        action: 'manage',
      },
    ],
  },
]
