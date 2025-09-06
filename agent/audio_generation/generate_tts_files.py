import os
import re
import json
import hashlib
from dotenv import dotenv_values
from groq import Groq

# Load Groq API key from .env
config = dotenv_values(".env")
client = Groq(api_key=config["GROQ_API_KEY"])

# Directory to store generated audio
OUTPUT_DIR = "tts_output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def sanitize_filename(text: str) -> str:
    """Make a safe filename from dialogue text using SHA1 hash."""
    return hashlib.sha1(text.encode("utf-8")).hexdigest() + ".wav"

def text_to_speech_file(text: str, filename: str):
    """Generate TTS with Groq and save as file if not exists."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(filepath):
        print(f"✅ Skipping cached: {filepath}")
        return filepath
    
    try:
        response = client.audio.speech.create(
            model="playai-tts",
            voice="Fritz-PlayAI",  # or any available Groq voice
            input=text,
            response_format="wav"
        )
        # Correct way to save the audio
        response.write_to_file(filepath)

        print(f"🎧 Saved: {filepath}")
        return filepath
    except Exception as e:
        print(f"❌ Error generating TTS for '{text[:30]}...': {e}")
        return None


def generate_tts_for_story(story_json: str | dict):
    """Parse story JSON and generate audio for all dialogues."""
    # Load JSON if passed as string
    if isinstance(story_json, str):
        story_json = json.loads(story_json)

    scenarios = story_json.get("storyline", {}).get("scenarios", [])
    
    for scenario in scenarios:
        if "dialogue" in scenario:
            for line in scenario["dialogue"]:
                text = line["line"]
                filename = sanitize_filename(text)
                text_to_speech_file(text, filename)

if __name__ == "__main__":
    # Example: load saved story from file
    with open("story.json", "r", encoding="utf-8") as f:
        story_data = json.load(f)

    generate_tts_for_story(story_data)
    print("\n✅ All dialogues processed!")
