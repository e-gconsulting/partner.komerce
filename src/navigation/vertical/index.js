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
import gudang from './gudang'
import pickup from './pickup'
import customer from './customer'
import settingKompship from './setting-kompship'
import keuangan from './keuangan'
import opsional from './opsional'
// import hiring from './hiring'

// Komship Admin
import komship from './komship'

// Komplace
import dashboardKomplace from './dashboard-komplace'
import monitoring from './monitoring-komplace'
import pengaturanKomplace from './pengaturanKomplace'
import manajemenAdmin from './manajemenAdmin'

// Kompack Admin
import kompackadmin from './kompack/admin'
import kompackpartner from './kompack/partner'

// Array of sections
export default [
  ...dashboard,
  ...training,
  ...talent,
  ...partner,
  ...komship,
  ...kompackadmin,
  ...kompackpartner,
  ...management,
  ...masterData,
  ...assignment,
  ...settingAndPrivacy,

  ...dashboardKompship,
  ...order,
  ...pickup,
  ...produk,
  ...gudang,
  ...customer,
  ...keuangan,
  ...settingKompship,
  ...opsional,
  // ...hiring,

  ...dashboardKomplace,
  ...monitoring,
  ...pengaturanKomplace,
  ...manajemenAdmin,

  ...talentPool,
  // ...wishlist,
]
