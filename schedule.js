const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

menuToggle.addEventListener('click', () => {
  sidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
});

const saveScheduleBtn = document.getElementById('save-schedule-btn');
const scheduleList = document.getElementById('schedule-list');

saveScheduleBtn.addEventListener('click', () => {
  const scheduleDate = document.getElementById('schedule-date').value;
  const scheduleTime = document.getElementById('schedule-time').value;
  const scheduleDescription = document.getElementById('schedule-description').value;
  
  const missingFields = [];
  if (!scheduleDate) missingFields.push("Date");
  if (!scheduleTime) missingFields.push("Time");
  if (!scheduleDescription) missingFields.push("Description");
  
  if (missingFields.length) {
    alert('Please fill in the following fields: ' + missingFields.join(', '));
    return;
  }
  
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString();
  
  const scheduleCard = document.createElement('div');
  scheduleCard.className = 'record-card';
  scheduleCard.innerHTML = `
    <div class="record-header">
      <span class="record-id">${scheduleDate}</span>
      <span class="record-type">${scheduleTime}</span>
    </div>
    <div class="record-content">
      <p><strong>Description:</strong> ${scheduleDescription}</p>
      <div style="font-size: 0.8rem; color: var(--gray); margin-top: 0.5rem;">
        ${dateString} ${timeString}
      </div>
    </div>
  `;
  
  scheduleList.prepend(scheduleCard);
  
  alert('Schedule saved successfully');
});