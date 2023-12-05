function parseCardLine(line = '') {
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

module.exports = parseCardLine;
