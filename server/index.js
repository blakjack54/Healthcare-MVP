const express = require('express');
const path = require('path');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

// Serve frontend static files from "public" directory (for app.js)
app.use(express.static(path.join(__dirname, '..', 'public')));
// Serve frontend static files from "client" directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// Fallback 404 for API requests (if static files didn't catch it and no route matched)
app.use((req, res, next) => {
	if (req.path.startsWith('/')) {
		return res.status(404).json({ error: 'Not found' });
	}
	next();
});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
