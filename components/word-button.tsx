"use client"

import { motion } from "framer-motion"

interface WordButtonProps {
  word: string
  onClick: () => void
  isSelected: boolean
  isCorrect?: boolean
}

export default function WordButton({ word, onClick, isSelected, isCorrect = false }: WordButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-base font-medium shadow-sm
        transition-all duration-300 transform
        ${
          isSelected
            ? isCorrect
              ? "bg-green-100 text-green-700 border-2 border-green-300"
              : "bg-blue-100 text-blue-700 border-2 border-blue-300"
            : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50"
        }
      `}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        mass: 1,
      }}
    >
      {word}
    </motion.button>
  )
}
