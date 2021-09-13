export default [
  {
    title: 'Pengaturan Kompship',
    icon: 'BriefcaseIcon',
    route: 'positions',
    resource: 'Position',
    action: 'manage',
    children: [
      {
        title: 'Profile',
        icon: 'PlusIcon',
        resource: 'Position',
        route: 'add-produk',
        action: 'manage',
      },
      {
        title: 'Akses Akun',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'data-produk',
        action: 'manage',
      },
      {
        title: 'Alamat Pickup',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'info-customer',
        action: 'manage',
      },
      {
        title: 'Rekening Bank',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'data-customer',
        action: 'manage',
      },
      {
        title: 'PIN',
        icon: 'ArchiveIcon',
        resource: 'Position',
        action: 'manage',
      },
      {
        title: 'Ekspedisi',
        icon: 'ArchiveIcon',
        resource: 'Position',
        action: 'manage',
      },
    ],
  },
]
