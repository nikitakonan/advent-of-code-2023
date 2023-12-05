const fs = require('fs');
const sum = require('../../utils/sum');
const parseCardLine = require('../parseCardLine');

function getPoints({ winningCards, mineCards }) {
  return 0;
}

fs.readFile('./day-4/4-2/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data.toString().split(/\r?\n/).map(parseCardLine);

  console.log(result);
});
