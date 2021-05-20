export default [
  {
    title: 'Partner',
    icon: 'UserCheckIcon',
    children: [
      {
        title: 'Daftar Partner',
        icon: 'UsersIcon',
        route: 'partners',
        resource: 'Partner',
        action: 'manage',
      },
      {
        title: 'Sektor Bisnis',
        icon: 'ShuffleIcon',
        route: 'business-categories',
        resource: 'Partner',
        action: 'manage',
      },
      {
        title: 'Tipe Bisnis',
        icon: 'BriefcaseIcon',
        route: 'business-types',
        resource: 'Partner',
        action: 'manage',
      },
    ],
  },
]
