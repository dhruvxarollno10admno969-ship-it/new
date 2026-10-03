import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message || "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">

            <h1>Welcome Back</h1>

            <p>
                Login your account
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    required
                />

                {error && (
                    <p className="auth-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"
                    }
                </button>

            </form>

            <p>
                Don't have an Account{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>
    );
}

export default Login;