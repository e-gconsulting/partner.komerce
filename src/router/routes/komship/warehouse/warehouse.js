const pageName = { singular: 'Pickup', plural: 'pickup' }

export default [
  {
    path: '/gudangku',
    name: 'gudangku',
    component: () => import('@/views/pages/komship/warehouse/MyWarehouse.vue'),
    meta: {
      name: pageName.singular,
      resource: 'Gudang',
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
    path: '/gudang-pribadi',
    name: 'gudang-pribadi',
    component: () => import('@/views/pages/komship/warehouse/OwnWarehouse.vue'),
    meta: {
      name: pageName.singular,
      routeEdit: 'edit-pickup',
      routeAdd: 'add-pickup',
      resource: 'Gudang',
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
