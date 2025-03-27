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

const captureBtn = document.getElementById('capture-btn');
const animalPhoto = document.getElementById('animal-photo');
const photoPreview = document.getElementById('animal-photo-preview');

captureBtn.addEventListener('click', () => {
  animalPhoto.click();
});

animalPhoto.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      photoPreview.src = event.target.result;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

const recordBtn = document.getElementById('record-btn');
const stopBtn = document.getElementById('stop-btn');
const voiceRecording = document.getElementById('voice-recording');

let mediaRecorder;
let audioChunks = [];

recordBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);

function startRecording() {
  audioChunks = [];
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
      
      recordBtn.disabled = true;
      stopBtn.disabled = false;
    })
    .catch(err => {
      console.error('Error accessing microphone:', err);
      alert('Please allow microphone access to record notes');
    });
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach(track => track.stop());
  
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    voiceRecording.src = audioUrl;
    
    recordBtn.disabled = false;
    stopBtn.disabled = true;
  };
}

const saveBtn = document.getElementById('save-btn');
const animalList = document.getElementById('animal-list');

saveBtn.addEventListener('click', () => {
  const animalId = document.getElementById('animal-id').value;
  const animalType = document.getElementById('animal-type').value;
  const animalBreed = document.getElementById('animal-breed').value;
  const animalDob = document.getElementById('animal-dob').value;
  const animalNotes = document.getElementById('animal-notes').value;
  const photo = photoPreview.src;
  const voiceNote = voiceRecording.src;
  
  const missingFields = [];
  if (!animalId) missingFields.push("ID");
  if (!animalType) missingFields.push("Type");
  
  const dobDate = animalDob ? new Date(animalDob) : null;
  const formattedDob = dobDate ? dobDate.toLocaleDateString() : 'Not recorded';
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString();
  
  const recordCard = document.createElement('div');
  recordCard.className = `record-card ${missingFields.length ? 'partial-warning' : ''}`;
  recordCard.innerHTML = `
    <div class="record-header">
      <span class="record-id">${animalId || 'No ID'}</span>
      <span class="record-type">${animalType ? animalType.charAt(0).toUpperCase() + animalType.slice(1) : 'No Type'}</span>
    </div>
    <div class="record-content">
      ${animalBreed ? `<p><strong>Breed:</strong> ${animalBreed}</p>` : ''}
      ${formattedDob !== 'Not recorded' ? `<p><strong>DOB:</strong> ${formattedDob}</p>` : ''}
      ${animalNotes ? `<p><strong>Notes:</strong> ${animalNotes}</p>` : ''}
      ${photo ? `<img src="${photo}" style="max-width: 100%; border-radius: 4px; margin: 0.5rem 0;">` : ''}
      ${voiceNote ? `<audio src="${voiceNote}" controls style="width: 100%; margin-top: 0.5rem;"></audio>` : ''}
      ${missingFields.length ? `
        <div class="missing-field">
          <i class="fas fa-exclamation-triangle"></i> Missing: ${missingFields.join(', ')}
        </div>
      ` : ''}
      <div style="font-size: 0.8rem; color: var(--gray); margin-top: 0.5rem;">
        ${dateString} ${timeString}
      </div>
    </div>
  `;
  
  animalList.prepend(recordCard);
  
  const message = missingFields.length 
    ? 'Record saved (missing ' + missingFields.join(', ') + ')'
    : 'Record saved successfully';
  
  alert(message);
});