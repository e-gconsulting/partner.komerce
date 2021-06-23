export default [
  {
    title: 'Assignment',
    icon: 'UserCheckIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Partner',
        route: 'assignment-partner',
        resource: 'Assignment',
        action: 'manage',
      },
      {
        title: 'Team Lead',
        route: 'assignment-team-lead',
        resource: 'Assignment',
        action: 'manage',
      },
      {
        title: 'Pindah Kantor',
        route: 'assignment-move-office',
        resource: 'Assignment',
        action: 'manage',
      },
    ],
  },
]
