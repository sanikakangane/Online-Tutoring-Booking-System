import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()

        setMessage("Logging in...")

        try {
            const response = await fetch(
                "http://localhost:7979/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        role
                    })
                }
            )

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("role", role)

                if (role === "student") {
                    navigate("/student")
                } else {
                    navigate("/tutor-dashboard")
                }
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            setMessage("Cannot connect to backend")
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1>Login</h1>

                <form onSubmit={login}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">
                            Student
                        </option>

                        <option value="tutor">
                            Tutor
                        </option>
                    </select>

                    <button type="submit">
                        Login
                    </button>
                </form>

                <p>{message}</p>
            </div>
        </div>
    )
}

export default Login