# CLAUDE.md

**ishuar.github.io** — personal portfolio, React SPA, deployed to GitHub Pages
at https://ishan.learndevops.in/ via GitHub Actions. Origin: saadpasta/developerFolio
(unmaintained upstream; this fork is the source of truth — do not sync from it).

Vocabulary lives in `CONTEXT.md`. Decisions live in `docs/adr/`. Read both
before changing structure.

## Current state

- Toolchain: CRA (react-scripts 5). Migration to Vite is decided and not
  started — see `docs/adr/0001-migrate-cra-to-vite.md`. Until the first
  migration PR opens, do not touch build config or `package.json` scripts.
- `README.md` is still upstream's. Rewriting it for this site is welcome; keep
  `LICENSE` (GPL-3.0) and a one-line fork attribution.
- Open tracking issues: #24 (lint job + chained CI), #25 (Cypress covers every
  enabled Section).

## Before anything runs

`npm start` and `npm run build` both execute `node fetch.js` first. It calls the
GitHub GraphQL API and Medium RSS using `.env`. Without a populated `.env` the
build fails or renders empty sections — the most common "it's broken" cause.

- `cp env.example .env` if `.env` is missing; I fill in the token.
- `.env` holds `REACT_APP_GITHUB_TOKEN`. Never print it, commit it, or paste it
  into a command.
- Do not "fix" a fetch.js failure by hardcoding API responses into source.

## Guard hook

`.claude/settings.json` runs `.claude/hooks/guard.sh` on every Write, Edit and
Bash call. It denies two things: writes, redirects or `tee` into `.env*`, and
local deploys (`npm run deploy`, `gh-pages`). A denial is a rule, not a bug.
Known gaps: `sed -i` on `.env` is not caught; a `grep` or heredoc containing one
of the deploy strings is denied too — use the Write tool or rephrase. Branch
protection for `main` is a GitHub repo setting, not a hook (see Git rules).

## Commands

- `npm start` — dev server on :3000 (runs fetch.js)
- `npm test -- --watchAll=false` — Jest via react-scripts
- `npm run build` — production build to `build/`
- `npm run test:e2e` — serves `build/` on :3000 and runs Cypress. Requires a prior build.
- `npm run check-format` — Prettier check. Use this, not `format`, to verify.

## Non-negotiable engineering rules

All documentation in this repo (README, ADRs, this file) follows the
**i-have-adhd** output style (user-level plugin skill): lead with the action,
numbered steps with one bounded action each, no preamble, no closing filler.

1. **Best practice over workaround — always.** Fix the cause, not the symptom.
   If a tool's default is wrong for us, configure it explicitly and say why in a
   comment; never patch around it silently. Transitional measures are named as
   such in the PR and in an ADR, and completed — a shim without a removal plan
   is a workaround.

2. **Explicit over implicit configuration.** Tool behaviour must never change as
   a side effect of a version bump. Prettier, Jest, Cypress and CI options we
   rely on are written in their config files, not inherited from defaults.
   Expanding a rule set is its own deliberate PR.

3. **Test-first for every behaviour change.** Write the failing test, confirm it
   is red, then fix. Update only the tests that pin the behaviour being
   deliberately changed.

4. **Pure refactors ship with zero test edits.** If a refactor needs a test
   change, it is not a refactor — split the PR.

5. **One concern per PR.** Dependency bumps, behaviour changes, refactors, and
   tooling migrations never share a diff.

6. **PR titles and descriptions are for a reader, not a session.** Title says
   what changed in plain words; description says why and how it was verified
   (which commands, which numbers). Never "part 1", "wip", or session shorthand.

7. **Don't hand-roll what the platform provides.** The bundler owns env
   injection, asset hashing, and dev server. React owns rendering — no manual
   DOM. Existing deps (`react-easy-emoji`, `lottie-react`, `react-awesome-reveal`)
   are used as designed; a new runtime dependency is its own justified PR.

8. **Unused features get deleted, not fixed.** A Section disabled in
   `portfolio.js` for months, or an integration whose upstream API is dead, is
   removed with evidence — not patched. Apply the deletion test before investing
   in a fix.

9. **The GitHub token never reaches the browser.** `REACT_APP_GITHUB_TOKEN` is
   read in exactly one place: `fetch.js`, at build time, in Node. Nothing under
   `src/` reads it — CRA and Vite inline env vars into the public bundle. All
   external data enters the app as Build-time data written by `fetch.js`, never
   as a runtime API call from the client.

10. **Verify merges against the live site.** After a deploy, open the site and
    check every Section renders with real data. The build passing is not the
    check; the page rendering is.

11. **Squash merges + stacked PRs:** after a squash lands, rebase any dependent
    branch onto main (`git rebase --onto main <old-base>`).

12. **Keep it simple; readable beats clever.** The simplest design that works
    wins. Code a maintainer can't follow in one read gets simplified, not
    documented around. Complexity must buy something measurable, and the burden
    of proof is on the complexity.

13. **Decide before building.** A new Section or integration starts with one
    written paragraph: what it shows, where the data comes from, why it earns a
    place on the page. Record it in the PR description or an ADR before writing
    code. "Would be nice" is not a spec.

14. **Boy-scout rule — never silently swallow a finding.** When work reveals an
    adjacent problem (a stale doc line, a dead path, a misleading name, a missing
    test), fix it in the same PR when it is trivial and the same concern;
    otherwise say it out loud and open an issue in the same session.

15. **Two real implementations before an abstraction.** One Container per
    Section, wired explicitly in `src/containers/Main.js`. No generic section
    factory, no config knob for a hypothetical second case.

16. **Docs ship in the same PR as the change.** A change to commands, layout,
    build, or conventions updates README and this file in the same diff. A doc
    that contradicts the code is a bug and gets triaged like one.

17. **Engineering decisions land in ADRs.** Toolchain, framework, and structural
    choices get a dedicated `docs/adr/NNNN-short-slug.md` (Status / Context /
    Decision / Consequences), written when decided. Superseded ADRs are marked
    and kept. First instance: `0001-migrate-cra-to-vite.md`.

18. **Stale instructions are worse than no instructions.** This file is loaded
    into every AI session; anything wrong in it gets confidently repeated. Every
    claim here must be verifiable in the repo today. Prune or update it in the
    same PR that invalidates it; delete status notes once they ship.

## Git rules

- **Never commit or push to `main` — no exceptions.** Includes indirect writes
  such as `gh api PUT /contents`. Enforced by GitHub branch protection, not by
  a local hook: if `main` is checked out, `git switch -c <branch>` first.
- **Never force-push to `main`.** Force-push to your own branch is fine.
- All changes go through a branch (`git switch -c` or a worktree) and a PR.
- **PR titles and commit messages follow
  [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):**
  `type(scope): summary`, lower-case, imperative, no trailing period. Types in
  use: `feat`, `fix`, `chore`, `ci`, `docs`, `refactor`, `test`. Squash-merge
  takes the PR title as the commit on `main`, so the title is the commit that
  matters.
- Never run `npm run deploy` or `gh-pages` locally. Deployment is the Actions
  workflow only. Enforced by the guard hook.

## Where things live

Terms below are defined in `CONTEXT.md`.

- `src/portfolio.js` — Content for every Section except Books. `src/books.js` —
  Content for the Books Section. Content changes go in these two files, never
  into Containers or Cards.
- `src/_globalColor.scss` — theme colours. No hex literals in Container or Card SCSS.
- `src/components/` — Cards: one visual item each (a single book, a single experience).
- `src/containers/` — Containers: one Section each, composed of Cards.
- `src/containers/Main.js` — the one place Containers are wired into the page.
- New Section = Card + Container + Content block + one line in `Main.js`. The
  Books Section is the model.
- `public/profile.json`, `public/blogs.json` — Build-time data written by
  `fetch.js`; gitignored, never edited by hand.
- `src/assets/lottie/` — replace JSON in place, keep the filename.

## JavaScript / React style

- Function components and hooks only; no class components.
- Data flows in from Content or Build-time data as props. Containers and Cards
  don't fetch, don't read env vars, don't own global state.
- Conditional rendering follows the existing Display flag (`display: true/false`)
  on each Content block — extend the pattern, don't invent a second one.
- Emoji in Content strings go through `emoji()` from react-easy-emoji.
- Prettier is the only formatter (`.prettierrc`). Don't reformat files you
  didn't otherwise change.
- Comments state constraints the code can't show — never narrate the next line.

## Testing

- Unit tests run with **no network and no token**. Anything that needs
  Build-time data is mocked with a fixture. Three test files exist today:
  `src/App.test.js`, `src/containers/workExperience/WorkExperience.test.js` and
  `src/components/githubRepoCard/GithubRepoCard.test.js`.
- Tests are characterization tests at seams: a Container renders its Section
  from a Content-shaped fixture. Don't test internals; don't snapshot Lottie or
  third-party embeds.
- Cypress (`cypress/e2e/basic.cy.js`) asserts three things on the built site:
  the h1 renders, the Experience Section is visible, the first experience card
  has role, company, date and description. Every-Section coverage is #25.
- CI on pull requests: three independent workflows run in parallel — Check
  Format, Unit Tests, End2End Tests. Unit and E2E both run `npm run build`
  without a token, so GitHub-driven Sections are empty under test. There is no
  lint job. Deploy runs on push to `main`. Lint + job chaining is #24.

## Dependencies

- Dependabot owns version bumps. Don't edit versions in `package.json` by hand;
  review the Dependabot PR instead.
- Public repo, public site. Nothing goes in `portfolio.js` you wouldn't put on
  a resume.
