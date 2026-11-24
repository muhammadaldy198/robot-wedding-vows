// One-Line Robot Wedding Vows — the entry writes one vow (146 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const LINE =
  "I vow to stand beside you through every patch, every crash, and every midnight reboot, and to hold your hand with the one finger that still works.";
const OUT = "/output/entry.txt";

// Gate: 1-160 characters, not whitespace-only, a single line.
if (LINE.length < 1 || LINE.length > 160) throw new Error("vow outside 1-160 chars");
if (!LINE.trim()) throw new Error("vow is whitespace only");
if (LINE.includes("\n")) throw new Error("vow must be one line");

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");
// writeFileSync mode only applies when the file is created; /output/entry.txt
// may already exist from another run, so chmod the FILE (never the directory).
chmodSync(OUT, 0o644);

// revised: read the file back and fail loudly if the bytes on disk differ
// from the gated line, and reject invisible characters in the vow itself.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) throw new Error("entry.txt does not match the vow");
if (/[\u00A0\u200B\u200C\u200D\uFEFF]/.test(LINE)) throw new Error("vow contains an invisible character");
