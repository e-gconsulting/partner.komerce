export default [
  {
    title: 'Pengaturan',
    icon: 'SettingsIcon',
    resource: 'Setting Komship',
    action: 'manage',
    children: [
      {
        title: 'Profile',
        icon: 'None',
        resource: 'Setting Profile',
        route: 'kompship-profile',
        action: 'manage',
      },
      {
        title: 'Akses Akun',
        icon: 'None',
        resource: 'Setting Access Account',
        route: 'kompship-akses-akun',
        action: 'manage',
      },
      {
        title: 'Alamat Pickup',
        icon: 'None',
        resource: 'Setting Pickup Address',
        route: 'kompship-pickup',
        action: 'manage',
      },
      {
        title: 'Rekening Bank',
        icon: 'None',
        resource: 'Setting Rekening Bank',
        route: 'kompship-rekening-bank',
        action: 'manage',
      },
      {
        title: 'PIN',
        icon: 'None',
        resource: 'Setting PIN',
        action: 'manage',
        route: 'kompship-pin',
      },
      {
        title: 'Ekspedisi',
        icon: 'None',
        resource: 'Setting Ekspedisi',
        route: 'kompship-ekspedisi',
        action: 'manage',
      },
    ],
  },
]
