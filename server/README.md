# 🏥 Healthcare Management System — Backend API

**Proprietary Code**  
This codebase is the intellectual property of **Stealth AI Health Startup** and is provided **solely for the purpose of the live coding interview exercise.**  
**Non-Disclosure:** By accessing this code, you agree **not to share, distribute, or reproduce** any part of it.

## 📘 Overview

This backend simulates a **healthcare management system MVP**.
It is designed for **live coding interview sessions**, providing a realistic production-style API that supports multiple frontend exercises from a single, unified backend.

There is **no authentication**, and all data is stored **in-memory** (no database required).
The goal is to allow candidates to focus on building frontend functionality while interacting with a realistic REST API.

## ⚙️ Tech Stack

- **Node.js 18+**
- **Express.js 4**
- In-memory mock data (no DB)
- Modular routing (`/routes`)
- Ready for local development & integration

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the backend server
```bash
npm start
```

The API server starts by default on **http://localhost:3000**

If you also run the React frontend (from `/frontend`), it will automatically proxy requests to this backend.

## 🧠 Data Model Overview

All data is stored in-memory. There are **three primary entities**:

| Entity | Description | Example Fields |
|:--|:--|:--|
| **Patients** | Basic patient demographics and medical history. | `id`, `name`, `age`, `gender`, `medicalHistory` |
| **Doctors** | Providers with specialties and bios. | `id`, `name`, `specialty`, `bio` |
| **Appointments** | Links patients with doctors and scheduled times. | `id`, `patientId`, `doctorId`, `dateTime`, `reason` |

> Note: Since data is not persisted, any changes (POST/PUT/DELETE) are temporary and reset on server restart.

## 📡 API Endpoints

Base URL: `http://localhost:3000`

### 👩‍⚕️ Patients

| Method | Endpoint | Description |
|:--|:--|:--|
| `GET` | `/patients` | Returns all patients |
| `GET` | `/patients/:id` | Returns one patient by ID |
| `POST` | `/patients` | Creates a new patient |
| `PUT` | `/patients/:id` | Updates an existing patient |
| `DELETE` | `/patients/:id` | Deletes a patient |

### 🩺 Doctors

| Method | Endpoint | Description |
|:--|:--|:--|
| `GET` | `/doctors` | Returns all doctors |
| `GET` | `/doctors/:id` | Returns a single doctor |
| `POST` | `/doctors` | Creates a new doctor |
| `PUT` | `/doctors/:id` | Updates doctor details |
| `DELETE` | `/doctors/:id` | Deletes a doctor |

### 📅 Appointments

| Method | Endpoint | Description |
|:--|:--|:--|
| `GET` | `/appointments` | Returns all appointments |
| `GET` | `/appointments?patientId={id}` | Filter by patient |
| `GET` | `/appointments?doctorId={id}` | Filter by doctor |
| `GET` | `/appointments/:id` | Returns a specific appointment |
| `POST` | `/appointments` | Creates a new appointment |
| `PUT` | `/appointments/:id` | Updates an appointment |
| `DELETE` | `/appointments/:id` | Deletes an appointment |

## 🧩 Folder Structure

```
backend/
├── data.js               # In-memory mock data (patients, doctors, appointments)
├── index.js              # Express app entry point
└── routes/
    ├── patients.js       # Patient endpoints
    ├── doctors.js        # Doctor endpoints
    └── appointments.js   # Appointment endpoints
```

## 🧪 Example Usage (cURL)

### Fetch all patients
```bash
curl http://localhost:3000/patients
```

### Fetch appointments for a patient
```bash
curl http://localhost:3000/appointments?patientId=1
```

### Create a new patient
```bash
curl -X POST http://localhost:3000/patients   -H "Content-Type: application/json"   -d '{"name":"Charlie Kim","age":28,"gender":"Male"}'
```

## 🧾 License and NDA

**Proprietary Code:**  
This repository is owned and operated by **Stealth AI Health Startup**.
It is provided *solely* for evaluation purposes within live technical interviews.

**Non-Disclosure Agreement:**  
By cloning, accessing, or using this repository, you acknowledge that:  
- The code, structure, and assets remain confidential.
- You will not share, distribute, copy, or reproduce any portion of this project.
- Violation of these terms may result in disqualification or further legal action.

---

2025 © Stealth AI Health Startup, All Rights Reserved.
