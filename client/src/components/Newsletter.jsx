import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 my-16 sm:my-20 md:my-24'>
      
      {/* Heading */}
      <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4'>
        Never Miss a Blog!
      </h1>
      
      {/* Description */}
      <p className='text-sm sm:text-base md:text-base text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-lg px-4'>
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      
      {/* Form */}
      <form className='flex items-center justify-between 
      w-full max-w-xs sm:max-w-sm md:max-w-md
      h-10 sm:h-11 md:h-12
      shadow-md hover:shadow-lg transition-shadow duration-300'>
        
        <input 
          className='border-2 border-gray-300 rounded-l-md 
          h-full border-r-0
          outline-none w-full 
          px-3 sm:px-4
          text-sm sm:text-sm md:text-base
          text-gray-700 placeholder:text-gray-400
          focus:border-primary/50 transition-all' 
          type="email" 
          placeholder='Enter your email' 
          required 
        />
        
        <button 
          type='submit' 
          className='h-full px-4 sm:px-6 md:px-8 text-sm sm:text-sm md:text-base font-medium text-white bg-primary hover:bg-primary/90 active:scale-95
          transition-all duration-200
          cursor-pointer rounded-r-md
          whitespace-nowrap'
        >
          Subscribe
        </button>
      </form>

      {/* Privacy Note */}
      <p className='text-xs sm:text-sm text-gray-400 mt-4 sm:mt-5'>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}

export default Newsletter