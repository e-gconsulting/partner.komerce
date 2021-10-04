export default [
  {
    path: '/biaya-ekspedisi',
    name: 'cod-biaya-ekspedisi',
    component: () => import('@/views/pages/ekspedisi/biaya/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/biaya-ekspedisi/tambah',
    name: 'cod-biaya-ekspedisi-tambah',
    component: () => import('@/views/pages/ekspedisi/biaya/AturEkspedisi'),
    meta: {
      navActiveLink: 'cod-biaya-ekspedisi',
      type: 'add',
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/biaya-ekspedisi/:id/edit',
    name: 'cod-biaya-ekspedisi-edit',
    component: () => import('@/views/pages/ekspedisi/biaya/AturEkspedisi'),
    meta: {
      navActiveLink: 'cod-biaya-ekspedisi',
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/performa-ekspedisi',
    name: 'cod-performa-ekspedisi',
    component: () => import('@/views/pages/ekspedisi/performa/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
]
