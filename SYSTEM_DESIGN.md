# System Design Answers

## 1. Adding a feature later

The current design has a useful view-model boundary: `snapshotAt(time)` produces the robot records consumed by `render()`, while `renderDetail()` and `renderEvents()` own presentation for selected state and history. For example, adding a battery forecast would plug into a pure helper beside `isAttention()`, derive an estimate from the selected robot's telemetry history, and add one field to `renderDetail()` without changing the map or replay controls. A shared backend would preserve this shape by returning the same robot record contract over REST and WebSocket.

## 2. Growing from eight to five hundred robots

The first break is rendering and filtering, not the data model. `render()` rebuilds every SVG robot group and repeatedly scans all events in `snapshotAt()`, so both DOM work and event lookup grow with fleet size and replay length. At 500 robots this would make slider interaction visibly expensive. I would index events by robot and timestamp once, render only the viewport/selected subset, and use a canvas or map layer for high-volume markers while keeping a virtualized table for inspection.

## 3. Limited bandwidth

I would send a compact current-state message containing robot ID, position, battery, status, and a server timestamp, rather than replay metadata or repeated unchanged fields. Robots could publish at a lower fixed rate with a threshold rule for immediate status/battery changes. The backend would coalesce intermediate position updates for slow clients, while retaining the latest state and sequence number so a reconnecting client can detect a gap and request a fresh snapshot.

## 4. Robot stops responding mid-task

The backend should maintain `lastSeen` and a per-robot heartbeat deadline. When the deadline expires, it marks the robot stale/offline, emits one state transition to subscribers, and leaves the last known position visible with an attention indicator. Recovery is a normal reconnect/heartbeat update that clears the stale state. In this static prototype the equivalent operator signal is the supplied `offline` status; the production hook belongs in the ingestion service, not in the map component.

## 5. Slow, late, or out-of-order connections

Each update should carry a monotonic sequence number or source timestamp. The canonical state store accepts only newer updates for a robot, so late messages cannot roll the UI backward. The UI would show the last accepted position with a stale-data age rather than pretending it is current. After reconnect, the robot or broker should resend the latest retained state and the backend should publish a fresh snapshot, restoring consistency for both REST polling and WebSocket clients.
