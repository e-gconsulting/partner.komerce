export default [
  {
    title: 'Pick Up',
    icon: 'TruckIcon',
    resource: 'Pickup',
    action: 'manage',
    children: [
      {
        title: 'Ajukan Pickup',
        icon: 'None',
        resource: 'Ajukan Pickup',
        route: 'ajukan-pickup',
        action: 'manage',
      },
      {
        title: 'Riwayat Pickup',
        icon: 'None',
        resource: 'History Pickup',
        route: 'history-pickup',
        action: 'manage',
      },
    ],
  },
]
