const fs = require('fs');
const sum = require('../../utils/sum');

function hash(str = '') {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    result += code;
    result *= 17;
    result = result % 256;
  }
  return result;
}

fs.readFile('./day-15/15-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data.toString().split(',').map(hash).reduce(sum);
  console.log(result);
});
