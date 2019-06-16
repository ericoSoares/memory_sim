class Simulation {
  constructor(memSize) {
    this.currentTick = 0;
    this.memory = new Memory(memSize);
  }
}