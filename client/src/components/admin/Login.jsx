import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Mail, Lock } from 'lucide-react'

const Login = () => {

  const {axios, setToken} = useAppContext()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/admin/login', {email, password})
      if(data.success){
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='w-full max-w-sm sm:max-w-md p-6 sm:p-8 border border-primary/30
      shadow-xl shadow-primary/15 rounded-lg bg-white'>
        <div className='flex flex-col items-center justify-center'>
           <div className='w-full py-4 sm:py-6 text-center'>
             <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
               <span className='text-primary'>Admin</span> Login
             </h1>
             <p className='font-light text-sm sm:text-base mt-2 text-gray-600'>
               Enter your credentials to access the admin panel
             </p>
           </div>

          <form onSubmit={handleSubmit} className='mt-4 sm:mt-6 w-full text-gray-600'>
            <div className='flex flex-col mb-4 sm:mb-6'>
                <label className='text-sm sm:text-base font-medium mb-2'>Email</label>
                <div className='relative'>
                  <Mail className='absolute left-0 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                  <input 
                    onChange={e => setEmail(e.target.value)} 
                    value={email} 
                    type="email" 
                    required 
                    placeholder='your email' 
                    className='w-full border-b-2 border-gray-300 pl-8 pr-2 py-2 sm:py-3 outline-none 
                    focus:border-primary transition-colors text-sm sm:text-base'
                  />
                </div>
            </div>
            <div className='flex flex-col mb-6 sm:mb-8'>
                <label className='text-sm sm:text-base font-medium mb-2'>Password</label>
                <div className='relative'>
                  <Lock className='absolute left-0 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                  <input 
                    onChange={e => setPassword(e.target.value)} 
                    value={password} 
                    type="password" 
                    required 
                    placeholder='your password' 
                    className='w-full border-b-2 border-gray-300 pl-8 pr-2 py-2 sm:py-3 outline-none 
                    focus:border-primary transition-colors text-sm sm:text-base'
                  />
                </div>
            </div>
            <button 
              type='submit' 
              className='w-full py-3 sm:py-3.5 font-medium text-sm sm:text-base 
              bg-primary text-white rounded cursor-pointer 
              hover:bg-primary/90 active:scale-95 transition-all'
            >
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login