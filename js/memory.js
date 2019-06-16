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
		var count = 0;
		var startIndex = 0;
		for (var i = 0; i < this.slots.length; i++) {
			if (this.slots[i] == 'EMPTY') {
				count++;
				if (count >= size) {
					return startIndex;
				}
			} else {
				startIndex = i + 1;
			}

		}
	}

	storeJob(job, start) {
		this.slots.fill(job, start, start + job.size);
	}

	removeJob(job) {
		this.slots = this.slots.map(e => {
			if(e == 'EMPTY')
				return 'EMPTY';
			else if(e.id == job.id)
				return 'EMPTY';
			else
				return e;
		})
	}

	getAllEmptySlots() {
		let slotList = [];
		let auxList = [];
		// Create a list of indexes from memory that are occupied
		for (let i = 0; i < this.slots.length; i++) {
			if(this.slots[i] != 'EMPTY') {
				auxList.push(i);
			}
		}

		// Edge case
		if(auxList.length < 1) {
			slotList.push({start: 0, end: this.slots.length});
			return slotList;
		}
		// Create final list of unoccupied spaces in memory
		let base = 0;
		for(let i = 0; i < auxList.length; i++) {
			if(auxList[i] - base > 0) {
				slotList.push({start: base, end: auxList[i]})
			}
			base = auxList[i] + 1;
		}

		return slotList;
	}
}