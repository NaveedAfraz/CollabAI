import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
// import { useAuth } from "../context/authContext";
function AuthCheck({ children, protectedRoute }) {
    let user = "hi"
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (user) {
            setLoading(false);
        }
    }, [user, navigate, protectedRoute]);
    if (!user && protectedRoute) {
        navigate("/login");
        setLoading(false)
    } else {
        navigate("/")
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return children

}

export default AuthCheck