export default [
  {
    path: '/kompack-login',
    name: 'kompack-auth-login',
    component: () => import('@/views/pages/kompack/admin/login'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
]
