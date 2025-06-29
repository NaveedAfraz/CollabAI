import React, { useState } from 'react'
import axios from 'axios'
function useFetchUsers() {
    // const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/users`, {
                withCredentials: true
            });
            const data = await res.data;
            console.log(data);
            if (res.status === 200 || res.status === 201) {
                setUsers(data);
                setFilteredUsers(data);
            } else {
                console.error(data.error);
                setError(data.error);
            }
        } catch (err) {
            console.error("Error fetching users", err.response.data);
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    };
    return { fetchUsers, users, filteredUsers, loading, error, setFilteredUsers };
}

export default useFetchUsers