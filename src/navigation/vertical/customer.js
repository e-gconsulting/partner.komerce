export default [
  {
    title: 'Customer',
    icon: 'UserIcon',
    resource: 'Customer',
    action: 'manage',
    children: [
      {
        title: 'Info Customer',
        icon: 'UserCheckIcon',
        resource: 'Customer',
        route: 'info-customer',
        action: 'manage',
      },
      {
        title: 'Data Customer',
        icon: 'UsersIcon',
        resource: 'Customer',
        route: 'data-customer',
        action: 'manage',
      },
    ],
  },
]
