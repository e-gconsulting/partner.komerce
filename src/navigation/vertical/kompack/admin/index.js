export default [
  {
    title: 'Kompack Admin',
    icon: '',
    customicon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.16992 7.44043L11.9999 12.5504L20.7699 7.4704" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 21.61V12.54" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.92963 2.48L4.58963 5.45003C3.37963 6.12003 2.38965 7.80001 2.38965 9.18001V14.83C2.38965 16.21 3.37963 17.89 4.58963 18.56L9.92963 21.53C11.0696 22.16 12.9396 22.16 14.0796 21.53L19.4196 18.56C20.6296 17.89 21.6196 16.21 21.6196 14.83V9.18001C21.6196 7.80001 20.6296 6.12003 19.4196 5.45003L14.0796 2.48C12.9296 1.84 11.0696 1.84 9.92963 2.48Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9998 13.2396V9.57965L7.50977 4.09961" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    resource: 'Kompack-Admin',
    action: 'manage',
    children: [
      {
        title: 'Mitra Gudang',
        icon: 'none',
        resource: 'Kompack-Admin',
        action: 'manage',
        children: [
          {
            title: 'Data Mitra Gudang',
            icon: 'none',
            resource: 'Kompack-Admin',
            route: 'kompack-data-mitra-gudang',
            action: 'manage',
          },
        ],
      },
      {
        title: 'Fulfillment',
        icon: 'none',
        resource: 'Kompack-Admin',
        action: 'manage',
        children: [
          {
            title: 'Fulfillment Service',
            icon: 'none',
            resource: 'Kompack-Admin',
            route: 'kompack-fulfillment-service',
            action: 'manage',
          },
          {
            title: 'Riwayat Pengajuan',
            icon: 'none',
            resource: 'Kompack-Admin',
            route: 'kompack-fulfillment-riwayat-pengajuan',
            action: 'manage',
          },
        ],
      },
    ],
  },
]
