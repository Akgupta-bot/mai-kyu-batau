import { Check } from 'lucide-react';

export default function ToggleScene({ scenarios, currentId, completedIds }) {
    return (
        <div className="w-50 h-auto flex flex-col space-y-3 absolute right-[50px] top-[20%] my-auto border border-white/30 p-2 rounded-2xl bg-black/30 backdrop-blur-sm">
            {scenarios.map((s) => {
                const isCurrent = s.id === currentId;
                const isDone = completedIds.has(s.id);
                return (
                    <div
                        key={s.id}
                        className={`flex-1 rounded-xl overflow-hidden relative p-2 transition-all ${isCurrent
                            ? "bg-gradient-to-br from-white/90 to-white/70 text-black ring-2 ring-blue-500"
                            : "bg-[#424242] text-white"
                            } ${isDone && !isCurrent ? "opacity-70" : ""}`}
                    >
                        <div className="flex items-center gap-2">
                            {isDone && <Check className={`h-4 w-4 ${isCurrent ? "text-blue-600" : "text-white"}`} />}
                            <span className={`text-sm md:text-base font-medium ${isCurrent ? "font-semibold" : ""}`}>{s.title}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}