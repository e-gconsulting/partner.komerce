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
        resource: 'Gudang Kompack',
        route: 'search-gudang',
        action: 'manage',
      },
      {
        title: 'Gudangku',
        icon: 'None',
        resource: 'Gudang',
        route: 'gudangku-komship',
        action: 'manage',
      },
      {
        title: 'Ajukan Inbound',
        icon: 'None',
        resource: 'Gudang Kompack',
        route: 'ajukaninbound',
        action: 'manage',
      },
      {
        title: 'Riwayat Pengajuan',
        icon: 'None',
        resource: 'Gudang',
        route: 'riwayat-pengajuan',
        action: 'manage',
      },
    ],
  },
]
