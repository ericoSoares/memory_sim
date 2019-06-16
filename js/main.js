$(document).ready(() => {
  let mem = new Memory(10);
  let job = new Job('123', 5, 1, 2);
  let job2 = new Job('12311', 1, 1, 2);
  let job3 = new Job('123311', 1, 1, 2);
  mem.storeJob(job3, 0);
  mem.storeJob(job, 2);
  mem.storeJob(job2, 8);
  console.log(mem.getAllEmptySlots());
  console.log(mem);
})

$('.start-sim').click(() => {

});