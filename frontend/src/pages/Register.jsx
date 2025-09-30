import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Logo.jsx"; // ✅
import { useSelector, useDispatch } from "react-redux";
import { registerUser, clearAuthSate } from "../redux/slices/authSlice.js";
import { Player } from "@lordicon/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/reusables/Header.jsx";


const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "regular",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && hasSubmitted) {
      toast.success("Registration successful!");
      setData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "regular",
    });
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (error && hasSubmitted) {
      toast.error(error);
    }
  }, [user, error, hasSubmitted, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setHasSubmitted(true);
    const { confirmPassword: _, ...userData } = data;
    dispatch(clearAuthSate());
    dispatch(registerUser(userData));
  };

  return (
    <>
    <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <Logo />
          <h1 className="text-2xl text-black font-bold text-center mb-2">Register</h1>
          <p className="text-sm text-center text-gray-500 mb-6">
            Create your account below
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={data.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Username"
              required
              value={data.username}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={data.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={data.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={data.confirmPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? (
                <Player
                  src="https://cdn.lordicon.com/tdrtiskw.json"
                  trigger="loop"
                  autoplay
                  style={{ height: 30, width: 30 }}
                  colors="red"
                />
              ) : (
                "Register"
              )}
            </button>

            {error && hasSubmitted && (
              <p className="text-red-500 text-center text-sm mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Register;
