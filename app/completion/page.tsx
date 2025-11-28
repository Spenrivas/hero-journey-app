'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Trophy, Star, Heart, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function CompletionPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (!token || !userStr) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userStr))
    setLoading(false)
  }, [router])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I've completed my Hero's Journey!",
        text: `I've completed all 12 stages of the Hero's Journey on Find Your Spark!`,
      }).catch(() => {
        toast.success('Journey completed! Share your achievement!')
      })
    } else {
      toast.success('Journey completed! Share your achievement!')
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6"
        >
          🎉 CONGRATULATIONS! 🎉
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-200 mb-4">
            {user?.name}, You've Completed Your Hero's Journey!
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-left">
            <p className="text-xl text-white mb-6 leading-relaxed">
              You have successfully navigated through all 12 stages of the Hero's Journey. From the
              Ordinary World to returning with the Elixir, you've transformed yourself and are now
              ready to transform the world.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/50">
                <Star className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="font-bold text-white mb-2">12 Stages</h3>
                <p className="text-purple-200 text-sm">Completed every stage</p>
              </div>
              <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-500/50">
                <Heart className="w-8 h-8 text-pink-400 mb-2" />
                <h3 className="font-bold text-white mb-2">Transformation</h3>
                <p className="text-purple-200 text-sm">You've been transformed</p>
              </div>
              <div className="bg-indigo-500/20 rounded-lg p-4 border border-indigo-500/50">
                <Sparkles className="w-8 h-8 text-indigo-400 mb-2" />
                <h3 className="font-bold text-white mb-2">Purpose Found</h3>
                <p className="text-purple-200 text-sm">Your spark is lit</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                You Are Now the Mentor
              </h3>
              <p className="text-white leading-relaxed">
                Look ahead five years. You are back in the 'Ordinary World' but now, you are the
                'seasoned traveler'. You have the power to help others who are exactly where you
                started—lacking guidance, stuck, and unsure of their path. Your profound
                self-insight earned during your Ordeal is now the wisdom you can share to transform
                the world, just as you were transformed.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/community"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <Heart size={20} />
            Support Others
          </Link>
          <button
            onClick={handleShare}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-200 border-2 border-white/30 flex items-center gap-2"
          >
            <Share2 size={20} />
            Share Achievement
          </button>
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-200 border-2 border-white/30"
          >
            View Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-purple-200"
        >
          <p className="text-lg italic">
            "The hero returns to their ordinary world with newfound knowledge, a treasure, or a
            boon that benefits themselves and others."
          </p>
          <p className="mt-4 text-xl font-semibold text-white">
            You have returned with the Elixir. Now go and transform the world. ✨
          </p>
        </motion.div>
      </div>
    </div>
  )
}







