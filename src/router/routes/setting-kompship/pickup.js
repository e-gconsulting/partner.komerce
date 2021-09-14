const pageName = { singular: 'Pickup', plural: 'pickup' }

export default [
  {
    path: '/setting-kompship/pickup',
    name: 'kompship-pickup',
    component: () => import('@/views/pages/setting-kompship/Pickup.vue'),
    meta: {
      name: pageName.singular,
      routeEdit: 'edit-pickup',
      resource: 'Position',
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
    component: () => import('@/views/pages/setting-kompship/EditPickup.vue'),
    meta: {
      name: pageName.singular,
      navActiveLink: 'kompship-pickup',
      resource: 'Position',
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
