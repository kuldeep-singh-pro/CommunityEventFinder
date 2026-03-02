# Community Event Finder

A full-stack web application for discovering, creating, and managing community events.

This project is built with a secure and scalable backend architecture using modern technologies and follows a clean modular structure. Frontend implementation will be added next.

---

## 🚀 Project Overview

Community Event Finder allows users to:

- Register and verify email using OTP
- Login securely with JWT authentication
- Browse community events
- Search and filter events
- Join (RSVP) events
- Organizers can create, update, close, and delete events
- View event analytics through a dashboard
- View events in a calendar format

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- OTP Email Verification (Nodemailer)
- Zod for DTO validation
- Modular Service-Based Architecture

### Frontend
(Coming Soon)

---

## 🔐 Authentication & Authorization

- User Registration
- OTP Email Verification (6-digit code)
- JWT-based Login
- Role-based Access Control (Organizer / Participant)
- Protected Routes Middleware
- Ownership validation for event updates and deletion

---

## 📅 Event Management Features

- Create Event (Organizer only)
- Update Event (Owner only)
- Close Event (Owner only)
- Delete Event (Owner only)
- Join Event (RSVP system)
- Auto-close past events
- Search events by title
- Filter events by city
- Filter events by type (today / upcoming)
- Sorting (latest / by date)
- Pagination support
- Popular events using aggregation
- Calendar API (month & year based filtering)
- Geo-location support (latitude & longitude)

---

## 📊 Dashboard Features

Organizer dashboard provides:

- Total events
- Open events
- Closed events
- Total participants
- Popular events ranking

---

## 🏗 Backend Architecture

The backend follows a modular layered architecture:

Controller → Service → Model

Additional Layers:

- DTO Validation Layer (Zod)
- Centralized Error Handling
- JWT Authentication Middleware
- Role-Based Middleware
- Clean Separation of Concerns

---

## 📂 Project Structure


Community/
│
├── BACKEND/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ ├── dto/
│ │ ├── utils/
│ │ ├── ERRORHANDLER/
│ │ └── types/
│ └── package.json
│
├── FRONTEND/ (Coming Soon)
│
└── README.md


---

## ⚙️ Backend Setup Instructions

Navigate to backend folder:

```bash
cd BACKEND

Install dependencies:

npm install

Create a .env file inside BACKEND folder.

Run development server:

npx ts-node-dev src/index.ts

Server runs at:

http://localhost:5000
🔑 Environment Variables

Create a .env file inside the BACKEND directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
📌 API Base URL
http://localhost:5000/api