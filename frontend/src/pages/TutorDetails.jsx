import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function TutorDetails() {
    const { id } = useParams()

    const [tutor, setTutor] = useState(null)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const getTutor = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7979/tutors/${id}`
                )

                const data = await response.json()

                if (response.ok) {
                    setTutor(data)
                } else {
                    setMessage(data.message)
                }
            } catch {
                setMessage("Cannot connect to backend")
            }
        }

        getTutor()
    }, [id])

    const bookSession = async (slot) => {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login")
            return
        }

        try {
            const response = await fetch(
                "http://localhost:7979/sessions/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        tutorId: id,
                        subject: slot.subject,
                        date: slot.date,
                        startTime: slot.startTime,
                        endTime: slot.endTime
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {
                setMessage("Session booked successfully")
            } else {
                setMessage(data.message)
            }
        } catch {
            setMessage("Cannot connect to backend")
        }
    }

    if (!tutor) {
        return (
            <div className="dashboard">
                <p>{message || "Loading..."}</p>
            </div>
        )
    }

    const subjects = Array.isArray(tutor.subjects)
        ? tutor.subjects
        : []

    const availableSlots = Array.isArray(
        tutor.availableSlots
    )
        ? tutor.availableSlots
        : []

    return (
        <div className="dashboard">
            <button
                onClick={() => navigate("/student")}
            >
                Back
            </button>

            <h1>{tutor.name}</h1>

            <p>Email: {tutor.email}</p>

            <p>
                Subjects:{" "}
                {subjects.length > 0
                    ? subjects.join(", ")
                    : "No subjects available"}
            </p>

            <h2>Available Time Slots</h2>

            {availableSlots.length === 0 ? (
                <p>No availability added yet.</p>
            ) : (
                availableSlots.map(
                    (slot, index) => (
                        <div
                            className="card"
                            key={index}
                        >
                            <p>
                                Subject:{" "}
                                {slot.subject}
                            </p>

                            <p>
                                Date: {slot.date}
                            </p>

                            <p>
                                Time:{" "}
                                {slot.startTime} -{" "}
                                {slot.endTime}
                            </p>

                            <button
                                onClick={() =>
                                    bookSession(slot)
                                }
                            >
                                Book Session
                            </button>
                        </div>
                    )
                )
            )}

            <p>{message}</p>
        </div>
    )
}

export default TutorDetails