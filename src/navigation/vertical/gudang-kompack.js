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
        resource: 'Cari Gudang',
        route: 'search-gudang',
        action: 'manage',
      },
      {
        title: 'Gudangku',
        icon: 'None',
        resource: 'Gudangku',
        route: 'gudangku',
        action: 'manage',
      },
      {
        title: 'Ajukan Inbound',
        icon: 'None',
        resource: 'Ajukan Inbound',
        route: 'ajukan-inbound',
        action: 'manage',
      },
      {
        title: 'Riwayat Pengajuan',
        icon: 'None',
        resource: 'Riwayat Pengajuan',
        route: 'riwayat-pengajuan',
        action: 'manage',
      },
    ],
  },
]
