export default [
  {
    title: 'Customer',
    icon: 'UserIcon',
    resource: 'Customer',
    action: 'manage',
    children: [
      {
        title: 'Info Customer',
        icon: 'None',
        resource: 'Customer',
        route: 'info-customer',
        action: 'manage',
      },
      {
        title: 'Data Customer',
        icon: 'None',
        resource: 'Customer',
        route: 'data-customer',
        action: 'manage',
      },
    ],
  },
]
