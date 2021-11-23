import {
  pullFromInventory,
  pushToInventory,
  createOrderList,
  partListToBricklinkXml,
  bricklinkXmlToPartList,
  print,
} from './legoInventory.mjs'

import {
  createInventoryFromOrders,
  loadPartsListsFromFolder,
} from './createInventoryFromOrders.mjs'

let inv = createInventoryFromOrders({includeOrdersNotReceived: true}); // not received order files end in nr, i.e. 1762451nr.xml

const {
  e753Chassis,
  e753BluBp,
  e753WhtBp,
  e753RedBp,
  e755Chassis,
  e755OraBp,
  e755AzuBp,
  e755WhtBlu,
  e755WhtOra,
  ex759Azu,
  ex759Lim,
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

// 10 may 2021
inv = pullFromInventory(e755WhtBlu,inv);

// 19 may 2021
inv = pullFromInventory(e753Blu,inv);

// 15 july 2021
inv = pullFromInventory(e753Wht,inv);

// 21 july 2021
inv = pullFromInventory(e755WhtBlu,inv);

// 6 august 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

// EV and Rus
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);

// Jeremy
inv = pullFromInventory(ex759Azu,inv);
inv = pullFromInventory(ex759Lim,inv);

// 16 Aug 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 20 Aug 2021
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e755Ora,inv);


// 23 Aug 2021
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e753Blu,inv);

// 16 Sep 2021
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 10 Oct 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 25 Oct 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 6 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv);

// 14 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv);

// 15 Nov 2021
inv = pullFromInventory(e753Blu,inv);
inv = pullFromInventory(e755WhtBlu,inv);

// 16 Nov 2021
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);

// 17 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 21 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv); // note this has black mirrors, entered into the DLS list below


//
// stock
//

// 753WHT
// inv = pullFromInventory(e753Wht,inv);

// 753BLU
inv = pullFromInventory(e753Blu,inv);

// 753RED
// inv = pullFromInventory(e753Red,inv);
// inv = pullFromInventory(e753Red,inv);

// 755WHTBLU
// ordered Nov 16
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
// ordered Nov 17
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtBlu,inv);


// 755WHTORA
// ordered Nov 16
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtOra,inv);
// ordered Nov 17
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 755BLKORA
// ordered Nov 16
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Ora,inv);
// ordered Nov 17
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Ora,inv);


// 755BLKAZU
// ordered Nov 16
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Azu,inv);
// ordered Nov 17
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Azu,inv);




//
// Damaged, lost, substandard
//

// part Number, colour, qty

const dls = [
  ['43898', 15, 1],
  ['43898', 98, 4],
  ['4073', 15, 1],
  ['4073', 98, 2],
  ['61678', 5, 2],
  ['3003', 11, 4],
  ['25269', 4, 1],
  ['47755', 11, 1],
  ['61678', 7, 1],
  ['41531', 11, 1],
  ['x346', 11, 2]
];

/** quick color ref
1   white
4   orange
11  black
85  dark bluish grey
85  light bluish grey
15  trans light blue
98  trans orange
*/

inv = pullFromInventory(dls, inv);

const ol = createOrderList(inv);
partListToBricklinkXml(ol);



