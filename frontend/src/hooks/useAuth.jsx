import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'

function useAuth() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/auth/getAuthenticatedUser`,
                    { withCredentials: true }
                );
                const data = res.data;

                if (res.status === 200 || res.status === 201) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth check error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    return {
        user,
        loading,
        error
    }
}

export default useAuth