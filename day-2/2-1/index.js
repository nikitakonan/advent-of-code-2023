const fs = require('fs');

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseLine(line) {
  const [gameStr, turnsStr] = line.split(':');
  const gameId = Number(gameStr.trim().split(' ')[1]);

  return {
    gameId,
    grabs: turnsStr.split(';').map((turn) =>
      turn
        .split(',')
        .map((x) => x.trim().split(' '))
        .reduce((acc, curr) => {
          if (!acc[curr[1]]) {
            acc[curr[1]] = {};
          }
          acc[curr[1]] = +curr[0];
          return acc;
        }, {})
    ),
  };
}

function isGamePossible(game, cubes) {
  return game.grabs.every((grab) => {
    return Object.keys(cubes).every((key) => {
      const value = cubes[key];
      const actual = grab[key] || 0;
      return actual <= value;
    });
  });
}

fs.readFile('./day-2/2-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const inputJson = data.toString().split(/\r?\n/).map(parseLine);
  const result = inputJson
    .filter((game) => isGamePossible(game, cubes))
    .reduce((a, b) => a + b.gameId, 0);

  console.log(result);
});
