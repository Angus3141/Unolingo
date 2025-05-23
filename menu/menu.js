// menu.js

// 1) Fetch data from your Google Sheet (publish the sheet and replace with its ID)
window.onload = () => {
  Tabletop.init({
    key: '2PACX-1vR6M2Q4ZaQLOA7tVS2d1ee_DGcfdjn0ziRnyiJLUpsHeLJFVcBIFiTorAfgfWBFGQB8Hrck--5EdW10
',      // ← replace with your Sheet ID
    callback: processData,
    simpleSheet: true,
    // sheetName: 'YourTabName' // ← uncomment & change if you want a specific tab
  });
};

// 2) Turn flat rows into a nested Level → Unit → Topic structure
function buildHierarchy(rows) {
  const map = {};

  rows.forEach(({ Level, Unit, Topic }) => {
    if (!map[Level]) {
      map[Level] = { level: Level, units: {} };
    }
    const levelNode = map[Level];

    if (!levelNode.units[Unit]) {
      levelNode.units[Unit] = { unit: Unit, topics: [] };
    }
    const unitNode = levelNode.units[Unit];

    if (!unitNode.topics.includes(Topic)) {
      unitNode.topics.push(Topic);
    }
  });

  return Object.values(map).map(levelNode => ({
    level: levelNode.level,
    units: Object.values(levelNode.units)
  }));
}

// 3) Kick off hierarchy build, then render
function processData(rows) {
  const nested = buildHierarchy(rows);
  showNestedMenu(nested);
}

// 4) Render nested levels, units, and topics into #menu-container
function showNestedMenu(levels) {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';  // clear any old content

  levels.forEach(({ level, units }) => {
    const levelEl = document.createElement('div');
    levelEl.className = 'level';
    levelEl.innerHTML = `<h2>${level}</h2>`;

    units.forEach(({ unit, topics }) => {
      const unitEl = document.createElement('div');
      unitEl.className = 'unit';
      unitEl.innerHTML = `<h3>${unit}</h3>`;

      const ul = document.createElement('ul');
      topics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        ul.appendChild(li);
      });

      unitEl.appendChild(ul);
      levelEl.appendChild(unitEl);
    });

    container.appendChild(levelEl);
  });
}
