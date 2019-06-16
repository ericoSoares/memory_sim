function renderMemoryStack(slots) {
  let mem = $('.stack');
  mem.html('');
  let str = '';
  let height = 100 / slots.length;
  for(let i = 0; i < slots.length; i++) {
    if(slots[i] == 'EMPTY') {
      str += `
        <div class="stack-slot empty-slot" style="height: ${height}%; background: white;">VAZIO</div>
      `;
    } else {
      str += `
        <div class="stack-slot occupied-slot" style="height: ${height}%; background: ${slots[i].color}">${slots[i].id}</div>
      `;
    }
  }
  mem.html(str);
}

function renderJobTable(jobs) {
  let table = $('.mem-job-table tbody');
  table.html('');
  let str = '';
  for(let i = 0; i < jobs.length; i++) {
    str += `
      <tr>
        <td>${jobs[i].id}</td>
        <td>${jobs[i].size}</td>
        <td>${jobs[i].positionInMemory}</td>
        <td>${jobs[i].startTick}</td>
        <td>${jobs[i].duration}</td>
        <td>X</td>
      </tr>
    `
  }
  table.html(str);
}

function updateUI(mem) {
  renderJobTable(mem.getAllJobsInMemory());
  renderMemoryStack(mem.slots);
}

function randomColor() {
  return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}