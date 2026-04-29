import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getUserFunction() {
    if (user) return navigate("/feed");
  }

  useEffect(() => {
    getUserFunction();
  }, [user]);

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:7777/login", {
        email,
        password
      }, { withCredentials: true });
      console.log("Response:", response.data);
      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 font-sans">
      {/* Simple cute card */}
      <div className="max-w-md w-full bg-gray-800/90 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-3 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/20 mb-3">
            <span className="text-2xl">🌸</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400 text-xs mt-1">
            So glad to see you again! ✨
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-3">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />

          {/* Login Button */}
          <button 
            className="w-full mt-4 bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-pink-500/20"
            onClick={handleLogin}
          >
            Login 💖
          </button>

          {/* Footer text with signup link */}
          <p className="text-center text-xs text-gray-500 pt-2">
            New here?{' '}
            <Link to="/signup" className="text-pink-400 hover:text-pink-300 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}