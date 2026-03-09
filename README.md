
# Community Event Finder

Community Event Finder is a full-stack web application that allows users to discover, create, and manage community events. The platform supports two types of users: participants who can explore and join events, and organizers who can create events and manage attendees.

This project demonstrates full-stack development using modern technologies and follows a scalable and modular backend architecture with a responsive frontend user interface.

---

## Live Demo

Frontend: (https://community-event-finder.netlify.app/)  
Backend API: (https://communityeventfinder.onrender.com)

---

## Project Overview

Community Event Finder enables users to easily participate in local community activities while providing organizers with tools to manage and monitor their events efficiently.

Participants can browse available events, request to join them, and track their participation status. Organizers can create and manage events, approve or reject join requests, and monitor event statistics through a dashboard.

The platform includes authentication, role-based authorization, an RSVP approval system, and a calendar-based event viewer.

---

## Key Features

### Authentication System
User registration and login with JWT-based authentication.  
Email verification using OTP codes sent through email.  
Role-based access control for organizers and participants.  
Protected routes for authenticated actions.

### Event Management
Organizers can create, update, close, and delete events.  
Ownership validation ensures only event creators can modify their events.  
Events support location details, participant limits, and scheduling.  
Past events cannot be created or modified.

### Participation System
Participants can send join requests to events.  
Organizers can approve or reject participant requests.  
Users can track their request status (pending or approved).  
Participants cannot join the same event multiple times.

### Dashboard and Activity
Organizers have a dashboard that shows event statistics including total events, open events, and closed events.  
Both organizers and participants can view their activity through a unified **My Activity** page.

### Calendar View
Users can visualize events in a calendar format and navigate between months to see upcoming or scheduled events.

### User Interface
Responsive design optimized for desktop and mobile devices.  
Role-based navigation that changes depending on user permissions.  
Interactive event cards and clean UI components.

---

## Technology Stack

### Frontend
React.js  
TypeScript  
Tailwind CSS  
React Router  
TanStack React Query  
Lucide Icons

### Backend
Node.js  
Express.js  
TypeScript  
MongoDB  
Mongoose  
JWT Authentication  
Nodemailer for email verification  
Zod for DTO validation

---

## Backend Architecture

The backend follows a modular layered architecture that separates responsibilities for maintainability and scalability.

Controller → Service → Model

Additional layers include DTO validation using Zod, centralized error handling, authentication middleware, role-based authorization, and utility helper functions.

This structure ensures that business logic is separated from routing logic and database operations.

---

## Project Structure

CommunityEventFinder

BACKEND  
└── src  
    ├── config  
    ├── controllers  
    ├── services  
    ├── models  
    ├── routes  
    ├── middleware  
    ├── dto  
    ├── utils  
    ├── ERRORHANDLER  
    └── types  

FRONTEND  
└── src  
    ├── components  
    ├── pages  
    ├── services  
    ├── hooks  
    ├── router  
    └── layouts  

README.md

---

## Backend Setup

Navigate to the backend folder

cd BACKEND

Install dependencies

npm install

Create a `.env` file inside the BACKEND folder with the following variables

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
JWT_EXPIRE=7d  

EMAIL_USER=your_email_address  
EMAIL_PASS=your_email_app_password  

Run the development server

npm run dev

Backend server runs at

http://localhost:5000

API Base URL

http://localhost:5000/api

---

## Frontend Setup

Navigate to the frontend folder

cd FRONTEND

Install dependencies

npm install

Create a `.env` file

VITE_API_URL=http://localhost:5000

Start the development server

npm run dev

Frontend runs at

http://localhost:5173

---

## API Endpoints

Authentication

POST /auth/register  
POST /auth/login  
POST /auth/verify-email  
GET /auth/profile  

Events

GET /events  
GET /events/:id  
POST /events  
PUT /events/:id  
DELETE /events/:id  
PATCH /events/:id/close  

Participation

POST /events/:id/join  
PATCH /events/:eventId/approve/:userId  
PATCH /events/:eventId/reject/:userId  
GET /events/my-events  
GET /events/calendar  

---

## Security Features

JWT authentication system  
Role-based authorization  
Protected API routes  
Event ownership validation  
Duplicate join prevention  
Email verification for new users  

---

## Screens Included

Landing Page  
Login and Registration  
Browse Events  
Event Details  
Create Event  
Edit Event  
Organizer Dashboard  
My Activity  
Calendar View  
Profile Page  

---

## Future Improvements

Event image support  
Map integration for event locations  
Advanced search filters  
Real-time notifications  
Event categories and tagging  

---

## Author

Kuldeep Singh  

Software Developer Intern at HelperSetu  

GitHub  
https://github.com/skepttalk

---

## Repository

https://github.com/skepttalk/CommunityEventFinder

---

## License

This project is created for educational and portfolio purposes.