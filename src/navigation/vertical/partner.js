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
      {
        title: 'Invoice',
        icon: 'UserCheckIcon',
        children: [
          {
            title: 'Invoice Admin',
            icon: 'UserPlusIcon',
            route: 'invoice-admin',
            resource: 'Invoice',
            action: 'manage',
          },
          {
            title: 'Invoice Gaji Talent',
            icon: 'UserPlusIcon',
            route: 'invoice-talent',
            resource: 'Invoice',
            action: 'manage',
          },
        ],
      },
    ],
  },
]
