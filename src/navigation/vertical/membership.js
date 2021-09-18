export default [
  {
    title: 'Membership',
    icon: 'UserIcon',
    children: [
      {
        title: 'Data Partner',
        icon: 'none',
        route: 'cod-data-partner',
        resource: 'Dashboard',
        action: 'read',
      },
      {
        title: 'Arsip Partner',
        icon: 'none',
        route: 'cod-arsip-partner',
        resource: 'Dashboard',
        action: 'read',
      },
      {
        title: 'Data Layanan',
        icon: 'none',
        route: 'cod-data-layanan',
        resource: 'Dashboard',
        action: 'read',
      },
    ],
  },
]
