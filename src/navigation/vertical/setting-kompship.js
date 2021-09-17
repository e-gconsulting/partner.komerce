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
        route: 'kompship-profile',
        action: 'manage',
      },
      {
        title: 'Akses Akun',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'kompship-akses-akun',
        action: 'manage',
      },
      {
        title: 'Alamat Pickup',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'kompship-pickup',
        action: 'manage',
      },
      {
        title: 'Rekening Bank',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'kompship-rekening-bank',
        action: 'manage',
      },
      {
        title: 'PIN',
        icon: 'ArchiveIcon',
        resource: 'Position',
        action: 'manage',
        route: 'kompship-pin',
      },
      {
        title: 'Ekspedisi',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'kompship-ekspedisi',
        action: 'manage',
      },
    ],
  },
]
