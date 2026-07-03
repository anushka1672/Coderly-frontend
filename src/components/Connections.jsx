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
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
 

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
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-10">
    <div className="max-w-4xl mx-auto px-4">

      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Connections ({connections.length})
      </h1>

      <div className="space-y-5">
        {connections.map((connection) => {
          const isMe = connection.fromUserName === user.firstName;

          const displayName = isMe
            ? connection.toUserName
            : connection.fromUserName;

             const targetId =
    connection.fromUserId === user._id
      ? connection.toUserId
      : connection.fromUserId;

          return (
            <div
              key={connection._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-5 flex justify-between items-center shadow-lg hover:border-pink-500/40 hover:shadow-pink-500/10 transition-all duration-300"
            >
              {/* Left */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 flex items-center justify-center border border-pink-400/40">
                  <span className="text-2xl font-bold text-pink-300">
                    {displayName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {displayName}
                  </h2>

                  <p className="text-gray-400">
                    @{displayName?.toLowerCase()}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Connected on{" "}
                    {new Date(
                      connection.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    connection.status === "accepted"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {connection.status}
                </span>

                <button className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-xl text-white font-medium transition-all"
                onClick={ ()=>navigate(`/chat/${targetId}`)}
                >
                  chat
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </div>
);
}