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
        <td>${jobs[i].duration}</td>
        <td>X</td>
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
        <td>${jobs[i].duration}</td>
        <td>X</td>
      </tr>
    `
  }
  table.html(str);
}

function startSimulUI() {
  $('input[name=mem-size]').prop("disabled", true);
  $('select[name=algorithm]').prop("disabled", true);
  $('textarea').prop("disabled", true);
  $('.start-sim').prop("disabled", true);

  $('.simulation-controls').removeClass('hidden');
  $('.new-job').removeClass('hidden');
}

function updateUI(mem) {
  renderJobTable(mem.getAllJobsInMemory());
  renderMemoryStack(mem.slots);
  renderWaitTable(mem.waitingList);
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



function randomColor() {
  return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', 0.5)';
}