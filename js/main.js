let mem = undefined;

$(document).ready(() => {
  mem = new Memory(30);
  let job = new Job('1', 3, 1, 2);
  let job2 = new Job('2', 1, 1, 2);
  let job3 = new Job('3', 2, 1, 2);
  let job4 = new Job('4', 21, 1, 2);
  mem.addJobByAlgorithm('BEST_FIT', job);
  mem.addJobByAlgorithm('BEST_FIT', job2);
  mem.addJobByAlgorithm('BEST_FIT', job3);
  mem.addJobByAlgorithm('BEST_FIT', job4);
  mem.removeJob(job3);
  mem.addJobByAlgorithm('WORST_FIT', job3);

  renderJobTable(mem.getAllJobsInMemory());

})

$('.start-sim').click(() => {
  mem.defragmentMemory();

  renderJobTable(mem.getAllJobsInMemory());
});