# ishuar.github.io

A single-page portfolio site. One context: the page, its parts, and where each
part's data comes from.

## Language

**Section**:
One visible area of the page that a visitor scrolls to, such as Skills or
Books. Present on the page only when its Display flag is true.
_Avoid_: block, part, container (for the visible thing), component

**Container**:
The module under `src/containers/` that renders exactly one Section.
_Avoid_: section (for the code), page, view, screen

**Card**:
One visual item inside a Section, rendered from a module under
`src/components/` — a single book, a single work experience.
_Avoid_: component, tile, item, element

**Content**:
Hand-written data that describes the author, kept in `src/portfolio.js` and
`src/books.js`. Edited by the author; never by code.
_Avoid_: config, data, copy, portfolio (for the file's contents)

**Build-time data**:
JSON written by `fetch.js` into `public/` when the site is built, from GitHub
and Medium. Never committed, never edited by hand, never fetched from the browser.
_Avoid_: API data, remote data, fetched data, runtime data

**Display flag**:
The `display: true | false` field on a Content block. The single switch that
decides whether a Section is on the page.
_Avoid_: enabled, visible, show, toggle
