'use client'

import { useEffect, useState } from 'react'
import { heroJourneyStages } from '@/data/hero-journey-stages'

interface ProgressTrackerProps {
  completedStages: number[]
  currentStage?: number
  onStageClick?: (stage: number) => void
}

export default function ProgressTracker({ completedStages, currentStage, onStageClick }: ProgressTrackerProps) {
  const getStageStatus = (stageNumber: number) => {
    if (completedStages.includes(stageNumber)) return 'completed'
    if (currentStage === stageNumber) return 'current'
    if (currentStage && stageNumber < currentStage) return 'available'
    if (completedStages.length === 0 && stageNumber === 1) return 'current'
    if (completedStages.length > 0 && stageNumber === Math.max(...completedStages) + 1) return 'current'
    return 'locked'
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">Your Journey Progress</h3>
      <div className="space-y-3">
        {heroJourneyStages.map((stage, index) => {
          const status = getStageStatus(stage.number)
          const isClickable = status !== 'locked' && onStageClick

          return (
            <div
              key={stage.number}
              onClick={() => isClickable && onStageClick?.(stage.number)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                status === 'completed'
                  ? 'bg-green-500/20 border border-green-500/50'
                  : status === 'current'
                  ? 'bg-purple-500/30 border-2 border-purple-500'
                  : status === 'available'
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-gray-500/10 border border-gray-500/20 opacity-50 cursor-not-allowed'
              } ${isClickable ? 'hover:scale-105' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  status === 'completed'
                    ? 'bg-green-500 text-white'
                    : status === 'current'
                    ? 'bg-purple-500 text-white'
                    : status === 'available'
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {status === 'completed' ? '✓' : stage.number}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{stage.title}</div>
                <div className="text-xs text-white/70">{stage.description.substring(0, 60)}...</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-white">
          {completedStages.length} / 12 Stages Completed
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedStages.length / 12) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}







