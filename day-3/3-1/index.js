const fs = require('fs');

function isSymbol(char) {
  return /\*|\$|@|\%|\&|\#|\+|-|=|\//.test(char);
}

function isNumber(char) {
  return /[0-9]/.test(char);
}

function isPartNumber({ coords }, symbolsMap) {
  const [[iStart, jStart], [, jEnd]] = coords;
  const leftCoords = `${iStart}-${jStart - 1}`;
  if (symbolsMap.has(leftCoords)) {
    return true;
  }
  const rightCoords = `${iStart}-${jEnd + 1}`;
  if (symbolsMap.has(rightCoords)) {
    return true;
  }
  for (let x = jStart - 1; x <= jEnd + 1; x++) {
    const topCoords = `${iStart - 1}-${x}`;
    if (symbolsMap.has(topCoords)) {
      return true;
    }
    const bottomCoords = `${iStart + 1}-${x}`;
    if (symbolsMap.has(bottomCoords)) {
      return true;
    }
  }
  return false;
}

fs.readFile('./day-3/3-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data
    .toString()
    .split(/\r?\n/)
    .map((x) => x.trim().split(''));

  const symbols = new Map();
  const numbers = [];

  for (let i = 0; i < lines.length; i++) {
    let jTmp = 0;
    let numTmp = '';
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (isNumber(char)) {
        if (numTmp === '') {
          jTmp = j;
        }
        numTmp += char;
        if (j === line.length - 1) {
          numbers.push({
            number: Number(numTmp),
            coords: [
              [i, jTmp],
              [i, j],
            ],
          });
          numTmp = '';
          jTmp = 0;
        }
      } else {
        if (isSymbol(char)) {
          symbols.set(`${i}-${j}`, char);
        }
        if (numTmp !== '') {
          numbers.push({
            number: Number(numTmp),
            coords: [
              [i, jTmp],
              [i, j - 1],
            ],
          });
          numTmp = '';
          jTmp = 0;
        }
      }
    }
  }

  const result = numbers
    .filter((num) => isPartNumber(num, symbols))
    .reduce((a, c) => a + c.number, 0);

  console.log(result);
});
