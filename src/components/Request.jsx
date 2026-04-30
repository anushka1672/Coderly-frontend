import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

export default function Request() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ❌ NO processingId state - completely removed!
   const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [user]);
    

  async function getRequest() {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
      setError(null);
    } catch (error) {
      console.error("Oops, something broke:", error);
      setError("Couldn't load requests right now");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRequest();
  }, []);

  const handleRequest = async (requestId, status) => {
    try {
      await axios.post(`${BASE_URL}+/request/review/${status}/${requestId}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Request failed:", error);
      alert("Something went wrong 😢 Try again?");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-3">💭</div>
          <div className="text-gray-300">just a sec... grabbing your requests</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-4">
        <div className="bg-gray-800/70 rounded-2xl p-8 max-w-md text-center border border-gray-700">
          <div className="text-5xl mb-3">🌧️</div>
          <div className="text-gray-300 mb-4">{error}</div>
          <button 
            onClick={getRequest}
            className="px-5 py-2 bg-pink-500/20 text-pink-300 rounded-xl hover:bg-pink-500/30 transition"
          >
            try again ↻
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">💌</span>
            <h1 className="text-3xl font-bold text-white">hey, someone wants to say hi!</h1>
          </div>
          <p className="text-gray-400 ml-1">
            {requests?.length === 0 ? "no requests right now 🤷" : `${requests?.length} friend request${requests?.length !== 1 ? 's' : ''} waiting for you`}
          </p>
        </div>

        {!requests || requests.length === 0 ? (
          <div className="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700">
            <div className="text-7xl mb-3">🦋</div>
            <p className="text-gray-300 text-lg">quiet around here</p>
            <p className="text-gray-500 text-sm mt-2">maybe later?</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-800 rounded-2xl border border-gray-700 p-5 hover:border-gray-600 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  
                  {/* avatar area */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      {request.imgUrl ? (
                        <img
                          src={request.imgUrl}
                          alt={request.fromUserName}
                          className="w-14 h-14 rounded-full object-cover border border-pink-400/50"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
                          {request.fromUserName?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-semibold text-lg">
                          {request.fromUserName || 'someone'}
                        </span>
                        <span className="text-gray-500 text-sm">wants to connect</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-0.5">
                        ✨ {request.fromUserName?.split(' ')[0] || 'they'} seem nice!
                      </p>
                    </div>
                  </div>
                  
                  {/* buttons - NO LOADING STATES, NO DISABLED */}
                  <div className="flex gap-3 ml-[72px] sm:ml-0">
                    <button
                      onClick={() => handleRequest(request._id, "rejected")}
                      className="px-5 py-2 rounded-xl text-red-400 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 transition flex items-center gap-1.5 text-sm"
                    >
                      <span>✖️</span>
                      <span>reject</span>
                    </button>
                    <button
                      onClick={() => handleRequest(request._id, "accepted")}
                      className="px-5 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 transition flex items-center gap-1.5 text-sm"
                    >
                      <span>✓</span>
                      <span>accept</span>
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