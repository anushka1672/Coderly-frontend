import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [imgUrl, setImageUrl] = useState("");
   const navigate = useNavigate();

  async function handleSignup(){
       try{
      const response = await axios.post(`${BASE_URL}/signup`,{
       email, password, firstName,lastName, age,imgUrl
      },{withCredentials:true})
      console.log("Response of signup:", response)

    //   dispatch(addUser(response.data))
     return navigate("/feed")
    }catch(error){
      console.log("Error:", error)
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
          <h1 className="text-2xl font-bold text-white">Sign up</h1>
          <p className="text-gray-400 text-xs mt-1">
            Join our cute community ✨
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-3">
          {/* First & Last Name Row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            min="1"
            max="130"
            className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />

          {/* Image URL */}
          <input
            type="url"
            value={imgUrl}
             onChange={(e)=>setImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
            className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />

          {/* Tiny preview hint */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
              <span className="text-xs">📷</span>
            </div>
            <p className="text-xs text-gray-400">
              Image preview will appear here
            </p>
          </div>

          {/* Signup Button */}
          <button className="w-full mt-4 bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-pink-500/20"
          onClick={handleSignup}
          >
            Sign up 💖
          </button>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-500 pt-2">
            <span>if already signup <Link to={"/login"}><span className="text-red-500">Login</span></Link></span>
          </p>
        </div>
      </div>
    </div>
  );
}
