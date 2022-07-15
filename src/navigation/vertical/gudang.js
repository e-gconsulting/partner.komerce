export default [
  {
    title: 'Gudang',
    icon: 'HomeIcon',
    resource: 'Gudang',
    action: 'manage',
    children: [
      {
        title: 'Cari Gudang',
        icon: 'None',
        resource: 'Gudang',
        route: 'search-gudang',
        action: 'manage',
      },
      {
        title: 'Gudangku',
        icon: 'None',
        resource: 'Gudang',
        route: 'gudangku',
        action: 'manage',
      },
      {
        title: 'Ajukan Inbound',
        icon: 'None',
        resource: 'Gudang',
        route: 'Ajukan-Inbound',
        action: 'manage',
      },
      {
        title: 'Riwayat Inbound',
        icon: 'None',
        resource: 'Gudang',
        route: 'Riwayat-Inbound',
        action: 'manage',
      },
    ],
  },
]
