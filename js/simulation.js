class Simulation {
  constructor(memSize, algorithm) {
    this.currentTick = 0;
    this.running = false;
    this.algorithm = algorithm;
    this.memory = new Memory(memSize);
    this.logs = [];
  }

  updateScreen() {
    updateUI(this.memory);
  }
}