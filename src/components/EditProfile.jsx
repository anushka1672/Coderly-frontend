import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ user }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [imgUrl, setImageUrl] = useState(user.imgUrl);
  const [err, setErr] = useState("");
  
  const navigate = useNavigate();
 useEffect(() => {
     if (!user) {
       navigate("/login");
     }
   }, [user]);
   

  async function handleEdit() {
    console.log(age, gender);

    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        { firstName: firstName, age: age, gender: gender, imgUrl: imgUrl },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("API Response:", res);

      if (res.data && res.data.user) {
        dispatch(addUser(res.data.user));
      } else if (res.data) {
        dispatch(addUser(res.data));
      }

      alert("Profile updated successfully! ✨");

    } catch (err) {
      setErr("Validation failed. Please check your inputs.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/90 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        <div className="px-6 pt-6 pb-3 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/20 mb-3">
            <span className="text-2xl">✏️</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
          <p className="text-gray-400 text-xs mt-1">
            Update your information ✨
          </p>
        </div>

        <div className="px-6 pb-6 space-y-3">
          {/* First Name */}
          <div>
            <label className="block text-gray-300 text-xs mb-1 ml-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Your first name"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-300 text-xs mb-1 ml-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-300 text-xs mb-1 ml-1">Age</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              min="1"
              max="130"
              className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Your age"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-300 text-xs mb-1 ml-1">Image URL</label>
            <input
              value={imgUrl}
              type="url"
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Profile picture URL"
            />
          </div>

          {err && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
              <p className="text-red-400 text-xs text-center">{err} 😢</p>
            </div>
          )}

          <button
            onClick={handleEdit}
            className="w-full mt-4 bg-pink-500 hover:bg-pink-400 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-pink-500/20"
          >
            Save Changes 💖
          </button>
        </div>
      </div>
    </div>
  );
}