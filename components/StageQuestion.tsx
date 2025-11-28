'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, Video, Save, Trash2, Play, Square } from 'lucide-react'
import toast from 'react-hot-toast'

interface StageQuestionProps {
  stage: number
  questionNumber: number
  question: string
  initialAnswer?: string
  onSave: (answer: string, audioUrl?: string, videoUrl?: string) => void
  onClear: () => void
}

export default function StageQuestion({
  stage,
  questionNumber,
  question,
  initialAnswer = '',
  onSave,
  onClear,
}: StageQuestionProps) {
  const [answer, setAnswer] = useState(initialAnswer)
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isRecordingVideo, setIsRecordingVideo] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const videoStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    setAnswer(initialAnswer)
  }, [initialAnswer])

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        toast.success('Audio recording saved!')
      }

      mediaRecorder.start()
      setIsRecording(true)
      toast.success('Recording started...')
    } catch (error) {
      toast.error('Failed to start recording. Please allow microphone access.')
    }
  }

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
    }
  }

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      videoStreamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(audioChunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(videoBlob)
        setVideoUrl(url)
        toast.success('Video recording saved!')
        if (videoStreamRef.current) {
          videoStreamRef.current.getTracks().forEach((track) => track.stop())
        }
      }

      mediaRecorder.start()
      setIsRecordingVideo(true)
      toast.success('Video recording started...')
    } catch (error) {
      toast.error('Failed to start video recording. Please allow camera and microphone access.')
    }
  }

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecordingVideo) {
      mediaRecorderRef.current.stop()
      setIsRecordingVideo(false)
    }
  }

  const handleSave = () => {
    if (!answer.trim() && !audioUrl && !videoUrl) {
      toast.error('Please provide an answer, audio, or video')
      return
    }
    onSave(answer, audioUrl || undefined, videoUrl || undefined)
    toast.success('Answer saved!')
  }

  const handleClear = () => {
    setAnswer('')
    setAudioUrl(null)
    setVideoUrl(null)
    if (isRecording) stopAudioRecording()
    if (isRecordingVideo) stopVideoRecording()
    onClear()
    toast.success('Answer cleared')
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6">
      <div className="mb-4">
        <span className="text-sm text-purple-300 font-semibold">
          Question {questionNumber} of 3
        </span>
        <h3 className="text-xl font-bold text-white mt-2">{question}</h3>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Reflect on this question and share your thoughts..."
        className="w-full h-40 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={isRecording ? stopAudioRecording : startAudioRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isRecording ? <Square size={18} /> : <Mic size={18} />}
          {isRecording ? 'Stop Recording' : 'Record Audio'}
        </button>

        <button
          onClick={isRecordingVideo ? stopVideoRecording : startVideoRecording}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isRecordingVideo
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRecordingVideo ? <Square size={18} /> : <Video size={18} />}
          {isRecordingVideo ? 'Stop Video' : 'Record Video'}
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
        >
          <Save size={18} />
          Save Answer
        </button>

        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>

      {audioUrl && (
        <div className="mt-4">
          <p className="text-white mb-2">Audio Recording:</p>
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}

      {videoUrl && (
        <div className="mt-4">
          <p className="text-white mb-2">Video Recording:</p>
          <video src={videoUrl} controls className="w-full max-w-md rounded-lg" />
        </div>
      )}
    </div>
  )
}







