import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function TutorDashboard() {
    const [tutor, setTutor] = useState(null)
    const [sessions, setSessions] = useState([])

    const [subject, setSubject] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const getTutor = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                navigate("/login")
                return
            }

            try {
                const payload = JSON.parse(
                    atob(token.split(".")[1])
                )

                const response = await fetch(
                    `http://localhost:7979/tutors/${payload.id}`
                )

                const data = await response.json()

                if (response.ok) {
                    setTutor(data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getTutor()
    }, [navigate])

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

    const addAvailability = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")

        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            )

            const response = await fetch(
                `http://localhost:7979/tutors/${payload.id}/slots`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        subject,
                        date,
                        startTime,
                        endTime
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {
                setMessage(
                    "Availability added successfully"
                )

                setSubject("")
                setDate("")
                setStartTime("")
                setEndTime("")
            } else {
                setMessage(data.message)
            }
        } catch {
            setMessage("Cannot connect to backend")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")

        navigate("/login")
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Tutor Dashboard</h1>

                    {tutor && (
                        <p>
                            Welcome, {tutor.name}
                        </p>
                    )}
                </div>

                <button onClick={logout}>
                    Logout
                </button>
            </div>

            {tutor && (
                <p>
                    Subjects:{" "}
                    {tutor.subjects.join(", ")}
                </p>
            )}

            <h2>Add Availability</h2>

            <form
                className="availability-form"
                onSubmit={addAvailability}
            >
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) =>
                        setSubject(e.target.value)
                    }
                    required
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                    required
                />

                <input
                    type="time"
                    value={startTime}
                    onChange={(e) =>
                        setStartTime(e.target.value)
                    }
                    required
                />

                <input
                    type="time"
                    value={endTime}
                    onChange={(e) =>
                        setEndTime(e.target.value)
                    }
                    required
                />

                <button type="submit">
                    Add Availability
                </button>
            </form>

            <p>{message}</p>

            <h2>My Booked Sessions</h2>

            {sessions.length === 0 ? (
                <p>No sessions booked yet.</p>
            ) : (
                sessions.map((session) => (
                    <div
                        className="card"
                        key={session._id}
                    >
                        <p>
                            Subject:{" "}
                            {session.subject}
                        </p>

                        <p>
                            Date: {session.date}
                        </p>

                        <p>
                            Time:{" "}
                            {session.startTime} -{" "}
                            {session.endTime}
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default TutorDashboard