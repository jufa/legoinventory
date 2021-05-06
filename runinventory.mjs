// import {
//   inventory,
//   e753RedBp,
//   e753BluBp,
//   e753WhtBp,
//   e753Chassis,
//   e755Chassis,
//   e755AzuBp,
//   e755OraBp,
//   e755wht,
// } from './partslists.mjs'

import {
  pullFromInventory,
  pushToInventory,
  createOrderList,
  partListToBricklinkXml,
  bricklinkXmlToPartList,
  print,
} from './legoinventory.mjs'

import {
  createInventoryFromOrders,
  loadPartsListsFromFolder,
} from './createinventoryfromorders.mjs'

let inv = createInventoryFromOrders();

const {
  e753Chassis,
  e753BluBp,
  e753WhtBp,
  e753RedBp,
  e755Chassis,
  e755OraBp,
  e755AzuBp,
  e755Wht,
} = loadPartsListsFromFolder();

// for simplicity, lets combine the chassis and body panels here:
const e755Ora = pushToInventory(e755OraBp, e755Chassis);
const e755Azu = pushToInventory(e755AzuBp, e755Chassis);
const e753Wht = pushToInventory(e753WhtBp, e753Chassis);
const e753Red = pushToInventory(e753RedBp, e753Chassis);
const e753Blu = pushToInventory(e753BluBp, e753Chassis);

// 
// Sales
// 

// 14 mar 2021
inv = pullFromInventory(e753Blu,inv);
inv = pullFromInventory(e753Wht,inv);
inv = pullFromInventory(e753Blu,inv);
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e753Wht,inv);

// 30 mar 2021
inv = pullFromInventory(e753Wht,inv);

// 3 apr 202
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);

// 2 apr 2021
inv = pullFromInventory(e753Wht,inv);

// 5 apr 2021
inv = pullFromInventory(e753Wht,inv);

// 16 apr 202
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);

// 25 apr 2021
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e753Blu,inv);

// 27 apr 2021
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);

// 30 apr 2021
inv = pullFromInventory(e753Wht,inv);

// 2 may 2021
inv = pullFromInventory(e753Red,inv);

// Mine
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Wht,inv);

//
// needed to have some stock
//

// 753WHT
inv = pullFromInventory(e753Wht,inv);
inv = pullFromInventory(e753Wht,inv);
inv = pullFromInventory(e753Wht,inv);
inv = pullFromInventory(e753Wht,inv);

// 753BLU
inv = pullFromInventory(e753Blu,inv);
inv = pullFromInventory(e753Blu,inv);

// 753RED
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e753Red,inv);

// 755WHT
inv = pullFromInventory(e755Wht,inv);
inv = pullFromInventory(e755Wht,inv);
inv = pullFromInventory(e755Wht,inv);

//
// Damaged, lost, substandard
//

const dls = [
  ['43898', 15, 1],
  ['43898', 98, 3],
  ['4073', 15, 1],
  ['4073', 98, 2],
];

inv = pullFromInventory(dls, inv);

const ol = createOrderList(inv);
partListToBricklinkXml(ol);



