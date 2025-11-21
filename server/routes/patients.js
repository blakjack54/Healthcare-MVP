const express = require('express');
const router = express.Router();
const data = require('../data');

// GET all patients
router.get('/', (req, res) => {
	// In a real scenario, might paginate or filter. Here return all.
	res.json(data.patients);
});

// GET a patient by ID
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const patient = data.patients.find(p => p.id === id);
	if (!patient) {
		return res.status(404).json({ error: 'Patient not found' });
	}
	res.json(patient);
});

// Create a new patient
router.post('/', (req, res) => {
	const { name, age, gender, medicalHistory } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Name is required' });
	}
	// Compute new ID (max existing id + 1)
	const newId = data.patients.reduce((max, p) => p.id > max ? p.id : max, 0) + 1;
	const newPatient = {
		id: newId,
		name: name,
		age: age || null,
		gender: gender || null,
		medicalHistory: medicalHistory || ""
	};
	data.patients.push(newPatient);
	res.status(201).json(newPatient);
});

// Update a patient by ID
router.put('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const patient = data.patients.find(p => p.id === id);
	if (!patient) {
		return res.status(404).json({ error: 'Patient not found' });
	}
	const { name, age, gender, medicalHistory } = req.body;
	if (name !== undefined) patient.name = name;
	if (age !== undefined) patient.age = age;
	if (gender !== undefined) patient.gender = gender;
	if (medicalHistory !== undefined) patient.medicalHistory = medicalHistory;
	res.json(patient);
});

// Delete a patient by ID
router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = data.patients.findIndex(p => p.id === id);
	if (index === -1) {
		return res.status(404).json({ error: 'Patient not found' });
	}
	// Optionally, also remove any appointments for this patient
	// (Not removing for simplicity)
	data.patients.splice(index, 1);
	res.status(204).send();
});

module.exports = router;
