import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const client = new ElevenLabsClient({ apiKey: import.meta.env.VITE_ELEVEN_LABS_API_KEY });

export default client;
