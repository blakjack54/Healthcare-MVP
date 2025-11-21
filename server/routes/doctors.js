const express = require('express');
const router = express.Router();
const data = require('../data');

// GET all doctors
router.get('/', (req, res) => {
	res.json(data.doctors);
});

// GET a doctor by ID
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const doctor = data.doctors.find(d => d.id === id);
	if (!doctor) {
		return res.status(404).json({ error: 'Doctor not found' });
	}
	res.json(doctor);
});

// Create a new doctor
router.post('/', (req, res) => {
	const { name, specialty, bio } = req.body;
	if (!name || !specialty) {
		return res.status(400).json({ error: 'Name and specialty are required' });
	}
	const newId = data.doctors.reduce((max, d) => d.id > max ? d.id : max, 0) + 1;
	const newDoctor = {
		id: newId,
		name: name,
		specialty: specialty,
		bio: bio || ""
	};
	data.doctors.push(newDoctor);
	res.status(201).json(newDoctor);
});

// Update a doctor by ID
router.put('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const doctor = data.doctors.find(d => d.id === id);
	if (!doctor) {
		return res.status(404).json({ error: 'Doctor not found' });
	}
	const { name, specialty, bio } = req.body;
	if (name !== undefined) doctor.name = name;
	if (specialty !== undefined) doctor.specialty = specialty;
	if (bio !== undefined) doctor.bio = bio;
	res.json(doctor);
});

// Delete a doctor by ID
router.delete('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = data.doctors.findIndex(d => d.id === id);
	if (index === -1) {
		return res.status(404).json({ error: 'Doctor not found' });
	}
	// Optionally, remove appointments for this doctor
	// (Not removing for simplicity)
	data.doctors.splice(index, 1);
	res.status(204).send();
});

module.exports = router;
