$(document).ready(() => {
  let mem = new Memory(10);
  mem.slots = ['EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY','EMPTY'];
  let job = new Job('123', 5, 1, 2);
  let job2 = new Job('12311', 1, 1, 2);
  console.log(mem.getFirstFitSlot(3));
  console.log(job);
  mem.storeJob(job, 2);
  mem.storeJob(job2, 8);
  console.log(mem);
  mem.removeJob(job);
  setTimeout(() => {
  console.log(mem);

  }, 1000)
})

$('.start-sim').click(() => {

});