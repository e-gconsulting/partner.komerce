export default [
  {
    path: '/notification',
    name: 'notification',
    component: () => import('@/views/pages/notification/Notification.vue'),
    meta: {
      name: 'notification',
      routeDetail: 'notification-detail',
      resource: 'Notification',
      action: 'manage',
    },
  },
  {
    path: '/notification/create',
    name: 'notification-create',
    component: () => import('@/views/pages/notification/AddNotification.vue'),
    meta: {
      name: 'notification-create',
      resource: 'Notification',
      action: 'manage',
    },
  },
  {
    path: '/notification/detail/:notification_id',
    name: 'notification-detail',
    component: () => import('@/views/pages/notification/DetailNotification.vue'),
    meta: {
      name: 'notification-detail',
      resource: 'Notification',
      action: 'manage',
    },
  },
]
