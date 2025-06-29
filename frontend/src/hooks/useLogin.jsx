import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
function useLogin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/auth/login`,
                form
            );

            const data = await res.data;
            console.log(data);
            if (res.status === 201 || res.status === 200) {
                // localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            alert("Something went wrong");
            console.error(err.response.data);
        } finally {
            setLoading(false);
        }
    };

    return { user, handleLogin, loading, form, handleChange };
}

export default useLogin