import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Mail,
  User2,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const foundUser = res.data.userDetails.find((u) => u._id === id);
        setUser(foundUser);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, [id, token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-teal-400 hover:text-white transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-2xl font-bold uppercase">
              {user.name.charAt(0)}
            </div>
            <h2 className="mt-3 text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">@{user.username}</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-teal-400" />
              <span className="text-gray-400">Email:</span>
              <span className="font-medium text-white">{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <User2 size={16} className="text-teal-400" />
              <span className="text-gray-400">Username:</span>
              <span className="font-medium text-white">{user.username}</span>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck size={16} className="text-teal-400" />
              <span className="text-gray-400">Role:</span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${user.role === "admin" ? "bg-teal-500/20 text-teal-400" : ""}
                  ${user.role === "regular" ? "bg-blue-500/20 text-blue-400" : ""}
                  ${user.role === "moderator" ? "bg-purple-500/20 text-purple-400" : ""}
                `}
              >
                {user.role}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays size={16} className="text-teal-400" />
              <span className="text-gray-400">Joined:</span>
              <span className="text-white font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
