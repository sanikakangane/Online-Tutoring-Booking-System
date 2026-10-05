import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function StudentDashboard() {
    const [tutors, setTutors] = useState([])
    const [sessions, setSessions] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const getTutors = async () => {
            try {
                const response = await fetch(
                    "http://localhost:7979/tutors"
                )

                const data = await response.json()

                if (response.ok) {
                    setTutors(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getTutors()
    }, [])

    useEffect(() => {
        const getSessions = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                return
            }

            try {
                const response = await fetch(
                    "http://localhost:7979/sessions/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                const data = await response.json()

                if (response.ok) {
                    setSessions(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getSessions()
    }, [])

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")

        navigate("/login")
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Student Dashboard</h1>

                <button onClick={logout}>
                    Logout
                </button>
            </div>

            <h2>Find a Tutor</h2>

            <div className="card-container">
                {tutors.map((tutor) => (
                    <div className="card" key={tutor._id}>
                        <h3>{tutor.name}</h3>

                        <p>{tutor.email}</p>

                        <p>
                            Subjects:{" "}
                            {tutor.subjects.join(", ")}
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    `/tutor/${tutor._id}`
                                )
                            }
                        >
                            View Tutor
                        </button>
                    </div>
                ))}
            </div>

            <h2>My Sessions</h2>

            {sessions.length === 0 ? (
                <p>No sessions booked yet.</p>
            ) : (
                sessions.map((session) => (
                    <div
                        className="card"
                        key={session._id}
                    >
                        <p>
                            Subject: {session.subject}
                        </p>

                        <p>
                            Date: {session.date}
                        </p>

                        <p>
                            Time: {session.startTime} -{" "}
                            {session.endTime}
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default StudentDashboard