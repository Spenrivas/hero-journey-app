'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            Find Your Spark
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-8">
            Embark on Your Hero's Journey
          </p>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            Join thousands of teens discovering their purpose and connecting with their tribe. 
            Transform your journey from feeling stuck to finding your true calling.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Your Journey
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-200 border-2 border-white/30"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">12 Stages</h3>
            <p className="text-purple-100">Navigate through the complete Hero's Journey framework with guided questions.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
            <p className="text-purple-100">Save your reflections and see your transformation unfold in real-time.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">Community Support</h3>
            <p className="text-purple-100">Connect with others on the same journey. You are not alone.</p>
          </div>
        </div>
      </div>
    </div>
  )
}







