const pageName = { singular: 'Pickup', plural: 'pickup' }

export default [
  {
    path: '/setting-kompship/pickup',
    name: 'kompship-pickup',
    component: () => import('@/views/pages/komship/setting-kompship/Pickup.vue'),
    meta: {
      name: pageName.singular,
      routeEdit: 'edit-pickup',
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
  {
    path: '/setting-kompship/pickup/edit',
    name: 'edit-pickup',
    component: () => import('@/views/pages/komship/setting-kompship/EditPickup.vue'),
    meta: {
      name: pageName.singular,
      navActiveLink: 'kompship-pickup',
      resource: 'Setting Komship',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.plural,
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
]
