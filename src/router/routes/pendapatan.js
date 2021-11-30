export default [
  {
    path: '/pendapatan',
    name: 'cod-pendapatan',
    component: () => import('@/views/pages/pendapatan/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
]
