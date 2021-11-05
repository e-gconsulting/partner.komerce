const pageName = { singular: 'Pickup', plural: 'pickup' }

export default [
  {
    path: '/setting-kompship/pickup',
    name: 'kompship-pickup',
    component: () => import('@/views/pages/komship/setting-kompship/Pickup.vue'),
    meta: {
      name: pageName.singular,
      routeEdit: 'edit-pickup',
      routeAdd: 'add-pickup',
      resource: 'Setting Komship',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
          active: true,
        },
      ],
    },
  },
]
