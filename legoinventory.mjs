
import fs from 'fs';
import * as path from 'path';

const verboseLogging = false;

function verbose(message) {
  if (verboseLogging) {
    console.log(message);
  }
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

export function pullFromInventory(partList, inventory) {
  verbose('\n-------\nPulling from inventory:\n-------\n', partList);
  const partListHash = createPartListHash(partList);
  const inventoryHash = createPartListHash(inventory);
  for (let p in partListHash) {
    if(inventoryHash[p]) {
      inventoryHash[p] = inventoryHash[p] - partListHash[p];
    } else {
      inventoryHash[p] = -partListHash[p];
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
    if(inventoryHash[p]) {
      inventoryHash[p] = inventoryHash[p] + partListHash[p];
    } else {
      inventoryHash[p] = partListHash[p];
    }
  }
  const inv = unpackPartListHash(inventoryHash);;
  verbose('\n-------\nInventory after push:\n-------\n',inv);
  return inv;
}

function bricklinkXmlToPartListParse(xml) {
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
      console.log('adding part from bricklink partlist', part);
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
    // console.error(err);
  }
}

export function createOrderList(inventory) {
  let ol = inventory.filter( (item) => item[2] < 0).map( (item) => [ item[0], item[1], -item[2] ] );
  if(ol.length === 0){
    ol = "Nothing to order 😺";
  }
  console.log('\n-------\nOrder list:\n-------\n', ol);
  console.log('-------\n');
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
  console.log('\n--------\nBricklink wanted list format:\n----------\n',xml);
  return xml;
}




