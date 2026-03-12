// import React from 'react'
// import Main from '../components/Main'

// const Dashboard = () => {
//   return (
//     <div className='dark flex flex-col h-screen'>   
//     <Main/>     
//     </div>
//   )
// }

// export default Dashboard

'use client'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'


const Main = () => {
  const router = useRouter()
  const taskpage = ()=>{
    router.push('/tasks')
  }
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <div className="
        w-[70px] 
        sm:w-[90px] 
        lg:w-[220px] 
        bg-[#1E293B] 
        text-white 
        flex 
        flex-col 
        items-center

      ">

        <div className="border-b border-slate-600 w-full flex items-center justify-center py-3">
          <Image
            src="/logo.svg"
            height={40}
            width={40}
            alt="logo"
            className="border border-white rounded-full p-1"
          />
        </div>

        <div className="w-full mt-4 flex flex-col gap-2 px-2">

          <div className="p-2 rounded-lg bg-[#3B82F6] hover:bg-[#334155] cursor-pointer text-center lg:text-left">
            <span className="hidden lg:inline">Dashboard</span>
            <span className="lg:hidden">D</span>
          </div>

          <div className="p-2 rounded-lg hover:bg-[#334155] cursor-pointer text-center lg:text-left" onClick={taskpage}>
            <span className="hidden lg:inline">Tasks</span>
            <span className="lg:hidden">T</span>
          </div>

          <div className="p-2 rounded-lg hover:bg-[#334155] cursor-pointer text-center lg:text-left">
            <span className="hidden lg:inline">Stats</span>
            <span className="lg:hidden">S</span>
          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl sm:text-2xl font-semibold">
            Welcome Back, User
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Goal Cards */}
            <div className="grid sm:grid-cols-2 gap-4" onClick={taskpage}>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-lg sm:text-xl">Daily Goals</p>
                <p className="text-gray-500 text-sm">3/5 Completed</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-green-500 h-2 w-[60%] rounded"></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-lg sm:text-xl">Monthly Goals</p>
                <p className="text-gray-500 text-sm">7/10 Completed</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-blue-500 h-2 w-[70%] rounded"></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm sm:col-span-2">
                <p className="font-semibold text-lg sm:text-xl">Yearly Goals</p>
                <p className="text-gray-500 text-sm">2/6 Completed</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-yellow-500 h-2 w-[30%] rounded"></div>
                </div>
              </div>

            </div>

            {/* Todo Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm">

              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg sm:text-xl">
                  Today's Tasks
                </p>

                <Button variant="secondary" size="icon">
                  <PlusCircle size={18}/>
                </Button>
              </div>

              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-3 text-base sm:text-lg">
                  <input type="checkbox" />
                  <p>Study Backend</p>
                </div>

                <div className="flex items-center gap-3 text-base sm:text-lg">
                  <input type="checkbox" defaultChecked />
                  <p>Workout</p>
                </div>

                <div className="flex items-center gap-3 text-base sm:text-lg">
                  <input type="checkbox" />
                  <p>Write Chapter</p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">

            {/* Progress Chart */}
            <div className="bg-white rounded-xl p-5 shadow-sm">

              <p className="font-semibold text-lg mb-4">
                Your Progress
              </p>

              <div className="h-40 flex items-end gap-2">

                <div className="bg-blue-500 w-5 sm:w-6 h-[40%] rounded"></div>
                <div className="bg-blue-500 w-5 sm:w-6 h-[60%] rounded"></div>
                <div className="bg-blue-500 w-5 sm:w-6 h-[80%] rounded"></div>
                <div className="bg-blue-500 w-5 sm:w-6 h-[50%] rounded"></div>
                <div className="bg-blue-500 w-5 sm:w-6 h-[90%] rounded"></div>

              </div>

            </div>

            {/* Goal Completion */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-gray-500 text-sm">Goal Completion</p>
              <p className="text-2xl font-bold">75%</p>
            </div>

            {/* Streak */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-gray-500 text-sm">Longest Streak</p>
              <p className="text-2xl font-bold">12 Days</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Main