import React, { useEffect, useState } from 'react'
import axios from 'axios'
function useTickets() {

    const [form, setForm] = useState({ title: "", description: "" });
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    // const token = localStorage.getItem("token");

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`);
            const data = await res.data;
            console.log(data);
            setTickets(data.tickets || []);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/tickets`, form);
            console.log(res);
            const data = await res.data;

            if (res.status === 201 || res.status === 200) {
                setForm({ title: "", description: "" });
                fetchTickets(); // Refresh list
            } else {
                alert(data.message || "Ticket creation failed");
            }
        } catch (err) {
            alert("Error creating ticket");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        handleChange,
        handleSubmit,
        tickets,
        loading,
    };
}

export default useTickets