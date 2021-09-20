export default [
  {
    title: 'Produk',
    icon: 'BriefcaseIcon',
    resource: 'Produk',
    action: 'manage',
    children: [
      {
        title: 'Tambah Produk',
        icon: 'PlusIcon',
        resource: 'Produk',
        route: 'add-produk',
        action: 'manage',
      },
      {
        title: 'Data Produk',
        icon: 'ArchiveIcon',
        resource: 'Produk',
        route: 'data-produk',
        action: 'manage',
      },
    ],
  },
]
