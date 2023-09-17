import {
  pullFromInventory,
  pushToInventory,
  createOrderList,
  listInventory,
  partListToBricklinkXml,
  bricklinkXmlToPartList,
  bricklinkXmlToPartListParse,
  print,
} from './legoInventory.mjs'

import {
  createInventoryFromOrders,
  loadPartsListsFromFolder,
} from './createInventoryFromOrders.mjs'

var inv = createInventoryFromOrders({includeOrdersNotReceived: false}); // not received order files end in nr, i.e. 1762451nr.xml

const {
  EX763ChromeLightBlue20221219,
  EX763ChromeNeonGreen20221219,
  e755WhtBluV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  e755WhtOraV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  e755BlkBluV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  e755BlkOraV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  em282quartet, //classic 1982 colors
  RecognizerTransOrangeV2, // second version, cost reduced, May 2023
  RecognizerTransBlueV2,
  em302v2purple,
  EM302v2orange,
  EM302v2azure,
  em302v2lime,
  STS101Shuttlev01,
  minirandomizerbluev1,
  minirandomizerorangev1,
  EM302v2whiteblue,
  pairmountingbasev2, // v2 mounting base for two EM302s
  e765v1blue,
  e765v1orange,
  E765blackorangev3,
  E765blackbluev3,
  E765blackorangev5,
  E765blackbluev5,
  E755WHTBLUv04, // these have the quarter round tile exhaust
  E755WHTORAv04, // these have the quarter round tile exhaust
  Voyager_TOSA_compatible_v1,
  shuttle_launch_TOSA_compatible_v1,
  Hubble_TOSA_compatible_v1,
} = loadPartsListsFromFolder();


// let's list current inventory first before figuring out what we need:
// listInventory(inv);

/*

parts

*/


// EM282 1982 micro cycle quartet with stands:
inv = pushToInventory(em282quartet, inv, 2);

// em302 v2
inv = pushToInventory(EM302v2orange, inv, 6);
inv = pushToInventory(EM302v2azure, inv, 6);
inv = pushToInventory(em302v2lime, inv, 4); // 2 are short
inv = pushToInventory(em302v2purple, inv, 3); // 1 is short
inv = pushToInventory(EM302v2whiteblue, inv, 1); // not sure if short

// minirandomizerduo 10 pairs orange+blue
inv = pushToInventory(minirandomizerbluev1, inv, 9);
inv = pushToInventory(minirandomizerorangev1, inv, 8);

// E763 white and chrome XL cycles:
inv = pushToInventory(EX763ChromeLightBlue20221219, inv, 1);
inv = pushToInventory(EX763ChromeNeonGreen20221219, inv, 1);

// E755 White
inv = pushToInventory(e755WhtBluV03withwall, inv, 3);
inv = pushToInventory(e755WhtOraV03withwall, inv, 3);

// E755 Black
inv = pushToInventory(e755BlkBluV03withwall, inv, 3);
inv = pushToInventory(e755BlkOraV03withwall, inv, 7);

inv = pushToInventory(e755BlkBluV03withwall, inv, 3); // all short
inv = pushToInventory(e755BlkOraV03withwall, inv, 2); // all short

// Randomizer v2
inv = pushToInventory(RecognizerTransOrangeV2, inv, 2);
// inv = pullFromInventory(RecognizerTransBlueV2, inv, 0);

// STS101
inv = pushToInventory(STS101Shuttlev01, inv, 1);

// minirandomizer
inv = pushToInventory(minirandomizerbluev1, inv, 9);
inv = pushToInventory(minirandomizerorangev1, inv, 8);

// shorts for e755v3
var short = [
  ['43898', 15, 12],  // radar 3x3 trans lt blue, short 12
  ['x346', 11, 3],    // bionicle tooth blk, short 3
  ['3700', 11, 20],   // 1x2 brick with round hole, short 20
];
var transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(short) );
inv = pullFromInventory(transformed, inv);

// shorts for em302v2
short = [
  ['24201', 11, 7],   // 1x2 slope inverted, short 7
  ['50950', 11, 1],   // 1x3 slope curved, short 1
  ['11477', 11, 3],   // 1x2 slope curved, short 3
  ['98138', 34, 4],   // 1x1 tile round, lime, short 4
  ['24246', 89, 1],   // 1x1 tile half round dark purple, short 1
]
transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(short) );
inv = pullFromInventory(transformed, inv);

// shorts for STS101v01
short = [
  ['3024', 1, 8],
  ['3024', 11, 1],
  ['3623', 4, 1],
  ['3710', 156, 2],
  ['3070b', 4, 1],
  ['49668', 1, 1],
  ['11477', 11, 2],
  ['18674', 1, 1]
]
transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(short) );
inv = pullFromInventory(transformed, inv);


// add counted stock:
console.log("\n\nADDING LOOSE COUNTED INVENTORY:");

// e755 black count:
var loose = [
  ['2654', 11, 30], // boat stud
  ['3003', 11, 31], // 2x2 brick
  ['3022', 156, 10], // 2x2 plate
  ['3022', 4, 12], //
  ['3023', 11, 50], // 1x2 plate
  ['30383', 11, 33], // 1x2 plate hinged
  ['32064', 11, 14], //
  ['3705', 11, 22], //
  ['4032', 4, 6], //
  ['4032', 156, 36], //
  ['4073', 11, 18], //
  ['2780', 11, 47], //
  ['41770', 11, 14], //
  ['41769', 11, 14], //
  ['43722', 11, 6], //
  ['43723', 11, 9], //
  ['43898', 98, 2], //
  ['43898', 15, 1], //
  ['47755', 11, 21], //
  ['61678', 4, 3], //
  ['61678', 156, 6], //
  ['61678', 11, 94], //
  ['98138', 98, 42], //
  ['98138', 15, 56], //
  ['99780', 11, 33], //
  ['99781', 11, 17], //
  ['11291', 11, 35], //
  ['25269', 156, 19], //
  ['32803', 11, 15], //
  ['54657', 11, 50], //
  ['30292', 18, 16], //
  ['30292', 15, 19], //
  ['15100', 11, 4], //
];
transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(loose) );
inv = pushToInventory(transformed, inv);

// e755 white count:
var loose = [
  ['2654',1,52], //
  ['2654',98,26], //
  ['2654',15,30], //
  ['3022',11,14], //
  ['3023',1,169], //
  ['32062',11,27], //
  ['3941',15,17], //
  ['3941',98,12], //
  ['4073',1,86], //
  ['6558',7,50], //
  ['41531',1,27], // WHEEL
  ['x346',1,23], //
  ['41770',1,18], //
  ['41769',1,19], //
  ['43722',1,45], //
  ['43726',1,23], //
  ['54200',85,23], //
  ['47755',1,29], //
  ['61678',1,42], //
  ['4085',1,42], //
  ['11291',1,29], //
  ['15100',1,26], //
  ['4073',98,2], //
];
transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(loose) );
inv = pushToInventory(transformed, inv);


/*

kitted out stock on hand

*/

// EM282 1982 micro cycle quartet with stands:
inv = pullFromInventory(em282quartet, inv, 2);

// em302 v2
inv = pullFromInventory(EM302v2orange, inv, 3);
inv = pullFromInventory(EM302v2azure, inv, 4);
inv = pullFromInventory(em302v2lime, inv, 4); 
inv = pullFromInventory(em302v2purple, inv, 3);
inv = pullFromInventory(EM302v2whiteblue, inv, 1);

// minirandomizer
inv = pullFromInventory(minirandomizerbluev1, inv, 8);
inv = pullFromInventory(minirandomizerorangev1, inv, 7);

// E763 white and chrome XL cycles:
inv = pullFromInventory(EX763ChromeLightBlue20221219, inv, 0);
inv = pullFromInventory(EX763ChromeNeonGreen20221219, inv, 0);

// E755 White
inv = pullFromInventory(E755WHTBLUv04, inv, 6);
inv = pullFromInventory(E755WHTORAv04, inv, 6);

// E755 Black
inv = pullFromInventory(e755BlkBluV03withwall, inv, 10);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 6);

// Randomizer v2
inv = pullFromInventory(RecognizerTransOrangeV2, inv, 4);
inv = pullFromInventory(RecognizerTransBlueV2, inv, 4);

// mounting bases for 302 quartets
inv = pullFromInventory(pairmountingbasev2, inv, 6);

// E765 Black
// inv = pullFromInventory(E765blackbluev5, inv, 2);
// inv = pullFromInventory(E765blackorangev5, inv, 2);

// TOSA shuttle launch
// inv = pullFromInventory(shuttle_launch_TOSA_compatible_v1, inv, 1);

// TOSA Voyager
// inv = pullFromInventory(Voyager_TOSA_compatible_v1, inv, 1);

// TOSA Hubble
// inv = pullFromInventory(Hubble_TOSA_compatible_v1, inv, 1);


// console.log("\n\nADDING EXTRA WANTED KITS:");
// E755 White
// inv = pullFromInventory(e755WhtBluV03withwall, inv, 6);
// inv = pullFromInventory(e755WhtOraV03withwall, inv, 6);

// E755 Black
// inv = pullFromInventory(e755BlkBluV03withwall, inv, 6);
// inv = pullFromInventory(e755BlkOraV03withwall, inv, 7);




/*

SALES

*/

// July 8, 2023
inv = pullFromInventory(STS101Shuttlev01, inv, 1);

// // minirandomizer
inv = pullFromInventory(minirandomizerbluev1, inv, 1);
inv = pullFromInventory(minirandomizerorangev1, inv, 1);

// July 9, 2023
inv = pullFromInventory(e755WhtBluV03withwall, inv, 1);

// July 15, 2023
inv = pullFromInventory(EM302v2azure, inv, 1);

// July 18, 2023
inv = pullFromInventory(EM302v2azure, inv, 1);
inv = pullFromInventory(EM302v2orange, inv, 2);

// July 22, 2023
inv = pullFromInventory(E765blackbluev3, inv, 1);
inv = pullFromInventory(E765blackorangev3, inv, 1);

// July 23, 2023
inv = pullFromInventory(RecognizerTransOrangeV2, inv, 1);

// August 10, 2023
inv = pullFromInventory(EM302v2orange, inv, 1);

//  August 11, 2023
inv = pullFromInventory(e755WhtBluV03withwall, inv, 1);
inv = pullFromInventory(e755WhtOraV03withwall, inv, 1);

// August 14, 2023
inv = pullFromInventory(E765blackbluev3, inv, 1);
inv = pullFromInventory(E765blackorangev3, inv, 1);


//-------------

// Sept 4, 2023
inv = pullFromInventory(EX763ChromeLightBlue20221219, inv, 1);
inv = pullFromInventory(e755WhtBluV03withwall, inv, 1);
inv = pullFromInventory(e755WhtOraV03withwall, inv, 1);
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);
inv = pullFromInventory(RecognizerTransBlueV2, inv, 1);

// Sept 5, 2023
inv = pullFromInventory(RecognizerTransBlueV2, inv, 1);
inv = pullFromInventory(RecognizerTransOrangeV2, inv, 1);

// Sept 6, 2023
inv = pullFromInventory(EX763ChromeNeonGreen20221219, inv, 1);
inv = pullFromInventory(RecognizerTransOrangeV2, inv, 1);

// Sept 9, 2023
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);

// Sept 10, 2023
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);

// Sept 13, 2023
inv = pullFromInventory(e755WhtOraV03withwall, inv, 1);
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);

// Sept 14, 2023
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);

// Sept 15, 2023
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);
inv = pullFromInventory(E755WHTBLUv04, inv, 1);
inv = pullFromInventory(E755WHTORAv04, inv, 1);












console.log("\n\nCOUNTED INVENTORY AFTER ALL ADJUSTMENTS:");
listInventory(inv);


console.log("\n\nPARTS LIST TO ORDER:");
const ol = createOrderList(inv);
const wantedList = partListToBricklinkXml(ol);
console.log('\n--------\nBricklink wanted list format:\n----------\n', wantedList);
// console.log(`Revenue on stock = CAD$ ${rev}`);


