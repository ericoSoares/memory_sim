class Job {
  constructor(id, size, startTick, duration, position) {
    this.id = id;
    this.size = size;
    this.startTick = startTick;
    this.duration = duration;
    this.positionInMemory = position;
    this.remainingTicks = duration;
  }
}