import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RemoveUser } from "../utils/userSlice";


export default function Navbar() {
  const [show, setShow] = useState(false);
 const dispatch = useDispatch();
const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  function handleShowProfile() {
    setShow((prev) => !prev);
  }
  useEffect(()=>{
    if(!user){
   navigate("/login")
    }
  },[user])

 async function handleLogout(){
  try{

    const res = await axios.post("http://localhost:7777/logout",{},{  withCredentials: true,})
    console.log("logout res",res);
    dispatch(RemoveUser());
  }catch(err){
     console.log(err);
     
  }
    
  }

  return (
    <div className="h-[150px]">
      <div className="navbar flex bg-gray-600 shadow-sm px-4">

        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-white">
            daisyUI
          </Link>
        </div>

        {/* Right */}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered md:w-auto"
          />

          {/* Avatar + Dropdown */}
          <div className="relative">

            {/* IMAGE (always visible) */}
            <img
              src={
                user?.imgUrl ||
                "https://tse1.explicit.bing.net/th/id/OIP.AfIZjZXv5Ka9gQ1i_MgynQAAAA?pid=ImgDet&w=167&h=254&c=7&dpr=1.3&o=7&rm=3"
              }
              alt="profile"
              onClick={handleShowProfile}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white"
            />

            {/* Dropdown */}
            {show && (
              <ul className="absolute right-0 mt-3 w-52 p-2 shadow bg-white rounded-lg z-50">
                <Link to="/profile" className="p-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </Link>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <Link onClick={handleLogout} className="p-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </Link>
              </ul>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}