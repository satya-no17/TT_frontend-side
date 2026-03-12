// 'use client'
// import React, { useState } from 'react'
// import Dashboard from './dashboard/page'


// const Home = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [isLogin, setIsLogin] = useState(true)
//   const [userId, setUserId] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const endpoint = isLogin ? '/login' : '/register'
//       const response = await fetch(`http://localhost:5000${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           [isLogin ? 'password' : 'hashpass']: password,
//         }),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setError(data.error || 'An error occurred')
//         return
//       }

//       setUserId(data.user?.id || data.userId)
//       setUsername('')
//       setPassword('')
//     } catch (err) {
//       setError('Network error. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (userId) {
//     return <Dashboard userId={userId} />
//   }

//   return (
//     <div className='dark flex flex-col h-screen justify-center items-center bg-gray-950'>
//       <div className='w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg'>
//         <h1 className='text-2xl font-bold mb-6 text-white'>
//           {isLogin ? 'Login' : 'Register'}
//         </h1>
        
//         <form onSubmit={handleSubmit} className='space-y-4'>
//           <div>
//             <input
//               placeholder='Username'
//               type='text'
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className='w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500'
//               required
//             />
//           </div>

//           <div>
//             <input
//               placeholder='Password'
//               type='password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className='w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500'
//               required
//             />
//           </div>

//           {error && <p className='text-red-500 text-sm'>{error}</p>}

//           <button
//             type='submit'
//             disabled={loading}
//             className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
//           >
//             {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
//           </button>
//         </form>

//         <p className='mt-4 text-center text-gray-400'>
//           {isLogin ? "Don't have an account? " : 'Already have an account? '}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className='text-blue-500 hover:text-blue-400'
//           >
//             {isLogin ? 'Register' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Home
'use client'
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import register from '@/utils/register'
import login from '@/utils/login'

const Home = () => {  
const router = useRouter()
const [userId, setuserId] = useState('')
const [username, setUsername] = useState('')
const [hashpass, setHashpass] = useState('')

const handleSubmit = async(e)=>{
  e.preventDefault()

  const action = e.nativeEvent.submitter.value
  if (action === "login") {
    const res = await login(username,hashpass)
    console.log(res.user.id,res.user.username)
  }

  if (action === "register") {
   const  res = await register(username,hashpass)
   setuserId(res.userId)
   localStorage.setItem('userId',res.userId)
  }

}
  useEffect(() => {
  
    const storedUsername = localStorage.getItem('userId')
  localStorage.removeItem('userId')
    if(storedUsername ){
        setUsername(storedUsername)
        router.push('/dashboard')
      }



  }, [])


  
  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-4'>
<div>        <input type='text' placeholder='enter username' value={username} onChange={(e)=> setUsername(e.target.value)}></input>
</div>
<div>
          <input type='password' placeholder='enter password' value={hashpass} onChange={(e)=>setHashpass(e.target.value)}></input>
</div>    
  <Button type="submit" name="action" value="login">
    Login
  </Button>

  <Button type="submit" name="action" value="register">
    Register
  </Button> </form>
    </div>
  )
}

export default Home