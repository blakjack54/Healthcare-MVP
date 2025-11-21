import React from 'react';

const PatientDetails = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Patient Details</h5>
      </div>
      <div className="card-body">
        <h3 className="card-title">{patient.name}</h3>
        <div className="row mt-3">
          <div className="col-md-6">
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
          </div>
          <div className="col-12 mt-2">
            <h6>Medical History</h6>
            <p className="card-text">{patient.medicalHistory || 'No medical history available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

