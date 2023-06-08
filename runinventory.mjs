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


let rev = 0; // revenue

function pushRev(count) {
  if (count == 0) {
    return;
  }
  const price = 32.75 // CAD
  rev += price * count;
}

let inv = createInventoryFromOrders({includeOrdersNotReceived: false}); // not received order files end in nr, i.e. 1762451nr.xml

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
  e755WhtBluV02,
  e755WhtOraV02,
  ex761BlkYelWall,
  ex761BlkAzuWall,
  ex761BlkLimWall,
  ex761BlkPurWall,
  ex761BlkPurAzuWall,
  ex761WhtPurAzuWall,
  ex761WhtAzuWall,
  ex761WhtLimWall,
  ex761PairBlkWhtPurAzu,
  EX761KeithBlackPurpleBlue,
  EX761KeithWhitePurpleBlue,
  EX763ChromeLightBlue20221219,
  EX763ChromeNeonGreen20221219,
  RecognizerTransOrange20221219, // first batch randomoizers
  RecognizerTransLightBlue20221219, // first batch randomoizers
  E755_BLKBLU_WALLONLY,
  E755_BLKORA_WALLONLY,
  E755_WHTBLU_WALLONLY,
  E755_WHTORA_WALLONLY,
  E755BLKORAv023, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, NO WALL
  E755BLKBLUv023, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, NO WALL
  e755WhtBluV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  e755WhtOraV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  e755BlkBluV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  e755BlkOraV03withwall, // single 2x2 slope inverted, standardized tail round tile lights, no 2x4 slopes, WITH WALL
  em282quartet, //classic 1982 colors
  em302duo, // 2009 colors orange and azure
  minirandomizerduo, // 2009 colors orange and azure
  RecognizerTransOrangeV2, // second version, cost reduced, May 2023
  RecognizerTransBlueV2,

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
inv = pullFromInventory(e753Blu, inv);
inv = pullFromInventory(e753Wht, inv);
inv = pullFromInventory(e753Blu, inv);
inv = pullFromInventory(e753Red, inv);
inv = pullFromInventory(e753Wht, inv);
pushRev(5);

// 30 mar 2021
inv = pullFromInventory(e753Wht, inv);
pushRev(1);

// 3 apr 202
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 2 apr 2021
inv = pullFromInventory(e753Wht, inv);
pushRev(1);

// 5 apr 2021
inv = pullFromInventory(e753Wht, inv);
pushRev(1);

// 16 apr 202
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 25 apr 2021
inv = pullFromInventory(e753Red, inv);
inv = pullFromInventory(e753Blu, inv);
pushRev(2);

// 27 apr 2021
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 30 apr 2021
inv = pullFromInventory(e753Wht, inv);
pushRev(1);

// 2 may 2021
inv = pullFromInventory(e753Red, inv);
pushRev(1);

// 10 may 2021
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(1);

// 19 may 2021
inv = pullFromInventory(e753Blu, inv);
pushRev(1);

// 15 july 2021
inv = pullFromInventory(e753Wht, inv);
pushRev(1);

// 21 july 2021
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(1);

// 6 august 2021
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);
pushRev(2);

// EV and Rus
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 16 Aug 2021
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);
pushRev(2);

// 20 Aug 2021
inv = pullFromInventory(e753Red, inv);
inv = pullFromInventory(e755Ora, inv);
pushRev(2);

// 23 Aug 2021
inv = pullFromInventory(e753Red, inv);
inv = pullFromInventory(e753Blu, inv);
pushRev(2);

// 16 Sep 2021
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755WhtOra, inv);
pushRev(2);

// 10 Oct 2021
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);
pushRev(2);

// 25 Oct 2021
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);
pushRev(2);

// 6 Nov 2021
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(1);

// 14 Nov 2021
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(1);

// 15 Nov 2021
inv = pullFromInventory(e753Blu, inv);
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(2);

// 16 Nov 2021
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 17 Nov 2021
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);
pushRev(2);

// 21 Nov 2021
inv = pullFromInventory(e755WhtBlu, inv); // note this has black mirrors, entered into the DLS list below
pushRev(1);

// 25 Nov 2021
inv = pullFromInventory(e755WhtOra, inv); // note this has black mirrors, entered into the DLS list below
inv = pullFromInventory(e755WhtBlu, inv); // note this has black mirrors, entered into the DLS list below
pushRev(2);

// 29 Nov 2021
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 30 Nov 2021
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 12 Dec 2021
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(2);

// 14 Dec 2021
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(2);

// 17 Dec 2021
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755Azu, inv);
pushRev(2);

// 1 Jan 2022
inv = pullFromInventory(e753Blu, inv);
inv = pullFromInventory(e753Red, inv);
pushRev(2);

// 8 Jan
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);
pushRev(2);

// 20 Jan
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(2)

// 21 Jan
inv = pullFromInventory(e755WhtBlu, inv);
pushRev(1)

//31 Jan
inv = pullFromInventory(e755Ora, inv);

// 8 feb
inv = pullFromInventory(ex761BlkYelWall, inv);
inv = pullFromInventory(ex761BlkAzuWall, inv);

// 9 Feb
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755Azu, inv);

// 12 Feb
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755Azu, inv);

//12 Feb
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755Azu, inv);

//10 April
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);

//30 May
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);

//20 Oct
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);

//28 Oct
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

//31 Oct
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

// 5 Nov
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755WhtBlu, inv);

// 15 Nov
// inv = pullFromInventory(EX761KeithBlackPurpleBlue, inv); //seems these orders were lost during the move in terms of xml? omit
// inv = pullFromInventory(EX761KeithWhitePurpleBlue, inv);

// 20 nov
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

// 25 Nov
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755Azu, inv);

// 1 Dec
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755WhtOra, inv);

// 6 Dec
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

// 12 Dec
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755Ora, inv);
inv = pullFromInventory(e755WhtOra, inv);

// 13 Dec
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755Azu, inv);

// 14 Dec
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

// 16 Dev
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);

// 4 Jan
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755WhtBlu, inv);

// 5 Jan 2023
inv = pullFromInventory(e755WhtBlu, inv);
inv = pullFromInventory(e755WhtOra, inv);
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

// 31 Jan 2023
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755Ora, inv);

// 5 Feb 2023
inv = pullFromInventory(e755Azu, inv);
inv = pullFromInventory(e755WhtBluV02, inv);

// 18 Feb 2023
inv = pullFromInventory(E755BLKBLUv023, inv);

// 19 Feb 2023
inv = pullFromInventory(E755BLKORAv023, inv);
inv = pullFromInventory(e755WhtOraV02, inv);

// 6 Mar 2023
inv = pullFromInventory(E755BLKORAv023, inv, 4);
inv = pullFromInventory(E755BLKBLUv023, inv, 4);
inv = pullFromInventory(E755_BLKBLU_WALLONLY, inv, 4);
inv = pullFromInventory(E755_BLKORA_WALLONLY, inv, 4);

// 9 Mar 2023
inv = pullFromInventory(E755BLKORAv023, inv);
inv = pullFromInventory(e755WhtOraV02, inv);

// 21 Mar 2023
inv = pullFromInventory(E755BLKORAv023, inv, 1);
inv = pullFromInventory(E755BLKBLUv023, inv, 1);

// 29 Mar 2023
inv = pullFromInventory(E755BLKORAv023, inv, 1);
inv = pullFromInventory(E755BLKBLUv023, inv, 1);
inv = pullFromInventory(E755_BLKBLU_WALLONLY, inv, 1);
inv = pullFromInventory(E755_BLKORA_WALLONLY, inv, 1);

// 12 April 2023
inv = pullFromInventory(RecognizerTransLightBlue20221219, inv, 1);
inv = pullFromInventory(RecognizerTransOrange20221219, inv, 1);

// 15 April 2023
inv = pullFromInventory(RecognizerTransOrange20221219, inv, 1);

// 18 April 2023
inv = pullFromInventory(e755WhtBluV03withwall, inv, 1);
inv = pullFromInventory(e755WhtOraV03withwall, inv, 1);

// 20 April 2023
inv = pullFromInventory(e755WhtBluV03withwall, inv, 1);
inv = pullFromInventory(e755WhtOraV03withwall, inv, 1);

// 22 April 2023
inv = pullFromInventory(e755WhtBluV03withwall, inv, 1);
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);

// 13 May 2023
inv = pullFromInventory(RecognizerTransLightBlue20221219, inv, 1);

// 19 May 2023
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);

// 20 May 2023
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);

// 26 May 2023
inv = pullFromInventory(e755BlkOraV03withwall, inv, 1);
inv = pullFromInventory(e755BlkBluV03withwall, inv, 1);


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
  ['41766', 11, 1],
  ['41531', 11, 1],
  ['41531', 1, 1],
  ['41669', 11, 2],
  ['32062', 11, 8] // axle 2L
];

console.log("\n\nremoving substandard parts...");
var substandard = bricklinkXmlToPartListParse(
  partListToBricklinkXml(dls)
);
inv = pullFromInventory(substandard, inv);
console.log("...complete\n\n");

/** quick color ref
1   white
4   orange
11  black
85  dark bluish grey
85  light bluish grey
15  trans light blue
98  trans orange
*/


// let's list current inventory first before figuring out what we need:
// listInventory(inv);

//
// stock
//

// EM282 1982 micro cycle quartet with stands:
inv = pullFromInventory(em282quartet, inv, 2);

// em302duos, 8 pairs black with orange+blue
inv = pullFromInventory(em302duo, inv, 8);

// minirandomizerduo 10 pairs orange+blue
inv = pullFromInventory(minirandomizerduo, inv, 8);

// E755 White
inv = pullFromInventory(e755WhtBluV03withwall, inv, 10);
inv = pullFromInventory(e755WhtOraV03withwall, inv, 10);

// E755 Black
inv = pullFromInventory(e755BlkBluV03withwall, inv, 10);
inv = pullFromInventory(e755BlkOraV03withwall, inv, 10);

// E763 white and chrome XL cycles:
inv = pullFromInventory(EX763ChromeLightBlue20221219, inv, 1);
inv = pullFromInventory(EX763ChromeNeonGreen20221219, inv, 1);

// Randomizer v2
inv = pullFromInventory(RecognizerTransOrangeV2, inv, 6);
inv = pullFromInventory(RecognizerTransBlueV2, inv, 0);


const ol = createOrderList(inv);
const wantedList = partListToBricklinkXml(ol);
console.log('\n--------\nBricklink wanted list format:\n----------\n', wantedList);
console.log(`Revenue on stock = CAD$ ${rev}`);


