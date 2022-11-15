export default [
  {
    path: '/komtim',
    name: 'komtim',
    component: () => import('@/views/pages/komtim/komteam.vue'),
    meta: {
      resource: 'komtim',
      action: 'manage',
    },
  },
]
