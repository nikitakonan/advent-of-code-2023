const fs = require('fs');
const sum = require('../../utils/sum');

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
const types = [
  'five of a hand', // 0
  'four of a kind', // 1
  'full house', // 2
  'three of a kind', // 3
  'two pairs', // 4
  'one pair', // 5
  'high card', // 6
];

function sortCards(cardA, cardB) {
  const cardATypeIndex = types.findIndex((t) => cardA.type === t);
  const cardBTypeIndex = types.findIndex((t) => cardB.type === t);
  if (cardATypeIndex === cardBTypeIndex) {
    const aCards = cardA.hand.split('');
    const bCards = cardB.hand.split('');
    for (let i = 0; i < 5; i++) {
      const a = aCards[i];
      const b = bCards[i];
      if (a === b) continue;
      const aIndex = cards.findIndex((c) => c === a);
      const bIndex = cards.findIndex((c) => c === b);
      return bIndex - aIndex;
    }
    return 0;
  }
  return cardBTypeIndex - cardATypeIndex;
}

function replaceJoker(cards, hand) {
  const replaceCandidates = Object.keys(cards).filter((k) => k !== 'J');
  return replaceCandidates.map((candidate) => hand.replaceAll('J', candidate));
}

function getHandType(hand) {
  const cards = hand.split('').reduce((acc, curr) => {
    if (!acc[curr]) {
      acc[curr] = 0;
    }
    acc[curr]++;
    return acc;
  }, {});

  if (Object.keys(cards).includes('J')) {
    const res = replaceJoker(cards, hand)
      .map(getHandType)
      .sort(
        (a, b) =>
          types.findIndex((t) => t === a) - types.findIndex((t) => t === b)
      );
    return res[0];
  }
  const values = Object.values(cards);
  if (values.length === 1) {
    return 'five of a hand';
  } else if (values.length === 2) {
    return values.indexOf(4) !== -1 ? 'four of a kind' : 'full house';
  } else if (values.length === 3) {
    return values.indexOf(3) !== -1 ? 'three of a kind' : 'two pairs';
  } else if (values.length === 4) {
    return 'one pair';
  } else {
    return 'high card';
  }
}

function parseLine(line = '') {
  const [hand, bidTxt] = line.split(' ');
  return {
    hand,
    bid: Number(bidTxt),
  };
}

fs.readFile('./day-7/7-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data
    .toString()
    .split(/\r?\n/)
    .map(parseLine)
    .map((card) => ({ ...card, type: getHandType(card.hand) }))
    .sort(sortCards)
    .map((card, index) => card.bid * (index + 1))
    .reduce(sum);
  console.log(result);
});
