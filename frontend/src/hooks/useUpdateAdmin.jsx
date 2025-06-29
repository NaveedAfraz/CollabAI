import axios from 'axios'
import { useNavigate } from 'react-router'
function useUpdateAdmin({ editingUser, formData, fetchUsers, setEditingUser, setFormData }) {
    const navigate = useNavigate();
    const handleUpdate = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/auth/update-user`,
                {
                    email: editingUser,
                    role: formData.role,
                    skills: formData.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                },
                {
                    withCredentials: true
                }
            );

            const data = await res.data;
            if (res.status !== 200) {
                console.error(data.error || "Failed to update user");
                return;
            }

            setEditingUser(null);
            setFormData({ role: "", skills: "" });
            fetchUsers();
        } catch (err) {
            console.error("Update failed", err.response.data);
        } finally {
            //  navigate("/");
        }
    };
    return { handleUpdate };
}

export default useUpdateAdmin