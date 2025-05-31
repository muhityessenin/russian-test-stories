"use client"

import { motion } from "framer-motion"

interface ResultsScreenProps {
  score: number
  onRestart: () => void
}

export default function ResultsScreen({ score, onRestart }: ResultsScreenProps) {
  const getScoreMessage = () => {
    if (score >= 90) return "Керемет! Сіз орыс тілін өте жақсы білесіз!"
    if (score >= 70) return "Жақсы! Сіздің деңгейіңіз жоғары."
    if (score >= 50) return "Жарайды! Одан әрі жаттығуды жалғастырыңыз."
    return "Алаңдамаңыз! Тағы да жаттығып көріңіз."
  }

  const getScoreColor = () => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-blue-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-500"
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.6, ease: "easeOut"}}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-md w-full text-center"
      >
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <img
                src="/logo.png"
                alt="Akcent Academy"
                className="w-16 h-16 rounded-full object-contain"
            />
          </div>


          <h1 className="text-2xl font-bold text-gray-800 mb-2">Тест аяқталды!</h1>
          <p className="text-gray-600">Сіздің нәтижеңіз:</p>
        </div>

        <div className="mb-8">
          <div className={`text-6xl font-bold ${getScoreColor()} mb-4`}>{score}%</div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                initial={{width: 0}}
                animate={{width: `${score}%`}}
                transition={{duration: 1.5, ease: "easeOut"}}
            />
          </div>

          <p className={`text-lg font-medium ${getScoreColor()} mb-6`}>{getScoreMessage()}</p>
        </div>

        <div className="space-y-4">
          <motion.a
              href="https://wa.me/77079894019?text=%D0%91%D0%BE%D0%BD%D1%83%D1%81%20%D0%B0%D0%BB%D2%93%D1%8B%D0%BC%20%D0%BA%D0%B5%D0%BB%D0%B5%D0%B4%D1%96"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
          >
            Бонусымды аламын
          </motion.a>

          <motion.button
              onClick={onRestart}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
          >
            Қайта бастау
          </motion.button>
        </div>


        <div className="text-center mt-12 opacity-60">
          <div className="inline-flex items-center gap-2 text-blue-500">
            <img
                src="/logo.png"
                alt="Akcent Academy"
                className="w-5 h-5 object-contain rounded-full"
            />
            <span className="text-sm font-medium">Akcent Academy</span>
          </div>
        </div>


      </motion.div>
    </main>
  )
}
