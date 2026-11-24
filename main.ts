import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "My performance review said I need to be more visible, so I now stand directly behind my manager in every meeting and wave at the back of his head.";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read-back self-check: the file must hold exactly the line,
// one line, at most 200 characters, no trailing newline or whitespace.
const back = readFileSync(target, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
if (back.length > 200) throw new Error("entry exceeds 200 characters");
if (back.includes("\n")) throw new Error("entry must be a single line");
if (back !== back.trim()) throw new Error("entry has leading/trailing whitespace");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`entry.txt written (${back.length} chars, sha256 ${sha})`);
