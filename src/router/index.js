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
import wishlist from './routes/komship/hiring/wishlist'

// komship
import dashboardKompship from './routes/komship/dashboard/index'
import produk from './routes/komship/produk/index'
import order from './routes/komship/order/index'
import pickup from './routes/komship/pickup/index'
import customer from './routes/komship/customer/index'
import settingKompship from './routes/komship/setting-kompship/index'
import keuangan from './routes/komship/keuangan/index'
import hiring from './routes/komship/hiring/index'
import opsional from './routes/komship/opsional/index'
import myapps from './routes/komship/myapps/index'
import ticketing from './routes/komship/ticketing/index'
import warehouse from './routes/komship/warehouse/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...pages,

    ...dashboardKompship,
    ...order,
    ...pickup,
    ...produk,
    ...customer,
    ...settingKompship,
    ...keuangan,
    ...hiring,
    ...opsional,
    ...myapps,
    ...ticketing,
    ...warehouse,
    ...wishlist,
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

  if (to.name === 'success-verification-email') {
    localStorage.clear()
    return next()
  }

  if (!canNavigate(to) && !isLoggedIn && to.name !== 'success-verification-email') {
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
