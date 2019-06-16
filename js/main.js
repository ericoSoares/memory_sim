$(document).ready(() => {
  let mem = new Memory(10);
  mem.slots = ['EMaPTY','EMaPTY','EMaPTY','EMaPTY','EMPTY','EMaPTY','EMaPTY','EMaPTY','EMaPTY','EMaPTY'];
  let job = new Job('123', 3, 1, 2);
  console.log(mem.getFirstFitSlot(3));
  console.log(job);
  console.log(mem.getAllEmptySlots());
})

$('.start-sim').click(() => {

});