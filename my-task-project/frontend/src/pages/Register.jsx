import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/auth/register",
                form
            );

            alert("Registration successful!");
            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "An error occurred during registration."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h1>Create Account</h1>

                <p>
                    Register
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
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
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Registration;