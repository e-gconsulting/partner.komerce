export default [
  {
    path: '/inbox',
    name: 'komship-inbox',
    component: () => import('@/views/pages/komship/inbox/Inbox.vue'),
    meta: {
      name: 'komship-inbox',
      resource: 'Inbox',
      action: 'manage',
    },
  },
]
