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
import membership from './membership'
import ekspedisi from './ekspedisi'
// import training from './training'
// import talent from './talent'
// import partner from './partner'
// import management from './management'
// import masterData from './master-data'
// import assignment from './assignment'
// import settingAndPrivacy from './setting-and-privacy'

// Partner
// import talentPool from './talent-pool'
// import wishlist from './wishlist'

// Array of sections
export default [
  ...dashboard,
  ...membership,
  ...ekspedisi,
  // ...training,
  // ...talent,
  // ...partner,
  // ...management,
  // ...masterData,
  // ...assignment,
  // ...settingAndPrivacy,

  // ...talentPool,
  // ...wishlist,
]
