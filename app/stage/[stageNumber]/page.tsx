'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import StageQuestion from '@/components/StageQuestion'
import { heroJourneyStages } from '@/data/hero-journey-stages'
import toast from 'react-hot-toast'

export default function StagePage() {
  const router = useRouter()
  const params = useParams()
  const stageNumber = parseInt(params.stageNumber as string)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [audioUrls, setAudioUrls] = useState<Record<number, string>>({})
  const [videoUrls, setVideoUrls] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)

  const stage = heroJourneyStages.find((s) => s.number === stageNumber)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    loadProgress()
  }, [stageNumber, router])

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

        const stageProgress = progress.filter((p: any) => p.stage === stageNumber)
        const answersMap: Record<number, string> = {}
        const audioMap: Record<number, string> = {}
        const videoMap: Record<number, string> = {}

        stageProgress.forEach((p: any) => {
          if (p.answer) answersMap[p.questionNumber] = p.answer
          if (p.audioUrl) audioMap[p.questionNumber] = p.audioUrl
          if (p.videoUrl) videoMap[p.questionNumber] = p.videoUrl
        })

        setAnswers(answersMap)
        setAudioUrls(audioMap)
        setVideoUrls(videoMap)
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (questionNumber: number, answer: string, audioUrl?: string, videoUrl?: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stage: stageNumber,
          questionNumber,
          answer,
          audioUrl,
          videoUrl,
        }),
      })

      if (response.ok) {
        setAnswers({ ...answers, [questionNumber]: answer })
        if (audioUrl) setAudioUrls({ ...audioUrls, [questionNumber]: audioUrl })
        if (videoUrl) setVideoUrls({ ...videoUrls, [questionNumber]: videoUrl })
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast.error('Failed to save answer')
    }
  }

  const handleClear = async (questionNumber: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `/api/progress?stage=${stageNumber}&question=${questionNumber}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        const newAnswers = { ...answers }
        delete newAnswers[questionNumber]
        setAnswers(newAnswers)
      }
    } catch (error) {
      toast.error('Failed to clear answer')
    }
  }

  const allQuestionsAnswered = () => {
    return [1, 2, 3].every((q) => answers[q] && answers[q].trim())
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!stage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl">Stage not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm text-purple-300 font-semibold">
                  Stage {stage.number} of 12
                </span>
                <h1 className="text-3xl font-bold text-white mt-2">{stage.title}</h1>
              </div>
              {allQuestionsAnswered() && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={24} />
                  <span className="font-semibold">Completed</span>
                </div>
              )}
            </div>
            <p className="text-purple-200 text-lg">{stage.description}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {stage.questions.map((question, index) => (
            <StageQuestion
              key={index}
              stage={stage.number}
              questionNumber={index + 1}
              question={question}
              initialAnswer={answers[index + 1] || ''}
              onSave={(answer, audioUrl, videoUrl) =>
                handleSave(index + 1, answer, audioUrl, videoUrl)
              }
              onClear={() => handleClear(index + 1)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 mb-8">
          <Link
            href={stageNumber > 1 ? `/stage/${stageNumber - 1}` : '/dashboard'}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
          >
            <ArrowLeft size={20} />
            Previous
          </Link>

          {allQuestionsAnswered() && (
            <div className="text-center">
              <p className="text-purple-200 mb-2">Great job completing this stage!</p>
              <Link
                href={stageNumber < 12 ? `/stage/${stageNumber + 1}` : '/completion'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold"
              >
                {stageNumber < 12 ? 'Next Stage' : 'Complete Journey'}
                <ArrowRight size={20} />
              </Link>
            </div>
          )}

          {stageNumber < 12 && (
            <Link
              href={`/stage/${stageNumber + 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Next
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}







