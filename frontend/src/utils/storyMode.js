export function buildScenarioGraph(raw) {
    const scenarios = raw.storyline.storyline.scenarios;
    const byId = Object.fromEntries(scenarios.map((s) => [s.id, s]));
    return { list: scenarios, byId };
}

// Decide which side speaks based on characters mapping
export function getSideForSpeaker(scenario, speaker) {
    const left = scenario.characters.athlete;
    const right = scenario.characters.other;
    if (speaker === left) return "left";
    if (speaker === right) return "right";
    return "center";
}

// Map a scenario to a flat dialogue script including audio + side
export function mapScenarioToScript(scenario, audio) {
    const script = [];
    // 1) narrator setup as first line
    script.push({ speaker: "narrator", text: scenario.setup, side: "center", audio: audio, isSetup: true });
    // 2) then actual dialogue
    (scenario.dialogue || []).forEach((d) => {
        script.push({ speaker: d.speaker, text: d.line, side: getSideForSpeaker(scenario, d.speaker), audio: audio, isSetup: false });
    });
    return script;
}