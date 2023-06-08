
import fs from 'fs';
import * as path from 'path';
import {
  parts
} from './parts/parts.mjs'

import {
  colors
} from './parts/colors.mjs'

import {
  alsoKnownAs
} from './parts/alsoknownas.mjs'

const verboseLogging = false;

function verbose(message) {
  if (verboseLogging) {
    console.log(message);
  }
}

// there are several parts also known by multiple interchangeable part IDs.
// This uses the alsoKnownAs array to map any of the possible IDs to a single id 
// (the first element in the alsoKnownAs array by arbitrary convention)
function standardizePartId(id) {
  var idStandard = String(id);
  for (let part of alsoKnownAs) {
    if ( part.includes(id) ) {
      idStandard = part[0];
      if(id != idStandard) {
        console.log(`   --- part id ${id} standardized as ${idStandard}`);
      };
    };
  }
  return idStandard;
}

function createPartListHash(partList) {
  // converts ['3022',4,2], (part, colour, qty) to '3022-4':2, i.e. partnumber-colour:qty
  if(partList.length < 1) {
    return {};
  }
  const hashOut = Object.fromEntries( partList.map( (entry) => [ `${entry[0]}-${entry[1]}`, entry[2] ] ) );
  return hashOut;
}

function unpackPartListHash(partListHash) {
  // converts '3022-4':2, i.e. partnumber-colour:qty to ['3022',4,2], (part, colour, qty) 
  let out = Object.entries(partListHash);
  out = out.map( (entry) => [ entry[0].split('-')[0], Number(entry[0].split('-')[1]), entry[1] ] );
  return out;
}

export function pullFromInventory(partList, inventory, qty=1) {
  verbose('\n-------\nPulling from inventory:\n-------\n', partList);
  const partListHash = createPartListHash(partList);
  const inventoryHash = createPartListHash(inventory);
  for (let i=1; i<=qty; i++) {
    for (let p in partListHash) {
      if(p in inventoryHash) {
        inventoryHash[p] = inventoryHash[p] - partListHash[p];
      } else {
        inventoryHash[p] = -partListHash[p];
      }
    }
  }
  const inv = unpackPartListHash(inventoryHash);;
  verbose('\n-------\nInventory after pull:\n-------\n',inv);
  return inv;
}

export function pushToInventory(partList, inventory) {
  verbose('\n-------\nPushing to inventory:\n-------\n', partList);
  const partListHash = createPartListHash(partList);
  const inventoryHash = createPartListHash(inventory);
  for (let p in partListHash) {
    if(p in inventoryHash) {
      inventoryHash[p] = inventoryHash[p] + partListHash[p];
    } else {
      inventoryHash[p] = partListHash[p];
    }
  }
  const inv = unpackPartListHash(inventoryHash);;
  verbose('\n-------\nInventory after push:\n-------\n',inv);
  return inv;
}

export function bricklinkXmlToPartListParse(xml) {
  // <?xml version="1.0" encoding="UTF-8"?>
  /* <INVENTORY>
    <ITEM>
    <ITEMTYPE>P</ITEMTYPE>
    <ITEMID>41769</ITEMID>
    <COLOR>156</COLOR>
    <MAXPRICE>-1.0000</MAXPRICE>
    <MINQTY>1</MINQTY>
    <CONDITION>X</CONDITION>
    <NOTIFY>N</NOTIFY>
    </ITEM> 
  */
  // use regex to strip out everything we don't want at a string level?
  // for each line: so split on \n
  let lines = xml.split('\n');
  verbose(`parsing ${lines.length} lines of xml...`)
  let partList = []; // [str 'partnumber', int color, int qty]
  const excludes = [
    'INVENTORY>',
    '<?xml',
    'ITEMTYPE>',
    'MAXPRICE>',
    'CONDITION>',
    'NOTIFY>',
    '<!--',
  ];
  for (let exclude of excludes) {
    lines = lines.filter( (line) => line.includes(exclude) ? '' : line );
  }
  let part = [];
  for (let line of lines) {
    verbose('parsing line:', line);
    if (line.includes('ITEMID')) {
      part = []; //reset part parser
      let id = line.replace('<ITEMID>', '');
      id = id.replace('</ITEMID>', '');
      const regex = /\s*/ig;
      id = id.replace(regex, '');
      id = standardizePartId(id);
      part.push(id);
    }
    if (line.includes('COLOR')) {
      let color = line.replace('<COLOR>', '');
      color = color.replace('</COLOR>', '');
      part.push(Number(color));
    }
    if (line.includes('MINQTY')) {
      let qty = line.replace('<MINQTY>', '');
      qty = qty.replace('</MINQTY>', '');
      part.push(Number(qty));
      // last item so push part onto partList:
      // console.log('adding part from bricklink partlist', part);
      partList.push(part);
      part = [];
    }
  }
  return partList;
}

export function bricklinkXmlToPartList(filename) {
  try {
    const filepath = path.resolve(filename);
    const data = fs.readFileSync(filepath, 'utf8')
    console.log('Bricklink file read:', filename);
    return bricklinkXmlToPartListParse(data);
  } catch (err) {
    console.error(err);
  }
}

export function createOrderList(inventory) {
  let ol = inventory.filter( (item) => item[2] < 0).map( (item) => [ item[0], item[1], -item[2] ] );
  if(ol.length === 0){
    return null;
  }
  // https://www.bricklink.com/v2/catalog/catalogitem.page?P=54657#T=S&C=11&O={%22color%22:%2211%22,%22iconly%22:0}
  // console.log('\n-------\nOrder list:\n-------\npartno.\tcol\tqty\turl\n----------------------------------\n');
  let table = [];
  for (let part of ol) {
    const url = `https://www.bricklink.com/v2/catalog/catalogitem.page?P=${part[0]}#T=S&C=${part[1]}`;
    const descr = parts[part[0]];
    const color = colors[part[1]];
    // console.log(`${part[0]}\t${part[1]}\t${part[2]}\t${color} ${descr}\t\t[${url}]`);
    let row = {
      "#": part[0] ,
      "Clr": part[1],
      "Qty": part[2],
      "Color": color,
      "Descr": descr,
      "Brick Link": url
    };
    table.push(row);
  }
  // console.log('----------------------------------');
  console.table(table, );
  return ol;
}

export function listInventory(inventory) {

  function sortMethod(c1, c2) {
    let a = c1.Descr;
    let b = c2.Descr;

    if (a > b){
      return 1;
    }
    if (a < b){
      return -1;
    }
    return 0;
  }

  let ol = inventory.filter( (item) => item[2] > -99999).map( (item) => [ item[0], item[1], item[2] ] );
  if(ol.length === 0){
    return null;
  }
  // https://www.bricklink.com/v2/catalog/catalogitem.page?P=54657#T=S&C=11&O={%22color%22:%2211%22,%22iconly%22:0}
  let table = [];
  console.log("LIST OF INVENTORY")
  for (let part of ol) {
    const url = `https://www.bricklink.com/v2/catalog/catalogitem.page?P=${part[0]}#T=S&C=${part[1]}`;
    const descr = parts[part[0]];
    const color = colors[part[1]];
    // console.log(`${part[0]}\t${part[1]}\t${part[2]}\t${color} ${descr}\t\t[${url}]`);
    let row = {
      "#": part[0] ,
      "Clr": part[1],
      "Qty": part[2],
      "Color": color,
      "Descr": descr,
      "Brick Link": url
    };
    table.push(row);
  }
  const tableSorted = table.sort( sortMethod );
  console.table(tableSorted);
  return ol;
}

export function partListToBricklinkXml(partList, name='INVENTORY') {
  if(!Array.isArray(partList)) {
    console.log('partListToBricklinkXml: no parts in list');
    return;
  }
  // in: [str 'partnumber', int color, int qty]
  // out: 
  // <?xml version="1.0" encoding="UTF-8"?>
  /* <INVENTORY>
    <ITEM>
    <ITEMTYPE>P</ITEMTYPE>
    <ITEMID>41769</ITEMID>
    <COLOR>156</COLOR>
    <MAXPRICE>-1.0000</MAXPRICE>
    <MINQTY>1</MINQTY>
    <CONDITION>X</CONDITION>
    <NOTIFY>N</NOTIFY>
    </ITEM> 
  */
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  function partToXml(part) {
    let xml = '';
    xml += `<ITEM>\n`;
    xml += `  <ITEMTYPE>P</ITEMTYPE>\n`;
    xml += `  <ITEMID>${part[0]}</ITEMID>\n`;
    xml += `  <COLOR>${part[1]}</COLOR>\n`;
    xml += `  <MAXPRICE>-1.0000</MAXPRICE>\n`;
    xml += `  <MINQTY>${part[2]}</MINQTY>\n`;
    xml += `  <CONDITION>X</CONDITION>\n`;
    xml += `  <NOTIFY>N</NOTIFY>\n`;
    xml += `</ITEM>\n`;
    return xml;
  }
  let xml = header + `<${name}>\n\n` + partList.map( (part) => partToXml(part) ).join('\n') + `\n</${name}>\n`;
  return xml;
}

export function print(partList) {
  console.log('\n---------\nPrinting parts list\n------------\n');
  for (let part of partList) {
    if(part[2] !== 0){
      console.log(part);
    }
  }
}
