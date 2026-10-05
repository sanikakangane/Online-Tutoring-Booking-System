import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [subjects, setSubjects] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault()

        setMessage("Registering...")

        const data = {
            name,
            email,
            password,
            role
        }

        if (role === "tutor") {
            data.subjects = subjects
                .split(",")
                .map((subject) => subject.trim())
        }

        try {
            const response = await fetch(
                "http://localhost:7979/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )

            const result = await response.json()

            if (response.ok) {
                setMessage("Registration successful")

                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            } else {
                setMessage(result.message)
            }
        } catch (error) {
            setMessage("Cannot connect to backend")
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h1>Register</h1>

                <form onSubmit={register}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    {role === "tutor" && (
                        <input
                            type="text"
                            placeholder="Subjects (Mathematics, Physics)"
                            value={subjects}
                            onChange={(e) =>
                                setSubjects(e.target.value)
                            }
                            required
                        />
                    )}

                    <button type="submit">
                        Register
                    </button>
                </form>

                <p>{message}</p>
            </div>
        </div>
    )
}

export default Register