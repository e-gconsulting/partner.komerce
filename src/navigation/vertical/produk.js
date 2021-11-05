export default [
  {
    title: 'Produk',
    icon: 'BriefcaseIcon',
    resource: 'Produk',
    action: 'manage',
    children: [
      {
        title: 'Tambah Produk',
        icon: 'None',
        resource: 'Produk',
        route: 'add-produk',
        action: 'manage',
      },
      {
        title: 'Data Produk',
        icon: 'None',
        resource: 'Produk',
        route: 'data-produk',
        action: 'manage',
      },
    ],
  },
]
