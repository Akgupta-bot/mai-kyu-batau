import { useState } from 'react';
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'

export default function QuizBlock({ scenario, onQuizResult }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);

    const qs = scenario.quiz;

    function select(option) {
        setAnswers((prev) => ({ ...prev, [currentQ]: option }));

        if (currentQ < qs.length - 1) {
            // move to next question
            setCurrentQ(currentQ + 1);
        } else {
            // last question → submit
            submit({ ...answers, [currentQ]: option });
        }
    }

    function submit(finalAnswers = answers) {
        const correct = qs.reduce(
            (acc, q, i) => acc + (finalAnswers[i] === q.answer ? 1 : 0),
            0
        );
        const passed = correct >= Math.ceil(qs.length * 0.6); // 60% pass threshold
        setSubmitted(true);
        setTimeout(() => onQuizResult({ passed }), 700); // small pause before moving on
    }

    const q = qs[currentQ];

    return (
        <>
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 text-center">
                    Quick Quiz
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
                <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-white rounded-xl p-4 border"
                >
                    <p className="font-medium mb-3">
                        {currentQ + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, i) => {
                            const active = answers[currentQ] === opt;
                            return (
                                <button
                                    key={i}
                                    onClick={() => select(opt)}
                                    disabled={submitted}
                                    className={`text-left rounded-lg px-3 py-2 border transition ${active
                                            ? "border-blue-600 bg-blue-50"
                                            : "hover:bg-gray-50"
                                        }`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </CardContent>
        </>
    );
}
