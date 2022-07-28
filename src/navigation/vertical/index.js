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
import training from './training'
import talent from './talent'
import partner from './partner'
import management from './management'
import masterData from './master-data'
import assignment from './assignment'
import settingAndPrivacy from './setting-and-privacy'

// Partner
import talentPool from './talent-pool'
// import wishlist from './wishlist'

// Komship
import dashboardKompship from './dashboard-kompship'
import produk from './produk'
import order from './order'
import pickup from './pickup'
import customer from './customer'
import settingKompship from './setting-kompship'
import keuangan from './keuangan'
import opsional from './opsional'
import ticketingUser from './ticketing-user'
import gudang from './gudang'
// import hiring from './hiring'

// Komship Admin
import komship from './komship'

// Komplace
import dashboardKomplace from './dashboard-komplace'
import monitoring from './monitoring-komplace'
import pengaturanKomplace from './pengaturanKomplace'
import manajemenAdmin from './manajemenAdmin'
import tiket from './tiket'
import notification from './notification'

// Array of sections
export default [
  ...dashboard,
  ...training,
  ...talent,
  ...partner,
  ...komship,
  ...management,
  ...masterData,
  ...assignment,
  ...settingAndPrivacy,

  ...dashboardKompship,
  ...order,
  ...produk,
  ...gudang,
  ...pickup,
  ...customer,
  ...keuangan,
  ...settingKompship,
  ...opsional,
  ...ticketingUser,
  // ...hiring,

  ...dashboardKomplace,
  ...monitoring,
  ...pengaturanKomplace,
  ...manajemenAdmin,
  ...tiket,
  ...notification,

  ...talentPool,
  // ...wishlist,
]
