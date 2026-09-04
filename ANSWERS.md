# Assignment Answers

## 1. What holds the fleet state as data arrives?

`index.html` keeps the immutable roster in `state.robots` and the recorded telemetry in `state.events`. `snapshotAt(time)` derives one current snapshot by taking the latest event for each robot at or before the selected time. The map, summary metrics, detail panel, event list, and trend all render from that same derived snapshot, so replay controls cannot create separate or inconsistent views. Live mode uses the same robot-shaped records in `state.liveEvents` and the same rendering conventions, while `renderLive()` updates those records every 1.2 seconds.

This is intentionally a small client-side model for a static deployment. A production version would move the event ingestion and canonical current-state store to a backend, then have replay and live transports feed the same reducer/state adapter.

## 2. One real tradeoff

I chose a dependency-free static frontend and browser-generated live feed rather than adding a server or framework. This makes the submission deployable directly to GitHub Pages and keeps setup to one static-server command, which is useful for an evaluator opening the project quickly. The cost is that live updates are local to each browser tab and are not a shared, authoritative fleet stream; there is also no persistence or cross-client coordination. The boundary is visible in `state.mode`, `state.liveEvents`, and the `setInterval` in `index.html`.

## 3. What did you leave out?

I left out authentication, durable history, server-side live ingestion, robot commands, route/path rendering, and automated browser end-to-end tests. The next step would be a small backend with a canonical state store and WebSocket endpoint, plus a reconnecting client and a virtualized robot list for larger fleets. I also kept the supplied log's actual final timestamp as the replay endpoint instead of inventing fifteen minutes of historical data.
