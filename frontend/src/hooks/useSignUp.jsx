import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState } from 'react'
function useSignUp() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
          form
        );
  
        const data = await res.data;
        console.log(data);
        if (res.status === 201 || res.status === 200) {
          // localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
        //  alert(data.message || "Signup failed");
        console.log(data.message || "Signup failed");
        }
      } catch (err) {
      //  alert("Somethindg went wrong");
        console.error(err.response.data);
      } finally {
        setLoading(false);
      }
    };
    return { form, handleChange, handleSignup, loading };
}

export default useSignUp