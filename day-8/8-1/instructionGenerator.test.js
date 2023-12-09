const instructionGenerator = require('./instructionGenerator');

const instructions = instructionGenerator('RL');

let current = 0;
const count = 4;
for (const instruction of instructions) {
  current++;
  if (current === count + 1) {
    return;
  }

  console.log(instruction);
}
