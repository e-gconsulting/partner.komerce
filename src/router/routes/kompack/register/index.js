export default [
  {
    path: '/kompack-register',
    name: 'kompack-auth-register',
    component: () => import('@/views/pages/kompack/register'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
]
