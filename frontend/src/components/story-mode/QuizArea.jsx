import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import QuestionCard from './QuestionCard'


export default function QuizArea({ isGameStart, phase, scenarioId, scenario, onHandleChoice, onHandleQuizResult }) {
    return (
        <>
            <AnimatePresence mode="wait">
                {isGameStart && phase === "quiz" && (
                    <motion.div
                        key={`qc-${scenarioId}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="w-full flex justify-center flex-grow-0"
                    >
                        <QuestionCard
                            scenario={scenario}
                            onChoice={onHandleChoice}
                            onQuizResult={onHandleQuizResult}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
