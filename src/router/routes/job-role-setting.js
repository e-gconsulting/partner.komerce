const pageName = {
  singular: 'Pengaturan Role Jabatan',
  plural: 'Pengaturan Role Jabatan',
}

export default [
  {
    path: '/job-role-setting',
    name: 'job-role-setting',
    component: () => import('@/views/pages/job-role-setting/Table.vue'),
    meta: {
      name: pageName,
      routeCreate: 'job-role-setting-create',
      routeEdit: 'job-role-setting-edit',
      resource: 'JobRoleSetting',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Role Jabatan',
        },
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
  {
    path: '/job-role-setting/create',
    name: 'job-role-setting-create',
    component: () => import('@/views/pages/job-role-setting/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'job-role-setting',
      resource: 'JobRoleSetting',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Role Jabatan',
        },
        {
          text: pageName.plural,
          route: 'job-role-setting',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/job-role-setting/:id/edit',
    name: 'job-role-setting-edit',
    component: () => import('@/views/pages/job-role-setting/Form.vue'),
    meta: {
      name: pageName,
      navActiveLink: 'job-role-setting',
      resource: 'JobRoleSetting',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Pengaturan Role Jabatan',
        },
        {
          text: pageName.plural,
          route: 'job-role-setting',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
