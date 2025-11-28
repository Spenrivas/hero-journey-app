'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Heart, Send } from 'lucide-react'
import { heroJourneyStages } from '@/data/hero-journey-stages'
import toast from 'react-hot-toast'

interface Post {
  id: number
  user_id: number
  stage: number | null
  content: string
  created_at: string
  user_name: string
  support_count: number
}

export default function CommunityPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState({ content: '', stage: '' })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [supportedPosts, setSupportedPosts] = useState<Set<number>>(new Set())

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    loadPosts()
  }, [router])

  const loadPosts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/community', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.content.trim()) {
      toast.error('Please enter some content')
      return
    }

    setSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newPost.content,
          stage: newPost.stage ? parseInt(newPost.stage) : null,
        }),
      })

      if (response.ok) {
        toast.success('Post shared!')
        setNewPost({ content: '', stage: '' })
        loadPosts()
      } else {
        throw new Error('Failed to post')
      }
    } catch (error) {
      toast.error('Failed to share post')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSupport = async (postId: number) => {
    try {
      const token = localStorage.getItem('token')
      const isSupported = supportedPosts.has(postId)

      const response = await fetch('/api/community/support', {
        method: isSupported ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        const newSupported = new Set(supportedPosts)
        if (isSupported) {
          newSupported.delete(postId)
        } else {
          newSupported.add(postId)
        }
        setSupportedPosts(newSupported)
        loadPosts()
      }
    } catch (error) {
      toast.error('Failed to update support')
    }
  }

  const getStageName = (stageNumber: number | null) => {
    if (!stageNumber) return null
    return heroJourneyStages.find((s) => s.number === stageNumber)?.title
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
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Community Support</h1>
          <p className="text-purple-200">
            Share your journey, support others, and remember: You are not alone.
          </p>
        </div>

        {/* New Post Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Share Your Journey</h2>
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Stage (Optional)</label>
              <select
                value={newPost.stage}
                onChange={(e) => setNewPost({ ...newPost, stage: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a stage (optional)</option>
                {heroJourneyStages.map((stage) => (
                  <option key={stage.number} value={stage.number}>
                    Stage {stage.number}: {stage.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Your Message</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your thoughts, struggles, or victories..."
                className="w-full h-32 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold disabled:opacity-50"
            >
              <Send size={18} />
              {submitting ? 'Sharing...' : 'Share'}
            </button>
          </form>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <p className="text-purple-200">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-white">{post.user_name}</div>
                    {post.stage && (
                      <div className="text-sm text-purple-300">
                        {getStageName(post.stage)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-white/60">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-white mb-4 whitespace-pre-wrap">{post.content}</p>
                <button
                  onClick={() => handleSupport(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    supportedPosts.has(post.id)
                      ? 'bg-pink-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart
                    size={18}
                    fill={supportedPosts.has(post.id) ? 'currentColor' : 'none'}
                  />
                  {post.support_count} Support{post.support_count !== 1 ? 's' : ''}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}







