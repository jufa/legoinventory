import {
  pullFromInventory,
  pushToInventory,
  createOrderList,
  listInventory,
  partListToBricklinkXml,
  bricklinkXmlToPartList,
  bricklinkXmlToPartListParse,
  print,
  split_kit,
  split_kit_trim_core,
} from './legoInventory.mjs'

import {
  createInventoryFromOrders,
  loadPartsListsFromFolder,
} from './createInventoryFromOrders.mjs'

var orders = createInventoryFromOrders({includeOrdersNotReceived: false}); // not received order files end in nr, i.e. 1762451nr.xml
var kits_sold = [];
var parts_in_stock = []; // stock of parts on hand
var kits_in_stock = []; // kits we want to maintain in stock or have in stock

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
  EX763v2ChromeLightBlue,
  E755BLKBLUv05,
  E755BLKORAv05,
  E755WHTORAv05,
  E755WHTBLUv05,
} = loadPartsListsFromFolder();

// split kits into colres and trims:

const oranges = [4, 18, 98]; // orange, neon trans, trans
const blues = [156, 15]; // medium azure, trans light blue
const greens = [16, 34]; // trans-neon-green, lime
const purples = [51, 89]; // trans-purp, dark purp

const trimColors = [...oranges, ...blues];

const [E755_white_v4_orange_trim, E755_white_v4_core] = split_kit_trim_core(E755WHTORAv04, trimColors);
const [E755_white_v4_blue_trim] = split_kit_trim_core(E755WHTBLUv04, trimColors);

const [E765_v5_blue_trim, E765_v5_core] = split_kit_trim_core(E765blackbluev5, trimColors);
const [E765_v5_orange_trim] = split_kit_trim_core(E765blackorangev5, trimColors);

const [minirandomizer_v1_blue_trim, minirandomizer_v1_core] = split_kit_trim_core(minirandomizerbluev1, trimColors);
const [minirandomizer_v1_orange_trim] = split_kit_trim_core(minirandomizerorangev1, trimColors);

// dont actually have the same core? purple and blue have the same as do the other two
const [EM302_v2_orange_trim, EM302_v2_core_A] = split_kit_trim_core(EM302v2orange, trimColors);
const [EM302_v2_blue_trim, EM302_v2_core_B] = split_kit_trim_core(EM302v2azure, trimColors);
const [EM302_v2_purple_trim] = split_kit_trim_core(em302v2purple, purples);
const [EM302_v2_green_trim] = split_kit_trim_core(em302v2lime, greens);

const [randomizer_v2_orange_trim, randomizer_v2_core] = split_kit_trim_core(RecognizerTransOrangeV2, trimColors);
const [randomizer_v2_blue_trim] = split_kit_trim_core(RecognizerTransBlueV2, trimColors);

const [E755_black_v3_blue_trim, E755_black_v3_core] = split_kit_trim_core(e755BlkBluV03withwall, trimColors);
const [E755_black_v3_orange_trim] = split_kit_trim_core(e755BlkOraV03withwall, trimColors);




// let's list current inventory first before figuring out what we need:
// listInventory(inv);

/*

parts in stock (listed as kits since we counted kits)

*/


// EM282 1982 micro cycle quartet with stands:
parts_in_stock = pushToInventory(em282quartet, parts_in_stock, 2);

// em302 v2
parts_in_stock = pushToInventory(EM302v2orange, parts_in_stock, 6);
parts_in_stock = pushToInventory(EM302v2azure, parts_in_stock, 6);
parts_in_stock = pushToInventory(em302v2lime, parts_in_stock, 4); // 2 are short
parts_in_stock = pushToInventory(em302v2purple, parts_in_stock, 3); // 1 is short
parts_in_stock = pushToInventory(EM302v2whiteblue, parts_in_stock, 1); // not sure if short

// minirandomizerduo 10 pairs orange+blue
parts_in_stock = pushToInventory(minirandomizerbluev1, parts_in_stock, 9);
parts_in_stock = pushToInventory(minirandomizerorangev1, parts_in_stock, 8);

// E763 white and chrome XL cycles:
parts_in_stock = pushToInventory(EX763ChromeLightBlue20221219, parts_in_stock, 1);
parts_in_stock = pushToInventory(EX763ChromeNeonGreen20221219, parts_in_stock, 1);
parts_in_stock = pushToInventory(EX763v2ChromeLightBlue, parts_in_stock, 1);

// E755 White
parts_in_stock = pushToInventory(e755WhtBluV03withwall, parts_in_stock, 3);
parts_in_stock = pushToInventory(e755WhtOraV03withwall, parts_in_stock, 3);

// E755 Black
parts_in_stock = pushToInventory(e755BlkBluV03withwall, parts_in_stock, 3);
parts_in_stock = pushToInventory(e755BlkOraV03withwall, parts_in_stock, 7);

parts_in_stock = pushToInventory(e755BlkBluV03withwall, parts_in_stock, 3); // all short
parts_in_stock = pushToInventory(e755BlkOraV03withwall, parts_in_stock, 2); // all short

// Randomizer v2
parts_in_stock = pushToInventory(RecognizerTransOrangeV2, parts_in_stock, 2);
// parts_in_stock = pullFromInventory(RecognizerTransBlueV2, parts_in_stock, 0);

// STS101
parts_in_stock = pushToInventory(STS101Shuttlev01, parts_in_stock, 1);

// minirandomizer
parts_in_stock = pushToInventory(minirandomizerbluev1, parts_in_stock, 9);
parts_in_stock = pushToInventory(minirandomizerorangev1, parts_in_stock, 8);

// shorts for e755v3
var short = [
  ['43898', 15, 12],  // radar 3x3 trans lt blue, short 12
  ['x346', 11, 3],    // bionicle tooth blk, short 3
  ['3700', 11, 20],   // 1x2 brick with round hole, short 20
];
var transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(short) );
parts_in_stock = pullFromInventory(transformed, parts_in_stock);

// shorts for em302v2
short = [
  ['24201', 11, 7],   // 1x2 slope inverted, short 7
  ['50950', 11, 1],   // 1x3 slope curved, short 1
  ['11477', 11, 3],   // 1x2 slope curved, short 3
  ['98138', 34, 4],   // 1x1 tile round, lime, short 4
  ['24246', 89, 1],   // 1x1 tile half round dark purple, short 1
]
transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(short) );
parts_in_stock = pullFromInventory(transformed, parts_in_stock);

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
parts_in_stock = pullFromInventory(transformed, parts_in_stock);


// add counted parts_in_stock:
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
parts_in_stock = pushToInventory(transformed, parts_in_stock);

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
parts_in_stock = pushToInventory(transformed, parts_in_stock);

/*

LOSSES/DAMAGED

*/
const lost = [
  ['32064',11,3],
  ['3023',11,2],
];
transformed = bricklinkXmlToPartListParse( partListToBricklinkXml(lost) );
parts_in_stock = pullFromInventory(transformed, parts_in_stock);



/*

SALES

*/

// July 8, 2023
kits_sold = pushToInventory(STS101Shuttlev01, kits_sold, 1);

// minirandomizer
kits_sold = pushToInventory(minirandomizerbluev1, kits_sold, 1);
kits_sold = pushToInventory(minirandomizerorangev1, kits_sold, 1);

// July 9, 2023
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);

// July 15, 2023
kits_sold = pushToInventory(EM302v2azure, kits_sold, 1);

// July 18, 2023
kits_sold = pushToInventory(EM302v2azure, kits_sold, 1);
kits_sold = pushToInventory(EM302v2orange, kits_sold, 2);

// July 22, 2023
kits_sold = pushToInventory(E765blackbluev3, kits_sold, 1);
kits_sold = pushToInventory(E765blackorangev3, kits_sold, 1);

// July 23, 2023
kits_sold = pushToInventory(RecognizerTransOrangeV2, kits_sold, 1);

// August 10, 2023
kits_sold = pushToInventory(EM302v2orange, kits_sold, 1);

//  August 11, 2023
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtOraV03withwall, kits_sold, 1);

// August 14, 2023
kits_sold = pushToInventory(E765blackbluev3, kits_sold, 1);
kits_sold = pushToInventory(E765blackorangev3, kits_sold, 1);

// Sept 4, 2023
kits_sold = pushToInventory(EX763ChromeLightBlue20221219, kits_sold, 1);
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtOraV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);
kits_sold = pushToInventory(RecognizerTransBlueV2, kits_sold, 1);

// Sept 5, 2023
kits_sold = pushToInventory(RecognizerTransBlueV2, kits_sold, 1);
kits_sold = pushToInventory(RecognizerTransOrangeV2, kits_sold, 1);

// Sept 6, 2023
kits_sold = pushToInventory(EX763ChromeNeonGreen20221219, kits_sold, 1);
kits_sold = pushToInventory(RecognizerTransOrangeV2, kits_sold, 1);

// Sept 9, 2023
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);

// Sept 10, 2023
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);

// Sept 13, 2023
kits_sold = pushToInventory(e755WhtOraV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);

// Sept 14, 2023
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);

// Sept 15, 2023
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);
kits_sold = pushToInventory(E755WHTBLUv04, kits_sold, 1);
kits_sold = pushToInventory(E755WHTORAv04, kits_sold, 1);

// Sept 22 2023
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);

// Sept 26 2023
kits_sold = pushToInventory(RecognizerTransOrangeV2, kits_sold, 1);

// 10 Oct
kits_sold = pushToInventory(EM302v2azure, kits_sold, 1);
kits_sold = pushToInventory(EM302v2orange, kits_sold, 1);
kits_sold = pushToInventory(minirandomizerbluev1, kits_sold, 1);
kits_sold = pushToInventory(minirandomizerorangev1, kits_sold, 1);

// 13 Oct
kits_sold = pushToInventory(em302v2purple, kits_sold, 1);

// 23 Oct
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);

// 29 Oct
kits_sold = pushToInventory(EM302v2azure, kits_sold, 1);
kits_sold = pushToInventory(EM302v2orange, kits_sold, 1);

// 5 Nov
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);

// 9 Nov
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtOraV03withwall, kits_sold, 1);

// 15 nov
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);

// 24 nov
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755WhtOraV03withwall, kits_sold, 1);

// 28 Nov
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);   

// 29 Nov
kits_sold = pushToInventory(e755BlkBluV03withwall, kits_sold, 1);
kits_sold = pushToInventory(e755BlkOraV03withwall, kits_sold, 1);

// transition to v5 E755 kits

// 30 Nov
kits_sold = pushToInventory(E755BLKBLUv05, kits_sold, 1);
kits_sold = pushToInventory(E755BLKORAv05, kits_sold, 1);

// 1 Dec
kits_sold = pushToInventory(E755WHTBLUv05, kits_sold, 1);
kits_sold = pushToInventory(E755WHTORAv05, kits_sold, 1);

kits_sold = pushToInventory(E755WHTBLUv05, kits_sold, 1);
kits_sold = pushToInventory(E755WHTORAv05, kits_sold, 1);
kits_sold = pushToInventory(E755BLKBLUv05, kits_sold, 1);
kits_sold = pushToInventory(E755BLKORAv05, kits_sold, 1);

kits_sold = pushToInventory(E755WHTBLUv05, kits_sold, 1);
kits_sold = pushToInventory(E755BLKBLUv05, kits_sold, 1);



/*

kitted out stock on hand

*/

// EM282 1982 micro cycle quartet with stands:
kits_in_stock = pushToInventory(em282quartet, kits_in_stock, 2);

// special edition white 302 v2
kits_in_stock = pushToInventory(EM302v2whiteblue, kits_in_stock, 1);

// em302 v2
// kits_in_stock = pushToInventory(EM302v2orange, kits_in_stock, 3);
// kits_in_stock = pushToInventory(EM302v2azure, kits_in_stock, 4);
// kits_in_stock = pushToInventory(em302v2lime, kits_in_stock, 4);
// kits_in_stock = pushToInventory(em302v2purple, kits_in_stock, 3);

kits_in_stock = pushToInventory(EM302_v2_core_B, kits_in_stock, 4);
kits_in_stock = pushToInventory(EM302_v2_blue_trim, kits_in_stock, 2);
kits_in_stock = pushToInventory(EM302_v2_purple_trim, kits_in_stock, 2);

kits_in_stock = pushToInventory(EM302_v2_core_A, kits_in_stock, 5);
kits_in_stock = pushToInventory(EM302_v2_green_trim, kits_in_stock, 4);
kits_in_stock = pushToInventory(EM302_v2_orange_trim, kits_in_stock, 1);

// minirandomizer
// kits_in_stock = pushToInventory(minirandomizerbluev1, kits_in_stock, 8);
// kits_in_stock = pushToInventory(minirandomizerorangev1, kits_in_stock, 7);

kits_in_stock = pushToInventory(minirandomizer_v1_core, kits_in_stock, 13);
kits_in_stock = pushToInventory(minirandomizer_v1_blue_trim, kits_in_stock, 6);
kits_in_stock = pushToInventory(minirandomizer_v1_orange_trim, kits_in_stock, 7);


// E763 white and chrome XL cycles:
kits_in_stock = pushToInventory(EX763v2ChromeLightBlue, kits_in_stock, 1);

// E755 White v4 ***EOL***
// kits_in_stock = pushToInventory(E755_white_v4_core, kits_in_stock, 0);
// kits_in_stock = pushToInventory(E755_white_v4_blue_trim, kits_in_stock, 0); // but up to 12
// kits_in_stock = pushToInventory(E755_white_v4_orange_trim, kits_in_stock, 0); // but up to 9

// E755 Black v3 ***EOL***
// kits_in_stock = pushToInventory(e755BlkBluV03withwall, kits_in_stock, 0);
// kits_in_stock = pushToInventory(e755BlkOraV03withwall, kits_in_stock, 0);

// E755 White v5
kits_in_stock = pushToInventory(E755WHTBLUv05, kits_in_stock, 1); // but up to 12
kits_in_stock = pushToInventory(E755WHTORAv05, kits_in_stock, 1); // but up to 9

// E755 Black v5
kits_in_stock = pushToInventory(E755BLKBLUv05, kits_in_stock, 1);
kits_in_stock = pushToInventory(E755BLKORAv05, kits_in_stock, 1);

// Randomizer v2
kits_in_stock = pushToInventory(RecognizerTransOrangeV2, kits_in_stock, 3);
kits_in_stock = pushToInventory(RecognizerTransBlueV2, kits_in_stock, 4);

// mounting bases for 302 quartets
kits_in_stock = pushToInventory(pairmountingbasev2, kits_in_stock, 6);

// E765 Black
kits_in_stock = pushToInventory(E765blackbluev5, kits_in_stock, 2);
kits_in_stock = pushToInventory(E765blackorangev5, kits_in_stock, 2);

// TOSA shuttle launch
// kits_in_stock = pushToInventory(shuttle_launch_TOSA_compatible_v1, kits_in_stock, 1);

// TOSA Voyager
// kits_in_stock = pushToInventory(Voyager_TOSA_compatible_v1, kits_in_stock, 1);

// TOSA Hubble
// kits_in_stock = pushToInventory(Hubble_TOSA_compatible_v1, kits_in_stock, 1);


// console.log("\n\nADDING EXTRA WANTED KITS:");
// E755 White
// kits_in_stock = pushToInventory(e755WhtBluV03withwall, kits_in_stock, 6);
// kits_in_stock = pushToInventory(e755WhtOraV03withwall, kits_in_stock, 6);

// E755 Black
// kits_in_stock = pushToInventory(e755BlkBluV03withwall, kits_in_stock, 6);
// kits_in_stock = pushToInventory(e755BlkOraV03withwall, kits_in_stock, 7);


// inventory calculations:
var remainder_parts = [];
remainder_parts = pushToInventory(orders, remainder_parts);
remainder_parts = pushToInventory(parts_in_stock, remainder_parts);
remainder_parts = pullFromInventory(kits_sold, remainder_parts);
remainder_parts = pullFromInventory(kits_in_stock, remainder_parts);

// console.log("\n\nCOUNTED INVENTORY AFTER ALL ADJUSTMENTS:");
// listInventory(remainder_parts);

console.log("\n\nPARTS LIST TO ORDER:");
const ol = createOrderList(remainder_parts);

const wantedList = partListToBricklinkXml(ol);
if (wantedList) {
  console.log('\n--------\nBricklink wanted list format:\n----------\n', wantedList);
}

console.log("---------- COMPLETE ----------");




