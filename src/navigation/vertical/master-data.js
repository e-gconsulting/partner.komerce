export default [
  {
    title: 'Master Data',
    icon: 'HardDriveIcon',
    tagVariant: 'light-warning',
    children: [
      {
        title: 'Kantor Operasional',
        icon: 'LayersIcon',
        route: 'operational-offices',
        resource: 'MasterData',
        action: 'manage',
      },
      {
        title: 'Working Space',
        icon: 'CodepenIcon',
        route: 'work-spaces',
        resource: 'MasterData',
        action: 'manage',
      },
    ],
  },
]
