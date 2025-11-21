// API Base URL
const API_BASE_URL = 'http://localhost:3000';

// State management
let patients = [];
let doctors = [];
let selectedPatientId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadDoctors();
    loadPatients();
});

// Load all doctors (we'll need this to display doctor names in appointments)
async function loadDoctors() {
    try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
            throw new Error('Failed to load doctors');
        }
        doctors = await response.json();
    } catch (error) {
        console.error('Error loading doctors:', error);
        // Don't show error to user as this is background loading
    }
}

// Load all patients
async function loadPatients() {
    const loadingEl = document.getElementById('loading-patients');
    const listEl = document.getElementById('patient-list');
    const errorEl = document.getElementById('error-patients');
    
    try {
        loadingEl.style.display = 'block';
        listEl.style.display = 'none';
        errorEl.style.display = 'none';
        
        const response = await fetch(`${API_BASE_URL}/patients`);
        if (!response.ok) {
            throw new Error('Failed to load patients');
        }
        
        patients = await response.json();
        displayPatients(patients);
        
        loadingEl.style.display = 'none';
        listEl.style.display = 'block';
    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.textContent = `Error loading patients: ${error.message}`;
        errorEl.style.display = 'block';
    }
}

// Display patients in the list
function displayPatients(patientsList) {
    const listEl = document.getElementById('patient-list');
    listEl.innerHTML = '';
    
    if (patientsList.length === 0) {
        listEl.innerHTML = '<li class="list-group-item text-muted">No patients found</li>';
        return;
    }
    
    patientsList.forEach(patient => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item list-group-item-action';
        listItem.style.cursor = 'pointer';
        listItem.textContent = patient.name;
        listItem.addEventListener('click', () => selectPatient(patient.id));
        
        // Highlight selected patient
        if (selectedPatientId === patient.id) {
            listItem.classList.add('active');
        }
        
        listEl.appendChild(listItem);
    });
}

// Select a patient and load their details
function selectPatient(patientId) {
    selectedPatientId = patientId;
    
    // Update patient list highlighting
    const listItems = document.getElementById('patient-list').querySelectorAll('li');
    listItems.forEach(item => {
        item.classList.remove('active');
        if (item.textContent === patients.find(p => p.id === patientId)?.name) {
            item.classList.add('active');
        }
    });
    
    // Show patient details section
    document.getElementById('no-selection').style.display = 'none';
    document.getElementById('patient-details-section').style.display = 'block';
    
    // Load patient details and appointments
    loadPatientDetails(patientId);
    loadPatientAppointments(patientId);
}

// Load patient details
async function loadPatientDetails(patientId) {
    const loadingEl = document.getElementById('loading-details');
    const infoEl = document.getElementById('patient-info');
    const errorEl = document.getElementById('error-details');
    
    try {
        loadingEl.style.display = 'block';
        infoEl.style.display = 'none';
        errorEl.style.display = 'none';
        
        const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
        if (!response.ok) {
            throw new Error('Failed to load patient details');
        }
        
        const patient = await response.json();
        
        // Display patient information
        document.getElementById('patient-name').textContent = patient.name || 'N/A';
        document.getElementById('patient-age').textContent = patient.age || 'N/A';
        document.getElementById('patient-gender').textContent = patient.gender || 'N/A';
        document.getElementById('patient-history').textContent = patient.medicalHistory || 'No medical history available';
        
        loadingEl.style.display = 'none';
        infoEl.style.display = 'block';
    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.textContent = `Error loading patient details: ${error.message}`;
        errorEl.style.display = 'block';
    }
}

// Load appointments for a specific patient
async function loadPatientAppointments(patientId) {
    const loadingEl = document.getElementById('loading-appointments');
    const listEl = document.getElementById('appointments-list');
    const noAppointmentsEl = document.getElementById('no-appointments');
    const errorEl = document.getElementById('error-appointments');
    
    try {
        loadingEl.style.display = 'block';
        listEl.style.display = 'none';
        noAppointmentsEl.style.display = 'none';
        errorEl.style.display = 'none';
        
        const response = await fetch(`${API_BASE_URL}/appointments?patientId=${patientId}`);
        if (!response.ok) {
            throw new Error('Failed to load appointments');
        }
        
        const appointments = await response.json();
        
        if (appointments.length === 0) {
            loadingEl.style.display = 'none';
            noAppointmentsEl.style.display = 'block';
        } else {
            displayAppointments(appointments);
            loadingEl.style.display = 'none';
            listEl.style.display = 'block';
        }
    } catch (error) {
        loadingEl.style.display = 'none';
        errorEl.textContent = `Error loading appointments: ${error.message}`;
        errorEl.style.display = 'block';
    }
}

// Display appointments
function displayAppointments(appointments) {
    const listEl = document.getElementById('appointments-list');
    listEl.innerHTML = '';
    
    appointments.forEach(appointment => {
        const appointmentCard = document.createElement('div');
        appointmentCard.className = 'card mb-3';
        
        // Get doctor name
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        const doctorName = doctor ? doctor.name : 'Unknown Doctor';
        
        // Format date/time
        const dateTime = new Date(appointment.dateTime);
        const formattedDateTime = dateTime.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        appointmentCard.innerHTML = `
            <div class="card-body">
                <h6 class="card-title">${formattedDateTime}</h6>
                <p class="card-text mb-1"><strong>Doctor:</strong> ${doctorName}</p>
                <p class="card-text"><strong>Reason:</strong> ${appointment.reason || 'No reason specified'}</p>
            </div>
        `;
        
        listEl.appendChild(appointmentCard);
    });
}

