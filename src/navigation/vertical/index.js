/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import dashboard from './dashboard'
// import wishlist from './wishlist'

// Komship
import dashboardKompship from './dashboard-kompship'
import produk from './produk'
import order from './order'
// import gudangkomship from './gudang-komship'
import gudangkompack from './gudang-kompack'
import pickup from './pickup'
import customer from './customer'
import settingKompship from './setting-kompship'
import keuangan from './keuangan'
import opsional from './opsional'
import myapps from './myapps'
import ticketingUser from './ticketing-user'
import inbox from './inbox'
// import hiring from './hiring'

// Komship Admin
import komship from './komship'

// Komplace
import tiket from './tiket'
import notification from './notification'

// Kompack Admin
import kompackpartner from './kompack/partner'

// komtim
import komtim from './komtim'

// Array of sections
export default [
  ...dashboard,
  ...komship,
  ...kompackpartner,

  ...dashboardKompship,
  ...inbox,
  ...order,
  ...produk,
  // ...gudangkomship,
  ...gudangkompack,
  ...pickup,
  ...customer,
  ...keuangan,
  ...settingKompship,
  ...opsional,
  ...ticketingUser,
  ...myapps,
  // ...hiring,

  ...tiket,
  ...notification,
  ...komtim,

]
