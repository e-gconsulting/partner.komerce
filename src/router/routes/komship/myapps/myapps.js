export default [
  {
    path: '/aplikasiku',
    name: 'aplikasiku',
    component: () => import('@/views/pages/komship/myapps/MyApps.vue'),
    meta: {
      name: 'aplikasiku',
      resource: 'Gudang',
      action: 'manage',
    },
  },
]
