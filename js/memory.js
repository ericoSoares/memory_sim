class Memory {
	constructor(size) {
		this.slots = new Array(size).fill("EMPTY");
		this.size = size;
	}

	addJob(algorithm, jobs) {
		switch (algorithm) {
			case 'FIRST_FIT':

				break;
			case 'BEST_FIT':
				break;
			case 'WORST_FIT':
				break;
		}
	}

	getFirstFitSlot(size) {
		let slots = this.getAllEmptySlots();
		for (var slot of slots) {
			console.log(slot);
			if (slot.end - slot.start >= size)
				return slot.start;
		}
		return -1;
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
	}

	getAllEmptySlots() {
		let auxList = this.slots.map(e => (e == 'EMPTY' ? '0' : '1'));
		console.log(auxList);
		let slotList = [];
		let regex = /0+/g;
		let match = null;
		while ((match = regex.exec(auxList.join(""))) != null) {
			console.log(match);
			slotList.push({start: match.index, end: match.index + match[0].length})
		}
		return slotList;
	}
}