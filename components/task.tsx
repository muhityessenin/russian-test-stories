"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import WordButton from "@/components/word-button"

interface TaskProps {
    sentence: {
        scrambled: string[]
        correct: string[]
    }
    onSubmit: (selectedWords: string[]) => void
    taskNumber: number
}

export default function Task({ sentence, onSubmit, taskNumber }: TaskProps) {
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [availableWords, setAvailableWords] = useState<string[]>([])

    useEffect(() => {
        // Shuffle the words for the scrambled sentence
        setAvailableWords([...sentence.scrambled].sort(() => Math.random() - 0.5))
        setSelectedWords([])
    }, [sentence])

    const handleWordSelect = (word: string, index: number) => {
        const newAvailableWords = [...availableWords]
        newAvailableWords.splice(index, 1)
        setAvailableWords(newAvailableWords)
        setSelectedWords([...selectedWords, word])
    }

    const handleWordDeselect = (word: string, index: number) => {
        const newSelectedWords = [...selectedWords]
        newSelectedWords.splice(index, 1)
        setSelectedWords(newSelectedWords)
        setAvailableWords([...availableWords, word])
    }

    const handleSubmit = () => {
        // Only submit if all words are selected
        if (selectedWords.length === sentence.scrambled.length) {
            onSubmit(selectedWords)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-xl mx-auto">
            <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
          {taskNumber}-сұрақ
        </span>
                <h2 className="text-xl font-semibold text-gray-800">Дұрыс сөйлем құрастырыңыз</h2>
            </div>

            <div className="min-h-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border-2 border-dashed border-blue-200 overflow-hidden">
                {selectedWords.length === 0 ? (
                    <p className="text-blue-400 italic text-center">Төмендегі сөздерді басыңыз...</p>
                ) : (
                    <motion.div
                        className="flex flex-wrap gap-2 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {selectedWords.map((word, index) => (
                            <motion.div
                                key={`selected-${word}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.2, 0.65, 0.3, 0.9],
                                    delay: index * 0.06,
                                }}
                            >
                                <WordButton word={word} onClick={() => handleWordDeselect(word, index)} isSelected={true} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
                {availableWords.map((word, index) => (
                    <WordButton
                        key={`available-${word}-${index}`}
                        word={word}
                        onClick={() => handleWordSelect(word, index)}
                        isSelected={false}
                    />
                ))}
            </div>

            <motion.button
                onClick={handleSubmit}
                disabled={selectedWords.length !== sentence.scrambled.length}
                className={`
          w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300
          ${
                    selectedWords.length !== sentence.scrambled.length
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 active:scale-98"
                }
        `}
                whileHover={selectedWords.length === sentence.scrambled.length ? { scale: 1.02 } : {}}
                whileTap={selectedWords.length === sentence.scrambled.length ? { scale: 0.98 } : {}}
            >
                Келесі
            </motion.button>
        </div>
    )
}
