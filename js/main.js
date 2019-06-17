let simul = undefined;

$(document).ready(() => {
  /* mem = new Memory(30);
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

  renderJobTable(mem.getAllJobsInMemory()); */

})

$('.start-sim').click(() => {
  let memSize = parseInt($('input[name=mem-size]').val().trim()) || 100;
  let algorithm = $('select[name=algorithm]').val() || 'FIRST_FIT';
  let initialJobs = $('textarea').val().trim() || '';

  startSimulUI();

  simul = new Simulation(memSize, algorithm);
  simul.memory.processInitialJobs(initialJobs, algorithm);
  simul.updateScreen();
});

$('.defragment').click(() => {
  if(simul)
    simul.memory.defragmentMemory();
});

$('.stop-sim').click(() => {
  if(confirm('Encerrar simulação?')) {
    resetUI();
    simul = undefined;
  }
});

$('.add-job-btn').click(() => {
  let id = $('input[name=job-id]').val().trim();
  let size = parseInt($('input[name=job-size]').val().trim());
  let duration = parseInt($('input[name=job-duration]').val().trim());

  console.log(id);
  console.log(size);
  console.log(duration);
  if(!id || !size || !duration) {
    alert('Dados inválidos');
    return;
  }

  let job = new Job(id, size, simul.currentTick, duration);
  simul.memory.addJobByAlgorithm(simul.algorithm, job);
  updateUI(simul.memory);
});