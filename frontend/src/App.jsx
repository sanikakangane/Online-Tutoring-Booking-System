import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import StudentDashboard from "./pages/StudentDashboard"
import TutorDashboard from "./pages/TutorDashboard"
import TutorDetails from "./pages/TutorDetails"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/student"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/tutor-dashboard"
                    element={<TutorDashboard />}
                />

                <Route
                    path="/tutor/:id"
                    element={<TutorDetails />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App