function renderMemoryStack(slots) {
  let mem = $('.stack');
  mem.html('');
  let str = '';
  let height = 100 / slots.length;
  for(let i = 0; i < slots.length; i++) {
    if(slots[i] == 'EMPTY') {
      str += `
        <div class="stack-slot empty-slot" style="height: ${height}%; background: white;">
          <span class="slot-id">${i}</span> <span class="slot-val">VAZIO</span>
        </div>
      `;
    } else {
      str += `
        <div class="stack-slot occupied-slot" style="height: ${height}%; background: ${slots[i].color}">
          <span class="slot-id">${i}</span> <span class="slot-val">${slots[i].id}</span>
        </div>
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
        <td>${jobs[i].endTick}</td>
        <td class="delete-job btn btn-danger" onclick="deleteFromMemory('${jobs[i].id}')">X</td>
      </tr>
    `
  }
  table.html(str);
}

function renderWaitTable(jobs) {
  let table = $('.inac-job-table tbody');
  table.html('');
  let str = '';
  for(let i = 0; i < jobs.length; i++) {
    str += `
      <tr>
        <td>${jobs[i].id}</td>
        <td>${jobs[i].size}</td>
        <td>${jobs[i].positionInMemory}</td>
        <td>${jobs[i].startTick}</td>
        <td>${jobs[i].endTick}</td>
        <td class="delete-job btn btn-danger" onclick="deleteFromWaitList('${jobs[i].id}')">X</td>
      </tr>
    `
  }
  table.html(str);
}

function renderControlTable(jobs, tick) {
  $('.current-tick').html(tick);
  $('.jobs-count').html(jobs.getAllJobsInMemory().length);
}

function startSimulUI() {
  $('input[name=mem-size]').prop("disabled", true);
  $('select[name=algorithm]').prop("disabled", true);
  $('textarea').prop("disabled", true);
  $('.start-sim').prop("disabled", true);
  $('.current-tick').html('0');
  $('.jobs-count').html('0');
  $('.simulation-controls').removeClass('hidden');
  $('.new-job').removeClass('hidden');
}

function updateUI(mem, tick) {
  renderJobTable(mem.getAllJobsInMemory());
  renderMemoryStack(mem.slots);
  renderWaitTable(mem.waitingList);
  renderControlTable(mem, tick);
}

function resetUI() {
  $('input[name=mem-size]').prop("disabled", false);
  $('select[name=algorithm]').prop("disabled", false);
  $('textarea').prop("disabled", false);
  $('.start-sim').prop("disabled", false);
  
  $('.mem-job-table tbody').html('');
  $('.stack').html('');
  $('.inac-job-table tbody').html('');

  $('.simulation-controls').addClass('hidden');
  $('.new-job').addClass('hidden');
}

function deleteFromWaitList(id) {
  simul.memory.removeFromWaitList(id);
  updateUI(simul.memory, simul.currentTick);
}

function deleteFromMemory(id) {
  simul.memory.removeJob(id);
  updateUI(simul.memory, simul.currentTick);
}

function randomColor() {
  return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', 0.5)';
}