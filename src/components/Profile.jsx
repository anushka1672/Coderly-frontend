import React, { useEffect } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
          <p className="text-gray-400">Manage your account settings</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          {user && (
            <>
              <div className="flex-1 max-w-md">
                <EditProfile user={user} />
              </div>
              <div className="flex-1 max-w-md">
                <Card data={user} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}