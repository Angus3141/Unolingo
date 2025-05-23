// menu.js

window.onload = function() {
  Tabletop.init({
    key: '2PACX-1vR6Q4ZaQLOA7tVS2d1ee_DGcfdjn0ziRnyiJLUpsHeLJFVcBIFiTorAfgfWBFGQB8Hrck--5EdW10',
    callback: processData,
    simpleSheet: true
    // sheetName: 'Menu' // uncomment & change if you need a specific tab
  });
};

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

function processData(rows) {
  const nested = buildHierarchy(rows);
  showNestedMenu(nested);
}

function showNestedMenu(levels) {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';

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
