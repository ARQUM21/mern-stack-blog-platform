import React from 'react'
import { useNavigate } from 'react-router-dom';

const Blogcard = ({blog}) => {

    const {title, description, category, image, _id} = blog; 
    
    const navigate = useNavigate()

return (
    <div 
      onClick={() => navigate(`/blog/${_id}`)} 
      className='w-full rounded-lg overflow-hidden shadow-md hover:shadow-xl 
      hover:scale-[1.02] hover:shadow-primary/25 transition-all duration-300 
      cursor-pointer bg-white group'
    >
      <div className='overflow-hidden'>
        <img 
          src={image} 
          alt={title} 
          className='aspect-video w-full object-cover group-hover:scale-110 
          transition-transform duration-500'
        />
      </div>
      
      <span className='ml-4 sm:ml-5 mt-3 sm:mt-4 px-2.5 sm:px-3 py-1 inline-block 
      bg-primary/20 rounded-full text-primary text-[10px] sm:text-xs font-medium 
      uppercase tracking-wide'>
        {category}
      </span>
      
      <div className='p-4 sm:p-5'>
        <h5 className='mb-2 font-semibold text-sm sm:text-base md:text-lg 
        text-gray-900 line-clamp-2 group-hover:text-primary transition-colors'>
          {title}
        </h5>
        <p 
          className='mb-3 text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3' 
          dangerouslySetInnerHTML={{'__html': description.slice(0, 120)}}
        >
        </p>
        
        <div className='flex items-center text-primary text-xs sm:text-sm font-medium 
        group-hover:gap-2 gap-1 transition-all'>
          Read more 
          <span className='group-hover:translate-x-1 transition-transform'>→</span>
        </div>
      </div>    
    </div>
  )
}

export default Blogcard