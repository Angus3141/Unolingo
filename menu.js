/**
 * Turns an array of {Level, Unit, Topic} rows
 * into an array of:
 * [
 *   {
 *     level: 'A1',
 *     units: [
 *       {
 *         unit: 'TEST A',
 *         topics: ['TOPIC TEST A', …]
 *       },
 *       …
 *     ]
 *   },
 *   …
 * ]
 */
function buildHierarchy(rows) {
  const map = {};

  rows.forEach(({ Level, Unit, Topic }) => {
    // 1) ensure Level exists
    if (!map[Level]) {
      map[Level] = { level: Level, units: {} };
    }
    const levelNode = map[Level];

    // 2) ensure Unit exists under this Level
    if (!levelNode.units[Unit]) {
      levelNode.units[Unit] = { unit: Unit, topics: [] };
    }
    const unitNode = levelNode.units[Unit];

    // 3) push Topic (avoid duplicates if you like)
    if (!unitNode.topics.includes(Topic)) {
      unitNode.topics.push(Topic);
    }
  });

  // convert the units objects into arrays
  return Object.values(map).map(levelNode => ({
    level: levelNode.level,
    units: Object.values(levelNode.units)
  }));
}

// Example usage
const flatData = [
  { Level: 'A1', Unit: 'TEST A', Topic: 'TOPIC TEST A' },
  { Level: 'A1', Unit: 'TEST A', Topic: 'TOPIC TEST A' },
  { Level: 'A1', Unit: 'TEST B', Topic: 'TOPIC TEST B' },
  { Level: 'A2', Unit: 'TEST C', Topic: 'TOPIC TEST C' },
  // …etc
];

const nested = buildHierarchy(flatData);
console.log(JSON.stringify(nested, null, 2));
