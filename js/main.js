let simul = undefined;

// Inicia a simulação
$('.start-sim').click(() => {
  // Pega os dados da simulação informados pelo usuario
  let memSize = parseInt($('input[name=mem-size]').val().trim()) || 100;
  let algorithm = $('select[name=algorithm]').val() || 'FIRST_FIT';
  let initialJobs = $('textarea').val().trim() || '';

  // Inicializa interface gráfica responsavel pela simulação
  startSimulUI();

  // Instancia um novo objeto de simulação, processando os processos iniciais
  simul = new Simulation(memSize, algorithm);
  simul.memory.processInitialJobs(initialJobs, algorithm);
  simul.addLog(`**************************************`);
  simul.addLog(`${algorithm}`);
  simul.addLog(`**************************************`);
  simul.updateScreen();

});

// Lógica para chamar a proxima unidade de tempo
$('.next-step').click(() => {
  if(simul) {
    // Se simulação está em andamento, loga qual unidade de tempo está sendo iniciada, chama a função e atualiza a interface
    simul.addLog(`**************************************`);
    simul.addLog(`Iniciando T${simul.currentTick + 1}`)
    simul.nextTick();
    simul.updateScreen();
  }
});

// Chamada da função de compactação de memória
$('.defragment').click(() => {
  if(simul) {
    simul.memory.defragmentMemory();
    simul.addLog(`T${simul.currentTick}: compactando a memória`);
    simul.updateScreen();
  }
});

// Encerra simulação e limpa a tela
$('.stop-sim').click(() => {
  if(confirm('Encerrar simulação?')) {
    resetUI();
    simul = undefined;
  }
});

// Trata a adição manual de processos
$('.add-job-btn').click(() => {
  // Pega os dados do novo processo nos inputs da tela
  let id = $('input[name=job-id]').val().trim();
  let size = parseInt($('input[name=job-size]').val().trim());
  let endTick = parseInt($('input[name=job-duration]').val().trim()) + simul.currentTick;

  // Tratamentos
  if(!id || !size || !endTick || endTick <= simul.currentTick) {
    alert('Dados inválidos');
    return;
  }

  if(simul.memory.getAllJobsInMemory().filter(e => e.id == id).length
    || simul.memory.waitingList.filter(e => e.id == id).length) {
    alert("Já existe um processo com este ID");
    return;
  }

  // Cria o novo processo e adiciona na memoria, fazendo compactação se necessario
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