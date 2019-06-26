class Simulation {
  constructor(memSize, algorithm) {
    this.currentTick = 0;
    this.algorithm = algorithm;
    this.lostJobs = 0;
    this.memory = new Memory(memSize);
    this.logs = [];
  }

  // Atualiza a interface
  updateScreen() {
    updateUI(this.memory, this.currentTick);
  }

  // Chama a proxima unidade de tempo
  nextTick() {
    this.currentTick++;
    this.memory.processNextTick(this.algorithm, this.currentTick);
  }

  // Cria um novo log
  addLog(msg) {
    this.logs.push(msg);
  }
}