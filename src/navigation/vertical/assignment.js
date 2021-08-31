export default [
  {
    title: 'Assignment',
    icon: 'UserCheckIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Assign Partner',
        route: 'assignment-partner',
        resource: 'Assignment',
        action: 'manage',
      },
      {
        title: 'Assign Team Lead',
        route: 'assignment-team-lead',
        resource: 'Assignment',
        action: 'manage',
      },
      {
        title: 'Assign Kantor Team Lead',
        route: 'assignment-team-lead-office',
        resource: 'Assignment',
        action: 'manage',
      },
    ],
  },
]
