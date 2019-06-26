class Memory {
	constructor(size) {
		this.slots = new Array(size).fill("EMPTY");
		this.size = size;
		this.waitingList = [];
	}

	// Adiciona um processo à memória de acordo com o algoritmo escolhido, 
	// Caso não consiga adicionar o elemento, adiciona o mesmo na lista de espera e retorna -1
	// Caso contrário, retorna a posição que o processo foi adicionado
	addJobByAlgorithm(algorithm, job) {
		let pos = -1;
		switch (algorithm) {
			case 'FIRST_FIT':
				pos = this.getFirstFitSlot(job.size);
				if (pos != -1) {
					job.positionInMemory = pos;
					this.storeJob(job, pos);
				} 
				break;
			case 'BEST_FIT':
				pos = this.getBestFitSlot(job.size);
				if (pos != -1) {
					job.positionInMemory = pos;
					this.storeJob(job, pos);
				} 
				break;
			case 'WORST_FIT':
				pos = this.getWorstFitSlot(job.size);
				if (pos != -1) {
					job.positionInMemory = pos;
					this.storeJob(job, pos);
				} 
				break;
		}

		renderMemoryStack(this.slots);
		return pos;
	}

	// Encontra a posição de memória ideal para o processo usando FIRST FIT
	getFirstFitSlot(size) {
		let slots = this.getAllEmptySlots();
		for (var slot of slots) {
			if (slot.end - slot.start >= size)
				return slot.start;
		}
		return -1;
	}

	// Encontra a posição de memória ideal para o processo usando BEST FIT
	getBestFitSlot(size) {
		let slots = this.getAllEmptySlots();
		let bestSlot = -1;
		let bestSlotSize = Number.POSITIVE_INFINITY;
		for (var slot of slots) {
			let curSlotSize = slot.end - slot.start;
			if (curSlotSize >= size && curSlotSize < bestSlotSize) {
				bestSlotSize = curSlotSize;
				bestSlot = slot.start;
			}
		}
		return bestSlot;
	}

	// Encontra a posição de memória ideal para o processo usando WORST FIT
	getWorstFitSlot(size) {
		let slots = this.getAllEmptySlots();
		let worstSlot = -1;
		let worstSlotSize = Number.NEGATIVE_INFINITY;
		for (var slot of slots) {
			let curSlotSize = slot.end - slot.start;
			if (curSlotSize >= size && curSlotSize > worstSlotSize) {
				worstSlotSize = curSlotSize;
				worstSlot = slot.start;
			}
		}
		return worstSlot;
	}

	// Compactação da memória, move todos os processos para posições contiguas
	defragmentMemory() {
		let jobs = this.getAllJobsInMemory();
		this.slots = this.slots.map(e => 'EMPTY');
		for (let i = 0; i < jobs.length; i++) {
			let pos = this.getFirstFitSlot(jobs[i].size);
			if (pos != -1) {
				jobs[i].positionInMemory = pos;
				this.storeJob(jobs[i], this.getFirstFitSlot(jobs[i].size));
			}
		}

		renderMemoryStack(this.slots);
	}

	// Retorna lista de todos os processos atualmente na memoria
	getAllJobsInMemory() {
		let jobs = [];
		for (let slot of this.slots) {
			if (slot != 'EMPTY' && !jobs.includes(slot)) {
				jobs.push(slot);
			}
		}
		return jobs;
	}

	// Função que realmente salva o processo na lista de espaços da memoria
	storeJob(job, start) {
		this.slots.fill(job, start, start + job.size);
	}

	// Processamento do input inicial da simulação
	processInitialJobs(jobs, algorithm) {
		// Extrai os processos
		jobs = jobs.split('\n').map(e => e.trim()).filter(e => e != '');

		// Tratamento de dados
		if(jobs.length % 4 != 0) {
			alert('Input incial inválido');
			return false;
		}

		// Cria os processos e adiciona à lista de espera
		for(let i = 0; i < jobs.length; i += 4) {
			let jobName = jobs[i];
			let jobSize = parseInt(jobs[i + 1]);
			let jobStart = parseInt(jobs[i + 2]);
			let jobDuration = jobStart + parseInt(jobs[i + 3]);
			let newJob = new Job(jobName, jobSize, jobStart, jobDuration);
			this.addToWaitingList(newJob);
		}
		return true;
	}

	//Processamento de uma nova unidade de tempo da simulação
	processNextTick(algorithm, tick) {
		let jobsInMemory = this.getAllJobsInMemory();
		//Atualiza a duração dos processos em memória, removendo os que estão expirados
		for(let job of jobsInMemory) {
			if(job.endTick == tick) {
				this.removeJob(job.id);
			}
		}

		//Processa fila de espera, tentando adicionar os processos
		// Caso não consiga adicionar o processo, compacta memoria e tenta de novo
		for(let i = 0; i < this.waitingList.length; i++) {
			let job = this.waitingList[i];
			if(job.startTick == tick){
				let added = this.addJobByAlgorithm(algorithm, job);
				simul.addLog(`T${simul.currentTick}: procurando espaço livre para ${job.id} (${job.size} bytes)`);
				if(added == -1) {
					simul.addLog(`T${simul.currentTick}: espaço livre não encontrado para ${job.id} (${job.size} bytes), compactando memória`);
					this.defragmentMemory();
					added = this.addJobByAlgorithm(algorithm, job);
					if(added != -1) {
						this.waitingList = this.waitingList.filter(e => e.id != job.id);
						simul.addLog(`T${simul.currentTick}: espaço livre encontrado e alocado na posição ${added} da memória`);
					} else {
						simul.addLog(`T${simul.currentTick}: não há espaço livre disponível, processo excluído`);
						simul.lostJobs++;
						this.waitingList = this.waitingList.filter(e => e.id != job.id);
					}
				} else {
					this.waitingList = this.waitingList.filter(e => e.id != job.id);
					simul.addLog(`T${simul.currentTick}: espaço livre encontrado e alocado na posição ${added} da memória`);
				}
			}
		}
	}

	// Remove processo da memória
	removeJob(id) {
		let currentJob = this.getAllJobsInMemory().filter(e => e.id == id)[0];
		this.slots = this.slots.map(e => {
			if (e == 'EMPTY')
				return 'EMPTY';
			else if (e.id == id)
				return 'EMPTY';
			else
				return e;
		})

		simul.addLog(`T${simul.currentTick}: desalocando ${id} (${currentJob.size} bytes)`);
		renderMemoryStack(this.slots);
	}

	// Remove processo da lista de espera
	removeFromWaitList(id) {
		let currentJob = this.waitingList.filter(e => e.id == id)[0];
		this.waitingList = this.waitingList.filter(e => e.id != id);
	}

	addToWaitingList(job) {
		let exists = this.waitingList.filter(e => e.id == job.id).length > 0;
		if(!exists) {
			this.waitingList.push(job);
		}
	}
	
	// Returona lista com todos os buracos vazios na memória
	getAllEmptySlots() {
		let auxList = this.slots.map(e => (e == 'EMPTY' ? '0' : '1'));
		let slotList = [];
		let regex = /0+/g;
		let match = null;
		while ((match = regex.exec(auxList.join(""))) != null) {
			slotList.push({ start: match.index, end: match.index + match[0].length })
		}
		return slotList;
	}
}