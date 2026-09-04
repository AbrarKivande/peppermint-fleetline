# Fleetline

Fleetline is a dependency-free frontend for replaying the supplied Peppermint Robotics fleet telemetry and simulating a browser-local live feed.

## Run locally

From this directory, run any static server, for example:

```powershell
npx serve .
```

Then open the printed local URL. The dashboard loads `robots.json`, `events.jsonl`, and `layout.png` from the same directory. It can also be deployed as-is to GitHub Pages, Netlify, or any static host.

## Included interactions

- Replay, pause, reset, seek, and change playback speed.
- Filter the map by robot type or attention state.
- Select a robot to inspect status, battery, and position.
- Review recent telemetry events as the replay advances.
- Switch to a continuous live-feed simulation with bounded movement and gradual battery drain.
- View the percentage of working robots over the observed window.

## Tests

Run the focused telemetry checks with Node:

```powershell
node tests.js
```

## AI delegation

AI tooling was used to scaffold the initial dashboard layout, wire the telemetry parsing, and review the implementation against the challenge checklist. The final interaction model, live-feed behavior, written design answers, and tests were reviewed and adjusted in this repository.

## Deployment

No build step or package installation is required. For GitHub Pages, push this folder to a repository, enable Pages from the repository's main branch and folder, and share the resulting Pages URL. The static site has no server-side dependencies; its live mode is intentionally generated in the browser.

See `ANSWERS.md` and `SYSTEM_DESIGN.md` for the design decisions and tradeoffs.