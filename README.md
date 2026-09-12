# Namma Circuit Universe ⚡

A production-minded, dependency-free front-end foundation for the NCU education platform. It is designed to be easy to deploy as a static site while keeping content data and interactive modules cleanly separated in `app.js`.

## Run locally

Any static file server works. For example, with Node installed:

```powershell
npx serve .
```

Then open the supplied local URL. The application uses hash-based routes so it works on static hosting without server-side rewrite rules.

## Included experience

- Responsive, mobile-first premium NCU homepage and full responsive navigation
- Original inline-vector Circuit Crew mascots: Volto, Curro, Resi and Shorty
- Universe map, lessons and individual concept / character routes
- Tanglish explanation layer that is deliberately separated from engineering facts
- NCU stories catalog with a truthful, API-ready Instagram integration placeholder
- Interactive LED, series, parallel and RC circuit simulations
- Formula reference and live Ohm's law, series/parallel, power, divider and RC calculators
- Explain It Like NCU topic explorer, global search and a local-XP three-question quiz
- Semantic sections, keyboard-focusable controls, reduced-motion support and empty / error responses

## Content and integration notes

The current lesson, formula, character and episode entries are structured data at the top of `app.js`. They can later be moved to a CMS/API without changing the page layouts. A user-account layer can replace the small local-storage XP implementation. Instagram intentionally does not fabricate posts; the reserved feed surface is ready for an official embed or Instagram Graph API connection.
