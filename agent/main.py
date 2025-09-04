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
