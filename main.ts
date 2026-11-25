import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT = "neha";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 30
// characters, not only whitespace, and a single word (no spaces).
if (TEXT.length < 1 || TEXT.length > 30) {
  throw new Error(`Entry text must be 1-30 characters, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("Entry text must not be only whitespace");
}
if (/\s/.test(TEXT)) {
  throw new Error("Entry text must be a single word with no spaces");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", TEXT, "utf8");

// Read back and verify exactly what was written.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== TEXT) {
  throw new Error(`Read-back mismatch: expected ${JSON.stringify(TEXT)}, got ${JSON.stringify(written)}`);
}
if (written.length < 1 || written.length > 30 || written.trim().length === 0) {
  throw new Error("Written entry fails the gate on read-back");
}
console.log(`Wrote ${written.length} characters to /output/entry.txt`);
