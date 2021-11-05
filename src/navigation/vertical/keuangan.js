export default [
  {
    title: 'Keuangan',
    icon: 'HardDriveIcon',
    resource: 'Keuangan',
    action: 'manage',
    children: [
      {
        title: 'Penghasilan',
        icon: 'None',
        resource: 'Keuangan',
        route: 'penghasilan',
        action: 'manage',
      },
      {
        title: 'Saldo',
        icon: 'None',
        resource: 'Keuangan',
        route: 'saldo',
        action: 'manage',
      },
    ],
  },
]
