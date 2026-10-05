# Online Tutoring Booking System

A web-based tutoring platform that connects students with tutors. Students can browse tutors, view available time slots, and book tutoring sessions. Tutors can manage their subjects, add availability, and view their booked sessions.

## Features

- Student registration and login
- Tutor registration and login
- Role-based access for students and tutors
- JWT-based authentication
- Password hashing using bcryptjs
- Browse available tutors
- View tutor details and subjects
- Tutors can add availability
- Students can view available time slots
- Students can book tutoring sessions
- Students can view their booked sessions
- Tutors can view booked sessions
- Prevent overlapping session bookings
- MongoDB database integration
- REST API using Node.js and Express
- Responsive frontend interface

## Student Workflow

Home → Register/Login → Student Dashboard → Browse Tutors → View Tutor → View Available Slots → Book Session → My Sessions

## Tutor Workflow

Home → Register/Login → Tutor Dashboard → Add Availability → View Booked Sessions

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcryptjs
- dotenv
- CORS

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

## Project Structure

```text
ONLINE-TUTORING-BOOKING/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── Session.js
│   │   ├── Student.js
│   │   └── Tutor.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── sessions.js
│   │   └── tutors.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── TutorCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── TutorDashboard.jsx
│   │   │   └── TutorDetails.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Backend API

The backend runs on:

`http://localhost:7979`

### Authentication

- `POST /auth/register` — Register a new student or tutor
- `POST /auth/login` — Login as a student or tutor

### Tutors

- `GET /tutors` — Get all tutors
- `GET /tutors/:id` — Get a specific tutor
- `POST /tutors/:id/slots` — Add tutor availability

### Sessions

- `POST /sessions/book` — Book a tutoring session
- `GET /sessions/my` — Get the logged-in user's sessions

## Database

MongoDB is used to store users, tutors, and tutoring sessions.

### Student

The student model stores student account information.

### Tutor

The tutor model stores:

- Name
- Email
- Password
- Role
- Subjects
- Available time slots

### Session

The session model stores:

- Student
- Tutor
- Subject
- Date
- Start time
- End time

## Authentication

The system uses JWT authentication for protected routes.

Passwords are hashed using bcryptjs before being stored in the database.

The JWT token is stored on the frontend and sent with protected API requests using the Authorization header.

## Booking System

Students can book tutoring sessions only through the tutor's available time slots.

The system also checks for overlapping bookings.

For example, if a tutor already has a session from 10:00 AM to 11:00 AM, another session from 10:30 AM to 11:30 AM cannot be booked because the times overlap.

Adjacent sessions are allowed:

10:00 AM - 11:00 AM

11:00 AM - 12:00 PM

## Installation

### Clone the Repository

```bash
git clone <your-github-repository-url>
cd Online-Tutoring-Booking
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=7979
```

### Start the Backend

```bash
node server.js
```

### Install Frontend Dependencies

Open another terminal:

```bash
cd Online-Tutoring-Booking/frontend
npm install
```

### Start the Frontend

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Application Flow

### Student

Home → Login/Register → Student Dashboard → Browse Tutors → Tutor Details → Available Slots → Book Session → My Sessions

### Tutor

Home → Login/Register → Tutor Dashboard → Add Availability → View Booked Sessions

## User Roles

### Student

Students can:

- Register and login
- Browse tutors
- View tutor information
- View available time slots
- Book tutoring sessions
- View their booked sessions

### Tutor

Tutors can:

- Register and login
- Add subjects
- Add available time slots
- View booked sessions

## Frontend Design

The frontend provides a clean and professional interface with:

- Modern typography
- Navy and orange color scheme
- Responsive layouts
- Tutor cards
- Authentication forms
- Student dashboard
- Tutor dashboard
- Tutor details page
- Available time-slot cards
- Mobile-friendly design

## Author

**Sanika Kangane 👩🏻‍💻**
