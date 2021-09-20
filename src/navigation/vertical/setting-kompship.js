export default [
  {
    title: 'Pengaturan',
    icon: 'SettingsIcon',
    resource: 'Setting Komship',
    action: 'manage',
    children: [
      {
        title: 'Profile',
        icon: 'UserIcon',
        resource: 'Setting Komship',
        route: 'kompship-profile',
        action: 'manage',
      },
      {
        title: 'Akses Akun',
        icon: 'UserCheckIcon',
        resource: 'Setting Komship',
        route: 'kompship-akses-akun',
        action: 'manage',
      },
      {
        title: 'Alamat Pickup',
        icon: 'BookIcon',
        resource: 'Setting Komship',
        route: 'kompship-pickup',
        action: 'manage',
      },
      {
        title: 'Rekening Bank',
        icon: 'HardDriveIcon',
        resource: 'Setting Komship',
        route: 'kompship-rekening-bank',
        action: 'manage',
      },
      {
        title: 'PIN',
        icon: 'PocketIcon',
        resource: 'Setting Komship',
        action: 'manage',
        route: 'kompship-pin',
      },
      {
        title: 'Ekspedisi',
        icon: 'ShoppingBagIcon',
        resource: 'Setting Komship',
        route: 'kompship-ekspedisi',
        action: 'manage',
      },
    ],
  },
]
