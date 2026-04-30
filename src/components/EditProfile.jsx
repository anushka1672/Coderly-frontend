import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

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
        `${BASE_URL}/profile/edit`,
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
  <div className="w-full bg-gray-800/90 rounded-2xl shadow-xl border border-gray-700 p-4 sm:p-6">

    <div className="text-center mb-4">
      <div className="inline-flex w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-pink-500/20 mb-2">
        ✏️
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-white">
        Edit Profile
      </h1>
      <p className="text-gray-400 text-xs">
        Update your information ✨
      </p>
    </div>

    <div className="space-y-3">

      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
        className="w-full px-3 py-2 rounded-xl bg-gray-700 text-white text-sm"
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full px-3 py-2 rounded-xl bg-gray-700 text-white text-sm"
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="number"
        placeholder="Age"
        className="w-full px-3 py-2 rounded-xl bg-gray-700 text-white text-sm"
      />

      <input
        value={imgUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        type="url"
        placeholder="Image URL"
        className="w-full px-3 py-2 rounded-xl bg-gray-700 text-white text-sm"
      />

      {err && <p className="text-red-400 text-xs">{err}</p>}

      <button
        onClick={handleEdit}
        className="w-full bg-pink-500 hover:bg-pink-400 text-white py-2 rounded-xl"
      >
        Save Changes 💖
      </button>
    </div>
  </div>
);
}