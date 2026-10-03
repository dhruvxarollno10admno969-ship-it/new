import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:5000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(response.data.user);

            } catch (error) {
                console.error(
                    "Failed to fetch user:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/");

            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    if (loading) {
        return (
            <div className="auth-page">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard">

            <div className="dashboard-card">

                <h1>
                    Welcome, {user.name} 
                </h1>

                <p>
                    Login successful!
                </p>

                <div className="user-info">

                    <div>
                        <strong>Name</strong>
                        <span>{user.name}</span>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <span>{user.email}</span>
                    </div>

                    <div>
                        
                    </div>

                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;