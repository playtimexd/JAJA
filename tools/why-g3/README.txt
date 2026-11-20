Plain-text sources of the grade-3 « Pourquoi? » topics (one file per domain: <cat>.mjs, `export const topics = [...]`).
Same shape as docs/WHY.md BUT every Chinese text is a PLAIN STRING (no pinyin): q.zh, slide.zh, words[].zh.t / .zh.d, quiz zh, option zh.
No `cat`, `shelf`, `grade` fields (the builder adds shelf:'g3', grade:3). id must start with "<cat>-".
Build: node tools/why-g3-build.mjs <cat>   (writes js/content/why/g3-<cat>.js with pinyin + word splits)
Check: node tools/check-why.mjs <cat>
