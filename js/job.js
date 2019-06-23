class Job {
  constructor(id, size, startTick, endTick, position) {
    this.id = id;
    this.size = size;
    this.startTick = startTick;
    this.endTick = endTick;
    this.positionInMemory = position;
    this.color = randomColor();
  }
}