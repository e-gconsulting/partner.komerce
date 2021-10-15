export default [
  {
    title: 'Hiring',
    icon: 'UserPlusIcon',
    resource: 'Hiring',
    action: 'manage',
    children: [
      {
        title: 'Talent Pool',
        icon: 'UsersIcon',
        resource: 'Hiring',
        route: 'komship-talent-pools',
        action: 'manage',
      },
      {
        title: 'Wishlist',
        icon: 'ArchiveIcon',
        resource: 'Hiring',
        route: 'komship-wishlist',
        action: 'manage',
      },
    ],
  },
]
