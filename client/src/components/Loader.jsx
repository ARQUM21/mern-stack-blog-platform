import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='flex flex-col items-center gap-4 sm:gap-6'>
        
        {/* Spinner */}
        <div className='animate-spin rounded-full 
        h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 
        border-4 sm:border-[5px] md:border-[6px] 
        border-gray-200 border-t-primary 
        shadow-lg'>
        </div>

        {/* Loading Text */}
        <p className='text-gray-600 text-sm sm:text-base md:text-lg font-medium animate-pulse'>
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loader