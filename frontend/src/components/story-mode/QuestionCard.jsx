import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function QuestionCard({ isGameStart, onHandlePlay }) {
    return (
        <Card className="w-[60%] h-[30%] shadow-2xl rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-200 flex justify-center items-center flex-col   ">
            {isGameStart ? (<>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800 text-center">
                        What’s your favorite sport?
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-blue-500 hover:text-blue-600"
                    >
                        Basketball
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-green-500 hover:text-green-600"
                    >
                        Football
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-red-500 hover:text-red-600"
                    >
                        Cricket
                    </Button>
                    <Button
                        variant="outline"
                        className="h-14 text-base font-medium rounded-xl transition-all hover:scale-105 hover:border-purple-500 hover:text-purple-600"
                    >
                        Tennis
                    </Button>
                </CardContent>
            </>) : <Button onClick={onHandlePlay}>Start</Button>}
        </Card>
    )
}
