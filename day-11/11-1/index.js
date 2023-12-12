const fs = require('fs');
const sum = require('../../utils/sum');

function getPairs(galaxies = []) {
  const pairs = [];
  const count = galaxies.length;
  for (let i = 0; i < count - 1; i++) {
    for (let j = i + 1; j < count; j++) {
      pairs.push([galaxies[i], galaxies[j]]);
    }
  }
  return pairs;
}

class Node {
  constructor(position, distance) {
    this.position = position;
    this.distance = distance;
  }
}

function getPositions([x, y]) {
  return [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ];
}

function getShortestPath([{ position: from }, { position: to }]) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);

  const root = new Node(from, 0);
  const visited = new Set();
  const queue = [root];
  visited.add(root.position.toString());

  while (queue.length > 0) {
    const currentRoot = queue.shift();
    if (currentRoot.position.toString() === to.toString()) {
      return currentRoot.distance;
    }
    getPositions(currentRoot.position)
      .filter(([x, y]) => x >= xMin && x <= xMax && y >= yMin && y <= yMax)
      .filter((pos) => !visited.has(pos.toString()))
      .map((pos) => new Node(pos, currentRoot.distance + 1))
      .forEach((node) => {
        queue.push(node);
        visited.add(node.position.toString());
      });
  }
  return 0;
}

fs.readFile('./day-11/11-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const map = data
    .toString()
    .split(/\r?\n/)
    .map((line) => line.split(''));

  const galaxies = [];
  let galaxyId = 1;

  let columnIndexes = [];
  let rowIndexes = [];

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    rowIndexes.push({ index: y, isExpanded: true });
    for (let x = 0; x < row.length; x++) {
      if (y === 0) {
        columnIndexes.push({ index: x, isExpanded: true });
      }
      const el = row[x];
      if (el === '#') {
        rowIndexes[y].isExpanded = false;
        columnIndexes[x].isExpanded = false;
        galaxies.push({ id: galaxyId, position: [x, y] });
        galaxyId++;
      }
    }
  }

  const columnsToExpand = columnIndexes
    .filter((x) => x.isExpanded)
    .map((x) => x.index);
  const rowsToExpand = rowIndexes
    .filter((x) => x.isExpanded)
    .map((x) => x.index);

  galaxies.forEach((galaxy) => {
    let [x, y] = galaxy.position;
    let dx = 0;
    let dy = 0;
    columnsToExpand.forEach((col) => {
      if (col < x) {
        dx++;
      }
    });
    rowsToExpand.forEach((row) => {
      if (row < y) {
        dy++;
      }
    });
    galaxy.position = [x + dx, y + dy];
  });

  const pairs = getPairs(galaxies);
  const result = pairs
    .map((pair, i, arr) => {
      console.log(`get path ${i + 1} of ${arr.length}`);
      return getShortestPath(pair);
    })
    .reduce(sum);
  console.log(result);
});
