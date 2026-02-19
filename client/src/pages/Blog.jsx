import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const Blog = () => {

  const { id } = useParams()

  const { axios } = useAppContext()
   
  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })
      if(data.success){
        setComments(data.comments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments() 
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [])

  return data ? (
    <div className='relative min-h-screen'>
      <img src={assets.gradientBackground} alt="" className='absolute inset-0 -z-10 opacity-50 object-cover'/>
      <Navbar />

      {/* Blog Header */}
      <div className='text-center mt-12 sm:mt-16 md:mt-20 text-gray-600 px-3 sm:px-6'>
        <p className='text-primary py-3 sm:py-4 font-medium text-sm sm:text-base'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-3xl mx-auto text-gray-800 leading-tight'>
          {data.title}
        </h1>
        <h2 className='my-4 sm:my-5 max-w-2xl mx-auto text-sm sm:text-base text-gray-600'>
          {data.subTitle}
        </h2>
        <p className='inline-block py-1 sm:py-1.5 px-3 sm:px-4 rounded-full mb-6 sm:mb-8 border text-xs sm:text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          Michael Brown
        </p>
      </div>

      {/* Blog Content */}
      <div className='mx-3 sm:mx-5 md:mx-auto my-8 sm:my-10 mt-6 max-w-5xl'>
        
         {/* Blog Image */}
         <img 
          src={data.image} 
          alt={data.title} 
          className='rounded-2xl sm:rounded-3xl mb-5 sm:mb-8 w-full h-auto object-cover shadow-lg'
         />

         {/* Blog Description */}
         <div className='rich-text max-w-3xl mx-auto px-3 sm:px-0 text-gray-700'>
           <div dangerouslySetInnerHTML={{__html: data.description}}></div>
         </div>
      
        {/* Comments Section */}
        <div className='mt-10 sm:mt-14 mb-8 sm:mb-10 max-w-3xl mx-auto px-3 sm:px-0'>
           <p className='font-semibold mb-3 sm:mb-4 text-lg sm:text-xl'>Comments ({comments.length})</p>
           <div className='flex flex-col gap-3 sm:gap-4'>
              {comments.map((item, index) => (
                <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-full p-3 sm:p-4 rounded-lg text-gray-600'>
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.user_icon} alt="User" className='w-5 sm:w-6' />
                    <p className='font-medium text-sm sm:text-base'>{item.name}</p>
                  </div>
                  <p className='text-xs sm:text-sm max-w-full ml-7 sm:ml-8 leading-relaxed'>
                    {item.content}
                  </p>
                  <div className='absolute right-3 sm:right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500'>
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Add Comment Section */}
        <div className='max-w-3xl mx-auto px-3 sm:px-0'>
           <p className='font-semibold mb-3 sm:mb-4 text-lg sm:text-xl'>Add your comment</p>
           <form onSubmit={addComment} className='flex flex-col items-start gap-3 sm:gap-4 max-w-full'>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                type="text" 
                placeholder='Your Name' 
                required 
                className='w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 text-sm'
              />

              <textarea 
                onChange={(e) => setContent(e.target.value)} 
                value={content} 
                placeholder='Write your comment here...' 
                className='w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary/30 h-32 sm:h-48 text-sm resize-none' 
                required
              ></textarea>

              <button 
                type='submit' 
                className='bg-primary text-white rounded-lg p-2.5 sm:p-3 px-6 sm:px-8 hover:bg-primary/90 transition-all cursor-pointer text-sm sm:text-base font-medium'
              >
                Submit Comment
              </button>
           </form>
        </div>

        {/* Share Buttons */}
        <div className='my-16 sm:my-20 max-w-3xl mx-auto px-3 sm:px-0' >
          <p className='font-semibold my-3 sm:my-4 text-base sm:text-lg'>Share this article on social media</p>
        
          <div className='flex gap-3 sm:gap-4'>
            <img src={assets.facebook_icon} alt="Facebook" className='w-10 sm:w-12 h-auto cursor-pointer hover:scale-110 transition-transform' />
            <img src={assets.twitter_icon} alt="Twitter" className='w-10 sm:w-12 h-auto cursor-pointer hover:scale-110 transition-transform' />
            <img src={assets.googleplus_icon} alt="Google Plus" className='w-10 sm:w-12 h-auto cursor-pointer hover:scale-110 transition-transform' />
          </div>
        </div>
      </div>
    
      <Footer />

    </div>
  ) : <Loader />
}

export default Blog