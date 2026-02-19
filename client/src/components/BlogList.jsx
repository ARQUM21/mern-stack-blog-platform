import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'motion/react'
import Blogcard from './Blogcard'
import { useAppContext } from '../context/AppContext'


const BlogList = () => {

  const [menu, setMenu] = useState('All')
  const {blogs, input} = useAppContext()

  const filteredBlogs = () => {
    if(input === ''){
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase()
    .includes(input.toLowerCase()) 
    || blog.category.toLowerCase()
    .includes(input.toLowerCase()))
  }

  return (
    <div className='w-full'>
      {/* Category Filter Buttons */}
      <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 
      my-6 sm:my-8 md:my-10 px-4 sm:px-6'>
        {blogCategories.map((item) => (
            <div key={item} className='relative'>
              <button 
                onClick={() => setMenu(item)} 
                className={`cursor-pointer text-sm sm:text-base md:text-lg font-medium
                transition-all duration-200 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full
                ${menu === item ? 'text-white z-10' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item}
                {menu === item && (
                  <motion.div 
                    layoutId='underline' 
                    transition={{type: 'spring', stiffness: 500, damping: 30}}
                    className='absolute inset-0 -z-10 bg-primary rounded-full shadow-lg 
                    shadow-primary/30'
                  >
                  </motion.div>    
                )}
              </button>
            </div>
        ))}
      </div>

      {/* Blog Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-24 
      px-4 sm:px-8 md:px-12 lg:px-16 xl:px-40'>
        {filteredBlogs().filter((blog) => menu === 'All' ? true : blog.category === menu)
        .map((blog) => <Blogcard key={blog._id} blog={blog} />)
        }
      </div>

      {/* Empty State */}
      {filteredBlogs().filter((blog) => menu === 'All' ? true : blog.category === menu).length === 0 && (
        <div className='text-center py-12 sm:py-16 md:py-20'>
          <p className='text-gray-500 text-base sm:text-lg md:text-xl'>No blogs found</p>
          <p className='text-gray-400 text-sm sm:text-base mt-2'>Try a different category or search term</p>
        </div>
      )}
    </div>
  )
}

export default BlogList