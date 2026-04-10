'use client'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/20 flex items-center justify-center z-50">
      <div className="bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl p-8 sm:p-12 text-center max-w-sm mx-4 shadow-2xl">
        {/* Animated Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-4 border-white/40 border-t-blue-400 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3">
          Loading
        </h2>

        <p className="text-slate-600 text-sm sm:text-base">
          Please wait...
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
