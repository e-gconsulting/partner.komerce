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
        title: 'Trainer',
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
      {
        title: 'Kampus Komerce',
        icon: 'CalendarIcon',
        route: 'kampus-komerce',
        resource: 'Training',
        action: 'manage',
        children: [
          {
            title: 'Dashboard',
            icon: 'MonitorIcon',
            route: 'dashboard-kampus-komerce',
            resource: 'Training',
            action: 'manage',
          },
          {
            title: 'Kelas',
            icon: 'MonitorIcon',
            route: 'kelas',
            resource: 'Training',
            action: 'manage',
          },
          {
            title: 'Student',
            icon: 'UsersIcon',
            route: 'student',
            resource: 'Training',
            action: 'manage',
          },
        ],
      },
    ],
  },
]
