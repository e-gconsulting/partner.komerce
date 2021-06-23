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
import division from './division'
import position from './position'
import masterData from './master-data'
import invoice from './invoice'

// Partner
import talentPool from './talent-pool'
import wishlist from './wishlist'

// Array of sections
export default [
  ...dashboard,
  ...training,
  ...talent,
  ...partner,
  ...management,
  ...masterData,
  ...invoice,
  ...division,
  ...position,

  ...talentPool,
  ...wishlist,
]
