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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  async function getConnections() {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-gray-300 text-lg sm:text-xl">
          Loading connections...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
          Connections ({connections.length})
        </h1>

        {/* Empty State */}
        {connections.length === 0 ? (
          <div className="text-center py-10 bg-gray-800/50 rounded-2xl">
            <p className="text-gray-400 text-sm sm:text-lg">
              No connections yet
            </p>
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {connections.map((connection) => {

              const isMe = connection.fromUserName === user.firstName;
              const displayName = isMe
                ? connection.toUserName
                : connection.fromUserName;

              return (
                <div
                  key={connection._id}
                  className="bg-gray-800/90 rounded-2xl border border-gray-700 overflow-hidden"
                >

                  {/* Image / Avatar */}
                  <div className="relative">
                    <div className="w-full h-36 sm:h-48 bg-gradient-to-r from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-full flex items-center justify-center border-2 border-pink-400/50">
                        <span className="text-xl sm:text-3xl text-pink-300 font-bold">
                          {displayName?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          connection.status === "accepted"
                            ? "bg-green-500/20 text-green-300"
                            : connection.status === "interested"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {connection.status || "pending"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">

                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {displayName}
                    </h2>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3">
                      @{displayName?.toLowerCase()}
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm mb-4">
                      {new Date(connection.createdAt).toLocaleDateString()}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-pink-500/20 text-pink-300 text-xs sm:text-sm py-2 rounded-lg">
                        View
                      </button>

                      <button className="flex-1 bg-gray-700 text-gray-300 text-xs sm:text-sm py-2 rounded-lg">
                        Message
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        )}
      </div>
    </div>
  );
}