'use client'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import retrieveData from '@/utils/retrieveData'
import LoadingPage from '../components/LoadingPage'

const Main = () => {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])
  const [dailyTasks, setDailyTasks] = useState([])
  const [goals, setGoals] = useState([])
  const [dailyMotivation, setDailyMotivation] = useState('')
  const router = useRouter()

  const motivations = [
    "Every small step counts. Keep going! 🚀",
    "Consistency is the key to success. You're doing great! 💪",
    "Progress over perfection. Celebrate today's wins! 🎉",
    "The only way to do great work is to love what you do. 💖",
    "You are capable of amazing things. Believe in yourself! 🌟",
    "Today is a fresh start. Make it count! 🌅",
    "Success is the sum of small efforts. You've got this! 🔥",
    "Dream big, work hard, stay focused! 👀",
    "Your potential is limitless. Go achieve it! ⚡",
    "Remember why you started. Keep pushing! 💯"
  ]
  const taskpage = () => {
    router.push('/tasks')
  }
  const loadDashboard = async (userId) => {
      setLoading(true)
      try {
        const res = await retrieveData(userId)
        console.log("dashboard data:", res)
        setDailyTasks(res.dailyTasks)
        setGoals(res.goals)
        setTodos(res.todos)
        // Set random daily motivation
        const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)]
        setDailyMotivation(randomMotivation)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

  useEffect(() => {

    // Check if running on client-side
    if (typeof window === 'undefined') return

    const userId = localStorage.getItem("userId")
    console.log("userId:", userId)

    if (!userId) {
      router.push("/")
      return
    }
    

    loadDashboard(userId)
  }, [])

  useEffect(() => {
    console.log("Updated todos:", todos)
    console.log("Updated dailyTasks:", dailyTasks)
    console.log("Updated goals:", goals)
  }, [todos, dailyTasks, goals])


  // to calculate the progress
  const monthlyGoal = goals.filter(g => g.type === 'monthly')
  const yearlyGoal = goals.filter(g => g.type === 'yearly')

  const monthlyTarget = monthlyGoal.reduce(
    (sum, g) => sum + g.target_value, 0
  )
  const monthlyCurrent = monthlyGoal.reduce(
    (sum, g) => sum + g.current_value, 0
  )
  const yearlyTarget = yearlyGoal.reduce(
    (sum, g) => sum + g.target_value, 0
  )
  const yearlyCurrent = yearlyGoal.reduce(
    (sum, g) => sum + g.current_value, 0
  )

  const totalDaily = dailyTasks.length
  const completedDaily = dailyTasks.filter(t => t.completed).length
  const dailyPercent = totalDaily > 0 ? (completedDaily / totalDaily) * 100 : 0
  const monthlyPercent = monthlyTarget > 0 ? (monthlyCurrent / monthlyTarget) * 100 : 0
  const yearlyPercent = yearlyTarget > 0 ? (yearlyCurrent / yearlyTarget) * 100 : 0

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {loading && <LoadingPage />}
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
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl sm:text-2xl font-semibold">
            Welcome Back, User
          </p>
          <Button size='sm' onClick={()=>{localStorage.removeItem('userId');router.push("/")}}>LogOut</Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Goal Cards */}
            <div className="grid sm:grid-cols-2 gap-4" onClick={taskpage}>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-lg sm:text-xl">Daily Goals</p>
                <p className="text-gray-500 text-sm">{completedDaily}/{totalDaily} Completed</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-green-500 h-2  rounded" style={{ width: `${dailyPercent}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-lg sm:text-xl">Monthly Goals</p>
                <p className="text-gray-500 text-sm">{monthlyCurrent || 0}/{monthlyTarget} Completed</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-blue-500 h-2  rounded" style={{ width: `${monthlyPercent}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm sm:col-span-2">
                <p className="font-semibold text-lg sm:text-xl">Yearly Goals</p>
                <p className="text-gray-500 text-sm">{yearlyCurrent || 0}/{yearlyTarget} Completed</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-yellow-500 h-2 rounded" style={{ width: `${yearlyPercent}%` }}></div>
                </div>
              </div>

            </div>

            {/* Todo Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm">

              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg sm:text-xl">
                  Today's Tasks
                </p>

              </div>

              <div className="flex flex-col gap-3" onClick={taskpage}>

                {dailyTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 text-base sm:text-lg">
                    <input type="checkbox" checked={task.completed} readOnly />
                    <p>{task.title}</p>
                  </div>
                ))}

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

              <div className="space-y-4">
                {/* Daily Progress */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Daily Tasks</p>
                  <div className="h-8 flex items-end gap-1">
                    <div
                      className="bg-green-500 flex-1 rounded transition-all duration-300"
                      style={{ height: `${dailyPercent}%` }}
                      title={`${completedDaily}/${totalDaily}`}
                    ></div>
                    <span className="text-xs font-semibold">{dailyPercent.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Monthly Progress */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Monthly Goals</p>
                  <div className="h-8 flex items-end gap-1">
                    <div
                      className="bg-blue-500 flex-1 rounded transition-all duration-300"
                      style={{ height: `${monthlyPercent}%` }}
                      title={`${monthlyCurrent}/${monthlyTarget}`}
                    ></div>
                    <span className="text-xs font-semibold">{monthlyPercent.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Yearly Progress */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Yearly Goals</p>
                  <div className="h-8 flex items-end gap-1">
                    <div
                      className="bg-yellow-500 flex-1 rounded transition-all duration-300"
                      style={{ height: `${yearlyPercent}%` }}
                      title={`${yearlyCurrent}/${yearlyTarget}`}
                    ></div>
                    <span className="text-xs font-semibold">{yearlyPercent.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Goal Completion */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-gray-500 text-sm">Daily Goal Completion</p>
              <p className="text-2xl font-bold">{dailyPercent.toFixed(1)}%</p>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-5 shadow-sm border border-purple-200">
              <p className="text-gray-700 text-sm font-semibold mb-3">💡 Daily Motivation</p>
              <p className="text-lg font-semibold text-slate-800 leading-relaxed">{dailyMotivation}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Main
