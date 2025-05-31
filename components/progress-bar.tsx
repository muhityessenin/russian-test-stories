"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span className="font-medium">
          {current}-сұрақ, барлығы {total}
        </span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
