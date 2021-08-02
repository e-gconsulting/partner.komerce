const pageName = {
  singular: 'Pengaturan Role Akses',
  plural: 'Pengaturan Role Akses',
}

export default [
  {
    path: '/job-role-setting',
    name: 'job-role-setting',
    component: () => import('@/views/pages/job-role-setting/Table.vue'),
    meta: {
      name: pageName,
      routeShow: 'job-role-setting-show',
      resource: 'JobRoleSetting',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/job-role-setting/:id/show',
    name: 'job-role-setting-show',
    component: () => import('@/views/pages/job-role-setting/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'job-role-setting',
      resource: 'JobRoleSetting',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          route: 'job-role-setting',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
