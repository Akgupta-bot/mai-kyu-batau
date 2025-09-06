import { Card, CardContent } from "@/components/ui/card";

import ChoicesBlock from './ChoicesBlock';
import QuizBlock from './QuizBlock';

export default function QuestionCard({ scenario, onChoice, onQuizResult }) {
    const hasChoices = Array.isArray(scenario.choices) && scenario.choices.length > 0;
    const hasQuiz = Array.isArray(scenario.quiz) && scenario.quiz.length > 0;

    return (
        <Card className="w-[60%] shadow-2xl rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-100">
            {hasChoices ? (
                <ChoicesBlock scenario={scenario} onChoice={onChoice} />
            ) : hasQuiz ? (
                <QuizBlock scenario={scenario} onQuizResult={onQuizResult} />
            ) : (
                <CardContent className="p-6 text-center">
                    <p className="text-gray-700">No next step defined. This scenario is complete.</p>
                </CardContent>
            )}
        </Card>
    );
}

