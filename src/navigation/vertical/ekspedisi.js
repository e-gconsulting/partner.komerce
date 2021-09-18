export default [
  {
    title: 'Ekspedisi',
    icon: 'TruckIcon',
    children: [
      {
        title: 'Biaya Ekspedisi',
        icon: 'none',
        route: 'cod-biaya-ekspedisi',
        resource: 'Dashboard',
        action: 'read',
      },
      {
        title: 'Performa',
        icon: 'none',
        route: 'cod-performa-ekspedisi',
        resource: 'Dashboard',
        action: 'read',
      },
    ],
  },
]
