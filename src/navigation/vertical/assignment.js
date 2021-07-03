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
        route: 'assignment-team-lead-office',
        resource: 'Assignment',
        action: 'manage',
      },
    ],
  },
]
