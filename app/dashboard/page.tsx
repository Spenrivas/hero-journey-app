'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Sparkles } from 'lucide-react'
import ProgressTracker from '@/components/ProgressTracker'
import { heroJourneyStages } from '@/data/hero-journey-stages'
import toast from 'react-hot-toast'

interface User {
  id: number
  email: string
  name: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (!token || !userStr) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userStr))
    loadProgress()
  }, [router])

  const loadProgress = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const progress = data.progress || []

        // Calculate completed stages (all 3 questions answered)
        const stageCounts: Record<number, number> = {}
        progress.forEach((p: any) => {
          if (p.answer && p.answer.trim()) {
            stageCounts[p.stage] = (stageCounts[p.stage] || 0) + 1
          }
        })

        const completed = Object.keys(stageCounts)
          .filter((stage) => stageCounts[parseInt(stage)] === 3)
          .map((s) => parseInt(s))

        setCompletedStages(completed)
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handleStageClick = (stage: number) => {
    router.push(`/stage/${stage}`)
  }

  const getCurrentStage = () => {
    if (completedStages.length === 0) return 1
    if (completedStages.length === 12) return 12
    return Math.max(...completedStages) + 1
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-purple-200">Continue your Hero's Journey</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/journey-3d"
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              <Sparkles size={18} />
              3D Journey
            </Link>
            <Link
              href="/community"
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Community
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ProgressTracker
              completedStages={completedStages}
              currentStage={getCurrentStage()}
              onStageClick={handleStageClick}
            />
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-purple-200">Progress</div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round((completedStages.length / 12) * 100)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-purple-200">Stages Completed</div>
                  <div className="text-2xl font-bold text-white">{completedStages.length} / 12</div>
                </div>
                {completedStages.length === 12 && (
                  <Link
                    href="/completion"
                    className="block mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    View Completion
                  </Link>
                )}
              </div>
            </div>

            {/* Next Stage */}
            {completedStages.length < 12 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Continue Your Journey</h3>
                <p className="text-purple-200 mb-4">
                  {heroJourneyStages[getCurrentStage() - 1]?.title}
                </p>
                <Link
                  href={`/stage/${getCurrentStage()}`}
                  className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Continue to Stage {getCurrentStage()}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}







