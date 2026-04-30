import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export default function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection); 
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  // const Id = user._id;
  const navigate = useNavigate();
useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  
  


  async function getConnections() {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log("user connections", res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-gray-300 text-xl">Loading connections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Connections ({connections.length})
        </h1>
        
        {connections.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-2xl">
            <p className="text-gray-400 text-lg">No connections yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="bg-gray-800/90 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300"
              >
                <div className="relative">
                  {/* Profile Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-r from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center border-2 border-pink-400/50">
                      <span className="text-4xl font-bold text-pink-300">
                        {connection.fromUserName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Badge - Positioned at top right */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium shadow-md ${
                        connection.status === "accepted"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : connection.status === "interested"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                      }`}
                    >
                      {connection.status || "pending"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Name */}
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {connection.fromUserName === user.firstName ? (
                      <div>{connection.toUserName}</div>
                    ) : (
                      <div>{connection.fromUserName}</div>
                    )}
                  </h2>
                  
                  {/* Email/User ID (optional) */}
                  <p className="text-gray-400 text-sm mb-4">
                    @{connection.fromUserName?.toLowerCase() || "user"}
                  </p>
                  
                  {/* Connection Date */}
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      Connected on {new Date(connection.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        console.log("View profile:", connection.fromUserId);
                      }}
                      className="flex-1 bg-pink-500/20 text-pink-300 font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:bg-pink-500/30 border border-pink-500/30"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        console.log("Message:", connection.fromUserId);
                      }}
                      className="flex-1 bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:bg-gray-600 border border-gray-600"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}