import { useEffect, useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import useUpdateAdmin from "../hooks/useUpdateAdmin";
import Navbar from "../components/navbar";
export default function AdminPanel() {
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");

  //const token = localStorage.getItem("token");

  const { fetchUsers, users, filteredUsers, loading, error, setFilteredUsers } = useFetchUsers();
  const { handleUpdate } = useUpdateAdmin({
    editingUser,
    formData,
    fetchUsers,
    setEditingUser,
    setFormData,
  });


  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role,
      skills: user.skills?.join(", "),
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Admin Panel - Manage Users</h1>
        <input
          type="text"
          className="input input-bordered w-full mb-6"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearch}
        />
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-base-100 shadow rounded p-4 mb-4 border"
          >
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Current Role:</strong> {user.role}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {user.skills && user.skills.length > 0
                ? user.skills.join(", ")
                : "N/A"}
            </p>

            {editingUser === user.email ? (
              <div className="mt-4 space-y-2">
                <select
                  className="select select-bordered w-full"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>

                <input
                  type="text"
                  placeholder="Comma-separated skills"
                  className="input input-bordered w-full"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => handleEditClick(user)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}