import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email,setEmail] = useState("bubu@gmail.com")
  const [password,setPassword] = useState("Bubu@123")
  const dispatch = useDispatch();
   const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    async function getUserFunction() {
     if(user) return navigate("/feed")
      
  }


 useEffect(() => {
    getUserFunction();
  }, [user]);

  async function handleLogin(){
    try{
      const response = await axios.post("http://localhost:7777/login",{
        email,
        password
      },{withCredentials:true})
      console.log("Response:", response.data)
      dispatch(addUser(response.data))
      navigate("/feed")
    }catch(error){
      console.log("Error:", error)
    }

}
  return (
    <div className='w-full flex justify-center my-10'>
  <div className="card card-border rounded-md  bg-gray-200 w-80">
  <div className="card-body gap-3 flex flex-col w-full  p-1">
    <h2 className="card-title text-center">Login</h2>
<div className='w-full'>
  <fieldset className="fieldset pl-7 w-full">
  <legend className="fieldset-legend" >Enter your Email</legend>
  <input type="text" className="input rounded-md p-2 w-[250px] mb-5" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  <legend className="fieldset-legend" >Enter your Password</legend>
  <input type="password" className="input rounded-md p-2 w-[250px]" value={password} onChange={(e)=>setPassword(e.target.value)} />

    <div className="card-actions text-center mt-3 mb-3">
      <button className="btn btn-primary rounded-md p-1 text-center bg-red-600" onClick={handleLogin}>Login</button>
    </div>
</fieldset>
</div>
  </div>
</div>
    </div>
  )
}
