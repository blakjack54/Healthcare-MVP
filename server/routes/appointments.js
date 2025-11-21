const express = require('express');
const router = express.Router();
const data = require('../data');

// GET all appointments (with optional filters)
router.get('/', (req, res) => {
	let results = data.appointments;
	// Filter by patientId if provided
	if (req.query.patientId) {
		const patientId = parseInt(req.query.patientId);
		results = results.filter(a => a.patientId === patientId);
	}
	// Filter by doctorId if provided
	if (req.query.doctorId) {
		const doctorId = parseInt(req.query.doctorId);
		results = results.filter(a => a.doctorId === doctorId);
	}
	res.json(results);
});

// GET an appointment by ID
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const appointment = data.appointments.find(a => a.id === id);
	if (!appointment) {
		return res.status(404).json({ error: 'Appointment not found' });
	}
	res.json(appointment);
});

// Create a new appointment
router.post('/', (req, res) => {
	const { patientId, doctorId, dateTime, reason } = req.body;
	if (!patientId || !doctorId || !dateTime) {
		return res.status(400).json({ error: 'patientId, doctorId and dateTime are required' });
	}
	// Validate that referenced patient and doctor exist
	const patient = data.patients.find(p => p.id === Number(patientId));
	const doctor = data.doctors.find(d => d.id === Number(doctorId));
	if (!patient) {
		return res.status(400).json({ error: 'Invalid patientId' });
	}
	if (!doctor) {
		return res.status(400).json({ error: 'Invalid doctorId' });
	}
	// Compute new ID
	const newId = data.appointments.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
	const newAppointment = {
		id: newId,
		patientId: Number(patientId),
		doctorId: Number(doctorId),
		dateTime: dateTime,
		reason: reason || ""
	};
	data.appointments.push(newAppointment);
	res.status(201).json(newAppointment);
});

// Update an appointment by ID
router.put('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const appointment = data.appointments.find(a => a.id === id);
	if (!appointment) {
		return res.status(404).json({ error: 'Appointment not found' });
	}
	const { patientId, doctorId, dateTime, reason } = req.body;
	if (patientId !== undefined) {
		// validate new patientId if changing
		const patient = data.patients.find(p => p.id === Number(patientId));
		if (!patient) return res.status(400).json({ error: 'Invalid patientId' });
		appointment.patientId = Number(patientId);
	}
	if (doctorId !== undefined) {
		const doctor = data.doctors.find(d => d.id === Number(doctorId));
		if (!doctor) return res.status(400).json({ error: 'Invalid doctorId' });
		appointment.doctorId = Number(doctorId);
	}
	if (dateTime !== undefined) appointment.dateTime = dateTime;
	if (reason !== undefined) appointment.reason = reason;
	res.json(appointment);
});

// Delete an appointment by ID
router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = data.appointments.findIndex(a => a.id === id);
	if (index === -1) {
		return res.status(404).json({ error: 'Appointment not found' });
	}
	data.appointments.splice(index, 1);
	res.status(204).send();
});

module.exports = router;
