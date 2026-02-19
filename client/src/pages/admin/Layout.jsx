import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'

const Layout = () => {

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
    }
  return (
    <>
      {/* Sticky Navbar */}
      <div className='sticky top-0 z-10 flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white shadow-md'>
        <img src={assets.logo} alt=""  className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/') } />
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-all'>Logout</button>
      </div>

      <div className='flex h-[calc(100vh-70px)] overflow-hidden'>
         {/* Sticky Sidebar */}
         <div className='sticky top-[70px] h-full flex-shrink-0 overflow-y-auto'>
            <Sidebar />
         </div>
         {/* Scrollable Main Content */}
         <div className='flex-1 overflow-y-auto'>
            <Outlet />
         </div>
      </div>
    </>
  )
}

export default Layout