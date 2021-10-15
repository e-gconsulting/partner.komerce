export default [
  {
    title: 'Posisi',
    icon: 'BriefcaseIcon',
    route: 'positions',
    resource: 'Position',
    action: 'manage',
    children: [
      {
        title: 'Tambah Produk',
        icon: 'PlusIcon',
        resource: 'Position',
        route: 'add-produk',
        action: 'manage',
      },
      {
        title: 'Data Produk',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'data-produk',
        action: 'manage',
      },
      {
        title: 'Info Customer',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'info-customer',
        action: 'manage',
      },
      {
        title: 'Data Customer',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'data-customer',
        action: 'manage',
      },
      {
        title: 'Detail Order',
        icon: 'ArchiveIcon',
        resource: 'Position',
        route: 'detail-order',
        action: 'manage',
      },
    ],
  },
]
