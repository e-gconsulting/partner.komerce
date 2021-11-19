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
        resource: 'Penghasilan',
        route: 'penghasilan',
        action: 'manage',
      },
      {
        title: 'Saldo',
        icon: 'None',
        resource: 'Saldo',
        route: 'saldo',
        action: 'manage',
      },
    ],
  },
]
