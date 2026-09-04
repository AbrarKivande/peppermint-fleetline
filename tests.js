const fs = require('fs');
const assert = require('assert');

const robots = JSON.parse(fs.readFileSync('robots.json', 'utf8'));
const events = fs.readFileSync('events.jsonl', 'utf8').trim().split('\n').map(JSON.parse);
const snapshotAt = (time) => robots.map(robot => {
  const updates = events.filter(event => event.robot_id === robot.robot_id && event.t <= time);
  return updates[updates.length - 1] || {...robot, status: 'idle', battery: 0};
});

assert.strictEqual(robots.length, 8, 'roster should contain eight robots');
assert.strictEqual(new Set(events.map(event => event.robot_id)).size, 8, 'telemetry should cover every robot');
assert(snapshotAt(70).every(robot => robot.x >= 0 && robot.x <= 900 && robot.y >= 0 && robot.y <= 560), 'positions stay inside the site');
assert(snapshotAt(70).every(robot => robot.battery >= 0 && robot.battery <= 100), 'battery stays within percentage bounds');
assert(snapshotAt(70).some(robot => robot.status === 'error'), 'snapshot preserves an attention state');
console.log('5 telemetry and snapshot tests passed');
