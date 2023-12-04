const fs = require('fs');
const sum = require('../../utils/sum');

function parseLine(line = '') {
  const [cardTxt, cardsTxt] = line.split(':');
  const cardNumber = Number(cardTxt.split(' ').filter((x) => x !== '')[1]);
  const [winningTxt, mineTxt] = cardsTxt.split('|');

  const winningCards = winningTxt
    .trim()
    .split(' ')
    .filter((x) => x !== '')
    .map(Number);
  const mineCards = mineTxt
    .trim()
    .split(' ')
    .filter((x) => x !== '')
    .map(Number);
  return {
    cardNumber,
    winningCards,
    mineCards,
  };
}

function getPoints({ winningCards, mineCards }) {
  const winCount = mineCards.filter((c) => winningCards.includes(c)).length;
  if (winCount === 0) {
    return 0;
  }
  let res = 1;
  for (let i = 1; i < winCount; i++) {
    res *= 2;
  }
  return res;
}

fs.readFile('./day-4/4-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data
    .toString()
    .split(/\r?\n/)
    .map(parseLine)
    .map(getPoints)
    .reduce(sum);

  console.log(result);
});
