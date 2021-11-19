export default [
  {
    title: 'Orderku',
    icon: 'GiftIcon',
    resource: 'Order',
    action: 'manage',
    children: [
      {
        title: 'Tambah Order',
        icon: 'None',
        resource: 'Tambah Order',
        route: 'add-order',
        action: 'manage',
      },
      {
        title: 'Data Order',
        icon: 'None',
        resource: 'Data Order',
        route: 'data-order',
        action: 'manage',
      },
    ],
  },
]
