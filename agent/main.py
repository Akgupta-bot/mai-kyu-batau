import re
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import dotenv_values
from groq import Groq

config = dotenv_values(".env")
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    session_id: str
    message: str
    
class StoryRequest(BaseModel):
    athlete_name: str
    sport: str
    scenario_count: int = 5
    quiz_focus: str

# in-memory conversation store
conversations = {}

SYSTEM_PROMPT = """
You are a cautious medical-safety and anti-doping assistant. 

Rules:
- If the user asks about a drug in the context of sports or doping, reply in natural, conversational language.
- If the user asks something outside this scope, respond with:
  "This question is not related to drug safety or doping in sports."
- Never give direct medical advice — only general, neutral info.
"""

STORY_PROMPT = """
# Anti-Doping Story Mode Game Generator

## Objective
Generate a **branching storyline** in JSON format for an interactive anti-doping awareness game.
The story should adapt to player choices and end with either a **good career outcome** or a **bad career outcome**.

## Input
Use the following input provided by the user:
- athlete_name (consistent in all scenarios)
- sport (context for doping/quiz questions)
- scenario_count (default 5)
- quiz_focus (knowledge domain for quiz questions)

## Output Format
Return only valid JSON in this structure:
{
  "storyline": {
    "athlete": "<athlete_name>",
    "scenarios": [
      {
        "id": 1,
        "title": "Pressure",
        "type": "doping_offer | quiz_challenge | normal",
        "setup": "1–5 sentences introducing the situation.",
        "characters": {
          "athlete": "<athlete_name>",
          "other": "Coach | Teammate | Sponsor | Idol | Reporter"
        },
        "dialogue": [
          {"speaker": "Other Character", "line": "Dialogue line..."},
          {"speaker": "<athlete_name>", "line": "Dialogue line..."}
        ],
        "choices": [
          {
            "option": "Take drug",
            "consequence": "Short consequence description.",
            "next_scenario": 2
          },
          {
            "option": "Refuse drug",
            "consequence": "Short consequence description.",
            "next_scenario": 3
          }
        ]
      },
      {
        "id": 2,
        "title": "Suspicion",
        "type": "quiz_challenge",
        "setup": "Scenario setup text...",
        "characters": {
          "athlete": "<athlete_name>",
          "other": "Teammate"
        },
        "dialogue": [
          {"speaker": "Teammate", "line": "Suspicious remark..."},
          {"speaker": "<athlete_name>", "line": "Response..."}
        ],
        "quiz": [
          {
            "question": "Quiz question?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Correct Option"
          }
        ],
        "outcomes": {
          "passed": {
            "result": "Short sentence on positive outcome.",
            "next_scenario": 3
          },
          "failed": {
            "result": "Short sentence on negative outcome.",
            "next_scenario": 4
          }
        }
      },
      {
        "id": 5,
        "title": "Legacy",
        "type": "normal",
        "setup": "Closing scenario text.",
        "characters": {
          "athlete": "<athlete_name>",
          "other": "Reporter"
        },
        "dialogue": [
          {"speaker": "Reporter", "line": "Final career reflection..."}
        ],
        "ending": {
          "career_result": "good | bad"
        }
      }
    ]
  }
}

## Rules
1. Use <athlete_name> consistently across all scenarios.
2. Explicitly define "other" character roles.
3. Scenario types:
   - "doping_offer" → exactly 2 choices ("Take drug", "Refuse drug").
   - "quiz_challenge" → 4–5 MCQs, 4 options each, store correct answer.
   - "normal" → dialogue only.
4. Setup text max 5 sentences.
5. Dialogue should be realistic, professional, and context-appropriate.
6. Outcomes must be short and precise.
7. Scenarios must link via "next_scenario" IDs into a coherent storyline.
8. Final scenario must have "ending" with career_result = "good" or "bad".
9. Adapt tone dynamically (motivational, tense, suspicious, reflective).

IMPORTANT: Return only raw JSON. Do not include ```json or ``` in your response.
"""

@app.post("/chat")
async def chat_with_agent(req: ChatRequest):
    client = Groq(api_key=config["GROQ_API_KEY"])

    # Initialize session with system prompt if new
    if req.session_id not in conversations:
        conversations[req.session_id] = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]
    
    # Add user message to history
    conversations[req.session_id].append({"role": "user", "content": req.message})

    chat_completion = client.chat.completions.create(
        messages=conversations[req.session_id],
        model="llama-3.3-70b-versatile",
        temperature=0.6,
    )

    reply = chat_completion.choices[0].message.content.strip()

    conversations[req.session_id].append({"role": "assistant", "content": reply})

    return {"reply": reply}

@app.post("/generate-story")
async def generate_story(req: StoryRequest):
    client = Groq(api_key=config["GROQ_API_KEY"])

    user_input = f"""
            Athlete name: {req.athlete_name}
            Sport: {req.sport}
            Scenario count: {req.scenario_count}
            Quiz focus: {req.quiz_focus}
            """

    completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": STORY_PROMPT},
            {"role": "user", "content": user_input}
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.7,
    )

    story_raw = completion.choices[0].message.content.strip()

    # 🧹 Remove Markdown code fences if they exist
    story_clean = re.sub(r"^```(?:json)?|```$", "", story_raw, flags=re.MULTILINE).strip()

    try:
        # Parse into Python dict
        story_dict = json.loads(story_clean)
    except json.JSONDecodeError:
        # If parsing fails, return raw text for debugging
        return {"error": "Invalid JSON generated", "raw_output": story_clean}

    return {"storyline": story_dict}