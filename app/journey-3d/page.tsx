'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { heroJourneyStages } from '@/data/hero-journey-stages'
import dynamic from 'next/dynamic'

// Completely disable SSR for 3D components - only load on client
const Journey3DViewer = dynamic(
  () => import('@/components/Journey3DScene').catch(() => {
    // Fallback if 3D components fail to load
    return { default: () => <div className="flex items-center justify-center h-full text-white">3D visualization unavailable</div> };
  }), 
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full text-white">Loading 3D scene...</div>
  }
)

export default function Journey3DPage() {
  const router = useRouter()
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

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
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Your 3D Journey</h1>
          <p className="text-purple-200">
            Explore your progress through the Hero's Journey in 3D. Rotate, zoom, and interact with
            your path.
          </p>
          <div className="mt-4 text-white">
            <p>
              Completed Stages: {completedStages.length} / 12
            </p>
            <div className="flex gap-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span className="text-sm">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg border border-white/20" style={{ height: '600px' }}>
          <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading 3D scene...</div>}>
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
              <Journey3DScene completedStages={completedStages} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

