import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RemoveUser } from "../utils/userSlice";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  function handleShowProfile() {
    setShow((prev) => !prev);
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  async function handleLogout() {
    try {
      const res = await axios.post(
        "http://localhost:7777/logout",
        {},
        { withCredentials: true },
      );
      console.log("logout res", res);
      dispatch(RemoveUser());
    } catch (err) {
      console.log(err);
    }
  }

  const handleDaisyClick = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      navigate("/feed"); // Direct feed pe le jayega
    }
    setShow(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
      <div className="navbar flex justify-between items-center px-6 py-2">
        {/* Left - Logo - Moved more to the left */}
        <div className="flex-none mr-8">
          <button
            onClick={handleDaisyClick}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:to-pink-200 transition-all">
              daisyUI
            </span>
          </button>
        </div>

        {/* Center - Spacer to push content apart */}
        <div className="flex-1"></div>

        {/* Right - Search + Profile - Moved more to the right */}
        <div className="flex gap-4 items-center">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search connections..."
              className="w-64 px-4 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
            />
            <svg
              className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Avatar + Dropdown */}
          <div className="relative">
            {/* Profile Image */}
            <div
              className="relative group cursor-pointer"
              onClick={handleShowProfile}
            >
              <img
                src={
                  user?.imgUrl ||
                  "https://tse1.explicit.bing.net/th/id/OIP.AfIZjZXv5Ka9gQ1i_MgynQAAAA?pid=ImgDet&w=167&h=254&c=7&dpr=1.3&o=7&rm=3"
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-400 hover:border-pink-300 transition-all duration-200 shadow-md"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>

            {/* Dropdown Menu */}
            {show && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShow(false)}
                ></div>

                {/* Menu */}
                <ul className="absolute right-0 mt-3 w-56 py-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50 overflow-hidden">
                  {/* User info preview */}
                  <li className="px-4 py-3 border-b border-gray-700 mb-1">
                    <p className="text-white text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </li>

                  {/* Menu items */}
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer group"
                    onClick={() => setShow(false)}
                  >
                    <span className="text-lg">👤</span>
                    <span className="text-gray-200 group-hover:text-white">
                      Profile
                    </span>
                  </Link>

                  <Link
                    to="/connections"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer group"
                    onClick={() => setShow(false)}
                  >
                    <span className="text-lg">🤝</span>
                    <span className="text-gray-200 group-hover:text-white">
                      Connections
                    </span>
                  </Link>

                  <Link
                    to="/request"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer group"
                    onClick={() => setShow(false)}
                  >
                    <span className="text-lg">📨</span>
                    <span className="text-gray-200 group-hover:text-white">
                      Requests
                    </span>
                  </Link>

                  <hr className="my-1 border-gray-700" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-red-500/10 transition-colors cursor-pointer group"
                  >
                    <span className="text-lg">🚪</span>
                    <span className="text-red-400 group-hover:text-red-300">
                      Logout
                    </span>
                  </button>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
