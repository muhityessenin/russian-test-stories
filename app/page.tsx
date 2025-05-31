"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProgressBar from "@/components/progress-bar"
import Task from "@/components/task"
import ResultsScreen from "@/components/results-screen"
import { sentences } from "@/data/sentences"

export default function Home() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[][]>([])
  const [isTestComplete, setIsTestComplete] = useState(false)

  const handleTaskSubmit = (selectedWords: string[]) => {
    const newAnswers = [...userAnswers, selectedWords]
    setUserAnswers(newAnswers)

    if (currentTaskIndex + 1 >= sentences.length) {
      setIsTestComplete(true)
    } else {
      setCurrentTaskIndex((prev) => prev + 1)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    userAnswers.forEach((answer, index) => {
      if (index < sentences.length) {
        const isCorrect =
          answer.every((word, wordIndex) => word === sentences[index].correct[wordIndex]) &&
          answer.length === sentences[index].correct.length
        if (isCorrect) correctAnswers++
      }
    })
    return Math.round((correctAnswers / sentences.length) * 100)
  }

  const resetTest = () => {
    setCurrentTaskIndex(0)
    setUserAnswers([])
    setIsTestComplete(false)
  }

  if (isTestComplete) {
    return <ResultsScreen score={calculateScore()} onRestart={resetTest} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Орыс тілін үйрену</h1>
          <p className="text-gray-600">Дұрыс сөйлем құрастырыңыз</p>
        </div>

        <ProgressBar current={currentTaskIndex + 1} total={sentences.length} />

        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTaskIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <Task
                sentence={sentences[currentTaskIndex]}
                onSubmit={handleTaskSubmit}
                taskNumber={currentTaskIndex + 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center mt-8 opacity-60">
          <div className="inline-flex items-center gap-2 text-blue-500">
            <img
                src="/logo.png"
                alt="Akcent Academy"
                className="w-5 h-5 object-cover rounded-full"
            />
            <span className="text-sm font-medium">Akcent Academy</span>
          </div>
        </div>


      </div>
    </main>
  )
}
