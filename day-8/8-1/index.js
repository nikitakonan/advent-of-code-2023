const fs = require('fs');
const instructionGenerator = require('./instructionGenerator');

class TreeNode {
  constructor(value) {
    this.value = value;
    this.L = null;
    this.R = null;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }
  insert(node) {}
}

function parseData(lines = []) {
  const data = {
    instructions: '',
    map: new Map(),
    initialPosition: '',
    items: [],
  };
  lines.forEach((line, index) => {
    if (index === 0) {
      data.instructions = line;
    } else if (index === 1) {
      return;
    } else {
      const mapItem = parseMapItem(line);
      if (index === 2) {
        data.initialPosition = mapItem.key;
      }
      data.map.set(mapItem.key, new TreeNode(mapItem.key));
      data.items.push(mapItem);
    }
  });
  return data;
}

function parseMapItem(str = '') {
  const [keyStr, mapStr] = str.split('=');
  const [left, right] = mapStr.replaceAll(/\s|\(|\)|/g, '').split(',');
  return {
    key: keyStr.trim(),
    L: left,
    R: right,
  };
}

const FINISH = 'ZZZ';

fs.readFile('./day-8/8-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data.toString().split(/\r?\n/);
  const { instructions, initialPosition, map, items } = parseData(lines);

  const nodes = items.map((item) => {
    const node = map.get(item.key);
    node.L = map.get(item.L);
    node.R = map.get(item.R);
    return node;
  });
  const root = nodes[0];

  let newNode = root;
  const instr = instructionGenerator(instructions);
  let position = initialPosition;
  let steps = 0;
  // let instruction = instr.next().value;

  for (let instruction of instr) {
    steps++;
    newNode = newNode[instruction];
    console.log(newNode.value);
    if (newNode.value === FINISH) {
      break;
    }
  }

  // while (position !== FINISH) {
  //   console.log(position);
  //   position = map.get(position)[instruction];
  //   instruction = instr.next().value;
  //   steps++;
  // }

  console.log(steps);
});
