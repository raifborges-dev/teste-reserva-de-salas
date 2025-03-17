const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/SchedulePage.vue') }],
    name: 'schedule',
    meta: {
      isAuth: true,
    },
  },

  {
    path: '/',
    component: () => import('src/pages/LoginPage.vue'),
    name: 'home',
    meta: {
      isAuth: false,
    },
  },

  {
    path: '/newmeet',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/NewMeeting.vue') }],
    name: 'newmeet',
    meta: {
      isAuth: true,
    },
  },

  {
    path: '/rooms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/RoomsSchedule.vue') }],
    name: 'rooms',
    meta: {
      isAuth: true,
    },
  },

  {
    path: '/signin',
    component: () => import('src/pages/SignInPage.vue'),
    name: 'signin',
    meta: {
      isAuth: false,
    },
  },

  {
    path: '/newroom',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/NewRoom.vue') }],
    name: 'newroom',
    meta: {
      isAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      isAuth: false,
    },
  },
]

export default routes
