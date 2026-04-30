import React, { useEffect } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-3 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Your Profile
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Manage your account settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center">
          {user && (
            <>
              <div className="w-full lg:w-1/2">
                <EditProfile user={user} />
              </div>

              <div className="w-full lg:w-1/2">
                <Card data={user} />
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}