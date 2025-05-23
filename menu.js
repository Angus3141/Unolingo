// menu.js
window.onload = function() {
  // Replace 'YOUR_SHEET_ID' with your published Google Sheet ID
  Tabletop.init({
    key: 'YOUR_SHEET_ID',
    callback: showMenu,
    simpleSheet: true
  });
};

function showMenu(data) {
  const container = document.getElementById('menu-container');
  data.forEach(item => {
    const dishDiv = document.createElement('div');
    dishDiv.className = 'dish';
    dishDiv.innerHTML = `
      <h3>${item.Dish}</h3>
      <p>${item.Description}</p>
      <span>${item.Price}</span>
    `;
    container.appendChild(dishDiv);
  });
}
