import {
  inventory,
  e753red,
  e753blu,
  e753wht,
  e753chassis,
  e755chassis,
  e755azu,
  e755ora,
  e755wht,
} from './partslists.mjs'

import {
  pullFromInventory,
  pushToInventory,
  createOrderList,
  partListToBricklinkXml,
  bricklinkXmlToPartList,
} from './legoinventory.mjs'

let inv = inventory;
let order;

// 14 mar 2021
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753blu,inv);

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753blu,inv);

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753red,inv);

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

// 30 mar 2021

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

// 3 apr 2021

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755ora,inv);

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755azu,inv);

// 2 apr 2021

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

// 5 apr 2021

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

// 16 apr 2021

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755ora,inv);

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755azu,inv);

// 25 apr 2021

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753red,inv);

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753blu,inv);

// 27 apr 2021

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755ora,inv);

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755azu,inv);

// 30 apr 2021

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

// 2 may 2021

inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753red,inv);

// Mine

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755ora,inv);

inv = pullFromInventory(e755chassis,inv);
inv = pullFromInventory(e755azu,inv);

inv = pullFromInventory(e755wht,inv);

//
// needed to have some stock
//

// // 4x755 ora
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755ora,inv);
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755ora,inv);
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755ora,inv);
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755ora,inv);

// // 4x755 azu
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755azu,inv);
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755azu,inv);
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755azu,inv);
// inv = pullFromInventory(e755chassis,inv);
// inv = pullFromInventory(e755azu,inv);

// 4x753WHT
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753wht,inv);

// 2x753BLU
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753blu,inv);
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753blu,inv);

// 2x753RED
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753red,inv);
inv = pullFromInventory(e753chassis,inv);
inv = pullFromInventory(e753red,inv);

// 3x755WHT
inv = pullFromInventory(e755wht,inv);
inv = pullFromInventory(e755wht,inv);
inv = pullFromInventory(e755wht,inv);

order = bricklinkXmlToPartList('order16228524.xml');
inv = pushToInventory(order, inv);

order = bricklinkXmlToPartList('order16228526.xml');
inv = pushToInventory(order, inv);

order = bricklinkXmlToPartList('order16228535.xml');
inv = pushToInventory(order, inv);

const ol = createOrderList(inv);
partListToBricklinkXml(ol);



