import { useNavigate } from "react-router-dom"

function TutorCard({ tutor }) {
    const navigate = useNavigate()

    return (
        <div className="card">
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
    )
}

export default TutorCard