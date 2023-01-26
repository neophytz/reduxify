import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='px-10 py-5 bg-gray-100 flex flex-row align-middle justify-between'>
      <div className='text-lg text-gray-900 font-semibold'>Header</div>
      <div className='text-gray-700 hover:text-gray-900 transition duration-150'>
        <Link to="/">
          <span className='px-6 cursor-pointer'>Home</span>
        </Link>
        <Link to='/users'>
        <span className='px-6 cursor-pointer'>Users</span>
        </Link>
      </div>
    </div>
  )
}
