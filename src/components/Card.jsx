import axios from "axios";
import React from "react";
import { removeUserFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";

export default function Card({ data }) {
  const { firstName, imgUrl, email, _id, age, gender } = data;
    const dispatch = useDispatch();

  const handleRequest = async (_id,status) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, {
        withCredentials: true,
      });
      console.log("interested data", res);
      // alert(`✨ ${status} request sent successfully!`);
      dispatch(removeUserFeed(_id))
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Something went wrong 😢");
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/90 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        {/* Card Image */}
        <div className="relative">
          <img
            src={imgUrl ? imgUrl : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            className="w-full h-64 object-cover"
            alt={firstName}
          />
          <div className="absolute top-3 right-3">
            {gender === 'female' && <span className="text-2xl">👩</span>}
            {gender === 'male' && <span className="text-2xl">👨</span>}
            {gender === 'other' && <span className="text-2xl">🌈</span>}
          </div>
        </div>

        {/* Card Body */}
        <div className="px-6 pb-6 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {firstName}
              {age && <span className="text-sm text-gray-400">({age} yrs)</span>}
            </h2>
            <div className="text-2xl">🌸</div>
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-300">{email}</span>
          </div>

          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            A lovely person who's looking to make meaningful connections ✨
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleRequest(_id,"interested")}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-green-500/20 flex items-center justify-center gap-2"
            >
              <span>💚</span>
              Interested
            </button>
            <button
              onClick={() => handleRequest(_id,"ignored")}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-red-500/20 flex items-center justify-center gap-2"
            >
              <span>💔</span>
              Ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}