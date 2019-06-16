class Job {
  constructor(id, size, startTick, duration, startSlot) {
    this.id = id;
    this.size = size;
    this.startTick = startTick;
    this.duration = duration;
    this.startSlot = startSlot;
    this.remainingTicks = duration;
  }
}