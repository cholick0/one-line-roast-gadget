// One-Line Roast: The Gadget You Use Every Day
// Writes a single roast line about a daily gadget to /output/entry.txt.
// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1-200
// characters, one line, not only whitespace.

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

const ENTRY =
  "My wireless earbuds die at 18% \u2014 not 5%, not 1% \u2014 18%, like they negotiated an early retirement and forgot to tell me.";

function checkEntry(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars, gate is ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.split("\n").length !== 1) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  checkEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  // Byte-for-byte read-back verification.
  const back = readFileSync("/output/entry.txt");
  if (!back.equals(Buffer.from(ENTRY, "utf8"))) {
    throw new Error("read-back mismatch: entry.txt differs from ENTRY");
  }
  console.log(`ok: ${[...ENTRY].length} chars, 1 line, byte-for-byte match`);
}

main();
