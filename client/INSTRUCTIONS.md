# Healthcare Management System MVP – Full Codebase

## Problem Statement

We are developing a simple **Healthcare Management System** as a demo MVP (Minimum Viable Product). This system will manage basic data about patients, doctors, and appointments in a healthcare context. The backend has been implemented to simulate a production-like API (with multiple endpoints and in-memory data) that can support various frontend features. There is no authentication required for API calls, to keep things simple for a live coding scenario.

## Available API Endpoints

The backend provides a variety of endpoints (similar to a real production API) to support multiple features. This way, different front-end tasks can be attempted using the same backend codebase. All endpoints accept and return JSON, and no API keys or tokens are needed. The in-memory mock data includes several patients, doctors, and appointments with placeholder text (lorem ipsum) in some fields to simulate realistic data.

### Patients:

- `GET /patients` – Returns a list of all patients. Each patient object contains fields: `id`, `name`, `age`, `gender`, and `medicalHistory` (a text field with the patient's background/notes).

- `GET /patients/{id}` – Returns the details of a specific patient by ID.

- `POST /patients` – Creates a new patient. Expects a JSON body with at least a `name` (and optionally `age`, `gender`, `medicalHistory`). Returns the created patient object with a new `id`.

- `PUT /patients/{id}` – Updates an existing patient by ID. Expects a JSON body (any of `name`, `age`, `gender`, `medicalHistory`). Returns the updated patient object.

- `DELETE /patients/{id}` – Deletes a patient by ID. (Note: For simplicity, this does not automatically delete related appointments; in a real system, you might handle such cases or prevent deletion if related records exist.)

### Doctors:

- `GET /doctors` – Returns a list of all doctors. Each doctor object has `id`, `name`, `specialty` (field of practice), and `bio` (biography text).

- `GET /doctors/{id}` – Returns details of a specific doctor by ID.

- `POST /doctors` – Creates a new doctor. Requires `name` and `specialty` in the JSON body (`bio` is optional). Returns the created doctor object.

- `PUT /doctors/{id}` – Updates an existing doctor by ID (fields: `name`, `specialty`, `bio`).

- `DELETE /doctors/{id}` – Deletes a doctor by ID. (Does not automatically remove appointments for that doctor in this demo.)

### Appointments:

- `GET /appointments` – Returns all appointments.

  - Supports query parameters for filtering:

    - `GET /appointments?patientId={pid}` – Returns only appointments for the patient with ID `{pid}`.

    - `GET /appointments?doctorId={did}` – Returns only appointments for the doctor with ID `{did}`.

  - Each appointment has `id`, `patientId`, `doctorId`, `dateTime` (scheduled date & time), and `reason` (short description of the appointment).

- `GET /appointments/{id}` – Returns a specific appointment by ID.

- `POST /appointments` – Creates a new appointment. Requires `patientId`, `doctorId`, and `dateTime` in the JSON body (`reason` is optional). Returns the created appointment object.

- `PUT /appointments/{id}` – Updates an existing appointment by ID (allows changing `patientId`, `doctorId`, `dateTime`, or `reason`).

- `DELETE /appointments/{id}` – Deletes an appointment by ID.

All data is stored in-memory on the server (no database). The server runs on **Node.js with Express** and also serves static frontend files for demonstration.

# Your Task

Using the provided backend API, your task is to build a frontend interface that demonstrates one of the core features of the healthcare system. For example, one possible feature is described below (the exact feature to implement may be specified by the interviewer during the session):

- Create a simple web application that displays a list of patients and allows the user to select a patient to view their details and appointments.

  - The patient list should be fetched from the `GET /patients` endpoint and displayed (e.g. as a list of names).

  - When a patient is selected (e.g. by clicking on a name in the list), the application should show that patient's information (name, age, gender, medical history) and a list of their appointments.

  - For each appointment, display the date/time, the doctor's name (you can get the doctor's details via their `id` using the `GET /doctors` endpoint, or by initially loading all doctors), and the appointment reason.

  - If the selected patient has no appointments, display an appropriate "no appointments" message.

- Use the API endpoints to retrieve data dynamically – do not hard-code the data. (For instance, use `GET /appointments?patientId={id}` to fetch appointments for a specific patient.)

- The user interface should be reasonably clear and easy to use. It doesn’t need to be overly styled (using a library like Bootstrap for basic styling is fine), but the information should be organized and readable (for example, list of patients on one side, details on the other).

- You may use vanilla JavaScript or any framework/library you are comfortable with to build the frontend. The key is to correctly utilize the API and update the interface accordingly.

**Note**: The backend is already running (by default at `http://localhost:3000` if you run the provided server). **Do not modify the backend code** during the session; focus on implementing the frontend features.