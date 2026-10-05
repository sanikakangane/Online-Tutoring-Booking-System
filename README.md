# Online Tutoring Booking System

A full-stack web-based tutoring platform that connects students with tutors. Students can browse tutors, view their subjects and available time slots, and book tutoring sessions. Tutors can manage their subjects, add availability, and view their booked sessions.

The system uses React.js for the frontend, Node.js and Express.js for the backend, and MongoDB with Mongoose for database management.

---

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
- Prevention of overlapping session bookings
- MongoDB database integration
- REST API using Node.js and Express.js
- Responsive frontend interface

---

## Project Objective

The main objective of this project is to provide an online platform where students can easily find tutors and book tutoring sessions based on tutor availability.

The system also prevents overlapping bookings, making the scheduling process organized and reliable.

---

## Student Workflow

    Home
      ↓
    Register / Login
      ↓
    Student Dashboard
      ↓
    Browse Tutors
      ↓
    View Tutor Details
      ↓
    View Available Slots
      ↓
    Book Session
      ↓
    My Sessions

---

## Tutor Workflow

    Home
      ↓
    Register / Login
      ↓
    Tutor Dashboard
      ↓
    Add Subjects
      ↓
    Add Availability
      ↓
    View Booked Sessions

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- JSX
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

---

## Project Structure

    ONLINE-TUTORING-BOOKING-SYSTEM/
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
    ├── Online_Tutoring_Session_Booking_System_Report.pdf
    │
    └── README.md

---

## Backend

The backend is developed using Node.js and Express.js.

The backend handles:

- User registration
- User login
- Authentication
- Tutor information
- Tutor availability
- Session booking
- Session retrieval
- Overlapping booking validation
- Communication with MongoDB

The backend runs on:

    http://localhost:7979

---

## Backend Folder Structure

### middleware

#### auth.js

The `auth.js` file contains authentication middleware.

It verifies the JWT token sent by the frontend and allows authenticated users to access protected routes.

### models

The `models` folder contains the Mongoose schemas and models used to store data in MongoDB.

#### Student.js

The `Student.js` model stores student account information such as:

- Name
- Email
- Password
- Role

#### Tutor.js

The `Tutor.js` model stores tutor information such as:

- Name
- Email
- Password
- Role
- Subjects
- Available time slots

#### Session.js

The `Session.js` model stores tutoring session information such as:

- Student
- Tutor
- Subject
- Date
- Start time
- End time

### routes

The `routes` folder contains the API routes of the application.

#### auth.js

Handles:

- Student registration
- Tutor registration
- Login
- JWT token generation

#### tutors.js

Handles:

- Getting all tutors
- Getting a specific tutor
- Adding tutor availability

#### sessions.js

Handles:

- Booking tutoring sessions
- Getting sessions of the logged-in user
- Checking overlapping bookings

### server.js

`server.js` is the main entry point of the backend.

It is responsible for:

- Starting the Express server
- Connecting to MongoDB
- Loading environment variables
- Enabling CORS
- Using Express middleware
- Registering API routes

The backend server runs on port:

    7979

---

## Frontend

The frontend is developed using React.js and Vite.

The frontend provides the user interface through which students and tutors interact with the system.

---

## Frontend Folder Structure

### components

#### Navbar.jsx

Provides the navigation bar used throughout the application.

#### TutorCard.jsx

Displays tutor information in a card format.

Tutor cards allow students to view tutors and access their details.

### pages

#### Home.jsx

The main landing page of the application.

It introduces the tutoring platform and provides navigation to registration and login.

#### Login.jsx

Provides the login form for students and tutors.

The user enters:

- Email
- Password

After successful login, the user is redirected according to their role.

#### Register.jsx

Provides registration functionality for new students and tutors.

#### StudentDashboard.jsx

Provides the main dashboard for students.

Students can:

- Browse tutors
- View available slots
- Book sessions
- View their booked sessions

#### TutorDashboard.jsx

Provides the main dashboard for tutors.

Tutors can:

- Manage their subjects
- Add availability
- View booked sessions

#### TutorDetails.jsx

Displays detailed information about a selected tutor.

Students can view:

- Tutor name
- Subjects
- Available time slots

Students can then select an available slot and book a session.

---

## API Endpoints

The backend provides REST API endpoints for authentication, tutors, and sessions.

### Authentication

#### Register

    POST /auth/register

Registers a new student or tutor.

#### Login

    POST /auth/login

Authenticates the user and returns a JWT token.

### Tutors

#### Get All Tutors

    GET /tutors

Returns the list of available tutors.

#### Get Specific Tutor

    GET /tutors/:id

Returns information about a specific tutor.

#### Add Tutor Availability

    POST /tutors/:id/slots

Allows a tutor to add available time slots.

### Sessions

#### Book Session

    POST /sessions/book

Allows a student to book an available tutoring session.

#### Get My Sessions

    GET /sessions/my

Returns the sessions associated with the logged-in user.

---

## Authentication

The application uses JWT (JSON Web Token) for authentication.

When a user successfully logs in:

    User Login
        ↓
    Backend verifies email and password
        ↓
    JWT token is generated
        ↓
    Token is sent to frontend
        ↓
    Frontend stores the token
        ↓
    Token is sent with protected requests

Protected requests use the HTTP Authorization header:

    Authorization: Bearer <token>

The `auth.js` middleware verifies the token before allowing access to protected routes.

---

## Password Security

Passwords are not stored directly in the database.

The application uses `bcryptjs` to hash passwords before storing them.

The basic process is:

    User Password
          ↓
       bcryptjs
          ↓
    Hashed Password
          ↓
       MongoDB

During login, the entered password is compared with the stored hashed password.

---

## Role-Based Access

The system supports two user roles:

    Student
    Tutor

The role determines what functionality the user can access.

### Student

Students can:

- Register
- Login
- Browse tutors
- View tutor details
- View available slots
- Book sessions
- View their sessions

### Tutor

Tutors can:

- Register
- Login
- Add subjects
- Add availability
- View booked sessions

---

## Booking System

Students can book tutoring sessions only through the tutor's available time slots.

When a student attempts to book a session, the backend checks whether the selected time overlaps with an existing booking.

For example:

    Existing Session:
    10:00 AM - 11:00 AM

The following booking is not allowed:

    10:30 AM - 11:30 AM

because the two sessions overlap.

However, adjacent sessions are allowed:

    10:00 AM - 11:00 AM
    11:00 AM - 12:00 PM

The second session starts exactly when the first session ends, so there is no overlap.

---

## Overlapping Session Prevention

The system checks the following conditions before creating a booking:

    New Start Time < Existing End Time
    AND
    New End Time > Existing Start Time

If both conditions are true, the sessions overlap and the booking is rejected.

This prevents two students from booking the same tutor at overlapping times.

---

## Database

MongoDB is used as the database for this project.

MongoDB stores:

- Student information
- Tutor information
- Subjects
- Tutor availability
- Tutoring sessions

Mongoose is used to connect the Node.js application with MongoDB and define the structure of the stored data.

MongoDB Atlas is used as the cloud database platform.

---

## Application Architecture

    React Frontend
          │
          │ fetch()
          ↓
    Express.js API
          │
          ↓
       Node.js
          │
          │ Mongoose
          ↓
     MongoDB Atlas

---

## Frontend to Backend Communication

The React frontend communicates with the backend using REST API requests.

For example:

    React
      ↓
    fetch()
      ↓
    POST /auth/login
      ↓
    Express Route
      ↓
    Authentication Logic
      ↓
    MongoDB
      ↓
    Response
      ↓
    React

Protected requests include the JWT token in the Authorization header.

---

## Environment Variables

The backend uses a `.env` file for sensitive configuration.

Example:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=7979

The `.env` file should not be uploaded to GitHub because it contains sensitive information.

---

## Installation

### 1. Clone the Repository

    git clone <your-github-repository-url>
    cd Online-Tutoring-Booking-System

### 2. Install Backend Dependencies

Open the terminal and run:

    cd backend
    npm install

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=7979

Replace the values with your MongoDB connection string and JWT secret.

### 4. Start the Backend

Inside the `backend` folder, run:

    node server.js

The backend will run on:

    http://localhost:7979

### 5. Install Frontend Dependencies

Open another terminal and navigate to the frontend folder:

    cd frontend
    npm install

### 6. Start the Frontend

Run:

    npm run dev

Vite will provide a local URL, usually similar to:

    http://localhost:5173

Open the URL in the browser to access the application.

---

## Application Flow

### Student Flow

    Home
       ↓
    Register / Login
       ↓
    Student Dashboard
       ↓
    Browse Tutors
       ↓
    Select Tutor
       ↓
    Tutor Details
       ↓
    Available Slots
       ↓
    Select Slot
       ↓
    Book Session
       ↓
    My Sessions

### Tutor Flow

    Home
       ↓
    Register / Login
       ↓
    Tutor Dashboard
       ↓
    Add Subjects
       ↓
    Add Available Slots
       ↓
    View Booked Sessions

---

## User Roles

### Student

A student can:

- Create an account
- Login securely
- Browse available tutors
- View tutor details
- View tutor subjects
- View available time slots
- Book tutoring sessions
- View booked sessions

### Tutor

A tutor can:

- Create an account
- Login securely
- Add subjects
- Add available time slots
- View booked tutoring sessions

---

## Frontend Design

The frontend provides a clean and responsive interface.

The design includes:

- Modern typography
- Navy and orange color scheme
- Responsive layouts
- Navigation bar
- Tutor cards
- Authentication forms
- Student dashboard
- Tutor dashboard
- Tutor details page
- Available time-slot cards
- Mobile-friendly design

---

## Main Technologies and Their Purpose

| Technology | Purpose |
|---|---|
| React.js | Builds the frontend user interface |
| Vite | Development and build tool for React |
| React Router | Handles navigation between pages |
| JavaScript | Application logic |
| Node.js | Runs the backend |
| Express.js | Creates the REST API |
| MongoDB | Stores application data |
| Mongoose | Connects Node.js with MongoDB |
| JWT | Handles user authentication |
| bcryptjs | Hashes passwords |
| dotenv | Manages environment variables |
| CORS | Allows frontend-backend communication |

---

## Important Concepts Used

### REST API

A REST API allows the frontend and backend to communicate using HTTP methods such as:

- GET
- POST
- PUT
- PATCH
- DELETE

This project mainly uses:

- GET
- POST

### HTTP GET

GET is used to retrieve data.

Example:

    GET /tutors

This retrieves the list of tutors.

### HTTP POST

POST is used to send data to the backend.

Example:

    POST /sessions/book

This sends booking information to the backend.

### JWT

JWT stands for JSON Web Token.

It is used to verify that a user is authenticated when accessing protected routes.

### Middleware

Middleware is a function that runs between the incoming request and the final route handler.

In this project, the authentication middleware verifies the JWT token before allowing access to protected routes.

### Mongoose

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

It is used to:

- Define schemas
- Create models
- Store data
- Retrieve data
- Update data
- Delete data

---

## Project Report

The project also includes the project report:

    Online_Tutoring_Session_Booking_System_Report.pdf

The report contains the documentation and details of the Online Tutoring Booking System.

---

## Future Improvements

The project can be extended with additional features such as:

- Online video tutoring
- Tutor ratings and reviews
- Payment integration
- Email notifications
- Session reminders
- Search and filter tutors
- Tutor profile pictures
- Calendar integration
- Session cancellation
- Rescheduling functionality
- Admin dashboard
- Tutor verification

---

## Author

**Sanika Kangane 👩🏻‍💻**

B.Tech CSE  
ITM Skills University

---

## Project Summary

The Online Tutoring Booking System provides a simple platform for students and tutors to manage tutoring sessions online.

Students can find tutors, check availability, and book sessions, while tutors can manage their subjects and availability and view their bookings.

The system combines:

    React.js
        +
    Node.js
        +
    Express.js
        +
    MongoDB
        +
    Mongoose
        +
    JWT Authentication

to create a complete full-stack tutoring booking application.
