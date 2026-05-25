import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const nav = useNavigate()
    const API_URL = "http://localhost:1230/api/auth";
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });

    const handleData = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (!formData.email || !formData.name || !formData.password) {
          return toast.error("You Must fill all field");
        }
        try {
            const res = await axios.post(`${API_URL}/register`, formData);
            if(!res.data.success){
                return toast.error(res.data.message)
            }
            nav('/login')
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center bg-linear-to-bl from-blue-800 via-blue-300 to-blue-950">
        <div className="w-100 p-4 rounded-lg bg-white/90">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h1 className="text-2xl text-center text-blue-500 font-bold p-2">
              Create New Account
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col ">
                <label
                  htmlFor="name"
                  className="text-md font-semibold text-blue-500"
                >
                  Your UserName
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleData}
                  className="p-1.5 border border-blue-500 focus:outline-blue-950 rounded-md"
                  placeholder="e.g: Bonheur..."
                />
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="text-md font-semibold text-blue-500"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleData}
                  className="p-1.5 border border-blue-500 focus:outline-blue-950 rounded-md"
                  placeholder="e.g: you@mail.Acc..."
                />
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-blue-500"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleData}
                  className="p-1.5 border border-blue-500 focus:outline-blue-950 rounded-md"
                  placeholder="*********"
                />
              </div>
            </div>
            <button
              className="p-2 cursor-pointer bg-blue-500 rounded-md text-white"
              type="submit"
            >
              Create New Account
            </button>
            <p className="text-gray-600">
              Already have Account?{" "}
              <Link to="/login" className="text-blue-500 font-semibold">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register