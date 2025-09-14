import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from 'react-router-dom';

import BasketBallImg from '/basketball-court.jpg'
import LyffyAudio from '/ko.mp3'
import StoryCharacter from '../components/story-mode/StoryCharacter'
import ToggleScene from '../components/story-mode/ToggleScene'
import LockerRoomImg from '/locker-room.jpg';
import WinnerImg from '/winner.png'
import DialogueCard from '../components/story-mode/DialogueCard';
import QuizArea from '../components/story-mode/QuizArea';
import NarratorCard from '../components/story-mode/NarratorCard';
import pandaAvatar from "../assets/Panda.mp4";

import { buildScenarioGraph, mapScenarioToScript } from '../utils/storyMode'

import LLM_OUTPUT from '../dev-data/story-mode.json'

// Scenario Background Images
const SCENARIO_BG_IMGS = [BasketBallImg, LockerRoomImg, WinnerImg]

// Sound Output Structure
const SOUND_OUTPUT = [
    { speaker: "narrator", audio: LyffyAudio },
    { speaker: "player1", audio: LyffyAudio },
    { speaker: "player2", audio: LyffyAudio }
]

// Function to map speaker and sound
function mapTextToSound(script, sounds) {
    return script.map((line, index) => ({
        ...line,
        audio: sounds[index]?.audio || null,
        side: line.speaker === "player1" ? "left" : line.speaker === "player2" ? "right" : "center"
    }))
};

// const DIALOGUE = mapTextToSound(LLM_OUTPUT, SOUND_OUTPUT);


export default function StoryMode() {
    const graph = useMemo(() => buildScenarioGraph(LLM_OUTPUT), []);
    const [scenarioId, setScenarioId] = useState(graph.list[0].id);

    // phase -> idle | titleSetup | dialogue | quiz | end
    const [phase, setPhase] = useState("idle");
    const [completedIds, setCompletedIds] = useState(new Set());

    const [isGameStart, setIsGameStart] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);

    const scenarioIndex = useMemo(() => graph.list.findIndex((s) => s.id === scenarioId), [graph.list, scenarioId]);
    const scenario = graph.byId[scenarioId];
    const script = useMemo(() => mapScenarioToScript(scenario, LyffyAudio), [scenarioId]);
    const isNarrator = script[currentLine]?.side === "center";

    const bgImg = SCENARIO_BG_IMGS[scenarioIndex % SCENARIO_BG_IMGS.length];

    // audio handling per line
    const audioRef = useRef(null);
    useEffect(() => {
        if (!isGameStart) return;
        if (phase === "titleSetup") {
            // show setup narrator + title on black bg, then 0.5s pause -> advance to dialogue (line 1)
            setCurrentLine(0);
            // play the setup audio briefly (optional). We'll just play and stop when ended
            const a = new Audio(script[0].audio);
            audioRef.current = a;
            a.onended = () => {
                // extra 500ms pause before dialogue
                setTimeout(() => {
                    setPhase("dialogue");
                    setCurrentLine(1); // move to first speaker line after setup
                }, 500);
            };
            a.play().catch(() => {
                // if autoplay blocked, still proceed after 1.5s
                setTimeout(() => {
                    setPhase("dialogue");
                    setCurrentLine(1);
                }, 1500);
            });
            return () => {
                a.pause();
            };
        }

        if (phase === "dialogue") {
            const line = script[currentLine];
            if (!line) return;
            const a = new Audio(line.audio);
            audioRef.current = a;
            a.onended = () => {
                const next = currentLine + 1;
                if (next < script.length) {
                    setCurrentLine(next);
                } else {
                    // dialogue finished -> quiz/choices
                    setPhase("quiz");
                }
            };
            a.play();
            return () => a.pause();
        }
    }, [isGameStart, phase, currentLine, scenarioId]);

    // start game
    function handleStart() {
        setIsGameStart(true);
        setPhase("titleSetup");
        setCurrentLine(0);
    }

    // move to next scenario by id
    function goToScenario(nextId) {
        setCompletedIds((prev) => new Set(prev).add(scenarioId));
        setScenarioId(nextId);
        setPhase("titleSetup");
        setCurrentLine(0);
    }

    // on choice click from QuestionCard
    function handleChoice(nextScenarioId) {
        if (graph.byId[nextScenarioId]) {
            goToScenario(nextScenarioId);
        } else {
            // if next not found, end
            setPhase("end");
        }
    }

    // on quiz submit
    function handleQuizResult({ passed }) {
        const outcomes = scenario.outcomes;
        if (!outcomes) {
            setPhase("end");
            return;
        }
        const nextId = passed ? outcomes.passed.next_scenario : outcomes.failed.next_scenario;
        handleChoice(nextId);
    }

    const title = scenario.title;

    return (
        <div className="h-screen w-full overflow-hidden flex flex-col items-center justify-center space-y-6 p-4">
            <div className="absolute top-6 right-6 z-50">
                <Link to="/dashboard">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-700 hover:border-blue-500 transition-colors">
                        <video
                            src={pandaAvatar}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Link>
            </div>
            {/* SCENE WRAPPER */}
            <div className="w-[60%] h-[60%] relative rounded-2xl shadow-2xl overflow-hidden">
                {/* Dynamic background per scenario */}
                <img src={bgImg} alt="Scene" className="absolute inset-0 w-full h-full object-cover" />
                {/* dark veil for readability */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Title strip */}
                <AnimatePresence>
                    {(phase === "titleSetup" || !isGameStart) && (
                        <motion.div
                            key="title"
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            className="absolute top-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-xl bg-white/10 backdrop-blur text-white text-lg font-semibold"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* START SCREEN */}
                {!isGameStart && (
                    <div className="absolute inset-0 grid place-items-center">
                        <Button onClick={handleStart} className="h-12 px-6 text-base rounded-xl flex items-center gap-2">
                            <Play className="h-5 w-5" /> Start
                        </Button>
                    </div>
                )}

                {/* NARRATOR (setup or narrator lines) */}
                <NarratorCard
                    isGameStart={isGameStart}
                    phase={phase}
                    isNarrator={isNarrator}
                    currentLine={script[currentLine]}
                />

                {/* CHARACTER DIALOGUE */}
                <DialogueCard
                    isGameStart={isGameStart}
                    phase={phase}
                    isNarrator={isNarrator}
                    currentLine={script[currentLine]}
                />

                {/* CHARACTERS ROW */}
                {isGameStart && (phase === "dialogue" || phase === "quiz") && !isNarrator && (
                    <div className="absolute inset-0 flex justify-between items-center px-10">
                        <StoryCharacter
                            characterSide="left"
                            isActive={script[currentLine]?.side === "left"}
                            phase={phase}
                        />
                        <StoryCharacter
                            characterSide="right"
                            isActive={script[currentLine]?.side === "right"}
                            phase={phase}
                        />
                    </div>
                )}
            </div>

            {/* TOGGLE SCENE LIST */}
            <ToggleScene
                scenarios={graph.list}
                currentId={scenarioId}
                completedIds={completedIds}
            />

            {/* QUESTION / QUIZ AREA */}
            <QuizArea isGameStart={isGameStart}
                phase={phase}
                scenarioId={scenarioId}
                scenario={scenario}
                onHandleChoice={handleChoice}
                onHandleQuizResult={handleQuizResult}
            />
        </div>
    );
}
