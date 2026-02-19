import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { MessageSquare } from 'lucide-react'

const Comments = () => {
  
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const { axios } = useAppContext()

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  },[])
  
  
  return (
    <div className='flex-1 min-h-screen bg-blue-50/50 p-4 sm:p-6 md:pt-12 md:pl-16'>
      
      {/* Header */}
      <div className='flex items-center gap-3 mb-6 sm:mb-8'>
        <MessageSquare className='w-6 h-6 sm:w-7 sm:h-7 text-primary' />
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>Comments</h1>
          <p className='text-xs sm:text-sm text-gray-500'>Manage and moderate blog comments</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className='flex flex-wrap gap-3 sm:gap-4 mb-6'>
        <button 
          onClick={() => setFilter('Approved')} 
          className={`shadow-md border rounded-full 
          px-4 sm:px-5 md:px-6 
          py-1.5 sm:py-2 
          cursor-pointer text-xs sm:text-sm font-medium
          transition-all duration-200
          ${filter === 'Approved' 
            ? 'text-white bg-primary border-primary' 
            : 'text-gray-700 bg-white hover:bg-gray-50'}`}
        >
          Approved
        </button>
        
        <button 
          onClick={() => setFilter('Not Approved')}  
          className={`shadow-md border rounded-full 
          px-4 sm:px-5 md:px-6 
          py-1.5 sm:py-2 
          cursor-pointer text-xs sm:text-sm font-medium
          transition-all duration-200
          ${filter === 'Not Approved' 
            ? 'text-white bg-primary border-primary' 
            : 'text-gray-700 bg-white hover:bg-gray-50'}`}
        >
          Not Approved
        </button>
      </div>

      {/* Table Container */}
      <div className='w-full overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs sm:text-sm text-gray-700 text-left uppercase bg-gray-50 border-b border-gray-200'>
            <tr>
              <th scope='col' className='px-3 sm:px-4 md:px-6 py-3 sm:py-4'>
                Blog Title & Comment
              </th>
              <th scope='col' className='px-3 sm:px-4 md:px-6 py-3 sm:py-4 hidden sm:table-cell'>
                Date
              </th>
              <th scope='col' className='px-3 sm:px-4 md:px-6 py-3 sm:py-4'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if(filter === 'Approved') return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index) => (
              <CommentTableItem 
                key={comment._id}
                comment={comment} 
                index={index + 1} 
                fetchComments={fetchComments} 
              />
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {comments.filter((comment) => {
          if(filter === 'Approved') return comment.isApproved === true;
          return comment.isApproved === false;
        }).length === 0 && (
          <div className='text-center py-12 sm:py-16'>
            <p className='text-gray-500 text-sm sm:text-base'>
              No {filter.toLowerCase()} comments found
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Comments