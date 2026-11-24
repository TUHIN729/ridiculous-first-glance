// Ridiculous at First Glance, Real by the Second
// Entry: "Nodly" — a trained actor attends your Zoom meetings for you.
//
// The pitch is a single sentence (<= 200 chars) pitching a bizarre startup
// idea that sounds like a joke yet pencils out as a real business: remote
// workers hate meetings, a convincing stand-in who nods and agrees on cue
// is a service they would pay for per meeting, and the buyer, the product
// and the money are all named in the one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Nodly sends a trained actor to sit in your Zoom meetings, nod wisely, and say 'great point' at the right moment, so you can skip every call and still get promoted, billed per meeting.";

if (PITCH.length > 200) {
  throw new Error(`Pitch is ${PITCH.length} chars, over the 200-char limit`);
}
if (PITCH.trim().length === 0) {
  throw new Error("Pitch is empty");
}
// Exactly one sentence: a single terminal period, no other sentence-ending
// punctuation that would split it into two sentences.
const sentenceEnders = PITCH.match(/[.!?]/g) ?? [];
if (sentenceEnders.length !== 1 || !PITCH.endsWith(".")) {
  throw new Error("Pitch must be exactly one sentence ending with a period");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
