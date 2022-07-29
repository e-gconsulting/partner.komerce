export default [
  {
    title: 'Produk',
    customicon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.70001 9.26001L12 12.33L17.26 9.28001" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17.77V12.32" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.76 6.29001L7.56 8.07001C6.84 8.47001 6.23999 9.48001 6.23999 10.31V13.7C6.23999 14.53 6.83 15.54 7.56 15.94L10.76 17.72C11.44 18.1 12.56 18.1 13.25 17.72L16.45 15.94C17.17 15.54 17.77 14.53 17.77 13.7V10.3C17.77 9.47001 17.18 8.46001 16.45 8.06001L13.25 6.28001C12.56 5.90001 11.44 5.90001 10.76 6.29001Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    resource: 'Produk',
    action: 'manage',
    children: [
      {
        title: 'Tambah Produk',
        icon: 'None',
        resource: 'Tambah Produk',
        route: 'add-produk',
        action: 'manage',
      },
      {
        title: 'Data Produk',
        icon: 'None',
        resource: 'Data Produk',
        route: 'data-produk',
        action: 'manage',
      },
    ],
  },
]
