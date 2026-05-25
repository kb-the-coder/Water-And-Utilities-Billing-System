import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className="w-120 p-4 bg-blue-100 rounded-2xl flex flex-col gap-2">
            <h1 className='text-4xl text-blue-500 font-semibold text-center'>400 PAGE NOT FOUND</h1>
            <p className='text-gray-600 text-center'>Please Login here <Link to='/login' className='text-blue-500'>Login</Link> to Continue</p>
        </div>
    </div>
  )
}
