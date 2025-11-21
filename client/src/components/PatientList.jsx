import React from 'react';

const PatientList = ({ patients, selectedPatientId, onSelectPatient }) => {
  return (
    <div className="list-group">
      {patients.map(patient => (
        <button
          key={patient.id}
          type="button"
          className={`list-group-item list-group-item-action ${selectedPatientId === patient.id ? 'active' : ''}`}
          onClick={() => onSelectPatient(patient.id)}
        >
          {patient.name}
        </button>
      ))}
      {patients.length === 0 && (
        <div className="list-group-item text-muted">No patients found</div>
      )}
    </div>
  );
};

export default PatientList;

