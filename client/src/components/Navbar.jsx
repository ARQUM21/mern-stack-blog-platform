import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();
  
  const { token } = useAppContext()


  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'>
      <div className='flex justify-between items-center 
      py-3 sm:py-4 md:py-4 
      px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 
      max-w-[1400px] mx-auto'>
        
        {/* Logo */}
        <img 
          onClick={() => navigate('/')} 
          src={assets.logo} 
          alt="QuickBlog Logo" 
          className='w-28 sm:w-32 md:w-36 lg:w-40 cursor-pointer 
          hover:scale-105 transition-transform duration-200' 
        />

        {/* Login/Dashboard Button */}
        <button 
          onClick={() => navigate('/admin')} 
          className='flex items-center gap-1.5 sm:gap-2 
          rounded-full text-xs sm:text-sm md:text-sm
          cursor-pointer bg-primary text-white 
          px-4 sm:px-6 md:px-7 lg:px-8 
          py-2 sm:py-2.5 md:py-2.5
          font-medium
          hover:bg-primary/90 hover:scale-105 
          active:scale-95
          transition-all duration-200
          shadow-md hover:shadow-lg hover:shadow-primary/30'
        >
          <span className='whitespace-nowrap'>
            {token ? 'Dashboard' : 'Login'}
          </span>
          <img 
            src={assets.arrow} 
            alt="arrow" 
            className='w-2.5 sm:w-3 md:w-3'
          />
        </button>
      </div>
    </nav>
  )
}

export default Navbar