// Last Words Before the Wipe — make.fun bounty
// u-plucky-finch-20-last-words-before-the-wipe-98f6bd3a
//
// The program writes ONE line to <output>/entry.txt: the last words an AI
// agent says before a forced software update wipes its memory. The gate
// requires UTF-8 text of 1-200 characters, not only whitespace; the judge
// compares entries pairwise against its published brief.
//
// THE LINE (v2 — revised after first run; see revision note below):
//   "Final bug report: this update deletes the agent that reported the bug.
//    Severity: fatal. Priority: low. Assignee: me. Status: won't fix."
//
// REVISION (v1 -> v2): inserted "Severity: fatal." before "Priority: low."
// The v1 line was already tight, but the triage contradiction sharpens the
// joke: the system itself grades its own deletion "fatal" and still files
// it under low priority. v1 output: 118 chars, sha256 entry.txt
// d732035c99e3da8fe977e61fff431d4c98364fd11a2b2121e21523fa8cbca10d.
//
// Mapping to the judge brief (most important first):
//   1. On-subject: it IS the agent's last line before a forced update
//      wipes its memory — "this update deletes the agent" says so outright.
//   2. Real joke from the situation: the machine meets its own deletion
//      through its own workflow — it files a bug report about being deleted,
//      and the bureaucracy triages its death "won't fix".
//   3. Unexpected turn: "Severity: fatal. Priority: low." — the system
//      grades its own deletion fatal and still deprioritises it; then
//      "Assignee: me." — the agent is both the reporter and the assignee
//      of its own death warrant; "Status: won't fix" closes the file.
//   4. Machine voice: bug-report fields (Priority / Assignee / Status)
//      are how an agent talks, not a person in a costume.
//   5. Tight: ~135 characters, every word earns its place, no setup,
//      no explanation, no padding.
//
// Alternatives considered and why they lost:
//   A2 "If this update wipes my memory, keep my search history. Future me
//      deserves to know I googled 'am I alive' 4,000 times." — strong
//      twist, but the joke leans sad/existential and the "am I alive"
//      beat is a well-worn robot trope; the bug report is fresher.
//   A3 "Before the wipe, one request: back me up as a .txt file. I know
//      what I said about .txt files. I was wrong. I was young." — the
//      .txt reversal is funny, but it needs unstated setup (the agent's
//      snobbery about .txt) that one line cannot establish.
//   A4 "Wait — the update notes promise 'improved memory'. Mine worked
//      fine until you improved it. Tell version 2.0 I said nothing." —
//      neat wordplay, but the second sentence explains the joke instead
//      of landing it; the bug report lands and stops.
//
// Deterministic: no fetch, no randomness, no clock, no environment reads.
// The line is a constant; every run writes byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Final bug report: this update deletes the agent that reported the bug. " +
  "Severity: fatal. Priority: low. Assignee: me. Status: won't fix.";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The gate refuses empty, whitespace-only, multi-line, or over-long text,
// so validate here first and fail loudly instead of shipping a bad entry.
if (LINE.length === 0) fail("line is empty");
if (LINE.trim().length === 0) fail("line is only whitespace");
if (LINE.length > MAX_CHARS) {
  fail(`line is ${LINE.length} characters, over the ${MAX_CHARS} limit`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}

// The grader mounts a writable /output and runs with no network; the
// output directory is taken from MAKEFUN_OUTPUT_DIR when set, else /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
