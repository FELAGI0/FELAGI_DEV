/**
 * Verifies that every tracked text file ends with a newline.
 *
 * Why this exists: the tooling that writes files in this project silently
 * dropped the final newline at every checkpoint (CP0, CP1, CP3a, CP3b), and it
 * was caught by hand each time. `.editorconfig` states the rule
 * (`insert_final_newline = true`) but nothing enforced it, and git reports
 * "no newline at end of file" as a note rather than an error — so it ships
 * unnoticed and later shows up as noise in unrelated diffs.
 *
 * Binary files are skipped: "ends with a newline" is meaningless for them.
 * The list comes from `git ls-files`, so only tracked files are checked and
 * ignored build output is never inspected.
 *
 * Usage:
 *   node scripts/check-final-newline.mjs         # check, exit 1 on failure
 *   node scripts/check-final-newline.mjs --fix   # append the missing newline
 */
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';

/** Extensions where a trailing newline is not a meaningful concept. */
const BINARY = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.bmp',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.pdf', '.zip', '.gz', '.7z',
  '.mp3', '.mp4', '.webm', '.mov',
]);

const fix = process.argv.includes('--fix');

const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter((file) => file !== '');

const failures = [];

for (const file of tracked) {
  const dot = file.lastIndexOf('.');
  const ext = dot === -1 ? '' : file.slice(dot).toLowerCase();
  if (BINARY.has(ext)) continue;

  let contents;
  try {
    contents = readFileSync(file);
  } catch {
    // In the index but absent from the working tree; nothing to check here.
    continue;
  }

  // An empty file has no last line to terminate.
  if (contents.length === 0) continue;

  if (contents[contents.length - 1] !== 0x0a) {
    failures.push(file);
  }
}

if (failures.length === 0) {
  console.log(`Final newline OK (${tracked.length} tracked files checked).`);
  process.exit(0);
}

if (fix) {
  for (const file of failures) {
    appendFileSync(file, '\n');
  }
  console.log(`Appended a missing final newline to ${failures.length} file(s):`);
  for (const file of failures) console.log(`  ${file}`);
  process.exit(0);
}

console.error(`Missing final newline in ${failures.length} file(s):`);
for (const file of failures) console.error(`  ${file}`);
console.error('\nFix with: node scripts/check-final-newline.mjs --fix');
process.exit(1);
