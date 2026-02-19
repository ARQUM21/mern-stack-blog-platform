import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-primary/5' >
      <div className='flex flex-col md:flex-row items-start justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16 py-8 sm:py-10 md:py-12 border-b border-gray-300/50' >

        {/* Logo and Description */}
        <div className='w-full md:w-auto md:max-w-md lg:max-w-lg'>
          <img 
            src={assets.logo} 
            alt="QuickBlog Logo" 
            className='w-28 sm:w-32 md:w-36 lg:w-44 mb-4 sm:mb-6'
          />
          <p className='text-sm sm:text-base text-gray-600 leading-relaxed pr-0 md:pr-4'>
            QuickBlog is your go-to platform for sharing ideas, stories, and insights. 
            Create, explore, and connect with a community of passionate writers and readers 
            from around the world. Start your blogging journey today!
          </p>
        </div>

        {/* Footer Links */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-between w-full md:w-auto md:flex-1 gap-6 sm:gap-8 md:gap-6 lg:gap-10'>
          {footer_data.map((section, index) => (
            <div key={index} className='min-w-[120px]'>
              <h3 className='font-semibold text-sm sm:text-base lg:text-lg text-gray-900 mb-3 sm:mb-4 md:mb-5'>
                {section.title}
              </h3>
              <ul className='text-xs sm:text-sm space-y-2 sm:space-y-2.5'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a 
                      href='#' className='text-gray-600 hover:text-primary hover:underline transition-all duration-200 inline-block'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <p className='py-4 sm:py-5 md:py-6 text-center text-xs sm:text-sm md:text-base text-gray-500' >
        Copyright 2026 © <span className='font-medium text-gray-700'>QuickBlog Muhammad Arqum</span> - All Rights Reserved
      </p>
    </div>
  )
}

export default Footer