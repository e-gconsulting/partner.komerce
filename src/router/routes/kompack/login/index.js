export default [
  {
    path: '/kompack-login',
    name: 'kompack-auth-login',
    component: () => import('@/views/pages/kompack/admin/login'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },

  {
    path: '/kompack-register',
    name: 'kompack-register',
    component: () => import('@/views/pages/authentication/RegisterKompack'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/kompack-reset-password',
    name: 'kompack-auth-login',
    component: () => import('@/views/pages/authentication/ResetPassword'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
]
