function* instructionGenerator(instructions = '') {
  const instructionArray = instructions.split('');
  if (instructionArray.length === 0) {
    return;
  }
  let nextIndex = 0;
  while (true) {
    yield instructionArray[nextIndex];
    ++nextIndex;
    if (nextIndex === instructionArray.length) {
      nextIndex = 0;
    }
  }
}

module.exports = instructionGenerator;
