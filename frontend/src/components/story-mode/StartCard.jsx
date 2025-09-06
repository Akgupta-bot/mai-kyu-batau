import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function StartCard({ onStart }) {
    return (
        <Card className="w-[60%] rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-100 flex justify-center items-center py-10">
            <Button onClick={onStart} className="h-12 px-6 text-base rounded-xl flex items-center gap-2">
                <Play className="h-5 w-5" /> Start
            </Button>
        </Card>
    );
}