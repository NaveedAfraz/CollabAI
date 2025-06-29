import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
function useLogOut() {
    const navigate = useNavigate();
    const logOut = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return { logOut };
}

export default useLogOut