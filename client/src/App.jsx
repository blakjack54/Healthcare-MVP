import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import AppointmentsList from './components/AppointmentsList';

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingPatients(true);
        const [patientsRes, doctorsRes] = await Promise.all([
          fetch('/patients'),
          fetch('/doctors')
        ]);

        if (!patientsRes.ok) throw new Error('Failed to fetch patients');
        if (!doctorsRes.ok) throw new Error('Failed to fetch doctors');

        const patientsData = await patientsRes.json();
        const doctorsData = await doctorsRes.json();

        setPatients(patientsData);
        setDoctors(doctorsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!selectedPatientId) {
      setSelectedPatient(null);
      setAppointments([]);
      return;
    }

    const fetchPatientData = async () => {
      try {
        setLoadingDetails(true);
        
        const [patientRes, appointmentsRes] = await Promise.all([
          fetch(`/patients/${selectedPatientId}`),
          fetch(`/appointments?patientId=${selectedPatientId}`)
        ]);

        if (!patientRes.ok) throw new Error('Failed to fetch patient details');
        if (!appointmentsRes.ok) throw new Error('Failed to fetch appointments');

        const patientData = await patientRes.json();
        const appointmentsData = await appointmentsRes.json();

        setSelectedPatient(patientData);
        setAppointments(appointmentsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load patient details');
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchPatientData();
  }, [selectedPatientId]);

  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h1 className="text-center">Healthcare Management System</h1>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-4 mb-4">
          <h3>Patients</h3>
          {loadingPatients ? (
            <div className="text-center">Loading...</div>
          ) : (
            <PatientList 
              patients={patients} 
              selectedPatientId={selectedPatientId} 
              onSelectPatient={setSelectedPatientId} 
            />
          )}
        </div>

        <div className="col-md-8">
          {selectedPatientId ? (
            loadingDetails ? (
              <div className="text-center">Loading details...</div>
            ) : (
              <>
                <PatientDetails patient={selectedPatient} />
                <AppointmentsList appointments={appointments} doctors={doctors} />
              </>
            )
          ) : (
            <div className="alert alert-secondary">
              Select a patient from the list to view details and appointments.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
