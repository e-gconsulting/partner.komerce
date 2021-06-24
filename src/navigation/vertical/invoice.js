export default [
  {
    title: 'Invoice',
    icon: 'FileTextIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Sharing Fee',
        icon: 'DollarSignIcon',
        route: 'sharing-fee',
        resource: 'Invoice',
        action: 'manage',
      },
      {
        title: 'Biaya Admin',
        icon: 'UserPlusIcon',
        route: 'admin-fee',
        resource: 'Invoice',
        action: 'manage',
      },
      {
        title: 'Invoice Admin',
        icon: 'UserPlusIcon',
        route: 'invoice-admin',
        resource: 'Invoice',
        action: 'manage',
      },
    ],
  },
]
