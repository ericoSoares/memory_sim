class Memory {
	constructor(size) {
		this.slots = new Array(size).fill("EMPTY");
		this.size = size;
		this.waitingList = [];
	}

	addJobByAlgorithm(algorithm, job) {
		let pos = -1;
		switch (algorithm) {
			case 'FIRST_FIT':
				pos = this.getFirstFitSlot(job.size);
				console.log(pos);
				if (pos != -1) {
					job.positionInMemory = pos;
					this.storeJob(job, pos);
				} else {
					this.waitingList.push(job);
				}
				break;
			case 'BEST_FIT':
				pos = this.getBestFitSlot(job.size);
				if (pos != -1) {
					job.positionInMemory = pos;
					this.storeJob(job, pos);
				} else {
					this.waitingList.push(job);
				}
				break;
			case 'WORST_FIT':
				pos = this.getWorstFitSlot(job.size);
				if (pos != -1) {
					job.positionInMemory = pos;
					this.storeJob(job, pos);
				} else {
					this.waitingList.push(job);
				}
				break;
		}

		renderMemoryStack(this.slots);
	}

	getFirstFitSlot(size) {
		let slots = this.getAllEmptySlots();
		for (var slot of slots) {
			if (slot.end - slot.start >= size)
				return slot.start;
		}
		return -1;
	}

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

	getAllJobsInMemory() {
		let jobs = [];
		for (let slot of this.slots) {
			if (slot != 'EMPTY' && !jobs.includes(slot)) {
				jobs.push(slot);
			}
		}
		return jobs;
	}

	storeJob(job, start) {
		this.slots.fill(job, start, start + job.size);
	}

	removeJob(job) {
		this.slots = this.slots.map(e => {
			if (e == 'EMPTY')
				return 'EMPTY';
			else if (e.id == job.id)
				return 'EMPTY';
			else
				return e;
		})

		renderMemoryStack(this.slots);
	}

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