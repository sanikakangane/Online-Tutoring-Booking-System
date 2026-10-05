import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")

        navigate("/")
    }

    return (
        <nav className="navbar">
            <h2
                onClick={() => navigate("/")}
            >
                TutorBook
            </h2>

            <div>
                {!token && (
                    <>
                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Login
                        </button>

                        <button
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Register
                        </button>
                    </>
                )}

                {token && role === "student" && (
                    <button
                        onClick={() =>
                            navigate("/student")
                        }
                    >
                        Dashboard
                    </button>
                )}

                {token && role === "tutor" && (
                    <button
                        onClick={() =>
                            navigate(
                                "/tutor-dashboard"
                            )
                        }
                    >
                        Dashboard
                    </button>
                )}

                {token && (
                    <button onClick={logout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar