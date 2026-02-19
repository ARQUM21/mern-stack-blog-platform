import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment, fetchComments}) => {
  
  const {blog, createdAt, _id } = comment;

  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext()

  const approveComment = async () => {
     try {
      const { data } = await axios.post('/api/admin/approve-comment', {id: _id})
      if(data.success){
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
  }

  const deleteComment = async () => {
     try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if(!confirm) return;

      const { data } = await axios.post('/api/admin/approve-comment', {id: _id})
      if(data.success){
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
     }
  }

  return (
    <tr className='border-y border-gray-300 hover:bg-gray-50 transition-colors'>
        <td className='px-3 sm:px-4 md:px-6 py-3 sm:py-4'>
            <div className='space-y-2'>
              <p className='text-xs sm:text-sm'>
                <b className='font-semibold text-gray-700'>Blog:</b> 
                <span className='ml-1 sm:ml-2 text-gray-600'>{blog.title}</span>
              </p>
              <p className='text-xs sm:text-sm'>
                <b className='font-semibold text-gray-700'>Name:</b> 
                <span className='ml-1 sm:ml-2 text-gray-600'>{comment.name}</span>
              </p>
              <p className='text-xs sm:text-sm'>
                <b className='font-semibold text-gray-700'>Comment:</b> 
                <span className='ml-1 sm:ml-2 text-gray-600 line-clamp-2'>{comment.content}</span>
              </p>
              
              {/* Mobile Date */}
              <p className='text-xs text-gray-500 sm:hidden mt-2'>
                <b className='font-semibold'>Date:</b> {BlogDate.toLocaleDateString()}
              </p>
            </div>
        </td>
        <td className='px-4 sm:px-6 py-3 sm:py-4 max-sm:hidden text-sm text-gray-600'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className='px-3 sm:px-4 md:px-6 py-3 sm:py-4'>
           <div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
            {!comment.isApproved ? 
            <button 
              onClick={approveComment}
              className='p-1.5 sm:p-2 hover:bg-green-50 rounded-lg transition-colors'
              title='Approve Comment'
            >
              <img 
                src={assets.tick_icon} 
                alt="Approve"
                className='w-4 h-4 sm:w-5 sm:h-5 hover:scale-110 transition-transform cursor-pointer'
              />
            </button>
             : 
             <span className='text-[10px] sm:text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 whitespace-nowrap'>
             ✓ Approved
             </span>
            }
            <button 
              onClick={deleteComment}
              className='p-1.5 sm:p-2 hover:bg-red-50 rounded-lg transition-colors'
              title='Delete Comment'
            >
              <img 
                src={assets.bin_icon} 
                alt="Delete" 
                className='w-4 h-4 sm:w-5 sm:h-5 hover:scale-110 transition-transform cursor-pointer' 
              />
            </button>
           </div>
        </td>
    </tr>
  )
}

export default CommentTableItem