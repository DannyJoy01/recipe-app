// src/pages/Login.jsx

import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Logo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthSate } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import Header from "../components/reusables/Header.jsx";

const spinClass = "animate-spin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(clearAuthSate());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setHasSubmitted(false);
  }, [dispatch]);

  useEffect(() => {
    if (user && hasSubmitted) {
      toast.success("Login successful!");

      const timer = setTimeout(() => {
        if (user.role === "admin") {
          navigate("/dashboard");
        } else if (user.role === "regular") {
          navigate("/user-dashboard");
        } else {
          navigate("/login");
        }
      }, 1500);

      return () => clearTimeout(timer);
    }

    if (error && hasSubmitted) {
      toast.error(error);
    }
  }, [user, error, hasSubmitted, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    dispatch(loginUser(credentials));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <Logo />
          <h1 className="text-2xl text-black font-bold text-center mb-2">
            Login
          </h1>
          <p className="text-sm text-center text-gray-500 mb-6">
            Please enter your credentials to log in.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className={`w-5 h-5 ${spinClass}`} />
              ) : (
                "Login"
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

export default Login;
