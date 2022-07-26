export default [
  {
    path: '/data-order',
    name: 'data-order',
    component: () => import('@/views/pages/komship/order/DataOrder/Index.vue'),
    meta: {
      name: 'data-order',
      resource: 'Order',
      routeDetail: 'detail-order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Data Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/data-order/detail-order/:order_id',
    name: 'detail-order',
    component: () => import('@/views/pages/komship/order/DataOrder/DetailOrder.vue'),
    meta: {
      navActiveLink: 'data-order',
      editOrder: 'edit-order',
      routeToDataOrder: 'data-order',
      name: 'detail-order',
      resource: 'Order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Detail Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/add-order',
    name: 'add-order',
    component: () => import('@/views/pages/komship/order/AddOrder-v2.0'),
    meta: {
      name: 'add-order',
      resource: 'Order',
      routeToAddProduct: 'add-produk',
      routeToAddressSetting: 'gudangku',
      routeDetail: 'detail-add-order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Add Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/add-order/detail-checkout',
    name: 'detail-add-order',
    component: () => import('@/views/pages/komship/order/AddOrder/DetailCheckout.vue'),
    meta: {
      resource: 'Order',
      routeDataOrder: 'data-order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Add Order',
          active: true,
        },
      ],
    },
  },
  {
    path: '/add-order-onboarding',
    name: 'add-order-onboarding',
    component: () => import('@/views/pages/komship/onboarding/AddOrder.vue'),
    meta: {
      name: 'add-order-onboarding',
      resource: 'Order',
      routeDetail: 'detail-add-order-onboarding',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Add Order Onboarding',
          active: true,
        },
      ],
    },
  },
  {
    path: '/add-order-onboarding/detail-checkout',
    name: 'detail-add-order-onboarding',
    component: () => import('@/views/pages/komship/onboarding/Refactor/AddDetailOrder.vue'),
    meta: {
      resource: 'Order',
      action: 'manage',
      breadcrumb: [
        {
          text: 'Add Order Onboarding',
          active: true,
        },
      ],
    },
  },
  {
    path: '/data-order/detail-order/edit/:order_id',
    name: 'edit-order',
    component: () => import('@/views/pages/komship/order/EditOrder/EditOrder.vue'),
    meta: {
      navActiveLink: 'data-order',
      resource: 'Order',
      action: 'manage',
    },
  },
  {
    path: '/method-order',
    name: 'method-order',
    component: () => import('@/views/pages/komship/order/MethodOrder'),
    meta: {
      navActiveLink: 'add-order',
      resource: 'Order',
      action: 'manage',
    },
  },
  {
    path: '/add-order-massal',
    name: 'add-order-massal',
    component: () => import('@/views/pages/komship/order/AddOrderMassal'),
    meta: {
      navActiveLink: 'add-order-massal',
      resource: 'Order',
      action: 'manage',
    },
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/pages/komship/order/index.vue'),
    meta: {
      resource: 'Order',
      action: 'manage',
    },
  },
]
