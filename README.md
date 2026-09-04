# Fleetline

Fleetline is a dependency-free robot fleet operations dashboard built for the Peppermint Robotics SDE-1 frontend challenge.

**Live demo:** https://abrarkivande.github.io/peppermint-fleetline/

The dashboard uses the supplied warehouse layout and telemetry files to provide a replayable fleet view, plus a separate browser-local live simulation for demonstrating continuously changing robot state.

## Tech stack

- Semantic HTML and accessible controls
- Vanilla JavaScript using browser `fetch()` and SVG rendering
- CSS with responsive layout and custom properties
- No runtime dependencies, build step, or backend service
- GitHub Actions and GitHub Pages for deployment

## Features

- Renders all eight robots on the supplied `layout.png` coordinate system.
- Replays `events.jsonl` with play, pause, reset, seek, and 1x/2x/4x speed controls.
- Switches to a continuous live feed with bounded movement and gradual battery drain.
- Shows fleet size, working robots, attention count, and average battery.
- Shows a fleet-level working-robot trend across the observed telemetry window.
- Filters robots by type or operational attention state.
- Shows selected robot status, battery, position, and recent telemetry events.

## Run locally

The browser must load the data files over HTTP, so use any static server from this directory:

```powershell
npx serve .
```

Open the printed URL. The page loads `robots.json`, `events.jsonl`, and `layout.png` from the same directory.

## Tests

The focused Node test checks roster size, telemetry coverage, coordinate bounds, battery bounds, and attention-state preservation:

```powershell
node tests.js
```

Expected result:

```text
5 telemetry and snapshot tests passed
```

## Deployment

The site is deployed automatically by `.github/workflows/pages.yml` whenever `main` changes. The workflow uploads the repository as a static Pages artifact; no server-side process is required. GitHub Pages serves the live demo above.

## Design notes

`ANSWERS.md` explains the shared state shape, the browser-generated live-feed tradeoff, and the intentionally omitted production features. `SYSTEM_DESIGN.md` addresses future feature growth, larger fleets, limited bandwidth, robot failure, and unreliable connections.

## AI delegation

AI tooling was used to scaffold the initial dashboard layout, wire telemetry parsing, review the implementation against the challenge checklist, and draft documentation. The implementation, live-feed behavior, design decisions, written answers, and tests were reviewed and adjusted in this repository.

## Scope and next steps

This submission deliberately focuses on the requested frontend experience. A production version would add authenticated operator actions, durable history, server-authoritative live state, reconnect handling, stale-data indicators, and a virtualized rendering path for much larger fleets.