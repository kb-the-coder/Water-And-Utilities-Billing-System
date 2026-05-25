import React, { useEffect } from 'react'
import { userAuth } from '../Context/AuthContext'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Pannel = () => {
    const nav = useNavigate()
    const {user,logout} = userAuth()
    useEffect(()=>{
        if(!user){
            nav('/login')
        }
    },[])
  return (
    <div>
      <div className="">
        <div className="flex justify-between px-12 py-5 bg-blue-500">
          <h1 className='text-2xl font-bold text-white'>System</h1>
          <ul className='flex gap-4'>
            <li>
              <NavLink>Nav 1</NavLink>
            </li>
            <li>
              <NavLink>Nav 1</NavLink>
            </li>
            <li>
              <NavLink>Nav 1</NavLink>
            </li>
          </ul>
          <button onClick={()=>{
            if(!confirm("Are You sure you want to Log Out")) return;
            logout();nav('/login')
            }}>Log Out</button>
        </div>
        <div className="">
            
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Pannel