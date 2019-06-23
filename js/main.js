let simul = undefined;

$(document).ready(() => {

})

$('.start-sim').click(() => {
  let memSize = parseInt($('input[name=mem-size]').val().trim()) || 100;
  let algorithm = $('select[name=algorithm]').val() || 'FIRST_FIT';
  let initialJobs = $('textarea').val().trim() || '';

  startSimulUI();

  simul = new Simulation(memSize, algorithm);
  simul.memory.processInitialJobs(initialJobs, algorithm);
  simul.addLog(`**************************************`);
  simul.addLog(`${algorithm}`);
  simul.addLog(`**************************************`);
  simul.updateScreen();

});

$('.next-step').click(() => {
  if(simul) {
    simul.addLog(`**************************************`);
    simul.addLog(`Iniciando T${simul.currentTick + 1}`)
    simul.nextTick();
    simul.updateScreen();
  }
});

$('.defragment').click(() => {
  if(simul) {
    simul.memory.defragmentMemory();
    simul.addLog(`T${simul.currentTick}: compactando a memória`);
    simul.updateScreen();
  }
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
  let endTick = parseInt($('input[name=job-duration]').val().trim()) + simul.currentTick;

  if(!id || !size || !endTick || endTick <= simul.currentTick) {
    alert('Dados inválidos');
    return;
  }

  if(simul.memory.getAllJobsInMemory().filter(e => e.id == id).length
    || simul.memory.waitingList.filter(e => e.id == id).length) {
    alert("Já existe um processo com este ID");
    return;
  }

  let job = new Job(id, size, simul.currentTick, endTick);
  let added = simul.memory.addJobByAlgorithm(simul.algorithm, job);
  if(added == -1) {
    simul.memory.defragmentMemory();
    added = simul.memory.addJobByAlgorithm(simul.algorithm, job);
    if(added == -1) {
      simul.addLog(`T${simul.currentTick}: espaço livre não encontrado para o processo ${id}`);
    } else {
      simul.addLog(`T${simul.currentTick}: espaço livre encontrado e alocado na posição ${added} da memória`);
    }
  } else {
    simul.addLog(`T${simul.currentTick}: espaço livre encontrado e alocado na posição ${added} da memória`);
  }
  simul.updateScreen();
});