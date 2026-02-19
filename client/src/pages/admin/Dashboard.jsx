import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { LayoutDashboard } from 'lucide-react'

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const { axios } = useAppContext()

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className='flex-1 min-h-screen bg-blue-50/50 p-3 sm:p-4 md:p-6 lg:p-10'>

      {/* Header */}
      <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8'>
        <LayoutDashboard className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary flex-shrink-0' />
        <div>
          <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>Dashboard</h1>
          <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>Overview of your blog statistics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10'>
        
        {/* Blogs Card */}
        <div className='flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 
        rounded-lg shadow-md hover:shadow-lg cursor-pointer 
        hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200'>
          <img src={assets.dashboard_icon_1} alt="Blogs" className='w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0' />
          <div>
            <p className='text-lg sm:text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light text-xs sm:text-sm'>Blogs</p>
          </div>
        </div>
      
        {/* Comments Card */}
        <div className='flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 
        rounded-lg shadow-md hover:shadow-lg cursor-pointer 
        hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200'>
          <img src={assets.dashboard_icon_2} alt="Comments" className='w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0' />
          <div>
            <p className='text-lg sm:text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light text-xs sm:text-sm'>Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className='flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 
        rounded-lg shadow-md hover:shadow-lg cursor-pointer 
        hover:scale-[1.02] sm:hover:scale-105 transition-all duration-200 xs:col-span-2 lg:col-span-1'>
          <img src={assets.dashboard_icon_3} alt="Drafts" className='w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0' />
          <div>
            <p className='text-lg sm:text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light text-xs sm:text-sm'>Drafts</p>
          </div>
        </div>      
      </div>
    
      {/* Latest Blogs Section */}
      <div>
        <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5'>
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0' />
          <p className='text-sm sm:text-base md:text-lg font-semibold text-gray-700'>Latest Blogs</p>
        </div>

        {/* Table - Desktop & Tablet View */}
        <div className='hidden md:block w-full overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200'>
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
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {dashboardData.recentBlogs.length === 0 && (
            <div className='text-center py-12 md:py-16'>
              <p className='text-gray-500 text-sm md:text-base'>No blogs found</p>
            </div>
          )}
        </div>

        {/* Card View - Mobile & Tablet Only */}
        <div className='md:hidden space-y-3 sm:space-y-4'>
          {dashboardData.recentBlogs.length === 0 ? (
            <div className='bg-white p-6 sm:p-8 rounded-lg shadow text-center'>
              <p className='text-gray-500 text-xs sm:text-sm'>No blogs found</p>
            </div>
          ) : (
            dashboardData.recentBlogs.map((blog, index) => (
              <div key={blog._id} className='bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-200'>
                <div className='flex justify-between items-start mb-2 sm:mb-3'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1 sm:mb-2 flex-wrap'>
                      <span className='text-xs font-semibold text-gray-500'>#{index + 1}</span>
                      <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${
                        blog.isPublished 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className='font-semibold text-gray-800 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 break-words'>
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
                  fetchBlogs={fetchDashboard} 
                  index={index + 1}
                  mobileView={true}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard