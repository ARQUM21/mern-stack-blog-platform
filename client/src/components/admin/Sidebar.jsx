import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-white border-r border-gray-200 min-h-screen pt-4 sm:pt-6 
    w-16 sm:w-20 md:w-64 transition-all duration-300'>

      <NavLink 
        end={true} 
        to='/admin' 
        className={({isActive}) => `
          flex items-center gap-3 py-3 sm:py-3.5 px-3 sm:px-4 md:px-9 
          cursor-pointer group hover:bg-primary/5 transition-all duration-200
          ${isActive ? 'bg-primary/10 border-r-4 border-primary text-primary' : 'text-gray-700'}
        `}
      >
        <img 
          src={assets.home_icon} 
          alt="Dashboard" 
          className='min-w-5 w-5 sm:w-6 group-hover:scale-110 transition-transform'
        />
        <p className='hidden md:inline-block font-medium text-sm lg:text-base'>Dashboard</p>
      </NavLink>
      
      <NavLink 
        to='/admin/addBlog' 
        className={({isActive}) => `
          flex items-center gap-3 py-3 sm:py-3.5 px-3 sm:px-4 md:px-9 
          cursor-pointer group hover:bg-primary/5 transition-all duration-200
          ${isActive ? 'bg-primary/10 border-r-4 border-primary text-primary' : 'text-gray-700'}
        `}
      >
        <img 
          src={assets.add_icon} 
          alt="Add Blog" 
          className='min-w-5 w-5 sm:w-6 group-hover:scale-110 transition-transform'
        />
        <p className='hidden md:inline-block font-medium text-sm lg:text-base'>Add Blogs</p>
      </NavLink>
      
      <NavLink 
        to='/admin/listBlog' 
        className={({isActive}) => `
          flex items-center gap-3 py-3 sm:py-3.5 px-3 sm:px-4 md:px-9 
          cursor-pointer group hover:bg-primary/5 transition-all duration-200
          ${isActive ? 'bg-primary/10 border-r-4 border-primary text-primary' : 'text-gray-700'}
        `}
      >
        <img 
          src={assets.list_icon} 
          alt="Blog List" 
          className='min-w-5 w-5 sm:w-6 group-hover:scale-110 transition-transform'
        />
        <p className='hidden md:inline-block font-medium text-sm lg:text-base'>Blog Lists</p>
      </NavLink>
      
      <NavLink 
        to='/admin/comments' 
        className={({isActive}) => `
          flex items-center gap-3 py-3 sm:py-3.5 px-3 sm:px-4 md:px-9 
          cursor-pointer group hover:bg-primary/5 transition-all duration-200
          ${isActive ? 'bg-primary/10 border-r-4 border-primary text-primary' : 'text-gray-700'}
        `}
      >
        <img 
          src={assets.comment_icon} 
          alt="Comments" 
          className='min-w-5 w-5 sm:w-6 group-hover:scale-110 transition-transform'
        />
        <p className='hidden md:inline-block font-medium text-sm lg:text-base'>Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar