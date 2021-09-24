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
          text: pageName.singular,
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/setting-kompship/pickup/add',
    name: 'add-pickup',
    component: () => import('@/views/pages/komship/setting-kompship/AddPickup.vue'),
    meta: {
      name: pageName.singular,
      navActiveLink: 'kompship-pickup',
      resource: 'Setting Komship',
      action: 'manage',
      breadcrumb: [
        {
          text: pageName.singular,
        },
        {
          text: 'Add',
          active: true,
        },
      ],
    },
  },
]
