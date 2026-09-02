# 0001 — Migrate the toolchain from Create React App to Vite

**Status**: accepted, 2026-09-03. Not started.

## Context

The site builds with Create React App (`react-scripts` 5). CRA is no longer
maintained and the React team recommends against it for new work. Its
dependency tree drives most Dependabot security PRs (#21, #22) and blocks
upgrading Jest, ESLint and Babel independently. The site is a static SPA on
GitHub Pages with one build-time data step (`fetch.js`), so nothing requires a
framework with a server.

## Decision

Replace CRA with Vite, Vitest and an explicit ESLint config, as a stack of
small PRs (rule 5): pin Node 20, add Vite beside CRA, swap Jest for Vitest,
then cut over and uninstall `react-scripts`. The migration is complete when
`react-scripts` is gone from `package.json`. `fetch.js` stays a Node script
that runs before the bundler and writes Build-time data into `public/`; the
bundler never fetches. Next.js, Remix and Astro were rejected: they add
routing or server concerns the site does not have. Rsbuild and Parcel were
rejected for a smaller ecosystem and fewer maintainers than Vite.

## Consequences

1. Env vars: Vite reads `VITE_*`. The cutover PR ships a named transitional
   shim (`envPrefix` accepting `REACT_APP_`) so CI and `.env` keep working;
   a follow-up PR renames to `VITE_GITHUB_TOKEN` and deletes the shim.
2. Files containing JSX are renamed `.js` to `.jsx` in a pure-refactor PR:
   same test count, same assertions.
3. Jest becomes Vitest; `npm test -- --watchAll=false` becomes `npm test`.
   CLAUDE.md and README change in the same PR (rule 16).
4. CRA's implicit `eslintConfig: react-app` is replaced by an explicit
   `eslint.config.js`, which also unblocks the lint job in #24.
5. Until the first migration PR opens, build config and `package.json`
   scripts are frozen so each migration diff stays reviewable.
