import fs from 'fs';
import * as path from 'path';

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
} from './partsLists.mjs'

import {
  pullFromInventory,
  pushToInventory,
  createOrderList,
  partListToBricklinkXml,
  bricklinkXmlToPartList,
  print,
} from './legoInventory.mjs'


export function createInventoryFromOrders(opts={includeOrdersNotReceived: true}) {
  const includeOrdersNotReceived = opts.includeOrdersNotReceived;
  const folder = 'orders';
  let inv = [];
  let order;

  const orderFolder = `./${folder}/`;

  fs.readdirSync(orderFolder).forEach(orderFile => {
    console.log(orderFile, orderFile.endsWith('nr.xml'));
    if (!orderFile.endsWith('.xml')) {
      console.log('not an orderfile, SKIPPING: ', orderFile);
    } else if (orderFile.endsWith('nr.xml') && includeOrdersNotReceived == false ) {
      console.log('skipping file as NOT RECEIVED:', orderFile);
    } else {
      console.log('reading order file ', orderFile);
      order = bricklinkXmlToPartList(`./${orderFolder}/${orderFile}`);
      console.log('\n\n\n-------\norderFile: ' + orderFile);
      inv = pushToInventory(order, inv);
    }
  });
  return inv;
}

export function loadPartsListsFromFolder(folder='kits') {
  let inv = [];
  let kit;
  let kits = {};

  const kitFolder = `./${folder}/`;

  fs.readdirSync(kitFolder).forEach(kitFile => {
    console.log('reading file', kitFile);
    kit = bricklinkXmlToPartList(`./${kitFolder}/${kitFile}`);
    // console.log('\n\n\n-------\nkitFile:');
    // print(kit);
    const key = kitFile.split('.')[0];
    kits[key] = kit;
    console.log('kits');
    console.log(kits);
  });
  return kits;
}