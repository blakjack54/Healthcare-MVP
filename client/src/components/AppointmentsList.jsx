import React from 'react';

const AppointmentsList = ({ appointments, doctors }) => {
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (appointments.length === 0) {
    return <div className="alert alert-info">No appointments found for this patient.</div>;
  }

  return (
    <div>
      <h5 className="mb-3">Appointments</h5>
      {appointments.map(appointment => (
        <div key={appointment.id} className="card mb-3">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">{formatDate(appointment.dateTime)}</h6>
            <p className="card-text"><strong>Doctor:</strong> {getDoctorName(appointment.doctorId)}</p>
            <p className="card-text"><strong>Reason:</strong> {appointment.reason || 'No reason specified'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;

