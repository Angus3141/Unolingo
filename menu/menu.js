// menu/menu.js

// 1) Put your published Sheet’s ID here, in straight ASCII quotes:
const SHEET_ID = "2PACX-1vR6M2Q4ZaQLOA7tVS2d1ee_DGcfdjn0ziRnyiJLUpsHeLJFVcBIFiTorAfgfWBFGQB8Hrck--5EdW10";

window.onload = function() {
  Tabletop.init({
    key:       SHEET_ID,
    callback:  processData,
    simpleSheet: true
  });
};

function buildHierarchy(rows) {
  const map = {};
  rows.forEach(({ Level, Unit, Topic }) => {
    if (!map[Level])             map[Level] = { level: Level, units: {} };
    if (!map[Level].units[Unit]) map[Level].units[Unit] = { unit: Unit, topics: [] };
    if (!map[Level].units[Unit].topics.includes(Topic)) {
      map[Level].units[Unit].topics.push(Topic);
    }
  });
  return Object.values(map).map(l => ({
    level: l.level,
    units: Object.values(l.units)
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
    const lvl = document.createElement('div');
    lvl.className = 'level';
    lvl.innerHTML = `<h2>${level}</h2>`;
    units.forEach(({ unit, topics }) => {
      const unt = document.createElement('div');
      unt.className = 'unit';
      unt.innerHTML = `<h3>${unit}</h3><ul>` +
        topics.map(t => `<li>${t}</li>`).join('') +
        `</ul>`;
      lvl.appendChild(unt);
    });
    container.appendChild(lvl);
  });
}
