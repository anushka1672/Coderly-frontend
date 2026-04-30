import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RemoveUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

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
  }, [user, navigate]);

  async function handleLogout() {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(RemoveUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  const handleDaisyClick = (e) => {
    e.preventDefault();
    navigate(user ? "/feed" : "/login");
    setShow(false);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
      <div className="flex justify-between items-center px-3 sm:px-6 py-2">

        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={handleDaisyClick}
            className="flex items-center gap-1 sm:gap-2"
          >
            <span className="text-xl sm:text-2xl">🌸</span>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">
              Coderly
            </span>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Desktop Search */}
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 md:w-64 px-3 py-1.5 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Mobile Search Icon */}
          <button className="sm:hidden p-2 rounded-lg hover:bg-gray-700">
            🔍
          </button>

          {/* Avatar */}
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={handleShowProfile}
            >
              <img
                src={
                  user?.imgUrl ||
                  "https://tse1.explicit.bing.net/th/id/OIP.AfIZjZXv5Ka9gQ1i_MgynQAAAA?pid=ImgDet"
                }
                alt="profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-pink-400"
              />
            </div>

            {/* Dropdown */}
            {show && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShow(false)}
                ></div>

                {/* Menu */}
                <ul className="absolute right-0 mt-2 w-48 sm:w-56 py-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50">

                  <li className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {user?.email}
                    </p>
                  </li>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                    onClick={() => setShow(false)}
                  >
                    👤 Profile
                  </Link>

                  <Link
                    to="/connections"
                    className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                    onClick={() => setShow(false)}
                  >
                    🤝 Connections
                  </Link>

                  <Link
                    to="/request"
                    className="block px-4 py-2 hover:bg-gray-700 text-gray-200"
                    onClick={() => setShow(false)}
                  >
                    📨 Requests
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
                  >
                    🚪 Logout
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