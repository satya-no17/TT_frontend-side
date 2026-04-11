'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import register from '@/utils/register'
import login from '@/utils/login'
import Image from 'next/image'
import LoadingPage from './components/LoadingPage'

const Home = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [hashpass, setHashpass] = useState('')
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()

    const action = e.nativeEvent.submitter.value
    setLoading(true)
    setError('')

    try {
      if (action === "login") {
        const res = await login(username, hashpass)
        localStorage.setItem('userId', res.user.id)
        router.push('/dashboard')
      }

      if (action === "register") {
        const res = await register(username, hashpass)
        localStorage.setItem('userId', res.userId)
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError(action === "login" ? "Failed to login. Check your credentials." : "Failed to register. Try a different username.")

      setLoading(false)
    }
  }

  useEffect(() => {

    const storedUserId = localStorage.getItem('userId')
    setUserId(storedUserId)

    if (storedUserId) {
      router.push('/dashboard')

    }
  }, [router])

  return (
    
<div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
  {loading && <LoadingPage />}

  {/* HERO SECTION */}
  <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT SIDE */}
    <div className="text-center md:text-left">

      {/* LOGO + NAME */}
      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">

        <Image
          src="/logo.svg"
          height={40}
          width={40}
          alt="logo"
          className="border border-white rounded-full p-1"
        />

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Trackly
        </h1>

      </div>

      {/* TAGLINE */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
        Stay Consistent. Build Momentum 🚀
      </h2>

      <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6">
        Track your daily tasks, monitor your goals, and build habits that actually stick.
        Simple, focused, and designed for real progress.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
        <Button
          onClick={() =>
            document.getElementById("auth").scrollIntoView({ behavior: "smooth" })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Get Started
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            document.getElementById("about").scrollIntoView({ behavior: "smooth" })
          }
        >
          Learn More
        </Button>
      </div>

    </div>

    {/* RIGHT SIDE (ILLUSTRATION STYLE BOX) */}
    <div className="hidden md:flex items-center justify-center">
      <div className="hidden md:flex items-center justify-center">
        <div className="w-[320px] bg-white rounded-2xl shadow-xl p-4 space-y-3">

          <h3 className="text-sm font-semibold text-slate-700">Dashboard Preview</h3>

          {/* Fake Goal */}
          <div className="bg-slate-100 p-3 rounded-lg">
            <p className="text-xs text-slate-600">Learn System Design</p>
            <div className="w-full bg-gray-300 h-2 rounded mt-1">
              <div className="bg-blue-500 h-2 rounded w-[60%]" />
            </div>
            <p className="text-xs mt-1 text-slate-500">3 / 5 completed</p>
          </div>

          {/* Fake Task */}
          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg">
            <input type="checkbox" checked readOnly />
            <p className="text-xs line-through text-slate-400">
              Finish project setup
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg">
            <input type="checkbox" readOnly />
            <p className="text-xs text-slate-700">
              Build dashboard UI
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>

  {/* LOGIN SECTION */}
  <div id="auth" className="px-4 pb-12">

    <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-semibold text-center text-slate-800 mb-2">
        Welcome 👋
      </h2>

      <p className="text-center text-slate-500 mb-6 text-sm">
        Login or create your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={hashpass}
          onChange={(e) => setHashpass(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col  gap-3 pt-2">
          { error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
        <span>{error}</span>
        <button onClick={() => setError('')} className="font-bold ml-2">✕</button>
      </div>
    )}
          <Button
            type="submit"
            name="action"
            value="login"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Login
          </Button>

          <Button
            type="submit"
            name="action"
            value="register"
            variant="secondary"
            className="w-full"
          >
            Register
          </Button>

        </div>

      </form>

    </div>
    {/* ABOUT SECTION */}
    <div id="about" className="bg-white px-4 py-16 rounded-2xl mt-5">

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
          About This App
        </h2>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
          This app is designed to help you stay consistent with your goals and build better habits over time.
          Whether it's daily tasks, monthly milestones, or long-term achievements, everything is structured
          in a way that keeps you focused and motivated.
        </p>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
          You can track your progress visually, update your goals easily, and stay in control of your productivity.
          No distractions, no clutter — just a simple system that works.
        </p>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Built for people who want to improve every day, one step at a time.
        </p>

      </div>

    </div>

  </div>
  {/* FOOTER */}
  <footer className="bg-slate-900 text-slate-300 px-4 py-6 mt-10">

    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

      {/* LEFT */}
      <p className="text-sm text-center sm:text-left">
        © {new Date().getFullYear()} Trackly. All rights reserved.
      </p>

      {/* RIGHT */}
      <a
        href="https://github.com/satya-no17"  // 👈 replace this
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm hover:text-white transition"
      >
        Built by Satya • GitHub
      </a>

    </div>

  </footer>
</div>
  )
}

export default Home