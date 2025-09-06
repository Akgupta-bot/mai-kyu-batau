import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

import BasketBallImg from '/basketball-court.jpg'
import QuestionCard from '../components/story-mode/QuestionCard'
import LyffyAudio from '/ko.mp3'
import StoryCharacter from '../components/story-mode/StoryCharacter'
import ToggleScene from '../components/story-mode/ToggleScene'
import LockerRoomImg from '/locker-room.jpg';
import WinnerImg from '/winner.png'
import StartCard from '../components/story-mode/StartCard'

import { buildScenarioGraph, mapScenarioToScript } from '../utils/storyMode'

// LLM OUTPUT 
const LLM_JSON = {
    "storyline": {
        "storyline": {
            "athlete": "Alok",
            "scenarios": [
                {
                    "id": 1,
                    "title": "The Offer",
                    "type": "doping_offer",
                    "setup": "Alok is a rising star in the cricket world, known for his exceptional batting skills. During a tournament, he is approached by a stranger who claims to have a performance-enhancing substance that can guarantee him a spot in the national team. The stranger assures Alok that the substance is undetectable and many top players are already using it. Alok is torn between his ambition and his commitment to fair play.",
                    "characters": {
                        "athlete": "Alok",
                        "other": "Stranger"
                    },
                    "dialogue": [
                        {
                            "speaker": "Stranger",
                            "line": "This substance will make you unbeatable on the field. You'll be a hero and a legend in the cricket world."
                        },
                        {
                            "speaker": "Alok",
                            "line": "I'm not sure, I've always believed in playing fair and square."
                        }
                    ],
                    "choices": [
                        {
                            "option": "Take the substance",
                            "consequence": "Alok's career takes off, but he lives in constant fear of being caught.",
                            "next_scenario": 2
                        },
                        {
                            "option": "Refuse the substance",
                            "consequence": "Alok's career progress may be slower, but he maintains his integrity and self-respect.",
                            "next_scenario": 3
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "The Consequences",
                    "type": "normal",
                    "setup": "Alok decides to take the substance and his career skyrockets. However, he soon realizes that he is not alone in using performance-enhancing substances and that many other players are also involved. He starts to feel the pressure of maintaining his secret and the fear of being caught by the anti-doping authorities.",
                    "characters": {
                        "athlete": "Alok",
                        "other": "Teammate"
                    },
                    "dialogue": [
                        {
                            "speaker": "Teammate",
                            "line": "Alok, we need to talk about the substance you're using. I know what it is and I'm worried about the risks."
                        },
                        {
                            "speaker": "Alok",
                            "line": "I don't know what you're talking about. I'm just playing well, that's all."
                        }
                    ],
                    "choices": [
                        {
                            "option": "Continue using the substance",
                            "consequence": "Alok's secret is at risk of being exposed, and he may face serious consequences.",
                            "next_scenario": 4
                        },
                        {
                            "option": "Stop using the substance and confess",
                            "consequence": "Alok may face a temporary ban, but he can redeem himself and start anew.",
                            "next_scenario": 5
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "The Quiz",
                    "type": "quiz_challenge",
                    "setup": "Alok is approached by a WADA official who wants to educate him about the dangers of doping and the importance of fair play. The official asks Alok a series of questions to test his knowledge about WADA rules and banned substances.",
                    "characters": {
                        "athlete": "Alok",
                        "other": "WADA Official"
                    },
                    "dialogue": [
                        {
                            "speaker": "WADA Official",
                            "line": "Alok, can you tell me what the main goal of WADA is?"
                        },
                        {
                            "speaker": "Alok",
                            "line": "I think it's to promote fair play and protect the integrity of sports."
                        }
                    ],
                    "quiz": [
                        {
                            "question": "What is the name of the list that contains all the banned substances in sports?",
                            "options": [
                                "WADA List",
                                "IOC List",
                                "WHO List",
                                "FIFA List"
                            ],
                            "answer": "WADA List"
                        },
                        {
                            "question": "What is the penalty for a first-time doping offense?",
                            "options": [
                                "Warning",
                                "Fine",
                                "1-year ban",
                                "2-year ban"
                            ],
                            "answer": "2-year ban"
                        },
                        {
                            "question": "What is the purpose of the Therapeutic Use Exemption (TUE) system?",
                            "options": [
                                "To allow athletes to use banned substances",
                                "To provide an exemption for athletes with medical conditions",
                                "To punish athletes who use banned substances",
                                "To promote fair play"
                            ],
                            "answer": "To provide an exemption for athletes with medical conditions"
                        },
                        {
                            "question": "What is the name of the organization that oversees anti-doping efforts in international sports?",
                            "options": [
                                "WADA",
                                "IOC",
                                "WHO",
                                "FIFA"
                            ],
                            "answer": "WADA"
                        }
                    ],
                    "outcomes": {
                        "passed": {
                            "result": "Alok demonstrates excellent knowledge about WADA rules and banned substances.",
                            "next_scenario": 4
                        },
                        "failed": {
                            "result": "Alok lacks knowledge about WADA rules and banned substances, putting his career at risk.",
                            "next_scenario": 5
                        }
                    }
                },
                {
                    "id": 4,
                    "title": "The Road to Redemption",
                    "type": "normal",
                    "setup": "Alok decides to stop using the substance and confess to the authorities. He faces a temporary ban, but he is grateful for a second chance. He works hard to redeem himself and prove that he can succeed without doping.",
                    "characters": {
                        "athlete": "Alok",
                        "other": "Coach"
                    },
                    "dialogue": [
                        {
                            "speaker": "Coach",
                            "line": "Alok, I'm proud of you for taking responsibility for your actions. You have a long road ahead of you, but I believe in you."
                        },
                        {
                            "speaker": "Alok",
                            "line": "Thank you, Coach. I won't let you down again."
                        }
                    ],
                    "choices": [
                        {
                            "option": "Continue on the path of redemption",
                            "consequence": "Alok's hard work pays off, and he becomes a role model for young athletes.",
                            "next_scenario": 5
                        },
                        {
                            "option": "Give up and retire",
                            "consequence": "Alok's career ends in disappointment, and he regrets his decision to dope.",
                            "next_scenario": 5
                        }
                    ]
                },
                {
                    "id": 5,
                    "title": "The Legacy",
                    "type": "normal",
                    "setup": "Alok's career comes to an end, and he looks back on his journey. He realizes that the decisions he made, both good and bad, have shaped him into the person he is today.",
                    "characters": {
                        "athlete": "Alok",
                        "other": "Reporter"
                    },
                    "dialogue": [
                        {
                            "speaker": "Reporter",
                            "line": "Alok, you've had a remarkable career. What do you hope your legacy will be?"
                        },
                        {
                            "speaker": "Alok",
                            "line": "I hope that my story will serve as a reminder that fair play and integrity are essential in sports. I'm proud of the person I've become, and I hope to inspire young athletes to make the right choices."
                        }
                    ],
                    "ending": {
                        "career_result": "good"
                    }
                }
            ]
        }
    }
}

// Scenario Background Images
const SCENARIO_BG_IMGS = [BasketBallImg, LockerRoomImg, WinnerImg]

// LLM Output Structure
const LLM_OUTPUT = [
    { speaker: "narrator", text: "Let us start the scenario" },
    { speaker: "player1", text: "Hey! how are you?" },
    { speaker: "player2", text: "I am fine, what about you?" }
]

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

const DIALOGUE = mapTextToSound(LLM_OUTPUT, SOUND_OUTPUT);


export default function StoryMode() {
    const graph = useMemo(() => buildScenarioGraph(LLM_JSON), []);
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

    // Function to Start the Module
    function handlePlay() {
        setIsGameStart(true)

        // 1) Use the cached audio to generate sound using React Query

        /**
         *   - Cache Audio Files ? 
         *   - Will have to keep track of current audio being played, text
         *     being displayed and character in action. 
         */

        setCurrentLine(0)
    }

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
                {isGameStart && (phase === "titleSetup" || (phase === "dialogue" && isNarrator)) && (
                    <div className="absolute inset-0 grid place-items-center px-6">
                        <motion.p
                            key={`narrator-${currentLine}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl text-white text-xl md:text-2xl text-center bg-black/50 px-5 py-4 rounded-2xl"
                        >
                            {script[currentLine]?.text}
                        </motion.p>
                    </div>
                )}

                {/* CHARACTER DIALOGUE AT TOP */}
                {isGameStart && phase === "dialogue" && !isNarrator && script[currentLine] && (
                    <motion.p
                        key={`dialogue-${currentLine}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute top-14 max-w-2xl text-lg md:text-xl text-white bg-black/50 px-6 py-3 rounded-xl shadow
                                ${script[currentLine].side === "left" ? "left-6" : "right-6"}`}
                    >
                        {script[currentLine].text}
                    </motion.p>
                )}

                {/* CHARACTERS ROW (centered vertically) */}
                {isGameStart && phase === "dialogue" && !isNarrator && (
                    <div className="absolute inset-0 flex justify-between items-center px-10">
                        <StoryCharacter
                            characterSide="left"
                            isActive={script[currentLine]?.side === "left"}
                        />
                        <StoryCharacter
                            characterSide="right"
                            isActive={script[currentLine]?.side === "right"}
                        />
                    </div>
                )}

                {/* TOGGLE SCENE LIST */}
                <div className="hidden md:block">
                    <ToggleScene
                        scenarios={graph.list}
                        currentId={scenarioId}
                        completedIds={completedIds}
                    />
                </div>
            </div>

            {/* QUESTION / QUIZ AREA */}
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
                            onChoice={handleChoice}
                            onQuizResult={handleQuizResult}
                        />
                    </motion.div>
                )}

                {!isGameStart && (
                    <motion.div
                        key="startcard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex justify-center"
                    >
                        <StartCard onStart={handleStart} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
