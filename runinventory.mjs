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
  RecognizerTransOrange20221219,
  RecognizerTransLightBlue20221219,


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
pushRev(5);

// 30 mar 2021
inv = pullFromInventory(e753Wht,inv);
pushRev(1);

// 3 apr 202
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 2 apr 2021
inv = pullFromInventory(e753Wht,inv);
pushRev(1);

// 5 apr 2021
inv = pullFromInventory(e753Wht,inv);
pushRev(1);

// 16 apr 202
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 25 apr 2021
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e753Blu,inv);
pushRev(2);

// 27 apr 2021
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 30 apr 2021
inv = pullFromInventory(e753Wht,inv);
pushRev(1);

// 2 may 2021
inv = pullFromInventory(e753Red,inv);
pushRev(1);

// 10 may 2021
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(1);

// 19 may 2021
inv = pullFromInventory(e753Blu,inv);
pushRev(1);

// 15 july 2021
inv = pullFromInventory(e753Wht,inv);
pushRev(1);

// 21 july 2021
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(1);

// 6 august 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);
pushRev(2);

// EV and Rus
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 16 Aug 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);
pushRev(2);

// 20 Aug 2021
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e755Ora,inv);
pushRev(2);

// 23 Aug 2021
inv = pullFromInventory(e753Red,inv);
inv = pullFromInventory(e753Blu,inv);
pushRev(2);

// 16 Sep 2021
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755WhtOra,inv);
pushRev(2);

// 10 Oct 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);
pushRev(2);

// 25 Oct 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);
pushRev(2);

// 6 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(1);

// 14 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(1);

// 15 Nov 2021
inv = pullFromInventory(e753Blu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(2);

// 16 Nov 2021
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 17 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);
pushRev(2);

// 21 Nov 2021
inv = pullFromInventory(e755WhtBlu,inv); // note this has black mirrors, entered into the DLS list below
pushRev(1);

// 25 Nov 2021
inv = pullFromInventory(e755WhtOra,inv); // note this has black mirrors, entered into the DLS list below
inv = pullFromInventory(e755WhtBlu,inv); // note this has black mirrors, entered into the DLS list below
pushRev(2);

// 29 Nov 2021
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 30 Nov 2021
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 12 Dec 2021
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(2);

// 14 Dec 2021
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(2);

// 17 Dec 2021
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755Azu,inv);
pushRev(2);

// 1 Jan 2022
inv = pullFromInventory(e753Blu,inv);
inv = pullFromInventory(e753Red,inv);
pushRev(2);

// 8 Jan
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);
pushRev(2);

// 20 Jan
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(2)

// 21 Jan
inv = pullFromInventory(e755WhtBlu,inv);
pushRev(1)

//31 Jan
inv = pullFromInventory(e755Ora,inv);

// 8 feb
inv = pullFromInventory(ex761BlkYelWall, inv);
inv = pullFromInventory(ex761BlkAzuWall, inv);

// 9 Feb
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755Azu,inv);

// 12 Feb
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755Azu,inv);

//12 Feb
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755Azu,inv);

//10 April
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

//30 May
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);

//20 Oct
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);

//28 Oct
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);

//31 Oct
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);

// 5 Nov
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755WhtBlu,inv);

// 15 Nov
// inv = pullFromInventory(EX761KeithBlackPurpleBlue,inv); //seems these orders were lost during the move in terms of xml? omit
// inv = pullFromInventory(EX761KeithWhitePurpleBlue,inv);

// 20 nov
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);

// 25 Nov
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755Azu,inv);

// 1 Dec
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 6 Dec
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);

// 12 Dec
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755Ora,inv);
inv = pullFromInventory(e755WhtOra,inv);

// 13 Dec
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755Azu,inv);

// 14 Dec
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);

// 16 Dev
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);

// 4 Jan
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755WhtBlu,inv);

// 5 Jan 2023
inv = pullFromInventory(e755WhtBlu,inv);
inv = pullFromInventory(e755WhtOra,inv);
inv = pullFromInventory(e755Azu,inv);
inv = pullFromInventory(e755Ora,inv);


//
// stock
//

inv = pullFromInventory(e755WhtBluV02, inv, 5);
inv = pullFromInventory(e755WhtOraV02, inv, 2);
inv = pullFromInventory(e755Azu, inv, 10);
inv = pullFromInventory(e755Ora, inv, 1);

inv = pullFromInventory(EX763ChromeLightBlue20221219, inv, 1);
inv = pullFromInventory(EX763ChromeNeonGreen20221219, inv, 1);
inv = pullFromInventory(RecognizerTransLightBlue20221219, inv, 1);
inv = pullFromInventory(RecognizerTransOrange20221219, inv, 1);

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
console.log(`Revenue on stock = CAD$ ${rev}`);


