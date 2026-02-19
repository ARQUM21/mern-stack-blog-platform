import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { FileText } from 'lucide-react';

const ListBlog = () => {
  
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext()
   
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')
      if(data.success){
        setBlogs(data.blogs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
     fetchBlogs()
  },[])
  
  return (
    <div className='flex-1 min-h-screen bg-blue-50/50 p-3 sm:p-5 md:p-8 lg:p-12'>
       
      {/* Header */}
        <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8'>
          <FileText className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary flex-shrink-0' />
        <div>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800'>All Blogs</h1>
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>Manage and view all your blog posts</p>
        </div>
        </div>

       {/* Table View - For Medium & Larger Screens */}
       <div className='hidden md:block relative mt-4 sm:mt-6 max-w-full md:max-w-4xl overflow-x-auto shadow-lg rounded-lg bg-white border border-gray-200'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs md:text-sm text-gray-700 text-left uppercase bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th scope='col' className='px-3 md:px-6 py-3 md:py-4'>#</th>
                  <th scope='col' className='px-3 md:px-4 py-3 md:py-4'>Blog Title</th>
                  <th scope='col' className='px-3 md:px-4 py-3 md:py-4'>Date</th>
                  <th scope='col' className='px-3 md:px-4 py-3 md:py-4'>Status</th>
                  <th scope='col' className='px-3 md:px-4 py-3 md:py-4'>Actions</th>
                </tr>
            </thead>
            <tbody>
               {blogs.map((blog, index) => (
                <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
               ))}
            </tbody>
          </table>

          {/* Empty State for Table */}
          {blogs.length === 0 && (
            <div className='text-center py-10 md:py-16'>
              <p className='text-gray-500 text-sm md:text-base'>No blogs found</p>
            </div>
          )}
      </div>

      {/* Card View - For Small & Mobile Screens */}
      <div className='md:hidden space-y-3 sm:space-y-4'>
        {blogs.length === 0 ? (
          <div className='bg-white p-6 rounded-lg shadow text-center'>
            <p className='text-gray-500 text-sm'>No blogs found</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <div key={blog._id} className='bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-200'>
              <div className='flex justify-between items-start mb-3'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-2 flex-wrap'>
                    <span className='text-xs font-semibold text-gray-500'>#{index + 1}</span>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      blog.isPublished 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className='font-semibold text-gray-800 text-sm mb-2 line-clamp-2 break-words'>
                    {blog.title}
                  </h3>
                  <p className='text-xs text-gray-500'>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <BlogTableItem 
                blog={blog} 
                fetchBlogs={fetchBlogs} 
                index={index + 1}
                mobileView={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ListBlog