import { useEffect, useState } from "react";
import SideBar from "../components/reusables/SideBar";
import Header from "../components/reusables/Header";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, Eye, Trash2, Pencil } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const UsersDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ type: "", open: false }); 
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.userDetails);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const viewDetails = (id) => navigate(`/user-details/${id}`);

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setModal({ type: "delete", open: true });
  };

  const confirmEdit = (user) => {
    setSelectedUser({ ...user }); // clone so we can edit fields
    setModal({ type: "edit", open: true });
  };

  const deleteUser = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/user/user/${selectedUser._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
      closeModal();
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  const updateUser = async () => {
  try {
    console.log("Updating user with ID:", selectedUser._id);
    await axios.patch(
      `http://localhost:5000/api/user/edit-user/${selectedUser._id}`,
      {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsers((prev) =>
      prev.map((u) => (u._id === selectedUser._id ? selectedUser : u))
    );
    closeModal();
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
  }
};


  const closeModal = () => {
    setModal({ type: "", open: false });
    setSelectedUser(null);
  };

  const UserRow = ({ user }) => {
    const { _id, name, email, role } = user;
    return (
      <tr className="border-b border-gray-800 hover:bg-gray-700/40 transition-colors">
        <td className="px-4 py-4 whitespace-nowrap text-white font-medium">{name}</td>
        <td className="px-4 py-4 text-gray-300">{email}</td>
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              role === "admin" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
            }`}
          >
            {role}
          </span>
        </td>
        <td className="px-4 py-4 text-right whitespace-nowrap">
          <div className="flex justify-end gap-3">
            <button
              className="text-blue-400 hover:text-white transition-all"
              title="View"
              onClick={() => viewDetails(_id)}
            >
              <Eye size={18} />
            </button>
            <button
              className="text-yellow-400 hover:text-white transition-all"
              title="Edit"
              onClick={() => confirmEdit(user)}
            >
              <Pencil size={18} />
            </button>
            <button
              className="text-red-400 hover:text-white transition-all"
              title="Delete"
              onClick={() => confirmDelete(user)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col ml-64 pt-16">
        <Header />
        <main className="p-6 md:p-8 flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-xl shadow-md flex items-center gap-2 transition-all">
              <UserPlus size={20} />
              Add User
            </button>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full bg-gray-700 text-gray-200 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-700 text-xs text-gray-400 uppercase tracking-wide">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserRow key={user._id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-sm">
            {modal.type === "delete" ? (
              <>
                <h2 className="text-lg font-semibold text-white mb-4">Confirm Delete</h2>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteUser}
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-white mb-4">Edit User</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={selectedUser?.name || ""}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={selectedUser?.email || ""}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Email"
                  />
                  <select
                    value={selectedUser?.role || ""}
                    onChange={(e) =>
                      setSelectedUser((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateUser}
                    className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersDashboard;
