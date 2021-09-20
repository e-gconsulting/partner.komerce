export default [
  {
    title: 'Keuangan',
    icon: 'HardDriveIcon',
    resource: 'Keuangan',
    action: 'manage',
    children: [
      {
        title: 'Penghasilan',
        icon: 'UserCheckIcon',
        resource: 'Keuangan',
        route: 'penghasilan',
        action: 'manage',
      },
      {
        title: 'Saldo',
        icon: 'UsersIcon',
        resource: 'Keuangan',
        route: 'saldo',
        action: 'manage',
      },
    ],
  },
]
