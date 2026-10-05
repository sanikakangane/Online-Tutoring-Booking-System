import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    return (
        <div className="home">
            <h1>Online Tutoring Booking System</h1>

            <p>
                Find tutors and book tutoring sessions easily.
            </p>

            <div className="home-buttons">
                <button onClick={() => navigate("/login")}>
                    Login
                </button>

                <button onClick={() => navigate("/register")}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Home