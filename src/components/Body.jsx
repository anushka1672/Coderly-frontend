import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  async function getUserFunction() {
    try {
      if (user) {
        return 
      }
      const res = await axios.get("http://localhost:7777/profile", {
        withCredentials: true,
      });
      console.log("anushka", res.data);

      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
      
      navigate("/login");
    }
  }

  useEffect(() => {
    getUserFunction();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Link to="/login">login</Link>
    </div>
  );
}
