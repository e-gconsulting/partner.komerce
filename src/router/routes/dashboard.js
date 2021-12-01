export default [
  {
    path: '/admin-dashboard-komship',
    name: 'cod-dashboard',
    component: () => import('@/views/pages/dashboard-cod/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/',
    name: 'dashboard-analytics',
    component: () => import('@/views/pages/dashboard/Index'),
    meta: {
      resource: 'Dashboard',
      action: 'read',
    },
  },
  {
    path: '/dashboard',
    name: 'partner-home',
    component: () => import('@/views/pages/dashboard/PartnerHome'),
    meta: {
      resource: 'PartnerHome',
      action: 'read',
    },
  },
  {
    path: '/home',
    name: 'talent-home',
    component: () => import('@/views/pages/dashboard/Home'),
    meta: {
      resource: 'TalentHome',
      action: 'read',
    },
  },
  {
    path: '/talent/profile',
    name: 'talent-profile',
    component: () => import('@/views/pages/talent/talent/Profile.vue'),
    meta: {
      resource: 'TalentProfile',
      action: 'manage',
    },
  },
]
