export default [
  {
    title: 'Talent',
    icon: 'UserPlusIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Kuisioner',
        icon: 'MessageSquareIcon',
        route: 'questionnaires',
        resource: 'Talent',
        action: 'manage',
      },
      {
        title: 'Daftar Talent',
        icon: 'UsersIcon',
        route: 'talents',
        resource: 'Talent',
        action: 'manage',
      },
      {
        title: 'Device',
        icon: 'SmartphoneIcon',
        route: 'devices',
        resource: 'Talent',
        action: 'manage',
      },
    ],
  },
]
