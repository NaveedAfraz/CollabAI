import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
function useTicket() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/tickets/getTicket/${id}`,
                    { withCredentials: true }
                )
                console.log(res);
                const data = await res.data;
                console.log(data);
                setTicket(data.ticket);
            } catch (err) {
                console.error(err);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    return {
        ticket,
        loading,
        error
    };
}

export default useTicket