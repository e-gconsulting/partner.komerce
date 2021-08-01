import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from '@/auth/utils'
import pages from './routes/pages'
import dashboard from './routes/dashboard'
import training from './routes/training/index'
import talent from './routes/talent/index'
import partner from './routes/partner/index'
import masterData from './routes/master-data/index'
import management from './routes/management/index'
import division from './routes/division'
import position from './routes/position'
import talentPool from './routes/talent-pool'
import parentProfile from './routes/partner-profile'
import wishlist from './routes/wishlist'
import invoice from './routes/invoice'
import assignment from './routes/assignment'
import jobRoleSetting from './routes/job-role-setting'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...dashboard,
    ...pages,
    ...training,
    ...talent,
    ...partner,
    ...masterData,
    ...management,
    ...division,
    ...position,
    ...invoice,
    ...assignment,

    ...talentPool,
    ...parentProfile,
    ...wishlist,
    ...jobRoleSetting,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (to.name === 'unauthenticated' || to.name === 'error-404') {
    return next()
  }

  if (!canNavigate(to) && !isLoggedIn) {
    // Redirect to login if not logged in
    return next({ name: 'auth-login' })
  }

  // Redirect if logged in
  if (
    // eslint-disable-next-line operator-linebreak
    (to.meta.redirectIfLoggedIn && isLoggedIn) ||
    (!canNavigate(to) && isLoggedIn && !to.meta.preventRedirect)
  ) {
    const userData = getUserData()
    next(
      getHomeRouteForLoggedInUser(
        // eslint-disable-next-line comma-dangle
        userData ? userData.role_name.toUpperCase() : null
        // eslint-disable-next-line comma-dangle
      )
    )
  }

  return next()
})

export default router
