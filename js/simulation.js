class Simulation {
  constructor(memSize, algorithm) {
    this.currentTick = 0;
    this.algorithm = algorithm;
    this.memory = new Memory(memSize);
    this.logs = [];
  }

  updateScreen() {
    updateUI(this.memory, this.currentTick);
  }

  nextTick() {
    this.currentTick++;
    this.memory.processNextTick(this.algorithm, this.currentTick);
  }

  addLog(msg) {
    this.logs.push(msg);
  }
}