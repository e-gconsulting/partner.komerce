export default [
  {
    title: 'Pick Up',
    icon: 'TruckIcon',
    resource: 'Pickup',
    action: 'manage',
    children: [
      {
        title: 'Ajukan Pickup',
        icon: 'PlusIcon',
        resource: 'Pickup',
        route: 'ajukan-pickup',
        action: 'manage',
      },
      {
        title: 'Riwayat Pickup',
        icon: 'BookOpenIcon',
        resource: 'Pickup',
        route: 'history-pickup',
        action: 'manage',
      },
    ],
  },
]
