import fs from 'fs';
import * as path from 'path';


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
    console.log('\n\n-------');
    console.log(`${orderFile}: ${orderFile.endsWith('nr.xml')?"NOT received":"Received"}`);
    if (!orderFile.endsWith('.xml')) {
      console.log('not an orderfile, SKIPPING: ', orderFile);
    } else if (orderFile.endsWith('nr.xml') && includeOrdersNotReceived == false ) {
      console.log('skipping file as NOT RECEIVED:', orderFile);
    } else {
      console.log('processing order file into inventory ', orderFile);
      order = bricklinkXmlToPartList(`./${orderFolder}/${orderFile}`);
      
      inv = pushToInventory(order, inv);
    }
    console.log('-------');
  });
  return inv;
}

export function loadPartsListsFromFolder(folder='kits') {
  let inv = [];
  let kit;
  let kits = {};

  const kitFolder = `./${folder}/`;
  console.log("\n------------\nLoading in kits from xml:")
  fs.readdirSync(kitFolder).forEach(kitFile => {
    console.log(`\n------------\nreading file ${kitFile}`);
    kit = bricklinkXmlToPartList(`./${kitFolder}/${kitFile}`);
    // console.log('\n\n\n-------\nkitFile:');
    // print(kit);
    const key = kitFile.split('.')[0];
    kits[key] = kit;
    console.log("------------\n");
    // console.log('kits');
    // console.log(kits);
  });
  return kits;
}