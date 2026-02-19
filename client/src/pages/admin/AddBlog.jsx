import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { PlusCircle } from 'lucide-react';



const AddBlog = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)
  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if(!title) return toast.error('Please Enter a Title')
      try {
        setLoading(true);
        const { data } = await axios.post('/api/blog/generate', {prompt: title})
        if(data.success){
          quillRef.current.root.innerHTML = parse(data.content)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      } 
  }
  
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML, category, isPublished
      }
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post(`/api/blog/add`, formData);

      if(data.success){
        toast.success(data.message);
        setImage(false)
        setTitle('')
        setSubtitle('')
        quillRef.current.root.innerHTML = ''
        setCategory('Startup')
        setIsPublished(false)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsAdding(false)
    }
    
  }

  useEffect(() => {
   //initial Quill only once
   if(!quillRef.current && editorRef.current){
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Write your blog description here...'
    })
   }
  },[])


  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 min-h-screen overflow-auto p-4 sm:p-6 md:p-10'>
      
      {/* Header */}
      <div className='flex items-center gap-3 mb-6 sm:mb-8'>
        <PlusCircle className='w-6 h-6 sm:w-7 sm:h-7 text-primary' />
        <div>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>Add Blog</h1>
          <p className='text-xs sm:text-sm text-gray-500'>Create and publish your amazing blog post</p>
        </div>
      </div>

      {/* Form Content */}
      <div className='bg-white w-full max-w-3xl p-4 sm:p-6 md:p-10 shadow rounded'>
        
        {/* Upload Thumbnail */}
        <p className='text-sm sm:text-base font-medium text-gray-700'>Upload thumbnail</p>
        <label htmlFor='image'>
          <img 
            src={!image ? assets.upload_area : URL.createObjectURL(image)} 
            alt="" 
            className='mt-4 h-16 sm:h-20 rounded cursor-pointer hover:opacity-80 transition-opacity'
          />
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type='file' 
            id='image' 
            hidden 
            required 
          />
        </label>

        {/* Blog Title */}
        <p className='mt-6 text-sm sm:text-base font-medium text-gray-700'>Blog Title</p>
        <input 
          type="text" 
          placeholder='Type here' 
          required 
          className='w-full max-w-lg mt-2 p-2 sm:p-3 
          border border-gray-300 outline-none rounded
          focus:border-primary transition-colors text-sm sm:text-base'
          onChange={e => setTitle(e.target.value)} 
          value={title} 
        />
        
        {/* Sub Title */}
        <p className='mt-6 text-sm sm:text-base font-medium text-gray-700'>Sub Title</p>
        <input 
          type="text" 
          placeholder='Type here' 
          required 
          className='w-full max-w-lg mt-2 p-2 sm:p-3 
          border border-gray-300 outline-none rounded
          focus:border-primary transition-colors text-sm sm:text-base'
          onChange={e => setSubtitle(e.target.value)} 
          value={subTitle} 
        />

        {/* Blog Description */}
        <p className='mt-6 text-sm sm:text-base font-medium text-gray-700'>Blog Description</p>
        <div className='max-w-lg h-64 sm:h-72 md:h-80 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef} className='h-full'></div>
          {loading && 
          (<div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
             <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
          </div>)}
          <button 
            disabled={loading} 
            type='button' 
            onClick={generateContent}
            className='absolute bottom-1 sm:bottom-2 right-2 text-xs sm:text-sm text-white bg-black/70 
            px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:underline cursor-pointer
            disabled:opacity-50 transition-all'
          >
            Generate with AI
          </button>
        </div>

        {/* Blog Category */}
        <p className='mt-8 text-sm sm:text-base font-medium text-gray-700'>Blog category</p>
        <select 
          onChange={e => setCategory(e.target.value)} 
          name="category"
          value={category}
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded
          focus:border-primary transition-colors text-sm sm:text-base'
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        {/* Publish Checkbox */}
        <div className='flex gap-2 mt-6' >
          <p className='text-sm sm:text-base'>Publish Now</p>
          <input 
            type="checkbox" 
            checked={isPublished} 
            className='scale-125 cursor-pointer' 
            onChange={e => setIsPublished(e.target.checked)} 
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={isAdding} 
          type='submit' 
          className='mt-8 w-full sm:w-40 h-10 sm:h-11 bg-primary text-white rounded cursor-pointer text-sm
          hover:bg-primary/90 disabled:opacity-50 transition-all'
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog