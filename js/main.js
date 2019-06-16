$(document).ready(() => {
  let mem = new Memory(10);
  let job = new Job('1', 3, 1, 2);
  let job2 = new Job('2', 1, 1, 2);
  let job3 = new Job('3', 2, 1, 2);
  mem.storeJob(job, 2);
  mem.storeJob(job2, 8);
  mem.storeJob(job3, 5);
  mem.defragmentMemory();
  console.log(mem);
})

$('.start-sim').click(() => {

});